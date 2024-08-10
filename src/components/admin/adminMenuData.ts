import { ClipboardDocumentListIcon, ShoppingCartIcon, Cog6ToothIcon, GlobeEuropeAfricaIcon, QuestionMarkCircleIcon,  ChatBubbleLeftRightIcon, CameraIcon, LanguageIcon, UsersIcon} from "@heroicons/react/24/solid";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

interface IMenuName {
    [key: string]: string;
};

export interface AdminMenuDataItem {
    id: number;
    number: number;
    slug: string;
    name: IMenuName;
    color: string;
    icon: string;
};

type IconComponents = {
    [key: string]: ForwardRefExoticComponent<
        SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>
    >;
};

export const iconMap: IconComponents = {
    "ClipboardDocumentListIcon": ClipboardDocumentListIcon,
    "ShoppingCartIcon": ShoppingCartIcon,
    "Cog6ToothIcon": Cog6ToothIcon,
    "QuestionMarkCircleIcon": QuestionMarkCircleIcon,
    "ChatBubbleLeftRightIcon": ChatBubbleLeftRightIcon,
    "CameraIcon": CameraIcon,
    "LanguageIcon": LanguageIcon,
    "GlobeEuropeAfricaIcon": GlobeEuropeAfricaIcon,
    "UsersIcon": UsersIcon
};

export const AdminMenuData = [
    {
        id: 1,
        number: 1,
        slug: "sections",
        name: {
            en: "Sections",
            fr: "Sections"
        },
        color: "text-colorto",
        icon: "ClipboardDocumentListIcon",
    },
    {
        id: 2,
        number: 2,
        slug: "services",
        name: {
            en: "Services",
            fr: "Services"
        },
        color: "text-orange-600",
        icon: "ShoppingCartIcon",
    },
    {
        id: 3,
        number: 3,
        slug: "faq",
        name: {
            en: "FAQ",
            fr: "FAQ"
        },
        color: "text-yellow-500",
        icon: "QuestionMarkCircleIcon",
    },
    {
        id: 4,
        number: 4,
        slug: "testimonials",
        name: {
            en: "Testimonials",
            fr: "Reviews"
        },
        color: "text-lime-500",
        icon: "ChatBubbleLeftRightIcon",
    },
    {
        id: 5,
        number: 5,
        slug: "gallery",
        name: {
            en: "Gallery",
            fr: "Gallery"
        },
        color: "text-green-500",
        icon: "CameraIcon",
    },
    {
        id: 6,
        number: 6,
        slug: "languages",
        name: {
            en: "Languages",
            fr: "Languages"
        },
        color: "text-teal-500",
        icon: "LanguageIcon",
    },
    {
        id: 7,
        number: 7,
        slug: "settings",
        name: {
            en: "Settings",
            fr: "Paramètres"
        },
        color: "text-blue-500",
        icon: "Cog6ToothIcon",
    },
    {
        id: 8,
        number: 8,
        slug: "translate",
        name: {
            en: "Translate",
            fr: "Translate"
        },
        color: "text-indigo-500",
        icon: "GlobeEuropeAfricaIcon",
    },
    {
        id: 9,
        number: 9,
        slug: "users",
        name: {
            en: "Users",
            fr: "Users"
        },
        color: "text-purple-500",
        icon: "UsersIcon",
    }
];
