import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";

// AnimatedLetters component for letter-by-letter animation
const AnimatedLetters = ({ text }) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
        exit: {
          transition: {
            staggerChildren: 0.03,
            staggerDirection: -1,
          },
        },
      }}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
          }}
          transition={{ duration: 0.3 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  const phrases = ["Dinesh", "Full Stack Developer", "Problem Solver"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showDuration = 1800; // Visible duration
    const totalCycle = 2500;   // Total time before next word

    const showTimeout = setTimeout(() => setVisible(false), showDuration);

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      setVisible(true);
      setTimeout(() => setVisible(false), showDuration);
    }, totalCycle);

    return () => {
      clearTimeout(showTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 sm:px-16 flex flex-col justify-center items-center sm:items-start gap-5`}
      >
        <div className="flex flex-col items-center sm:items-start w-full text-center sm:text-left">
          <h1
            className={`${styles.heroHeadText} text-white leading-tight break-words max-w-[90vw]`}
          >
            Hi, I'm&nbsp;
            <span className="text-[#915eff] inline-block">
              <AnimatePresence mode="wait">
                {visible && (
                  <AnimatedLetters key={phrases[index]} text={phrases[index]} />
                )}
              </AnimatePresence>
            </span>
          </h1>

          <p
            className={`${styles.heroSubText} mt-4 text-white-100 max-w-[90vw] sm:max-w-[600px] break-words`}
          >
            I build efficient, user-friendly applications that solve real-world
            problems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
