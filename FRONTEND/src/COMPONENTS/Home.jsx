import { Link } from "react-router-dom";
import { ArrowRight, PenSquare, Sparkles, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 md:px-16 pt-28 pb-24 flex flex-col items-center text-center">
        {/* Background Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-130 h-130 bg-blue-600/20 blur-[140px] rounded-full"></div>

        <div className="relative z-10 max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
            <Sparkles size={16} className="text-blue-400" />

            <span className="text-sm text-zinc-300 tracking-wide">
              Modern Blogging Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
            Write.
            <span className="text-blue-500"> Share.</span>
            <br />
            Inspire The World.
          </h1>

          {/* Description */}
          <p className="mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            A modern platform where developers, writers, and creators
            can publish ideas, share knowledge, and build meaningful
            communities around the world.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/register"
              className="group bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold transition duration-300 shadow-xl shadow-blue-600/20"
            >
              Start Writing

              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition"
              />
            </Link>

            <Link
              to="/about"
              className="border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl text-lg font-medium transition duration-300"
            >
              Learn More
            </Link>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-blue-500/40 hover:bg-white/[0.07] transition duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-500/20 mb-6">
              <PenSquare className="text-blue-400" size={28} />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Easy Writing Experience
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Focus on your ideas with a clean and distraction-free
              blogging experience designed for creators.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-blue-500/40 hover:bg-white/[0.07] transition duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-500/20 mb-6">
              <Globe className="text-blue-400" size={28} />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Reach Global Readers
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Share your knowledge and connect with readers from around
              the world instantly.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-blue-500/40 hover:bg-white/[0.07] transition duration-300">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-500/20 mb-6">
              <Sparkles className="text-blue-400" size={28} />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              Beautiful Modern UI
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Enjoy a sleek, responsive, and modern design crafted with
              performance and aesthetics in mind.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-24">
        <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-[40px] p-10 md:p-16 text-center backdrop-blur-md">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Ready To Start Your Blogging Journey?
          </h2>

          <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto">
            Join thousands of creators sharing stories, tutorials,
            experiences, and ideas every day.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-xl shadow-blue-600/20"
          >
            Create Account
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}