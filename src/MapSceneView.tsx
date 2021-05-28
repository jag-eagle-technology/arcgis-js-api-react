import React, { version } from "react";
import Point from "@arcgis/core/geometry/Point";
import APIMapView from "@arcgis/core/views/MapView";
import APISceneView from "@arcgis/core/views/SceneView";
import { whenTrue } from "@arcgis/core/core/watchUtils";
export type MapCenterLocation = {
    lat: number;
    lon: number;
    zoom: number;
};

interface IMapSceneView {
    center?: Point;
    zoom?: number;
    children?: React.ReactNode;
    onMapClick?: __esri.MapViewClickEventHandler;
    type?: "2d" | "3d";
}

const MapSceneView: React.FC<IMapSceneView> = ({
    center: centerProp,
    zoom: zoomProp,
    children,
    onMapClick,
    type = "2d",
}) => {
    // so all we need to do is track the view zoom and center and then remap children to the new map or scene view
    // watch utils
    const [center, setCenter] = React.useState<Point>();
    const [zoom, setZoom] = React.useState<number>();
    const viewDivRef = React.useRef<HTMLDivElement>(null);
    const viewRef = React.useRef<APIMapView | APISceneView>();
    const [view, setView] = React.useState<APIMapView | APISceneView>();
    const initMapView = () => {
        if (!viewDivRef.current) {
            throw new Error("Map div is not defined");
        }
        if (view) {
            view.destroy();
            setView(undefined);
        }
        const viewDetails = {
            // map: new Map(),
            container: viewDivRef.current,
            center: centerProp || undefined,
            zoom: zoomProp || undefined,
            spatialReference: {
                wkid: 2193,
            },
        };
        if (type == "2d") {
            viewRef.current = new APIMapView(viewDetails);
        } else {
            viewRef.current = new APISceneView(viewDetails);
        }
        setView(viewRef.current);
        viewRef.current.when(() => {
            centerProp && (viewRef.current!.center = centerProp);
            zoomProp && (viewRef.current!.zoom = zoomProp);
        });
        onMapClick && viewRef.current.on("click", onMapClick);
    };
    // inprogress
    const addWatchEvent = (view: __esri.MapView | __esri.SceneView) => {
        if (!view) {
            throw new Error("view is not defined");
        }
        whenTrue(view, "stationary", () => {
            setZoom(view.zoom);
            setCenter(view.center);
            // setCenter
        });
    };
    React.useEffect(() => {
        if (view) {
            addWatchEvent(view);
        }
    }, [view]);
    React.useEffect(() => {
        initMapView();
        // return cleanup function
    }, []);
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <div
                ref={viewDivRef}
                style={{ height: "100%", width: "100%" }}
            ></div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    mapView: view,
                });
            })}
        </div>
    );
};

export default MapSceneView;
