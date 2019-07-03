import React from "react";

const paletteColors = [
  "#000000",
  "#848484",
  "#901002",
  "#838300",
  "#018801",
  "#028282",
  "#01178B",

  "#861D87",
  "#83823D",
  "#063F4A",
  "#0686FF",
  "#023984",
  "#8636FF",
  "#914A0F",
  "#ffffff",
  "#BFBDB8",
  "#F82406",
  "#FDFB03",
  "#03F803",
  "#02FBFB",
  "#0432FD",
  "#FD40FD",
  "#FEF88A",
  "#08FA83",
  "#87FCFF",
  "#8583FD",
  "#FF2D84",
  "#FC883F"
];

const ColorPalette = () => {
  return (
    <div style={styles.palette}>
      {paletteColors.map(color => (
        <ColorButton color={color} key={color} />
      ))}
    </div>
  );
};

export default ColorPalette;

const ColorButton = ({ color }) => {
  return (
    <button
      type="button"
      style={{ ...styles.button, backgroundColor: color }}
    />
  );
};

const styles = {
  palette: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#EFE7D6",
    padding: 4
  },
  button: {
    margin: 1,
    width: 20,
    height: 20,
    boxShadow: "inset 1px 1px black"
  }
};
