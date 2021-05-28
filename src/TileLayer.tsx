import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIBasemap from "@arcgis/core/Basemap";
import APITileLayer from "@arcgis/core/layers/TileLayer";

interface ITileLayer {
    map?: APIMap;
    basemap?: APIBasemap;
    basemapReference?: boolean;
    url?: string;
    portalItem?: __esri.PortalItem;
}
const TileLayer: React.FC<ITileLayer> = ({
    map,
    url,
    portalItem,
    basemap,
    basemapReference = false,
}) => {
    const TileLayerRef = React.useRef<APITileLayer>();
    const initTileLayer = () => {
        if (!map && !basemap) {
            throw new Error("no map set on basemap component");
        }
        TileLayerRef.current = new APITileLayer({
            url,
            portalItem,
        });
        if (map) {
            map.layers.add(TileLayerRef.current);
        } else if (basemap) {
            basemapReference
                ? basemap.referenceLayers.add(TileLayerRef.current)
                : basemap.baseLayers.add(TileLayerRef.current);
        }
        // map.add(featureLayer);
    };
    const removeTileLayer = () => {
        if (TileLayerRef.current) {
            TileLayerRef.current.destroy();
            TileLayerRef.current = undefined;
        }
    };
    useEffect(() => {
        if (map || basemap) {
            initTileLayer();
        }
        return () => removeTileLayer();
    }, [map, basemap, basemapReference, url, portalItem]);
    return <></>;
};

export default TileLayer;
