import stylefunction from 'ol-mapbox-style/dist/stylefunction';

function loadStyle(styleJson, vectorTileLayer, spriteUrl) {
  const { source, visible, credentials, headers } = vectorTileLayer;
  const spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
  const sizeFactor = spriteScale === 0.5 ? '@2x' : '';
  const sourceName = Object.keys(styleJson.sources)[0];
  const tileGrid = source.getTileGrid();
  const resolutions = tileGrid.getResolutions();
  const spriteImageUrl = spriteUrl + sizeFactor + '.png';
  const style = getStyle(vectorTileLayer, styleJson, sourceName, resolutions, null, spriteImageUrl);
  vectorTileLayer.setStyle(style);
  
  const spriteJsonUrl = spriteUrl + sizeFactor + '.json';
  fetch(spriteJsonUrl, { headers, credentials })
    .then(response => response.json())
    .then(data => {
      const style = getStyle(vectorTileLayer, styleJson, sourceName, resolutions, data, spriteImageUrl);
      vectorTileLayer.setStyle(style);
      vectorTileLayer.setVisible(visible);
    })
    .catch(e => {
      console.error('load sprite error', e);
    })
}
function getStyle(vectorTileLayer, styleJson, sourceName, resolutions, sprite, spriteImageUrl) {
  const fun = stylefunction(
    vectorTileLayer,
    styleJson,
    sourceName,
    resolutions,
    sprite,
    spriteImageUrl,
    () => []
  );
  return (feature, resolution) => {
    return fun(feature, resolution);
  };
}

const loadVectorTileStyle = (vectorTileLayer, styleUrl, spriteUrl) => {
  const { credentials, headers } = vectorTileLayer;
  fetch(styleUrl, { headers, credentials })
    .then(response => response.json())
    .then(data => {
      loadStyle(data, vectorTileLayer, spriteUrl);
    })
    .catch(e => {
      console.error('load style error', e);
    })
};

export { loadVectorTileStyle };
