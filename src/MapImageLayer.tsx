import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIBasemap from "@arcgis/core/Basemap";
import APIMapImageLayer from "@arcgis/core/layers/MapImageLayer";

interface IMapImageLayer {
    map?: APIMap;
    basemap?: APIBasemap;
    basemapReference?: boolean;
    url?: string;
    portalItem?: __esri.PortalItem;
}
const MapImageLayer: React.FC<IMapImageLayer> = ({
    map,
    url,
    portalItem,
    basemap,
    basemapReference = false,
}) => {
    const MapImageLayerRef = React.useRef<APIMapImageLayer>();
    const initMapImageLayer = () => {
        if (!map && !basemap) {
            throw new Error("no map set on basemap component");
        }
        MapImageLayerRef.current = new APIMapImageLayer({
            url,
            portalItem,
        });
        if (map) {
            map.layers.add(MapImageLayerRef.current);
        } else if (basemap) {
            basemapReference
                ? basemap.referenceLayers.add(MapImageLayerRef.current)
                : basemap.baseLayers.add(MapImageLayerRef.current);
        }
        // map.add(featureLayer);
    };
    const removeMapImageLayer = () => {
        if (MapImageLayerRef.current) {
            MapImageLayerRef.current.destroy();
            MapImageLayerRef.current = undefined;
        }
    };
    useEffect(() => {
        if (map || basemap) {
            initMapImageLayer();
        }
        return () => removeMapImageLayer();
    }, [map, basemap, basemapReference, url, portalItem]);
    return <></>;
};

export default MapImageLayer;
