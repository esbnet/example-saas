import { SubmmitButton } from "@/app/[lang]/components/submmitions-button";
import prisma from "@/app/[lang]/lib/db";
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
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewNoteRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authorized");
  }

  async function postData(formDate: FormData) {
    "use server";

    await prisma.note.create({
      data: {
        userId: user?.id as string,
        title: formDate.get("title") as string,
        description: formDate.get("description") as string,
      },
    });

    return redirect("/dashboard");
  }

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>
            Right here you can now create your new notes
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
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              required
              name="description"
              placeholder="Describe your note as you want..."
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
