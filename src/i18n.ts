import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { fetchTranslateMessageByLocale } from "./db/queries/translate";
import { fetchSettingsByLocale } from "./db/queries/settings";
import { getAvailableLocales } from "./db/queries/languages";

export default getRequestConfig(async ({ locale }) => {

    const locales = await getAvailableLocales();
    if (!locales.includes(locale as any)) notFound();

    const translate = await fetchTranslateMessageByLocale(locale);
    const settings = await fetchSettingsByLocale(locale);

    function mergeDeep(target: any, source: any) {
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object && key in target) {
                Object.assign(source[key], mergeDeep(target[key], source[key]));
            }
        }
        return { ...target, ...source };
    }

    const messages = mergeDeep(translate || {}, settings || {});
    return { messages: messages || {} };
});
