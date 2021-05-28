import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MapView, Map, Basemap } from "arcgis-js-api-react";

const App: React.FC = () => {
  return (
    <div style={{ height: "400px", width: "600px" }}>
      <MapView>
        <Map>
          <Basemap></Basemap>
        </Map>
      </MapView>
    </div>
  );
};

export default App;
