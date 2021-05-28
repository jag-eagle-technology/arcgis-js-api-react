import React, { useEffect } from "react";
import APISketchWidget from "@arcgis/core/widgets/Sketch";
import APIMapView from "@arcgis/core/views/MapView";
import APISceneView from "@arcgis/core/views/SceneView";
import APIGraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import APIFeatureLayerSnappingSource from "@arcgis/core/views/interactive/snapping/FeatureSnappingLayerSource";

interface ISketchWidget {
    // map?: APIMap;
    view?: APIMapView | APISceneView;
    position?: __esri.UIAddPosition;
    snappingFeatureSources?: __esri.SnappingOptionsProperties["featureSources"];
    // onSelectResult?: __esri.SketchWidgetSelectResultEventHandler;
    // setSketchWidget?: (sketchWidget: APISketchWidget) => void;
}
const SketchWidget: React.FC<ISketchWidget> = ({
    view,
    position,
    snappingFeatureSources,
    // onSelectResult,
    // setSketchWidget,
}) => {
    const sketchWidgetDivRef = React.useRef<HTMLDivElement>(null);
    const initSketchWidget = () => {
        if (!view) {
            throw new Error("no view set for elevation profile component");
        }
        const sketchGraphicLayer = new APIGraphicsLayer();
        view.map.add(sketchGraphicLayer);
        const allMapFeatureSources = view.map.allLayers.map((layer) => ({
            layer,
            enabled: true,
        }));
        console.log(allMapFeatureSources);
        const sketchWidget = new APISketchWidget({
            view,
            layer: sketchGraphicLayer,
            snappingOptions: {
                enabled: true,
                selfEnabled: true,
                featureEnabled: true,
                featureSources: snappingFeatureSources || allMapFeatureSources,
            },
        });
        if (!snappingFeatureSources) {
            view.map.layers.on("after-add", (event) => {
                sketchWidget.snappingOptions.featureSources.add({
                    enabled: true,
                    /* @ts-ignore */
                    layer: event.item,
                });
            });
        }
        if (position) {
            view.ui.add(sketchWidget, position);
        } else if (sketchWidgetDivRef?.current) {
            sketchWidget.container = sketchWidgetDivRef.current;
        }
        // onSelectResult && sketchWidget.on("select-result", onSelectResult);
        // setSketchWidget && setSketchWidget(sketchWidget);
    };
    useEffect(() => {
        if (view) {
            initSketchWidget();
        }
    }, [view]);
    return position ? (
        <></>
    ) : (
        <div
            style={{ width: "100%", height: "100%" }}
            ref={sketchWidgetDivRef}
        ></div>
    );
};

export default SketchWidget;
