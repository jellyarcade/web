"use client";

import { useTranslations } from "next-intl";

const NewsletterSignup = () => {
  const t = useTranslations("footer.newsletter");

  return (
    <div className="space-y-4">
      <p className="text-gray-400">{t("description")}</p>
      <form className="flex flex-col gap-3">
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90 transition-colors"
        >
          {t("subscribe")}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
