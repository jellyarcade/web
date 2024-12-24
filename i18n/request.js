import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  try {
    const messages = (await import(`../src/messages/tr.json`)).default;
    return {
      messages,
      timeZone: "Europe/Istanbul",
      now: new Date(),
      locale: "tr",
    };
  } catch (error) {
    return {
      messages: {},
      timeZone: "Europe/Istanbul",
      now: new Date(),
      locale: "tr",
    };
  }
});
