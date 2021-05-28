import React from "react";
import APIMap from "@arcgis/core/Map";
import APIMapView from "@arcgis/core/views/MapView";
interface IMap {
    mapView?: APIMapView;
    children?: React.ReactNode;
}
const Map: React.FC<IMap> = ({ mapView, children }) => {
    const mapRef = React.useRef<APIMap>();
    const [map, setMap] = React.useState<APIMap>();
    const initMap = () => {
        if (!mapView) {
            throw new Error("no mapview set for map component");
        }
        const map = new APIMap();
        mapRef.current = map;
        mapView.map = map;
        setMap(map);
    };
    React.useEffect(() => {
        if (mapView) {
            initMap();
        }
    }, [mapView]);
    return (
        <>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    mapView,
                    map,
                });
            })}
        </>
    );
};

export default Map;
