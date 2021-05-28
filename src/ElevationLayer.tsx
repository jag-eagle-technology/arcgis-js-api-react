import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIBasemap from "@arcgis/core/Basemap";
import APIElevationLayer from "@arcgis/core/layers/ElevationLayer";

interface IElevationLayer {
    map?: APIMap;
    basemap?: APIBasemap;
    basemapReference?: boolean;
    url?: string;
    portalItem?: __esri.PortalItem;
}
const ElevationLayer: React.FC<IElevationLayer> = ({
    map,
    url,
    portalItem,
}) => {
    const elevationLayerRef = React.useRef<APIElevationLayer>();
    const initElevationLayer = () => {
        if (!map) {
            throw new Error("no map set on basemap component");
        }
        elevationLayerRef.current = new APIElevationLayer({
            url,
            portalItem,
        });

        map.ground.layers.add(elevationLayerRef.current);
    };
    const removeElevationLayer = () => {
        if (elevationLayerRef.current) {
            elevationLayerRef.current.destroy();
            elevationLayerRef.current = undefined;
        }
    };
    useEffect(() => {
        if (map) {
            initElevationLayer();
        }
        return () => removeElevationLayer();
    }, [map, url, portalItem]);
    return <></>;
};

export default ElevationLayer;
