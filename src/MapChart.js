import React, { memo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Annotation,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const markers = [
  {
    name: "United States of America",
    coordinates: [-93.26, 44.29],
  },
  {
    name: "Indonesia",
    coordinates: [110.26, -7.62],
  },
  {
    name: "France",
    coordinates: [6.11, 45.89],
  },
  {
    name: "Russia",
    coordinates: [70.78, 60.23],
  },
  {
    name: "Australia",
    coordinates: [135.3, -25.42],
  },
];

const MapChart = ({ setTooltipContent }) => {
  const [content, setContent] = useState("");

  return (
    <>
      <div
        className="App"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactTooltip>{content}</ReactTooltip>
        <div style={{ width: "1400px", borderStyle: "double" }}>
          <ComposableMap
            data-tip=""
            projectionConfig={{
              scale: 70,
              rotation: [-11, 0, 0],
            }}
            width={400}
            height={200}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography="/features.json" disableOptimization>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#D9D9D9"
                      onMouseEnter={() => {
                        const { name } = geo.properties;
                        setContent(`${name}`);
                      }}
                      onMouseLeave={() => {
                        setContent("");
                      }}
                      style={{
                        hover: {
                          fill: "#e4ecdc",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
              {markers.map(({ name, coordinates }) => (
                <Marker
                  key={name}
                  coordinates={coordinates}
                  onClick={() => {
                    setTooltipContent(`${name}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                >
                  <circle r={3} fill="#00623D"></circle>
                </Marker>
              ))}
              <Annotation fill ="#00623D" subject={[2.3522, 48.8566]} dx={0} dy={-30}>
                <text
                  x="-4"
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fill="#00623D"
                >
                  {"Country"}
                </text>
              </Annotation>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </>
  );
};

export default memo(MapChart);
