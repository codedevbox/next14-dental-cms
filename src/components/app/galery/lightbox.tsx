import { useEffect, useState } from "react";
import Image from "next/image";

import { Gallery } from "@prisma/client";

import FadeMove from "../transition/fadeMove";

interface LightboxProps {
    images: Gallery[];
};

const Lightbox: React.FC<LightboxProps> = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    const openLightbox = (image: string) => {
        setCurrentImage(image);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
        setCurrentImage(null);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    return (
        <>
            {images.map((item) => (
                item && item.image && (
                    <div className="w-full max-w-xs mx-auto rounded-3xl overflow-hidden relative aspect-square" key={item.id}>
                        <FadeMove>
                            <Image
                                alt={item.name}
                                src={item.image}
                                width={384}
                                height={384}
                                priority={false}
                                className="object-cover cursor-pointer hover:opacity-80 w-full h-full"
                                onClick={() => openLightbox(item.image!)}
                            />
                        </FadeMove>
                    </div>
                )
            ))}
            {isOpen && currentImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeLightbox}
                >
                    <div className="relative">
                        <button
                            className="absolute top-2 right-2 text-white text-2xl"
                            onClick={closeLightbox}
                        >
                            &times;
                        </button>
                        <Image
                            width={800}
                            height={800}
                            alt=""
                            src={currentImage}
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Lightbox;
