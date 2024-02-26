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
import { redirect } from "next/navigation";
import prisma from "../../lib/db";

import { Locale } from "@/config/i18n.config";
import { getDictionaryServerOnly } from "@/dictionaries/default-dictionary-server-only";
import Link from "next/link";
import { SubmitButton } from "../../components/submitions-button";

export default async function NewNoteRoute({
  params,
}: {
  params: { lang: Locale };
}) {
  const dic = getDictionaryServerOnly(params.lang);

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
          <CardTitle>{dic.newNote.title} </CardTitle>
          <CardDescription>{dic.newNote.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>{dic.newNote.labelTitle}</Label>
            <Input
              required
              type="text"
              name="title"
              id="title"
              placeholder={dic.newNote.labelTitle}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              required
              name="description"
              placeholder={dic.newNote.labelDescription}
              cols={30}
              rows={10}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" asChild>
            <Link href="/dashboard">{dic.submitButton.cancel}</Link>
          </Button>
          <SubmitButton lang={params.lang} />
        </CardFooter>
      </form>
    </Card>
  );
}
