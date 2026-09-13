"use client";

import { LottieAnimation, MotionStagger, MotionStaggerItem } from "@spinwheels/ui";
import { marketingLotties } from "../lottie/assets";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { howSteps } from "../data/content";

export function HowItWorksSteps() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const step = howSteps[active];
  const stepLottie =
    marketingLotties.howSteps[step.title as keyof typeof marketingLotties.howSteps];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % howSteps.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <div className="how-interactive">
      <MotionStagger className="how-steps">
        {howSteps.flatMap((item, index) => {
          const nodes = [];
          if (index > 0) {
            nodes.push(
              <motion.div
                key={`arrow-${item.title}`}
                className="how-arrow"
                animate={{ x: active >= index ? [0, 4, 0] : 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.div>,
            );
          }
          nodes.push(
            <MotionStaggerItem key={item.title} className="how-step-wrap">
              <motion.button
                type="button"
                className={`how-step how-step-btn${active === index ? " is-active" : ""}`}
                onClick={() => setActive(index)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  scale: active === index ? 1.04 : 1,
                  opacity: active === index ? 1 : 0.82,
                }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                aria-pressed={active === index}
              >
                <motion.div
                  className="how-icon"
                  animate={active === index ? { scale: [1, 1.15, 1], rotate: [0, -6, 0] } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.button>
            </MotionStaggerItem>,
          );
          return nodes;
        })}
      </MotionStagger>

      <div className="how-step-progress">
        {howSteps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`how-step-dot${active === index ? " is-active" : ""}`}
            aria-label={`Show step ${index + 1}: ${item.title}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step.title}
          className="how-step-detail"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="how-step-detail-grid">
            <div>
              <p className="how-step-detail-kicker">
                Step {active + 1} of {howSteps.length}
              </p>
              <h3>
                {step.icon} {step.title}
              </h3>
              <p>{step.description}</p>
            </div>
            {stepLottie ? (
              <LottieAnimation
                key={stepLottie}
                className="how-step-lottie"
                src={stepLottie}
                ariaLabel={`${step.title} step illustration`}
              />
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
