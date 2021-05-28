import React from "react";
import Map from "@arcgis/core/Map";
import Point from "@arcgis/core/geometry/Point";
import APIMapView from "@arcgis/core/views/MapView";
import {whenTrue} from '@arcgis/core/core/watchUtils';
export type MapCenterLocation = {
    lat: number;
    lon: number;
    zoom: number;
};

interface IMapView {
    center?: Point;
    zoom?: number;
    children?: React.ReactNode;
    onMapClick?: __esri.MapViewClickEventHandler;
}

const MapView: React.FC<IMapView> = ({
    center,
    zoom,
    children,
    onMapClick,
}) => {
    const mapDivRef = React.useRef<HTMLDivElement>(null);
    const mapViewRef = React.useRef<APIMapView>();
    const [mapView, setMapView] = React.useState<APIMapView>();
    const initMapView = () => {
        if (!mapDivRef.current) {
            throw new Error("Map div is not defined");
        }
        if (mapView) {
            mapView.destroy();
            setMapView(undefined);
        }
        const view = new APIMapView({
            // map: new Map(),
            container: mapDivRef.current,
            center: center || undefined,
            zoom: zoom || undefined,
            spatialReference: {
                wkid: 2193,
            },
        });
        mapViewRef.current = view;
        setMapView(view);
        view.when(() => {
            center && (view.center = center);
            zoom && (view.zoom = zoom);
        });
        onMapClick && view.on("click", onMapClick);
        // add listener to update mapview center
        // view.watch('stationary')
        whenTrue(view, 'stationary', () => {
            // console.log('mapview is stationary', mapView.center, mapView.zoom);

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
        initMapView();
    }, []);
    /*
    React.useEffect(() => {
        if (mapView && center) {
            mapView.center = center;
        }
    }, [mapView, center]);
    */
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <div
                ref={mapDivRef}
                style={{ height: "100%", width: "100%" }}
            ></div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                    mapView,
                });
            })}
        </div>
    );
};

export default MapView;
