import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIFeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface IFeatureLayer {
    map?: APIMap;
    url: string;
    // optional function that will take the layer as an input for further usage
    setLayer?: (layer: APIFeatureLayer) => void;
    renderer?: __esri.RendererProperties;
}
const FeatureLayer: React.FC<IFeatureLayer> = ({
    map,
    url,
    setLayer,
    renderer,
}) => {
    const initFeatureLayer = () => {
        if (!map) {
            throw new Error("no map set on basemap component");
        }
        const featureLayer = new APIFeatureLayer({
            url,
            ...(renderer && {renderer: renderer}),
        });
        map.add(featureLayer);
        setLayer && setLayer(featureLayer);
    };
    useEffect(() => {
        if (map) {
            initFeatureLayer();
        }
    }, [map]);
    return <></>;
};

export default FeatureLayer;
