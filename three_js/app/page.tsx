"use client";

import React from "react";
import ThreeScene from "../components/ThreeScene";
import ManimScene from "../components/ManimScene"; // Make sure this component is created correctly

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div style={{ flex: 1, maxWidth: "25%" }}>
        <ThreeScene />
      </div>
      <div style={{ flex: 3 }}>
        {/* <ManimScene /> TODO: This still requires more stuff */}
      </div>
    </div>
  );
};

export default App;
