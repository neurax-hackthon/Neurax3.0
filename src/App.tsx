import { useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/gsap";
import IntroScreen from "./components/IntroScreen";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import LiveTimer from "./components/LiveTimer";
import NeuralNetworkSection from "./components/NeuralNetworkSection";
import AboutNeurax from "./components/AboutNeurax";
import ThemeNetwork from "./components/ThemeNetwork";
import Process from "./components/Process";
import ScheduleTimeline from "./components/ScheduleTimeline";
import Benefits from "./components/Benefits";
import Rules from "./components/Rules";
import PreviousHackathons from "./components/PreviousHackathons";
import Winners from "./components/Winners";
import Gallery from "./components/Gallery";
import FAQSupport from "./components/FAQSupport";
import SponsorsPartners from "./components/SponsorsPartners";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import GiftUnwrap from "./components/GiftUnwrap";

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [giftMode, setGiftMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("gift");
  });

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    if (introDone) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [introDone]);

  return (
    <div className="grain">
      {/* Gift inauguration mode — curtain overlay on top of IntroScreen */}
      {giftMode && (
        <GiftUnwrap
          onDismiss={() => {
            // Remove ?gift from URL and remove the curtain overlay
            window.history.replaceState({}, "", window.location.pathname);
            setGiftMode(false);
          }}
        />
      )}

      {!introDone && <IntroScreen onEnter={() => setIntroDone(true)} />}

      <div id="top" />
      <Navigation />
      <ScrollProgress />

      <main>
        <NeuralNetworkSection />
        <LiveTimer />
        <AboutNeurax />
        <ThemeNetwork />
        <Process />
        <ScheduleTimeline />
        <Benefits />
        <Rules />
        <PreviousHackathons />
        <Winners />
        <Gallery />
        <FAQSupport />
        <SponsorsPartners />
        <FinalCTA />
      </main>

      <Footer />
      <AdminPanel />
    </div>
  );
}

export default App;
