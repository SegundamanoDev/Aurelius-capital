import Hero from "../../components/Hero";
import LogoTicker from "../../components/LogoTicker";
import Features from "../../components/Features";
import About from "./About";
import InvestmentPlans from "../../components/InvestmentPlans";
import Workflow from "../../components/Workflow";
import Affiliate from "../../components/Affiliate";
import FinalCTA from "../../components/FinalCTA";
import Overview from "../../components/Overview";
import Academy from "./Academy";

const Home = () => {
  return (
    <div>
      <Hero />
      <LogoTicker />
      <Overview />
      <Features />
      <About />
      <InvestmentPlans />
      <Workflow />
      <Academy />
      <Affiliate />
      <FinalCTA />
      {/* Next: About Section with image background */}
    </div>
  );
};

export default Home;
