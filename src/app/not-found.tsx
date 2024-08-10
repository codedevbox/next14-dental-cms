import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page not found",
    description: "Sorry, the page you requested was not found.",
};

const NotFound = () => {
    return (
        <html>
            <body>
                <div style={{ color: 'white' }} className="flex items-center justify-center h-screen bg-gradient-to-r from-colorfrom to-colorto text-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">404 - Page not found</h1>
                        <p className="text-xl">Sorry, the page you requested was not found.</p>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default NotFound;
