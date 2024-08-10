import Link from "next/link";
import FadeMove from "./transition/fadeMove";

interface BreadcrumbItem {
    title: string;
    url: string;
};

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <FadeMove>
            <div className="pt-2 px-4 sm:px-8 md:px-12 lg:px-10 xl:px-36 2xl:px-48 text-lg font-thin flex gap-4">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <span key={index}>
                            {isLast ? (
                                <span className="text-colorto">{item.title}</span>
                            ) : (
                                <>
                                    <Link className="border-b-2 border-transparent hover:border-dotted hover:border-blue-700 hover:text-blue-700" href={item.url}>
                                        {item.title}
                                    </Link>
                                    <span className="pl-4"> / </span>
                                </>
                            )}
                        </span>
                    );
                })}
            </div>
        </FadeMove>
    );
};

export default Breadcrumbs;
