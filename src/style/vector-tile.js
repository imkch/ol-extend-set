import stylefunction from 'ol-mapbox-style/dist/stylefunction';


function getStyle(vectorTileLayer, styleJson, sourceName, resolutions, sprite, spriteImageUrl) {
  const fn = stylefunction(
    vectorTileLayer,
    styleJson,
    sourceName,
    resolutions,
    sprite,
    spriteImageUrl,
    () => []
  );
  return (feature, resolution) => {
    return fn(feature, resolution);
  };
}

const loadVectorTileStyle = (vectorTileLayer, styleUrl, spriteUrl, visible = false, layers, fn) => {
  fn(styleUrl, loadStyle);
  function loadStyle(styleJson) {
    let sourceIdOrLayersList;
    if (layers) {
      const lookup = {};
      for (let i = 0; i < styleJson.layers.length; ++i) {
        const layer = styleJson.layers[i];
        if (layer.source) {
          lookup[layer.id] = layer.source;
        }
      }
      let firstSource;
      for (let i = 0; i < layers.length; ++i) {
        const candidate = lookup[layers[i]];
        if (!candidate) {
          console.error(`could not find source for ${layers[i]}`);
          return;
        }
        if (!firstSource) {
          firstSource = candidate;
        } else if (firstSource !== candidate) {
          console.error(`layers can only use a single source, found ${firstSource} and ${candidate}`);
          return;
        }
      }
      sourceIdOrLayersList = layers;
    } else {
      sourceIdOrLayersList = Object.keys(styleJson.sources)[0];
    }

    const source = vectorTileLayer.getSource();
    const spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
    const sizeFactor = spriteScale === 0.5 ? '@2x' : '';
    const tileGrid = source.getTileGrid();
    const resolutions = tileGrid.getResolutions();
    const spriteImageUrl = spriteUrl + sizeFactor + '.png';
    const style = getStyle(vectorTileLayer, styleJson, sourceIdOrLayersList, resolutions, null, spriteImageUrl);
    vectorTileLayer.setStyle(style);
    
    const spriteJsonUrl = spriteUrl + sizeFactor + '.json';
    fn(spriteJsonUrl, loadSprite);
    function loadSprite(sprite) {
      const style = getStyle(vectorTileLayer, styleJson, sourceIdOrLayersList, resolutions, sprite, spriteImageUrl);
      vectorTileLayer.setStyle(style);
      vectorTileLayer.setVisible(visible);
    }
  }
};

export { loadVectorTileStyle };
