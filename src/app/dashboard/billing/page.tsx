import { StripeSubscriptionCreationButton } from "@/app/components/submmit-button";
import prisma from "@/app/lib/db";
import { getStripeSession } from "@/app/lib/stripe";
import { getData } from "@/app/services/getCuscribeData";
import { Card, CardContent } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

const featureItems = [
  {
    name: "Basic",
    description: "Write as many notes",
    price: 30,
  },
  {
    name: "Pro",
    description: "Write as many notes as you want",
    price: 40,
  },
  {
    name: "Enterprise",
    description: "Write as many notes as you want and more",
    price: 50,
  },
];

export default async function Billing() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(user?.id as string);

  async function createSubscription() {
    "use server";

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id as string,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!dbUser?.stripeCustomerId) {
      throw new Error("Customer ID not found");
    }

    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });

    redirect(subscriptionUrl);
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>

          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            R$30 <span className="ml-1 text-2xl font-muted-foreground">/m</span>
          </div>

          <p className="mt-4 text-lg text-muted-foreground">
            Write as many notes as you want for R$30 a Month
          </p>
        </CardContent>

        <div className="flex-1 flex flex-col  justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10">
          <ul className="space-y-4">
            {featureItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <div>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.description}</p>
              </li>
            ))}
          </ul>
          <form action={createSubscription} className="w-full">
            <StripeSubscriptionCreationButton />
          </form>
        </div>
      </Card>
    </div>
  );
}
