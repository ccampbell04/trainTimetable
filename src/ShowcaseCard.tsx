export function ShowcaseCard({
  value,
  showcaseSubsequent
}: {
  value: Record<string, any>;
  showcaseSubsequent: string
}) {
  return (
    <div className="showcaseItem">
      <h2>{value.destination}</h2>
      <p>Departure: {value.std}</p>
      <div style={{ display: "inline" }}>
        {"Estimated departure: "}
        <p
          style={{
            ...(value.etd !== "On time"
              ? { color: "orangeRed", fontWeight: "bold", textDecoration: "underline" }
              : {}),
            display: "inline"
          }}
        >
          {value.etd}
        </p>
      </div>
      {value.platform && <p>Platform: {value.platform}</p>}
      {value.etd !== "Cancelled" && <div>{`Calling at: ${showcaseSubsequent}`}</div>}
    </div>
  );
}
