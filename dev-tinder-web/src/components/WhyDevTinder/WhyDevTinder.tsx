import Card from "../Card/Card";
import { GiSkills } from "react-icons/gi";
import { SiLinuxprofessionalinstitute } from "react-icons/si";
import { GiQuickSlash } from "react-icons/gi";


const WhyDevTinderData = [
    {
        logo: <GiSkills size={24} className="text-[#E94057]" />,
        heading: "Skill-Based Matching",
        paragraph: "Find developers with complementary skills to yours. Perfect for collaborative projects."
    },
        {
        logo: <SiLinuxprofessionalinstitute size={24} className="text-[#E94057]" />,
        heading: "Professional Networking",
        paragraph: "Expand your professional circle with like-minded developers in your field or area of interest."
    },
        {
        logo: <GiQuickSlash size={24} className="text-[#E94057]" />,
        heading: "Quick Connections",
        paragraph: "Our intuitive swiping interface makes finding the right connection fast and efficient."
    }
];

export default function WhyDevTinder() {
    return (
        <section className="py-6 px-2 lg:py-10 lg:px-18">
            <div className="text-center">
                <h1 className="text-2xl font-semibold lg:text-4xl">Why DevTinder?</h1>
                <p className="font-medium lg:text-xl">Find your perfect match in the tech world. Whether you're looking for a coding partner, mentor, or just expanding your network.</p>
            </div>
            <div className="flex flex-col space-y-2 gap-x-4 mt-4 justify-center lg:flex-row">
                {WhyDevTinderData.map((item, index) => (
                    <Card key={index} logo={item.logo} heading={item.heading} paragraph={item.paragraph} />
                ))}
            </div>
        </section>
    );
};