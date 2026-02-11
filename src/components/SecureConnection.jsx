import React from "react";

const SecureConnection = () => {
  return (
    <div className="flex flex-col bg-[rgb(0,0,0)] items-center justify-center w-full py-20 px-6">
      {/* 1. Text Header Section */}
      <div className="max-w-2xl text-center mb-12">
        <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
          Secure connection method
        </h3>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
          Your credentials for the broker account are safe stored locally in
          your browser and{" "}
          <span className="text-white">never on our servers.</span>
        </p>
      </div>

      {/* 2. Image Wrapper with Protective Styling */}
      <div className="wrapper-jc85Uhcq image-q6Knz4kN cardImage-HJmK9HcF relative group">
        {/* Soft green glow to indicate "Safe/Secure" */}
        <div className="absolute inset-0 rounded-full pointer-events-none" />

        <div className="relative p-8 md:p-12 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
          <img
            role="presentation"
            src="https://static.tradingview.com/static/bundles/secure-connection.9ca541d1c174940add56.svg"
            className="img-jc85Uhcq w-full max-w-[900px] h-auto object-contain"
            alt="Secure Connection Graphic"
          />
        </div>
      </div>
    </div>
  );
};

export default SecureConnection;
