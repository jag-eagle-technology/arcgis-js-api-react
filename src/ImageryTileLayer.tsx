import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIBasemap from "@arcgis/core/Basemap";
import APIImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";

interface IImageryTileLayer {
    map?: APIMap;
    basemap?: APIBasemap;
    basemapReference?: boolean;
    url?: string;
    portalItem?: __esri.PortalItem;
}
const ImageryTileLayer: React.FC<IImageryTileLayer> = ({
    map,
    url,
    portalItem,
    basemap,
    basemapReference = false,
}) => {
    const ImageryTileLayerRef = React.useRef<APIImageryTileLayer>();
    const initImageryTileLayer = () => {
        if (!map && !basemap) {
            throw new Error("no map set on basemap component");
        }
        ImageryTileLayerRef.current = new APIImageryTileLayer({
            url,
            portalItem,
        });
        if (map) {
            map.layers.add(ImageryTileLayerRef.current);
        } else if (basemap) {
            basemapReference
                ? basemap.referenceLayers.add(ImageryTileLayerRef.current)
                : basemap.baseLayers.add(ImageryTileLayerRef.current);
        }
        // map.add(featureLayer);
    };
    const removeImageryTileLayer = () => {
        if (ImageryTileLayerRef.current) {
            ImageryTileLayerRef.current.destroy();
            ImageryTileLayerRef.current = undefined;
        }
    };
    useEffect(() => {
        if (map || basemap) {
            initImageryTileLayer();
        }
        return () => removeImageryTileLayer();
    }, [map, basemap, basemapReference, url, portalItem]);
    return <></>;
};

export default ImageryTileLayer;
