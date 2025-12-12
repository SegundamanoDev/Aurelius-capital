import React from "react";
import Header from "./Header";
import Footer from "./Footer";

// Define the main content container style
const contentClasses = "min-h-screen pt-20";

// This component wraps the content of every route
const Layout = ({ children }) => {
  return (
    <div className="bg-navy-bg text-slate-light font-mono antialiased">
      <Header />
      <main className={contentClasses}>
        {/* The current page component (Home, About, Projects, etc.) will be rendered here */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
