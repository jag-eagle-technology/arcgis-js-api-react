import React from "react";
import Map from "@arcgis/core/Map";
import Point from "@arcgis/core/geometry/Point";
import APISceneView from "@arcgis/core/views/SceneView";
import { whenTrue } from "@arcgis/core/core/watchUtils";
export type MapCenterLocation = {
    lat: number;
    lon: number;
    zoom: number;
};

interface ISceneView {
    center?: Point;
    zoom?: number;
    children?: React.ReactNode;
    onMapClick?: __esri.SceneViewClickEventHandler;
    setSceneView?: (sceneView: APISceneView) => void;
    camera?: __esri.Camera;
}

const SceneView: React.FC<ISceneView> = ({
    center,
    zoom,
    camera,
    children,
    onMapClick,
    setSceneView: setSceneViewProp,
}) => {
    const mapDivRef = React.useRef<HTMLDivElement>(null);
    const sceneViewRef = React.useRef<APISceneView>();
    const [sceneView, setSceneView] = React.useState<APISceneView>();
    const initSceneView = () => {
        if (!mapDivRef.current) {
            throw new Error("Map div is not defined");
        }
        if (sceneView) {
            sceneView.destroy();
            setSceneView(undefined);
        }
        const view = new APISceneView({
            // map: new Map(),
            container: mapDivRef.current,
            center: center || undefined,
            zoom: zoom || undefined,
            ...(camera && { camera }),
            spatialReference: {
                wkid: 2193,
            },
        });
        sceneViewRef.current = view;
        setSceneView(view);
        view.when(() => {
            center && (view.center = center);
            zoom && (view.zoom = zoom);
        });
        onMapClick && view.on("click", onMapClick);
        // add listener to update sceneView center
        // view.watch('stationary')
        whenTrue(view, "stationary", () => {
            // console.log('sceneView is stationary', sceneView.center, sceneView.zoom);

            if (view.zoom === -1) {
                return;
            }

            const centerLocation: MapCenterLocation = {
                lat:
                    view.center && view.center.latitude
                        ? +view.center.latitude.toFixed(3)
                        : 0,
                lon:
                    view.center && view.center.longitude
                        ? +view.center.longitude.toFixed(3)
                        : 0,
                zoom: view.zoom,
            };

            // updateMapLocation(centerLocation);
        });
    };
    React.useEffect(() => {
        initSceneView();
    }, []);
    React.useEffect(() => {
        setSceneViewProp && sceneView && setSceneViewProp(sceneView);
    }, [sceneView]);
    /*
    React.useEffect(() => {
        if (sceneView && center) {
            sceneView.center = center;
        }
    }, [sceneView, center]);
    */
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <div
                ref={mapDivRef}
                style={{ height: "100%", width: "100%" }}
            ></div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    view: sceneView,
                });
            })}
        </div>
    );
};

export default SceneView;
