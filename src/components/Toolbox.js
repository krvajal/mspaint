import React from "react";

// some docs
// http://www.cs.uvm.edu/~rerickso/education/OLDpaint/
const tools = [
  {
    id: "ff_select",
    icon: "ff_select",
    tooltip: "Free Form Select"
  },
  {
    id: "select",
    icon: "select",
    tooltip: "Free Form Select"
  },
  {
    id: "eraser",
    icon: "eraser",
    tooltip: "Eraser/Color Eraser"
  },
  {
    id: "fill",
    icon: "fill",
    tooltip: "Fill with color"
  },
  {
    id: "pencil",
    icon: "pencil",
    tooltip: "Pencil"
  },
  {
    id: "brush",
    icon: "brush",
    tooltip: "Brush"
  },
  {
    id: "airbrush",
    icon: "airbrush",
    tooltip: "Airbrush"
  },
  {
    id: "text",
    icon: "text",
    tooltip: "Text"
  },
  {
    id: "line",
    icon: "line",
    tooltip: "Line"
  },
  {
    id: "curve",
    icon: "curve",
    tooltip: "Curve"
  }
];

const Toolbox = props => {
  return (
    <div style={styles.toolbox}>
      {tools.map(tool => (
        <Tool key={tool.id} {...tool} />
      ))}
    </div>
  );
};

const Tool = ({ icon, active, tooltip }) => {
  return <button style={styles.tool}>P</button>;
};

const styles = {
  toolbox: {
    width: 54,
    border: "1px solid black",
    backgroundColor: "#EFE7D6",
    padding: 4
  },
  tool: {
    width: 24,
    height: 24,
    margin: 0,
    backgroundColor: "#EFE7D6",
    boxShadow: "inset 1px 1px white, inset -1px -1px #848284",
    outline: "none",
    borderRight: "1px solid black",
    borderBottom: "1px solid black"
  }
};

export default Toolbox;
