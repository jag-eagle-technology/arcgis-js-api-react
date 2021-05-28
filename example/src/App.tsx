import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    SceneView,
    Map,
    Basemap,
    ElevationLayer,
    TileLayer,
    ElevationProfile,
    FeatureLayer,
    SketchWidget,
} from "arcgis-js-api-react";
import Point from "@arcgis/core/geometry/Point";
import Camera from "@arcgis/core/Camera";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";

const App: React.FC = () => {
    // const mapCenter = new Point({
    //     x: 1066763.5263500214,
    //     y: 4162854.8137998586,
    //     z: 2000,
    //     spatialReference: { wkid: 2193 },
    // });
    const mapCamera = new Camera({
        position: {
            spatialReference: {
                wkid: 2193,
            },
            x: 1863393.751090786,
            y: 5458104.437609018,
            z: 1629.8715870066753,
        },
        heading: 13.160128432550689,
        tilt: 74.80582453668673,
    });
    // const mapZoom = 5;
    // const [sceneView, setSceneView] = React.useState<__esri.SceneView>();
    return (
        <div id="App">
            <div style={{ width: "100%", height: "100%" }}>
                <SceneView
                    // center={mapCenter}
                    // zoom={mapZoom}
                    // setSceneView={setSceneView}
                    camera={mapCamera}
                >
                    <Map>
                        <FeatureLayer
                            url="https://services.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/Castlepoint_Station_WFL1/FeatureServer/0"
                            id="castlepoint-stockyards"
                        ></FeatureLayer>
                        <FeatureLayer
                            url="https://services.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/Castlepoint_Station_WFL1/FeatureServer/1"
                            id="tanks"
                        ></FeatureLayer>
                        <FeatureLayer
                            url="https://services.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/Castlepoint_Station_WFL1/FeatureServer/2"
                            id="castlepoint-rivers"
                        ></FeatureLayer>
                        <FeatureLayer
                            url="https://services.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/Castlepoint_Station_WFL1/FeatureServer/3"
                            id="fencelines"
                        ></FeatureLayer>
                        <FeatureLayer
                            url="https://services.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/Castlepoint_Station_WFL1/FeatureServer/4"
                            id="castlepoint-buildings"
                        ></FeatureLayer>
                        <FeatureLayer
                            url="https://services.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/Castlepoint_Station_WFL1/FeatureServer/5"
                            id="castlepoint-station-boundary"
                        ></FeatureLayer>
                        <FeatureLayer
                            url="https://services7.arcgis.com/jI87xPT7G1AGV8Uo/arcgis/rest/services/LINZ_NZ_Building_Outlines/FeatureServer"
                            id="linz-building-outlines"
                            renderer={
                                new SimpleRenderer({
                                    authoringInfo: { lengthUnit: "meters" },
                                    // type: "simple",
                                    symbol: new PolygonSymbol3D({
                                        // type: "PolygonSymbol3D",
                                        symbolLayers: [
                                            {
                                                type: "extrude",
                                                size: 3,
                                                material: {
                                                    color: [214, 214, 214],
                                                },
                                                edges: new SolidEdges3D({
                                                    color: [0, 0, 0, 0.5],
                                                    size: "2px",
                                                }),
                                            },
                                        ],
                                    }),
                                })
                            }
                        ></FeatureLayer>
                        <FeatureLayer
                            url="https://services7.arcgis.com/jI87xPT7G1AGV8Uo/arcgis/rest/services/LINZ_NZ_River_Name_Lines_Pilot/FeatureServer"
                            id="linz-nz-river-name-lines"
                        ></FeatureLayer>
                        {/* <FeatureLayer
                            url="https://services7.arcgis.com/jI87xPT7G1AGV8Uo/arcgis/rest/services/LINZ_NZ_Primary_Parcels/FeatureServer"
                            id="linz-nz-primary-parcels"
                        ></FeatureLayer> */}
                        <Basemap>
                            <TileLayer url="https://services1.arcgisonline.co.nz/arcgis/rest/services/Imagery/newzealand/MapServer"></TileLayer>
                        </Basemap>
                        <ElevationLayer url="https://services1.arcgisonline.co.nz/arcgis/rest/services/Elevation/New_Zealand_Elevation/ImageServer" />
                    </Map>
                    <ElevationProfile
                        // view={sceneView}
                        position="top-right"
                    />
                    <SketchWidget position="top-right" />
                </SceneView>
            </div>
            {/* <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "120px",
                    // backgroundColor: 'red'
                }}
            ></div> */}
        </div>
    );
};

export default App;
