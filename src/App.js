import React from "react";
import Canvas from "./components/Canvas";
import Toolbox from "./components/Toolbox";
import Colorbox from "./components/Colorbox";

import "./styles.css";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toolbox />
      <Canvas />
      <Colorbox />
    </div>
  );
}

export default App;
