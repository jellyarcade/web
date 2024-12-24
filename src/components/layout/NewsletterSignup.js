"use client";

import { useTranslations } from "next-intl";

const NewsletterSignup = () => {
  const t = useTranslations("footer.newsletter");

  return (
    <div>
      <h3 className="font-bold mb-4">{t("title")}</h3>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder={t("placeholder")}
          className="px-4 py-2 rounded bg-gray-800"
        />
        <button className="px-4 py-2 bg-primary rounded">{t("button")}</button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
