"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Locale } from "@/config/i18n.config";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";

export function SubmitButton({ lang }: { lang: Locale }) {
  const { pending } = useFormStatus();

  const dic = getDictionaryUseClient(lang);

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {dic.submitButton.wait}
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          {dic.settings.buttonSave}
        </Button>
      )}
    </>
  );
}

export function StripeSubscriptionCreationButton({ lang }: { lang: Locale }) {
  const { pending } = useFormStatus();

  const dic = getDictionaryUseClient(lang);

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {dic.submitButton.wait}
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {dic.submitButton.createSubscription}
        </Button>
      )}
    </>
  );
}

export function StripePortal({ lang }: { lang: Locale }) {
  const { pending } = useFormStatus();

  const dic = getDictionaryUseClient(lang);

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {dic.submitButton.wait}
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          {dic.submitButton.viewDetails}
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

export function ConfirmDialog({
  title,
  description,
  lang,
}: {
  title: string;
  description: string;
  lang: Locale;
}) {
  const { pending } = useFormStatus();

  const dic = getDictionaryUseClient(lang);

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {dic.submitButton.wait}
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          {title}
        </Button>
      )}
    </>
  );
}
