import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import FloatingDockDesktop from "./FloatingDockDesktop";
import { UserContext } from "../context/Usercontext.jsx";
// import { TypewriterEffect } from "./TypewriterEffect";

export function Lamp() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="select-none">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center"
        >
          <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300 backdrop-blur-sm">
            Collaborative coding workspace
          </div>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-slate-100 sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            Build software
            <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
              better, together.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300/90 sm:text-lg md:text-xl">
            Collab Code is a shared coding environment where teams can edit projects,
            run applications, chat in real time, and get help from an AI coding agent.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(user ? "/projects" : "/login")}
              className="w-full rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_40px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
            >
              {user ? "Open Projects" : "Sign In to Get Started"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/documentation")}
              className="w-full rounded-xl border border-slate-600/80 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
            >
              Explore Documentation
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
            <span>Real-time editing</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400/70" />
            <span>Browser preview</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400/70" />
            <span>AI assistance</span>
          </div>
        </motion.div>
      </LampContainer>
      <FloatingDockDesktop
        visibleItems={{
          login: true,
          // signup: true,
          home: true,
          docs: true,
          team: true,
          projects:true,
        }}
        variant="bottom"
      />

      
    </div>
  );
}

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0 font-serif",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>
      <div className="relative z-50 flex -translate-y-32 flex-col items-center px-5 sm:-translate-y-40 md:-translate-y-48">
        {children}
      </div>
    </div>
  );
};
