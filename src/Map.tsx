import React from "react";
import APIMap from "@arcgis/core/Map";
import APIMapView from "@arcgis/core/views/MapView";
interface IMap {
    view?: APIMapView;
    children?: React.ReactNode;
}
const Map: React.FC<IMap> = ({ view, children }) => {
    const mapRef = React.useRef<APIMap>();
    const [map, setMap] = React.useState<APIMap>();
    const initMap = () => {
        if (!view) {
            throw new Error("no mapview set for map component");
        }
        const map = new APIMap();
        mapRef.current = map;
        view.map = map;
        setMap(map);
    };
    React.useEffect(() => {
        if (view) {
            initMap();
        }
    }, [view]);
    return (
        <>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    mapView: view,
                    map,
                });
            })}
        </>
    );
};

export default Map;
