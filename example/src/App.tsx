import React from 'react'

import { Map, MapView, ImageryBasemap } from 'arcgis-js-api-react'
import 'arcgis-js-api-react/dist/index.css'

const App = () => {
  return (
    <div style={{ width: '400px', height: '400px' }}>
      <MapView>
        <Map>
          <ImageryBasemap></ImageryBasemap>
        </Map>
      </MapView>
    </div>
  )
}

export default App
