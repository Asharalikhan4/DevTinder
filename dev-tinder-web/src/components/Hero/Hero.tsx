import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Hero() {
    return (
        <section className="py-6 px-2 mx-auto lg:flex lg:items-center lg:justify-center lg:py-10 lg:px-18">
            <div className="lg:flex-1">
                <h1 className="text-3xl lg:text-5xl font-bold">Connect with developers who match your vibe</h1>
                <p className="mt-3 font-medium lg:text-2xl">
                    Swipe right on talent. DevTinder helps you find the perfect coding partner, mentor, or team member based on skills, interests,
                    and coding style.
                </p>
                <div className="flex mt-4 gap-x-4">
                    <Link href="/signup" className="border py-2 px-3 bg-[#E94057] text-white rounded-md">
                        <button className="flex items-center gap-x-2 font-medium">
                            Get Started
                            <FaArrowRight />
                        </button>
                    </Link>
                    <Link href="/" className="border py-2 px-3 rounded-md">
                        <button className=" font-medium">Learn more</button>
                    </Link>
                </div>
            </div>
            <div className="mt-4 lg:flex-1">
                <Image src={"https://images.freeimages.com/image/previews/377/family-love-set-5690782.jpg?fmt=webp&h=350"} width={600} height={600} alt="Hero Image" />
            </div>
        </section>
    );
};