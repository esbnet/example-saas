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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../lib/db";

import { Locale } from "@/config/i18n.config";
import { getDictionaryServerOnly } from "@/dictionaries/default-dictionary-server-only";
import { SubmitButton } from "../../components/submitions-button";

async function getData(userId: string) {
  noStore();
  const data = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });

  return data;
}

export default async function Settings({
  params,
}: {
  params: { lang: Locale };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dic = getDictionaryServerOnly(params.lang);

  const data = await getData(user?.id as string);

  if (!data) {
    redirect("/");
  }

  async function postData(formDate: FormData) {
    "use server";

    await prisma.user.update({
      where: {
        id: user?.id as string,
      },
      data: {
        name: formDate.get("name") as string,
        colorScheme: formDate.get("color") as string,
      },
    });

    revalidatePath("/dashboard/settings", "layout");
  }

  return (
    <div className="grid item-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl"> {dic.settings.title} </h1>
          <p className="text-lg text-muted-foreground">
            {dic.settings.description}
          </p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>{dic.settings.formTitle}</CardTitle>
            <CardDescription>{dic.settings.formDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">{dic.settings.labelName}</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your name"
                  defaultValue={data?.name ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">{dic.settings.labelEmail}</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your email"
                  defaultValue={data?.email as string}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="color-scheme">
                  {dic.settings.labelColorSchema}
                </Label>
                <Select name="color" defaultValue={data?.colorScheme as string}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Color</SelectLabel>
                        <SelectItem
                          value="theme-green"
                          className="text-green-500"
                        >
                          {dic.colors.green}
                        </SelectItem>
                        <SelectItem
                          value="theme-blue"
                          className="text-blue-500"
                        >
                          {dic.colors.blue}
                        </SelectItem>
                        <SelectItem
                          value="theme-violet"
                          className="text-violet-500"
                        >
                          {dic.colors.violet}
                        </SelectItem>
                        <SelectItem
                          value="theme-yellow"
                          className="text-yellow-500"
                        >
                          {dic.colors.yellow}
                        </SelectItem>
                        <SelectItem
                          value="theme-orange"
                          className="text-orange-500"
                        >
                          {dic.colors.orange}
                        </SelectItem>
                        <SelectItem value="theme-red" className="text-red-500">
                          {dic.colors.red}
                        </SelectItem>
                        <SelectItem
                          value="theme-rose"
                          className="text-rose-500"
                        >
                          {dic.colors.rose}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton lang={params.lang} />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
