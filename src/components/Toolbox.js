import React from "react";

const tools = [
  {
    id: "pencil",
    icon: "pencil",
    active: true,
    tooltip: "Pencil"
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
    display: "flex",
    flexWrap: "wrap",
    width: 50,
    border: "1px solid black",
    backgroundColor: "#EFE7D6",
    padding: 4,
  },
  tool: {
    width: 20,
    height: 20,
  }
};

export default Toolbox;
