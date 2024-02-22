"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save Changes
        </Button>
      )}
    </>
  );
}

export function StripeSubscriptionCreationButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Create Subscription
        </Button>
      )}
    </>
  );
}

export function StripePortal() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          View payment details
        </Button>
      )}
    </>
  );
}

export function DeleteNote() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant={"destructive"} size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"destructive"} size="icon" type="submit">
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
