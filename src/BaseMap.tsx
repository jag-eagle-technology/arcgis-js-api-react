import React, { useEffect } from "react";
import APIMapView from "@arcgis/core/views/MapView";
import APIMap from "@arcgis/core/Map";
import APIBasemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

interface IBasemap {
    map?: APIMap;
}
const Basemap: React.FC<IBasemap> = ({ map }) => {
    const initBasemap = () => {
        if (!map) {
            throw new Error("no map set on basemap component");
        }
        const nzLightGreyVector = new VectorTileLayer({
            portalItem: {
                id: "fed71141e42a45c49dabb30a4c2903e1",
            },
        });
        const basemap = new APIBasemap({
            baseLayers: [nzLightGreyVector],
        });
        map.basemap = basemap;
    };
    useEffect(() => {
        if (map) {
            initBasemap();
        }
    }, [map]);
    return <></>;
};

export default Basemap;
