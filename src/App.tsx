import { useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/gsap";
import IntroScreen from "./components/IntroScreen";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import LiveTimer from "./components/LiveTimer";
import CinematicReel from "./components/CinematicReel";
import ThemeNetwork from "./components/ThemeNetwork";
import ScheduleTimeline from "./components/ScheduleTimeline";
import Rules from "./components/Rules";
import PreviousHackathons from "./components/PreviousHackathons";
import Winners from "./components/Winners";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    if (introDone) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [introDone]);

  return (
    <div className="grain">
      {!introDone && <IntroScreen onEnter={() => setIntroDone(true)} />}

      <div id="top" />
      <Navigation />
      <ScrollProgress />

      <main>
        <LiveTimer />
        <section id="about">
          <CinematicReel />
        </section>
        <ThemeNetwork />
        <ScheduleTimeline />
        <Rules />
        <PreviousHackathons />
        <Winners />
        <FinalCTA />
      </main>

      <Footer />
      <AdminPanel />
    </div>
  );
}

export default App;
