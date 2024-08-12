export function StationGrouping({
  stationData,
  stationName
}: {
  stationData: Record<string, any>;
  stationName: string;
}) {
  return (
    <>
      <h1>{stationName}</h1>
      <div className="grid">
        {stationData?.map((service: any) => (
          <div>
            <h2>{service.destination}</h2>
            <p>Departure: {service.std}</p>
            <div style={{ display: "inline" }}>
              {"Estimated departure: "}
              <p
                style={{
                  ...(service.etd !== "On time"
                    ? { color: "orangeRed", fontWeight: "bold", textDecoration: "underline" }
                    : {}),
                  display: "inline"
                }}
              >
                {service.etd}
              </p>
            </div>
            {service.platform && <p>Platform: {service.platform}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
