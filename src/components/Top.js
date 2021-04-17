import React from "react";

export default function Top() {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "rgb(40,44,53)",
        textAlign: "center",
        color: "white",
      }}
    >
      <ul
        style={{
          color: "white",
          listStyle: "none",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <li>Annies' Online Mall</li>

        <li>Phone</li>
      </ul>
    </div>
  );
}
