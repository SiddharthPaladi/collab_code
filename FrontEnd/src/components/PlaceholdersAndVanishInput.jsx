import React, { useState, useEffect, useRef } from "react";
import { TbSend } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

// Utility function for class name merging
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const PlaceholdersAndVanishInput = ({ value: externalValue, placeholders, onChange, onSubmit, onKeyDown }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState(externalValue || "");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  const intervalRef = useRef(null);
  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const inputRef = useRef(null);

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const draw = React.useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
      onSubmit && onSubmit(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    vanishAndSubmit();
  };

  const adjustHeight = (el) => {
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`; // Max height 200px
    }
  };

  return (
    <form
      className={cn(
        "w-full relative bg-slate-900/80 min-h-[52px] rounded-xl overflow-hidden border border-slate-700/70 shadow-inner transition duration-200",
        value && "border-cyan-700/50 bg-slate-900"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 origin-top-left filter invert-0 pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <textarea
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            adjustHeight(e.target);
            onChange && onChange(e);
          }
        }}
        onKeyDown={(e) => {
          if (onKeyDown) onKeyDown(e);
          if (e.key === "Enter" && !e.shiftKey && !animating && !e.defaultPrevented) {
            e.preventDefault();
            vanishAndSubmit();
          }
        }}
        ref={(el) => {
          inputRef.current = el;
          if (el && !value) {
            el.style.height = '52px'; // reset height when empty
          }
        }}
        value={value}
        rows={1}
        className={cn(
          "w-full relative text-sm z-50 border-none text-slate-100 bg-transparent min-h-[52px] max-h-[200px] resize-none focus:outline-none focus:ring-0 pl-4 pr-14 py-3.5 font-inter custom-scrollbar",
          animating && "text-transparent"
        )}
      />
      <button
        disabled={!value}
        type="submit"
        className="absolute right-2.5 bottom-2.5 z-50 h-9 w-9 rounded-lg disabled:bg-slate-800 disabled:border disabled:border-slate-700 bg-cyan-500 text-slate-950 disabled:text-slate-600 disabled:opacity-60 transition duration-200 flex items-center justify-center hover:bg-cyan-400"
      >
        <TbSend className="h-4 w-4" />
      </button>
      <div className="absolute inset-0 flex items-center h-[52px] rounded-xl pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{ y: 5, opacity: 0 }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              className="text-slate-500 text-sm font-inter pl-4 text-left w-[calc(100%-4rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default PlaceholdersAndVanishInput;