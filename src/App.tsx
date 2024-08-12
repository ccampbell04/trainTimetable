import { useEffect, useState } from "react";
import "./App.css";
import { ExperimentalStationGrouping } from "./ExperimentalStationGrouping";

function formatTrainServices(trainServices: any) {
  return trainServices.map((service: any) => {
    let destination;
    if (service.destination[0].via) {
      destination = `${service.destination[0].locationName} ${service.destination[0].via}`;
    } else {
      destination = service.destination[0].locationName;
    }
    const std = service.std;
    const etd = service.etd;
    const platform = service.platform;
    const subsequentCallingPoints = service.subsequentCallingPoints[0].callingPoint
      .map((callingPoint: any) => {
        if (!callingPoint.isCancelled) {
          return callingPoint.locationName;
        }
        return undefined;
      })
      .filter((callingPoint: any) => callingPoint !== undefined);

    return {
      destination,
      std,
      etd,
      platform,
      subsequentCallingPoints
    };
  });
}

function App() {
  const [topRailData, setTopRailData] = useState<Record<string, any>>();
  const [bottomRailData, setBottomRailData] = useState<Record<string, any>>();
  const [stationDetails, setStationDetails] = useState({
    topStation: { stationCode: "GLC", timeOffset: "5" },
    bottomStation: { stationCode: "GLQ", timeOffset: "12" }
  });

  const API_GLC_URL = `https://api1.raildata.org.uk/1010-live-departure-board-dep/LDBWS/api/20220120/GetDepBoardWithDetails/${stationDetails.topStation.stationCode}?timeOffset=${stationDetails.topStation.timeOffset}`;
  const API_GLQ_URL = `https://api1.raildata.org.uk/1010-live-departure-board-dep/LDBWS/api/20220120/GetDepBoardWithDetails/${stationDetails.bottomStation.stationCode}?timeOffset=${stationDetails.bottomStation.timeOffset}`;
  const CONSUMER_KEY = "PmpQmXOVguMaXaeEYCmQb713rMvBAjVyqREX5G09ET2Jz9WA";

  console.log(process.env.REACT_APP_API_KEY)

  function fetchPageData() {
    fetch(API_GLC_URL, {
      method: "GET",
      headers: {
        "x-apikey": CONSUMER_KEY
      }
    })
      .then((response) => response.json())
      .then((data) =>
        setTopRailData({ services: formatTrainServices(data.trainServices), error: false })
      )
      .catch(() =>
        setTopRailData((prevRailData) => {
          return { ...prevRailData, error: true };
        })
      );

    fetch(API_GLQ_URL, {
      method: "GET",
      headers: {
        "x-apikey": CONSUMER_KEY
      }
    })
      .then((response) => response.json())
      .then((data) =>
        setBottomRailData({ services: formatTrainServices(data.trainServices), error: false })
      )
      .catch(() =>
        setBottomRailData((prevRailData) => {
          return { ...prevRailData, error: true };
        })
      );
  }

  useEffect(() => {
    fetchPageData();
    const interval = setInterval(() => {
      fetchPageData();
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationDetails]);

  return (
    <>
      <div className="App">
        <div className="top">
          <ExperimentalStationGrouping stationData={topRailData} stationName="Glasgow Central" />
        </div>
        <div className="bottom">
          <ExperimentalStationGrouping
            stationData={bottomRailData}
            stationName="Glasgow Queen Street"
          />
        </div>
      </div>
    </>
  );
}

export default App;
