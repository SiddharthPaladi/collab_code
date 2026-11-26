import React, { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TiHome } from "react-icons/ti";
import { GrProjects } from "react-icons/gr";
import {
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "../lib/utils";
import { LogIn, LogOut, FileText, Users } from "lucide-react";
// import { UserPlus } from "lucide-react";
import { UserContext } from "../context/Usercontext.jsx";
// import { Link } from "react-router-dom";
// import { Github } from "lucide-react";

const FloatingDockDesktop = ({ className, visibleItems = {}, variant = "bottom" }) => {
  const mouseX = useMotionValue(Infinity);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const allItems = [
    {
      key: "login",
      title: "Sign In",
      icon: <LogIn />,
      path: "/login",
      isExternal: false,
    },
    // { key: "signup", title: "Sign Up", icon: <UserPlus />, path: "/signup", isExternal: false },
    {
      key: "logout",
      title: "Log Out",
      icon: <LogOut />,
      path: null,
      isExternal: false,
    },
    {
      key: "home",
      title: "Home",
      icon: <TiHome size={32} />,
      path: "/",
      isExternal: false,
    },
    {
      key: "projects",
      title: "projects",
      icon: <GrProjects />,
      path: "/projects",
      isExternal: false,
    },
    {
      key: "docs",
      title: "Documentation",
      icon: <FileText />,       
      path: "/documentation",
      isExternal: false,
    },
    {
      key: "team",
      title: "Team",
      icon: <Users />,
      path: "/developers",
      isExternal: false,
    },
  ];

  // Guests get one sign-in entry; authenticated users get Log Out instead.
  const filteredItems = allItems.filter((item) => {
    if (item.key === "logout") return Boolean(user);
    if (item.key === "projects") return Boolean(user);
    if (item.key === "login" || item.key === "signup") {
      return !user && (visibleItems.login || visibleItems.signup);
    }
    return visibleItems[item.key];
  });

  const variantClasses = {
    bottom: "fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 md:bottom-7",
    "top-right": "fixed top-5 right-5 z-[60]",
    minimal: "fixed top-5 left-5 z-[60]",
  };

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-14 max-w-[calc(100vw-2rem)] gap-2 items-end rounded-2xl border border-slate-700/60 bg-slate-950/90 px-3 pb-2.5 shadow-2xl backdrop-blur-md sm:h-16 sm:gap-3 sm:px-4 sm:pb-3",
        variantClasses[variant] || variantClasses.bottom,
        className
      )}
    >
      {filteredItems.map(({ key, ...item }) => (
        <IconContainer
          key={key}
          mouseX={mouseX}
          {...item}
          navigate={navigate}
          onLogout={handleLogout}
          active={item.path === location.pathname}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, path, isExternal, navigate, onLogout, active }) {
  let ref = useRef(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 44 };
    return value - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [44, 76, 44]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [44, 76, 44]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const iconWidth = useSpring(
    useTransform(distance, [-150, 0, 150], [22, 38, 22]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );
  const iconHeight = useSpring(
    useTransform(distance, [-150, 0, 150], [22, 38, 22]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e?.preventDefault?.();
    if (title === "Log Out") {
      onLogout();
    } else if (!isExternal) {
      navigate(path);
    }
  };

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={title}
      aria-current={active ? "page" : undefined}
      title={title}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick(event);
        }
      }}
      className={`aspect-square rounded-full border shadow-inner flex items-center justify-center relative cursor-pointer transition-colors hover:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
        active
          ? "bg-cyan-500/20 border-cyan-400/70 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
          : "bg-slate-800 border-slate-700/70 text-gray-200"
      }`}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-800 border border-gray-600 text-white absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: iconWidth, height: iconHeight }}
        className="flex items-center justify-center"
      >
        {isExternal ? (
          <a 
            href={path} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {icon}
          </a>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            {icon}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default FloatingDockDesktop;
