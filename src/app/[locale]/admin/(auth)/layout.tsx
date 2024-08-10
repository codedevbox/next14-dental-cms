export default function AdminAuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from-colorfrom to-colorto">
            {children}
        </div>
    );
}
