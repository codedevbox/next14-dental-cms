
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { fetchFaqListPublishedByLocale } from "@/db/queries/faq";
import FaqCard from "./faqCard";
import FadeMove from "../transition/fadeMove";

const FAQList: React.FC = async () => {
    const locale = useLocale();
    const FaqData = await fetchFaqListPublishedByLocale(locale);
    if (FaqData?.length === 0) { return; }

    const t = await getTranslations("WEBSITE.CONTENT");

    return (
        <FadeMove>
            <div className="pt-20 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
                <div className="text-center font-thin text-4xl">{t("FAQ_TITLE")}</div>
                <div className=" pt-10 w-full flex justify-center">
                    <div className="text-center font-thin text-base  max-w-[780px]">{t("FAQ_DESCRIPTION")}</div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="lg:w-3/4">
                        {FaqData && (
                            FaqData.map((item, index) => (
                                <div key={item.id}>
                                    <FadeMove>
                                        <FaqCard index={index} faq={item} />
                                    </FadeMove>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </FadeMove>
    );
};

export default FAQList;
