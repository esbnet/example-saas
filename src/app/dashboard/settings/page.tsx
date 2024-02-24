import { SubmmitButton } from "@/app/components/submmitions-button";
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

export default async function Settings() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
          <h1 className="text-3xl md:text-4xl"> Settings </h1>
          <p className="text-lg text-muted-foreground">Your Profile settings</p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general informarion about yourself. Don{"'"}t
              forgot to save.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your name"
                  defaultValue={data?.name ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Your Email</Label>
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
                <Label htmlFor="color-scheme">Color Schema</Label>
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
                          Green
                        </SelectItem>
                        <SelectItem
                          value="theme-blue"
                          className="text-blue-500"
                        >
                          Blue
                        </SelectItem>
                        <SelectItem
                          value="theme-violet"
                          className="text-violet-500"
                        >
                          Violet
                        </SelectItem>
                        <SelectItem
                          value="theme-yellow"
                          className="text-yellow-500"
                        >
                          Yellow
                        </SelectItem>
                        <SelectItem
                          value="theme-orange"
                          className="text-orange-500"
                        >
                          Orange
                        </SelectItem>
                        <SelectItem value="theme-red" className="text-red-500">
                          Red
                        </SelectItem>
                        <SelectItem
                          value="theme-rose"
                          className="text-rose-500"
                        >
                          Rose
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
