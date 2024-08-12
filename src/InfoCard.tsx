export function InfoCard({ destination, std, etd, platform }: Record<string, any>) {
  return (
    <div className="infoCard">
      <h2>{destination}</h2>
      <p>Departure: {std}</p>
      <div style={{ display: "inline" }}>
        {"Estimated departure: "}
        <p
          style={{
            ...(etd !== "On time"
              ? { color: "orangeRed", fontWeight: "bold", textDecoration: "underline" }
              : {}),
            display: "inline"
          }}
        >
          {etd}
        </p>
      </div>
      {platform && <p>Platform: {platform}</p>}
    </div>
  );
}
