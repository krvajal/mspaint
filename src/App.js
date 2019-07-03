import React from "react";
import CanvasContainer from "./components/CanvasContainer";
import Toolbox from "./components/Toolbox";

import "./styles.css";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Toolbox />
      <CanvasContainer />
    </div>
  );
}

export default App;
