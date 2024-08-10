import { useLocale } from "next-intl";
import SignInForm from "@/components/admin/auth/signInForm";

interface LoginPageProps {
    searchParams: {
        callbackUrl?: string;
    };
};

const LoginPage: React.FC<LoginPageProps> = ({ searchParams }) => {
    const locale = useLocale();

    return (
        <SignInForm locale={locale} callbackUrl={searchParams.callbackUrl} />
    );
}

export default LoginPage;
