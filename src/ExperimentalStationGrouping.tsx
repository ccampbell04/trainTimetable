import { InfoCard } from "./InfoCard";
import { ShowcaseCard } from "./ShowcaseCard";

export function ExperimentalStationGrouping({
  stationData,
  stationName
}: {
  stationData: Record<string, any> | null | undefined;
  stationName: string;
}) {
  if (stationData && stationData.services) {
    const stationEntries = Object.entries(stationData.services);
    const showcase = stationEntries.slice(0, 2) as [string, Record<string, any>][];
    const infoGridEntries = stationEntries.slice(2, 10);
    const showcaseSubsequent = showcase.map(([key, value]) =>
      value.subsequentCallingPoints.join(", ")
    );

    let headerText = stationName;
    if (stationData.error) {
      headerText = headerText + " - Failed to load latest departure information";
    }

    return (
      <div style={{ height: "100%" }} key={stationName}>
        <h1>{headerText}</h1>
        <div className="grid">
          <div className="showcaseGrid">
            {showcase?.map(([key, value]: any) => (
              <ShowcaseCard value={value} showcaseSubsequent={showcaseSubsequent[key]} key={key} />
            ))}
          </div>
          <div className="infoGrid">
            {infoGridEntries?.map(([key, value]: any) => (
              <InfoCard {...value} key={key} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ height: "100%" }} key={stationName}>
        <h1>{stationName}</h1>
      </div>
    );
  }
}
