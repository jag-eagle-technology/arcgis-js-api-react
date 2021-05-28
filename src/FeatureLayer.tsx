import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIFeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface IFeatureLayer {
    map?: APIMap;
    url: string;
    // optional function that will take the layer as an input for further usage
    setLayer?: (layer: APIFeatureLayer) => void;
    renderer?: __esri.RendererProperties;
    id?: string;
    properties?: __esri.FeatureLayerProperties;
}
const FeatureLayer: React.FC<IFeatureLayer> = ({
    map,
    url,
    setLayer,
    renderer,
    id,
    properties,
}) => {
    const featureLayerRef = React.useRef<APIFeatureLayer>();
    const initFeatureLayer = () => {
        if (!map) {
            throw new Error("no map set on basemap component");
        }
        const featureLayer = new APIFeatureLayer({
            url,
            ...(renderer && { renderer }),
            ...(id && { id }),
            ...(properties && { properties }),
        });
        map.add(featureLayer);
        setLayer && setLayer(featureLayer);
    };
    const removeFeatureLayer = () => {
        if (featureLayerRef.current) {
            featureLayerRef.current.destroy();
            featureLayerRef.current = undefined;
        }
    };
    useEffect(() => {
        if (map) {
            initFeatureLayer();
        }
        return () => removeFeatureLayer();
    }, [map, url, setLayer, renderer, id, properties]);
    return <></>;
};

export default FeatureLayer;
