import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APILocate from "@arcgis/core/widgets/Locate";
import APIMapView from "@arcgis/core/views/MapView";
// import Locate from "@arcgis/core/widgets/Locate";

interface ILocate {
    map?: APIMap;
    mapView?: APIMapView;
    position?: __esri.UIAddPosition;
    onLocate?: __esri.LocateLocateEventHandler;
    setLocate?: (locate: APILocate) => void;
}
const Locate: React.FC<ILocate> = ({
    map,
    mapView,
    position,
    onLocate,
    setLocate,
}) => {
    // stick in a couple of refs to track locate and locate event handler
    const initLocate = () => {
        if (!mapView) {
            throw new Error("no mapView set for locate component");
        }
        const locate = new APILocate({ view: mapView });
        mapView.ui.add(locate, position);
        onLocate && locate.on("locate", onLocate);
        setLocate && setLocate(locate);
    };
    useEffect(() => {
        if (mapView) {
            initLocate();
        }
    }, [mapView]);
    return <></>;
};

export default Locate;
