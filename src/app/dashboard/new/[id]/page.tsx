import { SubmmitButton } from "@/app/components/submmitions-button";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData({ userId, noteId }: { noteId: string; userId: string }) {
  noStore();
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId as string,
    },
    select: {
      title: true,
      description: true,
      id: true,
    },
  });

  return data;
}

export default async function EditNoteById({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData({
    userId: user?.id as string,
    noteId: params.id as string,
  });

  async function postData(formDate: FormData) {
    "use server";

    if (!user) {
      throw new Error("Not authorized");
    }

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: user.id as string,
      },
      data: {
        title: formDate.get("title") as string,
        description: formDate.get("description") as string,
      },
    });

    revalidatePath("/dashboard", "layout");

    return redirect("/dashboard");
  }

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can now edit your note
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              id="title"
              placeholder="Title for you note"
              defaultValue={data?.title}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              required
              id="description"
              name="description"
              placeholder="Describe your note as you want..."
              defaultValue={data?.description}
              cols={30}
              rows={10}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <SubmmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
