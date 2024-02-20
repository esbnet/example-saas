"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
