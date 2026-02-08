import Hero from "../../components/Hero";
import Features from "../../components/Features";
import About from "./About";
import Workflow from "../../components/Workflow";
import Affiliate from "../../components/Affiliate";
import FinalCTA from "../../components/FinalCTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Workflow />
      <Affiliate />
      <FinalCTA />
    </div>
  );
};

export default Home;
