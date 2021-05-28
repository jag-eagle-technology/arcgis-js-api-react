import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APIElevationProfile from "@arcgis/core/widgets/ElevationProfile";
import APIMapView from "@arcgis/core/views/MapView";
import APISceneView from "@arcgis/core/views/SceneView";

interface IElevationProfile {
    // map?: APIMap;
    view?: APIMapView | APISceneView;
    position?: __esri.UIAddPosition;
    // onSelectResult?: __esri.ElevationProfileSelectResultEventHandler;
    // setElevationProfile?: (elevationProfile: APIElevationProfile) => void;
    // elevationProfileDiv?: React.RefObject<HTMLDivElement>;
    // popupEnabled?: boolean;
}
const ElevationProfile: React.FC<IElevationProfile> = ({
    // map,
    view,
    position,
    // onSelectResult,
    // setElevationProfile,
    // elevationProfileDiv,
    // popupEnabled = true,
}) => {
    const elevationProfileDivRef = React.useRef<HTMLDivElement>(null);
    const initElevationProfile = () => {
        if (!view) {
            throw new Error("no view set for elevation profile component");
        }
        const elevationProfile = new APIElevationProfile({ view });
        if (position) {
            view.ui.add(elevationProfile, position);
        } else if (elevationProfileDivRef?.current) {
            elevationProfile.container = elevationProfileDivRef.current;
        }
        // } else {
        //     position
        //         ? mapView.ui.add(elevationProfile, position)
        //         : mapView.ui.add(elevationProfile);
        // }
        // onSelectResult && elevationProfile.on("select-result", onSelectResult);
        // setElevationProfile && setElevationProfile(elevationProfile);
    };
    useEffect(() => {
        if (view) {
            initElevationProfile();
        }
    }, [view]);
    return position ? (
        <></>
    ) : (
        <div
            style={{ width: "100%", height: "100%" }}
            ref={elevationProfileDivRef}
        ></div>
    );
};

export default ElevationProfile;
