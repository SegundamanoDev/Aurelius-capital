import Hero from "../../components/Hero";
import Features from "../../components/Features";
import About from "./About";
import Workflow from "../../components/Workflow";
import FinalCTA from "../../components/FinalCTA";
import Community from "../../components/Community";
import SecureConnection from "../../components/SecureConnection";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <SecureConnection />
      <Community />
      <Workflow />
      <FinalCTA />
    </div>
  );
};

export default Home;
