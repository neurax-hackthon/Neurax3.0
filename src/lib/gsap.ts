import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function scrollToTarget(target: string | number) {
  gsap.to(window, {
    duration: 1.1,
    scrollTo: { y: target, autoKill: false },
    ease: "power2.inOut",
  });
}

export { gsap, ScrollTrigger };
