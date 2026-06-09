import Card from "../Card/Card";
import { GiSkills } from "react-icons/gi";
import { SiLinuxprofessionalinstitute } from "react-icons/si";
import { GiQuickSlash } from "react-icons/gi";

const WhyDevTinderData = [
  {
    logo: <GiSkills className="w-5 h-5" />,
    heading: "Skill‑based swiping",
    paragraph:
      "Skip the fluff — match with devs who actually know your stack. Filters for languages, frameworks and vibe.",
  },
  {
    logo: <SiLinuxprofessionalinstitute className="w-5 h-5" />,
    heading: "Collabs that ship",
    paragraph:
      "Find pair partners, reviewers, and co‑founders who will turn an idea into a repo (and maybe a startup).",
  },
  {
    logo: <GiQuickSlash className="w-5 h-5" />,
    heading: "Fast, flirty & functional",
    paragraph:
      "Quick swipe UI that gets you from match to PR review — without awkward elevator pitches.",
  },
];

export default function WhyDevTinder() {
  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Why DevTinder?
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Because engineering is social — and collaborations should be as delightful as your favourite code editor theme.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WhyDevTinderData.map((item, idx) => (
            <Card
              key={idx}
              logo={item.logo}
              heading={item.heading}
              paragraph={item.paragraph}
            />
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/signup"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF3D7F] to-[#7C3AED] text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Ready to mingle? Create your profile
          </a>
        </div>
      </div>
    </section>
  );
}