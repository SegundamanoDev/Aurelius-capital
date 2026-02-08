import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => (
  <div className="bg-[#05070A] min-h-screen font-sans selection:bg-sky-500/30">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
