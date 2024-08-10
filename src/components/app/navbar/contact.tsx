import { useTranslations } from "next-intl";

import Button from "../button";
import PhoneIcon from "../icons/phoneIcon";

const Contact: React.FC = () => {
    
    const s = useTranslations("WEBSITE.CONTACT");
    const t = useTranslations("WEBSITE.BUTTONS");    

    return (
        <div className="w-full flex flex-wrap items-center justify-center lg:justify-end gap-5 sm:order-3 md:w-1/2 md:mx-auto md:px-4 lg:px-0 md:order-2 lg:w-1/3 lg-xl1:w-1/2 lg-xl1:px-4 lg-xl1:order-2 lg:order-3">
            <div>
                <div className="flex mt-4 flex-row gap-4">
                    <div>
                        <PhoneIcon size={24} />
                    </div>
                    <div>
                        <a className="border-b border-transparent " href={`tel:${s("PHONE_NUMBER")}`}>{s("NICE_PHONE")}</a>
                    </div>
                </div>
            </div>
            <div>
                <Button isModal text={t("BOOK_NOW")} />
            </div>
        </div>
    );
};

export default Contact;
