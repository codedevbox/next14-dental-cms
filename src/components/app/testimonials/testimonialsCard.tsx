import Image from "next/image";

import { Testimonials } from "@prisma/client";

interface TestimonialsCardProps {
    testimonial: Testimonials
};

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ testimonial }) => {
    return (
        <div className="flex flex-col items-center">
            {testimonial.image && (
                <div className="mt-5 relative rounded-full overflow-hidden">
                    <Image alt={testimonial.name} src={testimonial.image} width={80} height={80}/>
                </div>
            )}
            <div className="mt-5 flex items-center justify-center font-medium text-xl text-center">{testimonial.name}</div>
            <div className="mt-5 max-w-[400px] h-[150px] overflow-hidden font-light text-base text-center">{`"${testimonial.text}"`}</div>
        </div>
    );
};

export default TestimonialsCard;
