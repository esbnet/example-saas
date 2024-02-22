import { i18n } from "@/config/i18n.config";
import createMiddleware from "next-intl/middleware";

export default createMiddleware(i18n);

export const config = {
  matcher: ["/((?!aaa|_next|.*\\..*).*)"],
};
