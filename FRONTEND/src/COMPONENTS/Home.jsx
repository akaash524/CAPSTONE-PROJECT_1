import { Link } from "react-router-dom";
import {
  ArrowRight,
  PenSquare,
  Sparkles,
  Globe,
  BookOpen,
  Users,
  Feather,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-cornsilk-500 overflow-hidden">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>

            <p className="uppercase tracking-[0.3em] text-xs font-black text-copperwood-500 mb-6">
              Modern Publishing Platform
            </p>

            <h1 className="text-6xl md:text-8xl font-black text-black_forest-500 leading-none">
              Write.
              <br />
              Share.
              <br />

              <span className="text-copperwood-500">
                Inspire.
              </span>
            </h1>

            <p className="mt-10 text-xl text-olive_leaf-500 leading-relaxed max-w-2xl">
              BlogSphere helps writers, developers,
              creators, and storytellers publish
              meaningful content, connect with readers,
              and build communities around ideas that
              matter.
            </p>

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/register"
                className="
                  bg-black_forest-500
                  hover:bg-copperwood-500
                  text-cornsilk-500
                  px-8 py-4
                  flex items-center gap-3
                  font-black
                  uppercase
                  tracking-[0.15em]
                  transition
                "
              >
                Start Writing

                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="
                  border border-olive_leaf-300
                  px-8 py-4
                  text-black_forest-500
                  hover:border-copperwood-500
                  transition
                  font-bold
                  uppercase
                  tracking-[0.12em]
                "
              >
                Explore Articles
              </Link>

            </div>

          </div>

          {/* Right */}
          <div className="relative">

            <div className="border border-olive_leaf-300 bg-cornsilk-600 p-10 shadow-sm">

              <div className="h-1 bg-copperwood-500 mb-8"></div>

              <span className="uppercase text-xs tracking-[0.2em] font-black text-copperwood-500">
                Featured Story
              </span>

              <h2 className="mt-5 text-4xl font-black text-black_forest-500 leading-tight">
                Creating meaningful content in a world
                full of noise.
              </h2>

              <p className="mt-6 text-olive_leaf-500 leading-8">
                Discover how modern creators are
                building audiences through storytelling,
                authenticity, and thoughtful publishing.
              </p>

              <div className="mt-8 pt-6 border-t border-olive_leaf-300 flex justify-between">

                <div>
                  <p className="font-black text-black_forest-500">
                    BlogSphere
                  </p>

                  <p className="text-sm text-olive_leaf-500">
                    Editorial Team
                  </p>
                </div>

                <ArrowRight className="text-copperwood-500" />
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="border-y border-olive_leaf-300">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">

          {[
            ["10K+", "Articles Published"],
            ["5K+", "Active Writers"],
            ["50K+", "Readers"],
            ["100+", "Communities"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="p-10 border-r border-olive_leaf-300 last:border-r-0"
            >
              <h3 className="text-4xl font-black text-black_forest-500">
                {number}
              </h3>

              <p className="text-olive_leaf-500 mt-2">
                {label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-28">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[0.25em] text-xs font-black text-copperwood-500 mb-4">
            Why BlogSphere
          </p>

          <h2 className="text-5xl font-black text-black_forest-500">
            Designed For Modern Creators
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              icon: <PenSquare size={30} />,
              title: "Effortless Writing",
              desc: "Focus entirely on your ideas with a distraction-free publishing experience.",
            },
            {
              icon: <Globe size={30} />,
              title: "Global Reach",
              desc: "Connect with readers worldwide and grow your audience organically.",
            },
            {
              icon: <Sparkles size={30} />,
              title: "Beautiful Experience",
              desc: "A thoughtfully crafted interface designed for readers and writers.",
            },
            {
              icon: <BookOpen size={30} />,
              title: "Rich Content",
              desc: "Publish tutorials, stories, technical articles, and personal experiences.",
            },
            {
              icon: <Users size={30} />,
              title: "Community Driven",
              desc: "Encourage discussions and meaningful engagement through comments.",
            },
            {
              icon: <Feather size={30} />,
              title: "Built For Storytelling",
              desc: "Create content that resonates and leaves a lasting impression.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="
                border border-olive_leaf-300
                bg-cornsilk-600
                p-8
                hover:border-copperwood-500
                transition
              "
            >
              <div className="w-14 h-14 bg-black_forest-500 text-cornsilk-500 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-black text-black_forest-500 mb-4">
                {feature.title}
              </h3>

              <p className="text-olive_leaf-500 leading-8">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-28">

        <div className="max-w-6xl mx-auto border border-olive_leaf-300 bg-cornsilk-600">

          <div className="h-2 bg-copperwood-500"></div>

          <div className="p-12 md:p-20 text-center">

            <p className="uppercase tracking-[0.25em] text-xs font-black text-copperwood-500 mb-4">
              Join The Community
            </p>

            <h2 className="text-5xl md:text-7xl font-black text-black_forest-500 leading-tight">
              Start Publishing
              <br />
              Today.
            </h2>

            <p className="mt-8 max-w-2xl mx-auto text-xl text-olive_leaf-500 leading-relaxed">
              Share your ideas, document your journey,
              teach others, and become part of a growing
              community of creators.
            </p>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                gap-3
                mt-12
                bg-black_forest-500
                hover:bg-copperwood-500
                text-cornsilk-500
                px-10 py-5
                font-black
                uppercase
                tracking-[0.15em]
                transition
              "
            >
              Create Account
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}