import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { fetchTestimonialPublishedByLocale } from "@/db/queries/testimonials";

import TestimonialsCard from "./testimonialsCard";
import FadeMove from "../transition/fadeMove";

const TestimonialsList: React.FC = async () => {

    const locale = useLocale();
    const TestimonialsData = await fetchTestimonialPublishedByLocale(locale);
    if (TestimonialsData?.length === 0) { return; }
    const t = await getTranslations("WEBSITE.CONTENT");

    return (
        <FadeMove>
            <div className="pt-20 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
                <h2 className="text-center font-thin text-4xl">{t("TESTIMONIALS_TITLE")}</h2>
                <div className=" pt-10 w-full flex justify-center">
                    <div className="text-center font-thin text-base  max-w-[780px]">{t("TESTIMONIALS_DESCRIPTION")}</div>
                </div>
                <div className="pt-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TestimonialsData && (
                        TestimonialsData.map((item) => (
                            <div key={item.id}>
                                <FadeMove>
                                    <TestimonialsCard testimonial={item} />
                                </FadeMove>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </FadeMove>
    );
};

export default TestimonialsList;
