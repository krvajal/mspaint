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
  return <div style={styles.tool}>{icon}</div>;
};

const styles = {
  toolbox: {
    display: "flex",
    flexWrap: "wrap",
    width: 200,
    border: "1px solid blak"
  },
  tool: {
    width: 40,
    height: 40,
    border: "1px solid red"
  }
};

export default Toolbox;
