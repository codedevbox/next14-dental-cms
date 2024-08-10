import DOMPurify from "isomorphic-dompurify";

import FadeMove from "./transition/fadeMove";

interface ContentProps {
    title: string | null;
    text: string | null;
};

const ContentOfPage: React.FC<ContentProps> = ({ title, text }) => {

    const sanitizedHtml = text ? DOMPurify.sanitize(text) : "";

    return (
        <FadeMove>
            <div className="pt-2 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48">
                {title && (
                    <h1 className="text-4xl font-extralight">{title}</h1>
                )}
                {sanitizedHtml && (
                    <div className="content-article py-5 text-lg font-thin" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
                )}
            </div>
        </FadeMove>
    );
};

export default ContentOfPage;
