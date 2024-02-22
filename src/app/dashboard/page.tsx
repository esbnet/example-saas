import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File } from "lucide-react";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import Link from "next/link";
import { DeleteNote } from "../components/submmitions-button";

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Notes: true,
      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });

  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function deleteNote(formDate: FormData) {
    "use server";

    await prisma.note.delete({
      where: {
        id: formDate.get("noteId") as string,
        userId: user?.id as string,
      },
    });

    revalidatePath("/dashboard", "layout");
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>

        {data?.Subscription?.status == "active" ? (
          <Button asChild>
            <Link href="/dashboard/new">Create a new Note</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard/billing">Create a new Note</Link>
          </Button>
        )}
      </div>

      {data?.Notes.length == 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-out-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xg font-semibold">
            You don{"'"}t have any notes created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently don{"'"}t have any notes. Please, create some so that
            you can see them right here.
          </p>

          {data?.Subscription?.status == "active" ? (
            <Button asChild>
              <Link href="/dashboard/new">Create a new Note</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard/billing">Create a new Note</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="gap-y-4 flex flex-col">
          {data?.Notes.map((note) => (
            <Card
              key={note.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <h2 className="text-xl text-primary font-semibold">
                  {note.title}
                </h2>
                <p>
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "full",
                  }).format(new Date(note.createdAt))}
                </p>
              </div>
              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${note.id}`}>
                  <Button variant={"outline"} size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={note.id} />
                  <DeleteNote />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
