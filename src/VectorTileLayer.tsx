import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIBasemap from "@arcgis/core/Basemap";
import APIVectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

interface IVectorTileLayer {
    map?: APIMap;
    basemap?: APIBasemap;
    basemapReference?: boolean;
    url?: string;
    portalItem?: __esri.PortalItem;
}
const VectorTileLayer: React.FC<IVectorTileLayer> = ({
    map,
    url,
    portalItem,
    basemap,
    basemapReference = false,
}) => {
    const VectorTileLayerRef = React.useRef<APIVectorTileLayer>();
    const initVectorTileLayer = () => {
        if (!map && !basemap) {
            throw new Error("no map set on basemap component");
        }
        VectorTileLayerRef.current = new APIVectorTileLayer({
            url,
            portalItem,
        });
        if (map) {
            map.layers.add(VectorTileLayerRef.current);
        } else if (basemap) {
            basemapReference
                ? basemap.referenceLayers.add(VectorTileLayerRef.current)
                : basemap.baseLayers.add(VectorTileLayerRef.current);
        }
        // map.add(featureLayer);
    };
    const removeVectorTileLayer = () => {
        if (VectorTileLayerRef.current) {
            VectorTileLayerRef.current.destroy();
            VectorTileLayerRef.current = undefined;
        }
    };
    useEffect(() => {
        if (map || basemap) {
            initVectorTileLayer();
        }
        return () => removeVectorTileLayer();
    }, [map, basemap, basemapReference, url, portalItem]);
    return <></>;
};

export default VectorTileLayer;
