import { Link } from "@tanstack/react-router";
import React from "react";

type CharacterCardProps = {
  charID: string;
  name: string;
  gender: string;
  species: string;
  image: string;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ charID, name, gender, species, image }) => (
  <Link
    to="/character/$characterId"
    params={{ characterId: String(charID) }}
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        width: "220px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "12px",
          border: "2px solid #cbd5e1",
        }}
      />
      <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>{name}</h3>
      <div style={{ fontSize: "0.95rem", color: "#475569" }}>
        <div>
          <strong>Gender:</strong> {gender}
        </div>
        <div>
          <strong>Species:</strong> {species}
        </div>
      </div>
    </div>
  </Link>
);

export default CharacterCard;