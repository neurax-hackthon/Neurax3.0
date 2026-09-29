import WinnersHero from "./WinnersHero";
import Gallery from "./Gallery";
import FAQSupport from "./FAQSupport";
import SponsorsPartners from "./SponsorsPartners";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import AdminPanel from "./AdminPanel";
import Navigation from "./Navigation";
import ScrollProgress from "./ScrollProgress";
import AboutNeurax from "./AboutNeurax";
import ThemeNetwork from "./ThemeNetwork";
import Process from "./Process";
import RoundDetails from "./RoundDetails";
import ScheduleTimeline from "./ScheduleTimeline";
import Benefits from "./Benefits";
import Rules from "./Rules";
import PreviousHackathons from "./PreviousHackathons";

export default function FinishedHackathonView() {
  return (
    <>
      <div id="top" />
      <Navigation />
      <ScrollProgress />

      <main>
        {/* ── New landing hero: Winners showcase ── */}
        <WinnersHero />

        {/* ── Original page sections in same order ── */}
        <AboutNeurax />
        <ThemeNetwork />
        <Process />
        <RoundDetails />
        <ScheduleTimeline />
        <Benefits />
        <Rules />
        <PreviousHackathons />
        <Gallery />
        <FAQSupport />
        <SponsorsPartners />
        <FinalCTA />
      </main>

      <Footer />
      <AdminPanel />
    </>
  );
}
