import React, { useEffect } from "react";
import APIMap from "@arcgis/core/Map";
import APISearch from "@arcgis/core/widgets/Search";
import APIMapView from "@arcgis/core/views/MapView";

interface ISearch {
    map?: APIMap;
    mapView?: APIMapView;
    position?: __esri.UIAddPosition;
    onSelectResult?: __esri.SearchSelectResultEventHandler;
    setSearch?: (search: APISearch) => void;
    searchDiv?: React.RefObject<HTMLDivElement>;
    popupEnabled?: boolean;
}
const Search: React.FC<ISearch> = ({
    map,
    mapView,
    position,
    onSelectResult,
    setSearch,
    searchDiv,
    popupEnabled = true
}) => {
    // stick in a couple of refs to track locate and locate event handler
    const initSearch = () => {
        if (!mapView) {
            throw new Error("no mapView set for locate component");
        }
        const search = new APISearch({ view: mapView, popupEnabled: popupEnabled });
        if (searchDiv?.current) {
            search.container = searchDiv.current;
        } else {
            position
                ? mapView.ui.add(search, position)
                : mapView.ui.add(search);
        }
        onSelectResult && search.on("select-result", onSelectResult);
        setSearch && setSearch(search);
    };
    useEffect(() => {
        if (mapView) {
            initSearch();
        }
    }, [mapView]);
    return <></>;
};

export default Search;
