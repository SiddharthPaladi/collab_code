import { useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import FloatingDockDesktop from "../FloatingDockDesktop";
import axios from "../../config/axios.js";
// import { ProjectFormModal } from "@/modals/createfoldermodal/ProjectFormModal";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../../modals/createfoldermodal/animated-modal.jsx";
import { GlowButton } from "../../modals/createfoldermodal/glow-button";
// import { ChevronIcon } from "../../modals/createfoldermodal/glow-button";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { UserContext } from "../../context/Usercontext.jsx";

export const HoverEffect = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await axios.get("/projects/all");
      console.log("Fetched projects:", res.data);
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const fetchprojectdata = async (id) => {
    try {
      const res = await axios.get(`/projects/get-project/${id}`);
      // console.log("the response : ", res);
      return res.data;
    } catch (err) {
      console.error("Error fetching project data:", err);
      return null;
    }
  };

  const handleProjectClick = async (id) => {
    try {
      const projectData = await fetchprojectdata(id);
      // console.log("the project data is ", projectData);
      navigate("/editor", { state: { projectdata: projectData } });
    } catch (err) {
      console.error("Error navigating to project:", err);
    }
  };

  const displayName = user?.firstname || user?.name || user?.email?.split('@')[0] || "User";

  return (
    <div className="relative min-h-screen select-none bg-[#02091B] px-5 pb-28 pt-6 font-sans text-slate-100 md:px-8 lg:px-12">
      <header className="mx-auto mb-8 flex max-w-[1440px] items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Workspace</p>
          <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">My Projects</h1>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-900/70 py-1.5 pl-1.5 pr-3 shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-slate-950">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="max-w-40 truncate text-sm font-semibold text-slate-200">{displayName}</p>
          </div>
        </div>
      </header>

      <FloatingDockDesktop
        visibleItems={{
          home: true,
          docs: true,
          team: true,
        }}
        variant="bottom"
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Modal>
          <ModalTrigger>
            <button type="button" className="group flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-500/35 bg-cyan-500/[0.04] px-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/70 hover:bg-cyan-500/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-400">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition-transform group-hover:scale-105">
                <TbPlus size={26} />
              </span>
              <span className="font-bold text-slate-100">Create Project</span>
              <span className="mt-1 text-sm text-slate-500">Start a new workspace</span>
            </button>
          </ModalTrigger>

          <ModalBody>
            <ModalContent>
              <h4 className="mb-8 text-center text-lg font-bold text-slate-100 md:text-2xl">
                Create a new project
              </h4>
              <ProjectFormContent fetchProjects={fetchProjects} />
            </ModalContent>
            <ModalFooter className="gap-4">
              <CancelButton />
            </ModalFooter>
          </ModalBody>
        </Modal>

        {projects?.map((item) => (
          <button
            type="button"
            onClick={() => handleProjectClick(item._id)}
            key={item._id}
            className="group min-h-52 w-full cursor-pointer rounded-2xl text-left outline-none"
          >
            <Card>
              <div className="flex h-full flex-col">
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description || "No description provided"}</CardDescription>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
};

// Form content component
const ProjectFormContent = ({ fetchProjects }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName === "" || projectDescription === "") {
      alert("Project name and description are required");
      return; // Don't close modal if validation fails
    }

    try {
      const res = await axios.post("/projects/create", {
        name: projectName,
        description: projectDescription,
      });
      console.log("Project created:", res.data);

      // Refresh the project list after creation
      await fetchProjects();

      // Reset form and close modal
      setProjectName("");
      setProjectDescription("");
      closeModal();
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Error creating project. Please try again.");
    }
  };

  return (
    <form className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <label
          htmlFor="projectName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project Name
        </label>
        <input
          id="projectName"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="flex w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-sm rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="projectDescription"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project Description
        </label>
        <motion.div
          style={{
            background:
              "radial-gradient(circle at var(--x) var(--y), var(--blue-500, rgb(59, 130, 246)), transparent 80%)",
          }}
          className="p-[2px] rounded-lg transition duration-300 group/textarea"
          whileHover={{
            "--x": "var(--mouse-x)",
            "--y": "var(--mouse-y)",
          }}
        >
          <textarea
            id="projectDescription"
            placeholder="Describe your project"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="flex w-full min-h-24 border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition duration-400 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            required
          />
        </motion.div>
      </div>

      <div className="flex justify-center pt-4">
        <motion.div
          className="relative inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70 blur-md"></span>
          <button
            type="button"
            onClick={handleSubmit}
            className="relative bg-slate-800 text-white py-2 px-6 rounded-lg font-medium"
          >
            Create Project
          </button>
        </motion.div>
      </div>
    </form>
  );
};

// Cancel button component
const CancelButton = () => {
  const { closeModal } = useModal();

  return (
    <GlowButton onClick={closeModal}>
      <span>Cancel</span>
    </GlowButton>
  );
};

// Previous project-card implementation and hover animation, retained for reference:
// const previousCardHoverAnimation = (
//   <AnimatePresence>
//     {hoveredIndex === index && (
//       <motion.span
//         className="absolute inset-0 h-full w-full rounded-3xl bg-slate-800/[0.8]"
//         layoutId="hoverBackground"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1, transition: { duration: 0.15 } }}
//         exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
//       />
//     )}
//   </AnimatePresence>
// );
//
// Previous card style: gray project cards with an overlaid hover background,
// a top-left Create Project glow button, and an irregular 2/6-column grid.

export const Card = ({ className, children }) => {
  return (
    <div
      className={`relative z-20 h-full min-h-52 w-full overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-[0_12px_35px_rgba(2,6,23,0.22)] transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-500/40 group-hover:bg-slate-900 group-hover:shadow-[0_18px_45px_rgba(8,145,178,0.12)] group-focus-visible:border-cyan-400/70 ${className}`}
    >
      <div className="relative z-50 h-full">{children}</div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={`font-bold tracking-wide text-cyan-300 ${className}`}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={`mt-3 line-clamp-3 leading-6 text-sm text-slate-400 ${className}`}
    >
      {children}
    </p>
  );
};
