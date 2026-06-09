import { FaUserPlus, FaHeart, FaRocket } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">How DevTinder works</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Fast and utterly productive — here’s how to find your next dev match.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] text-white flex items-center justify-center mx-auto">
              <FaUserPlus />
            </div>
            <h3 className="mt-4 font-semibold">Create a cheeky profile</h3>
            <p className="mt-2 text-sm text-gray-600">Add your stacks, projects and one witty line — it helps you stand out.</p>
          </div>

          <div className="p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] text-white flex items-center justify-center mx-auto">
              <FaHeart />
            </div>
            <h3 className="mt-4 font-semibold">Swipe for collaborators</h3>
            <p className="mt-2 text-sm text-gray-600">Right = yes, left = not today. Mutual right? It&apos;s a match.</p>
          </div>

          <div className="p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF3D7F] to-[#7C3AED] text-white flex items-center justify-center mx-auto">
              <FaRocket />
            </div>
            <h3 className="mt-4 font-semibold">Ship something together</h3>
            <p className="mt-2 text-sm text-gray-600">Message, pair, open a PR — partnerships that actually produce work.</p>
          </div>
        </div>
      </div>
    </section>
  );
}