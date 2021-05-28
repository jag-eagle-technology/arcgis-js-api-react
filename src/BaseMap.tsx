import React, { useEffect } from "react";
import APIMapView from "@arcgis/core/views/MapView";
import APIMap from "@arcgis/core/Map";
import APIBasemap from "@arcgis/core/Basemap";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";

interface IBasemap {
    map?: APIMap;
    children?: React.ReactNode;
}
const Basemap: React.FC<IBasemap> = ({ map, children }) => {
    const basemapRef = React.useRef<APIBasemap>();
    const [basemap, setBasemap] = React.useState<APIBasemap>();
    const initBasemap = () => {
        if (!map) {
            throw new Error("no map set on basemap component");
        }
        // const nzLightGreyVector = new VectorTileLayer({
        //     portalItem: {
        //         id: "fed71141e42a45c49dabb30a4c2903e1",
        //     },
        // });
        basemapRef.current = new APIBasemap({
            baseLayers: [],
            // baseLayers: [nzLightGreyVector],
        });
        map.basemap = basemapRef.current;
        setBasemap(basemapRef.current);
    };
    useEffect(() => {
        if (map) {
            initBasemap();
        }
    }, [map]);
    return (
        <>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    basemap: basemap,
                });
            })}
        </>
    );
};

export default Basemap;
