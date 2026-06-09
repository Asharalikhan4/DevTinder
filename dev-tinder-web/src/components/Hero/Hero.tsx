import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT - headline + CTAs */}
        <div className="order-2 md:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
            Swipe right on your next code soulmate.
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D7F] to-[#7C3AED]">
              Find co‑founders, pair partners, and mentors who actually get your semicolons.
            </span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg sm:text-xl max-w-2xl">
            DevTinder matches devs by skills, vibe and preferred stack — not corporate jargon.
            Less awkward small talk, more collab-ready pull requests.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-[#FF3D7F] to-[#7C3AED] text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              Get started
              <FaArrowRight />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50 transition"
            >
              Browse as guest
            </Link>

            <span className="w-full md:w-auto text-sm text-gray-500 mt-2 md:mt-0">
              No awkward intros. No credit card. Seriously.
            </span>
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              🔥 1.2k matches this week
            </span>
            <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              🧑‍💻 TypeScript-friendly
            </span>
            <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              ☕ Remote pairings welcome
            </span>
          </div>
        </div>

        {/* RIGHT - decorative swipe-card collage */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-[260px] sm:w-[320px] md:w-[360px] h-[420px]">
            {/* Back card */}
            <div className="absolute left-4 top-6 w-full h-[330px] rounded-2xl bg-white shadow-xl transform -rotate-6 scale-95 border border-gray-100"></div>

            {/* Middle card */}
            <div className="absolute left-0 top-0 w-full h-[360px] rounded-2xl bg-white shadow-2xl z-10 transform rotate-2">
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] text-white flex items-center justify-center font-semibold">
                    JS
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Ava • Full‑stack</div>
                    <div className="text-sm text-gray-500">React · Node · TDD</div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Loves clean PRs and late-night pair programming. Will review your README.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">React</span>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Node</span>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">TDD</span>
                </div>
              </div>
            </div>

            {/* Front card */}
            <div className="absolute right-0 bottom-4 w-full h-[300px] rounded-2xl bg-white shadow-2xl z-20 transform rotate-6 translate-x-3">
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center font-semibold">
                    PY
                  </div>
                  <div>
                    <div className="font-semibold text-md">Ravi • Data</div>
                    <div className="text-sm text-gray-500">Python · AWS · notebooks</div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  Will help you optimize that pipeline — and your coffee ratio.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">Python</span>
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">AWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}