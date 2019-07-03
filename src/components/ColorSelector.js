import React from "react";

const colors = {
  cssColors: [
    "Black",
    "DarkGrey",
    "DarkRed",
    "Olive",
    "Green",
    "SteelBlue",
    "DarkBlue",
    "Purple",
    "DarkKhaki",
    "LightGreen",
    "RoyalBlue",
    "Indigo",
    "Navy",
    "Saddlebrown",
    "White",
    "LightGrey",
    "Red",
    "Yellow",
    "Lime",
    "Skyblue",
    "Blue",
    "Violet",
    "Khaki",
    "LawnGreen",
    "Skyblue",
    "DarkViolet",
    "Fuchsia",
    "Chocolate"
  ]
};

const ColorSelector = () => {
  let items = [];

  for (let i = 0; i < colors.cssColors.length; i++) {
    let cssColor = {
      backgroundColor: colors.cssColors[i],
      width: 20,
      height: 20,
      border: "1px solid gray"
    };
    items.push(<div key={i} style={cssColor} />);
  }

  return <div style={styles.colorbox}>{items}</div>;
};

const styles = {
  colorbox: {
    display: "flex",
    flexWrap: "wrap",
    width: 308,
    border: "1px solid black"
  }
};

export default ColorSelector;
