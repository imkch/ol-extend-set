(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/VectorTile'), require('ol/style/Style'), require('ol/style/Fill'), require('ol/style/Stroke'), require('ol/style/Icon'), require('ol/style/Text'), require('ol/style/Circle'), require('ol/render/Feature'), require('ol/events'), require('ol/events/EventType'), require('ol/render/canvas'), require('ol/layer/Tile'), require('ol/source/WMTS'), require('ol/format/WMTSCapabilities'), require('ol/source/VectorTile'), require('ol/tilegrid/WMTS'), require('ol/source/XYZ'), require('ol/tilegrid/TileGrid'), require('ol/proj/proj4'), require('ol/proj')) :
  typeof define === 'function' && define.amd ? define(['ol/layer/VectorTile', 'ol/style/Style', 'ol/style/Fill', 'ol/style/Stroke', 'ol/style/Icon', 'ol/style/Text', 'ol/style/Circle', 'ol/render/Feature', 'ol/events', 'ol/events/EventType', 'ol/render/canvas', 'ol/layer/Tile', 'ol/source/WMTS', 'ol/format/WMTSCapabilities', 'ol/source/VectorTile', 'ol/tilegrid/WMTS', 'ol/source/XYZ', 'ol/tilegrid/TileGrid', 'ol/proj/proj4', 'ol/proj'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.oles = factory(global.VectorTile, global.Style, global.Fill, global.Stroke, global.Icon, global.Text, global.Circle, global.RenderFeature, global.events, global.EventType, global.canvas, global.TileLayer, global.WMTSSource, global.WMTSCapabilities, global.VectorTile$1, global.WMTSTileGrid, global.XYZSource, global.TileGrid, global.proj4$1, global.proj$1));
}(this, (function (VectorTile, Style, Fill, Stroke, Icon, Text, Circle, RenderFeature, events, EventType, canvas, TileLayer, WMTSSource, WMTSCapabilities, VectorTile$1, WMTSTileGrid, XYZSource, TileGrid, proj4$1, proj$1) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var VectorTile__default = /*#__PURE__*/_interopDefaultLegacy(VectorTile);
  var Style__default = /*#__PURE__*/_interopDefaultLegacy(Style);
  var Fill__default = /*#__PURE__*/_interopDefaultLegacy(Fill);
  var Stroke__default = /*#__PURE__*/_interopDefaultLegacy(Stroke);
  var Icon__default = /*#__PURE__*/_interopDefaultLegacy(Icon);
  var Text__default = /*#__PURE__*/_interopDefaultLegacy(Text);
  var Circle__default = /*#__PURE__*/_interopDefaultLegacy(Circle);
  var RenderFeature__default = /*#__PURE__*/_interopDefaultLegacy(RenderFeature);
  var EventType__default = /*#__PURE__*/_interopDefaultLegacy(EventType);
  var TileLayer__default = /*#__PURE__*/_interopDefaultLegacy(TileLayer);
  var WMTSSource__default = /*#__PURE__*/_interopDefaultLegacy(WMTSSource);
  var WMTSCapabilities__default = /*#__PURE__*/_interopDefaultLegacy(WMTSCapabilities);
  var VectorTile__default$1 = /*#__PURE__*/_interopDefaultLegacy(VectorTile$1);
  var WMTSTileGrid__default = /*#__PURE__*/_interopDefaultLegacy(WMTSTileGrid);
  var XYZSource__default = /*#__PURE__*/_interopDefaultLegacy(XYZSource);
  var TileGrid__default = /*#__PURE__*/_interopDefaultLegacy(TileGrid);

  var $version = 8;
  var $root = {
  	version: {
  		required: true,
  		type: "enum",
  		values: [
  			8
  		],
  		doc: "Style specification version number. Must be 8.",
  		example: 8
  	},
  	name: {
  		type: "string",
  		doc: "A human-readable name for the style.",
  		example: "Bright"
  	},
  	metadata: {
  		type: "*",
  		doc: "Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
  	},
  	center: {
  		type: "array",
  		value: "number",
  		doc: "Default map center in longitude and latitude.  The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: [
  			-73.9749,
  			40.7736
  		]
  	},
  	zoom: {
  		type: "number",
  		doc: "Default zoom level.  The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: 12.5
  	},
  	bearing: {
  		type: "number",
  		"default": 0,
  		period: 360,
  		units: "degrees",
  		doc: "Default bearing, in degrees. The bearing is the compass direction that is \"up\"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: 29
  	},
  	pitch: {
  		type: "number",
  		"default": 0,
  		units: "degrees",
  		doc: "Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: 50
  	},
  	light: {
  		type: "light",
  		doc: "The global light source.",
  		example: {
  			anchor: "viewport",
  			color: "white",
  			intensity: 0.4
  		}
  	},
  	terrain: {
  		type: "terrain",
  		doc: "A global modifier that elevates layers and markers based on a DEM data source."
  	},
  	sources: {
  		required: true,
  		type: "sources",
  		doc: "Data source specifications.",
  		example: {
  			"mapbox-streets": {
  				type: "vector",
  				url: "mapbox://mapbox.mapbox-streets-v6"
  			}
  		}
  	},
  	sprite: {
  		type: "string",
  		doc: "A base URL for retrieving the sprite image and metadata. The extensions `.png`, `.json` and scale factor `@2x.png` will be automatically appended. This property is required if any layer uses the `background-pattern`, `fill-pattern`, `line-pattern`, `fill-extrusion-pattern`, or `icon-image` properties. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
  		example: "mapbox://sprites/mapbox/bright-v8"
  	},
  	glyphs: {
  		type: "string",
  		doc: "A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include `{fontstack}` and `{range}` tokens. This property is required if any layer uses the `text-field` layout property. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
  		example: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
  	},
  	transition: {
  		type: "transition",
  		doc: "A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's `transition` property.",
  		example: {
  			duration: 300,
  			delay: 0
  		}
  	},
  	layers: {
  		required: true,
  		type: "array",
  		value: "layer",
  		doc: "Layers will be drawn in the order of this array.",
  		example: [
  			{
  				id: "water",
  				source: "mapbox-streets",
  				"source-layer": "water",
  				type: "fill",
  				paint: {
  					"fill-color": "#00ffff"
  				}
  			}
  		]
  	}
  };
  var sources = {
  	"*": {
  		type: "source",
  		doc: "Specification of a data source. For vector and raster sources, either TileJSON or a URL to a TileJSON must be provided. For image and video sources, a URL must be provided. For GeoJSON sources, a URL or inline GeoJSON must be provided."
  	}
  };
  var source = [
  	"source_vector",
  	"source_raster",
  	"source_raster_dem",
  	"source_geojson",
  	"source_video",
  	"source_image"
  ];
  var source_vector = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			vector: {
  				doc: "A vector tile source."
  			}
  		},
  		doc: "The type of the source."
  	},
  	url: {
  		type: "string",
  		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`."
  	},
  	tiles: {
  		type: "array",
  		value: "string",
  		doc: "An array of one or more tile source URLs, as in the TileJSON spec."
  	},
  	bounds: {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			-180,
  			-85.051129,
  			180,
  			85.051129
  		],
  		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
  	},
  	scheme: {
  		type: "enum",
  		values: {
  			xyz: {
  				doc: "Slippy map tilenames scheme."
  			},
  			tms: {
  				doc: "OSGeo spec scheme."
  			}
  		},
  		"default": "xyz",
  		doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
  	},
  	minzoom: {
  		type: "number",
  		"default": 0,
  		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 22,
  		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	promoteId: {
  		type: "promoteId",
  		doc: "A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`. If specified as a string for a vector tile source, the same property is used across all its source layers."
  	},
  	volatile: {
  		type: "boolean",
  		"default": false,
  		doc: "A setting to determine whether a source's tiles are cached locally.",
  		"sdk-support": {
  			"basic functionality": {
  				android: "9.3.0",
  				ios: "5.10.0"
  			}
  		}
  	},
  	"*": {
  		type: "*",
  		doc: "Other keys to configure the data source."
  	}
  };
  var source_raster = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			raster: {
  				doc: "A raster tile source."
  			}
  		},
  		doc: "The type of the source."
  	},
  	url: {
  		type: "string",
  		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`."
  	},
  	tiles: {
  		type: "array",
  		value: "string",
  		doc: "An array of one or more tile source URLs, as in the TileJSON spec."
  	},
  	bounds: {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			-180,
  			-85.051129,
  			180,
  			85.051129
  		],
  		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
  	},
  	minzoom: {
  		type: "number",
  		"default": 0,
  		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 22,
  		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
  	},
  	tileSize: {
  		type: "number",
  		"default": 512,
  		units: "pixels",
  		doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
  	},
  	scheme: {
  		type: "enum",
  		values: {
  			xyz: {
  				doc: "Slippy map tilenames scheme."
  			},
  			tms: {
  				doc: "OSGeo spec scheme."
  			}
  		},
  		"default": "xyz",
  		doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	volatile: {
  		type: "boolean",
  		"default": false,
  		doc: "A setting to determine whether a source's tiles are cached locally.",
  		"sdk-support": {
  			"basic functionality": {
  				android: "9.3.0",
  				ios: "5.10.0"
  			}
  		}
  	},
  	"*": {
  		type: "*",
  		doc: "Other keys to configure the data source."
  	}
  };
  var source_raster_dem = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			"raster-dem": {
  				doc: "A RGB-encoded raster DEM source"
  			}
  		},
  		doc: "The type of the source."
  	},
  	url: {
  		type: "string",
  		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<Tileset ID>`."
  	},
  	tiles: {
  		type: "array",
  		value: "string",
  		doc: "An array of one or more tile source URLs, as in the TileJSON spec."
  	},
  	bounds: {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			-180,
  			-85.051129,
  			180,
  			85.051129
  		],
  		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
  	},
  	minzoom: {
  		type: "number",
  		"default": 0,
  		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 22,
  		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
  	},
  	tileSize: {
  		type: "number",
  		"default": 512,
  		units: "pixels",
  		doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	encoding: {
  		type: "enum",
  		values: {
  			terrarium: {
  				doc: "Terrarium format PNG tiles. See https://aws.amazon.com/es/public-datasets/terrain/ for more info."
  			},
  			mapbox: {
  				doc: "Mapbox Terrain RGB tiles. See https://www.mapbox.com/help/access-elevation-data/#mapbox-terrain-rgb for more info."
  			}
  		},
  		"default": "mapbox",
  		doc: "The encoding used by this source. Mapbox Terrain RGB is used by default"
  	},
  	volatile: {
  		type: "boolean",
  		"default": false,
  		doc: "A setting to determine whether a source's tiles are cached locally.",
  		"sdk-support": {
  			"basic functionality": {
  				android: "9.3.0",
  				ios: "5.10.0"
  			}
  		}
  	},
  	"*": {
  		type: "*",
  		doc: "Other keys to configure the data source."
  	}
  };
  var source_geojson = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			geojson: {
  				doc: "A GeoJSON data source."
  			}
  		},
  		doc: "The data type of the GeoJSON source."
  	},
  	data: {
  		type: "*",
  		doc: "A URL to a GeoJSON file, or inline GeoJSON."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 18,
  		doc: "Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels)."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	buffer: {
  		type: "number",
  		"default": 128,
  		maximum: 512,
  		minimum: 0,
  		doc: "Size of the tile buffer on each side. A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself. Larger values produce fewer rendering artifacts near tile edges and slower performance."
  	},
  	filter: {
  		type: "*",
  		doc: "An expression for filtering features prior to processing them for rendering."
  	},
  	tolerance: {
  		type: "number",
  		"default": 0.375,
  		doc: "Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance)."
  	},
  	cluster: {
  		type: "boolean",
  		"default": false,
  		doc: "If the data is a collection of point features, setting this to true clusters the points by radius into groups. Cluster groups become new `Point` features in the source with additional properties:\n * `cluster` Is `true` if the point is a cluster \n * `cluster_id` A unqiue id for the cluster to be used in conjunction with the [cluster inspection methods](https://www.mapbox.com/mapbox-gl-js/api/#geojsonsource#getclusterexpansionzoom)\n * `point_count` Number of original points grouped into this cluster\n * `point_count_abbreviated` An abbreviated point count"
  	},
  	clusterRadius: {
  		type: "number",
  		"default": 50,
  		minimum: 0,
  		doc: "Radius of each cluster if clustering is enabled. A value of 512 indicates a radius equal to the width of a tile."
  	},
  	clusterMaxZoom: {
  		type: "number",
  		doc: "Max zoom on which to cluster points if clustering is enabled. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered). Clusters are re-evaluated at integer zoom levels so setting clusterMaxZoom to 14 means the clusters will be displayed until z15."
  	},
  	clusterMinPoints: {
  		type: "number",
  		doc: "Minimum number of points necessary to form a cluster if clustering is enabled. Defaults to `2`."
  	},
  	clusterProperties: {
  		type: "*",
  		doc: "An object defining custom properties on the generated clusters if clustering is enabled, aggregating values from clustered points. Has the form `{\"property_name\": [operator, map_expression]}`. `operator` is any expression function that accepts at least 2 operands (e.g. `\"+\"` or `\"max\"`) — it accumulates the property value from clusters/points the cluster contains; `map_expression` produces the value of a single point.\n\nExample: `{\"sum\": [\"+\", [\"get\", \"scalerank\"]]}`.\n\nFor more advanced use cases, in place of `operator`, you can use a custom reduce expression that references a special `[\"accumulated\"]` value, e.g.:\n`{\"sum\": [[\"+\", [\"accumulated\"], [\"get\", \"sum\"]], [\"get\", \"scalerank\"]]}`"
  	},
  	lineMetrics: {
  		type: "boolean",
  		"default": false,
  		doc: "Whether to calculate line distance metrics. This is required for line layers that specify `line-gradient` values."
  	},
  	generateId: {
  		type: "boolean",
  		"default": false,
  		doc: "Whether to generate ids for the geojson features. When enabled, the `feature.id` property will be auto assigned based on its index in the `features` array, over-writing any previous values."
  	},
  	promoteId: {
  		type: "promoteId",
  		doc: "A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`."
  	}
  };
  var source_video = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			video: {
  				doc: "A video data source."
  			}
  		},
  		doc: "The data type of the video source."
  	},
  	urls: {
  		required: true,
  		type: "array",
  		value: "string",
  		doc: "URLs to video content in order of preferred format."
  	},
  	coordinates: {
  		required: true,
  		doc: "Corners of video specified in longitude, latitude pairs.",
  		type: "array",
  		length: 4,
  		value: {
  			type: "array",
  			length: 2,
  			value: "number",
  			doc: "A single longitude, latitude pair."
  		}
  	}
  };
  var source_image = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			image: {
  				doc: "An image data source."
  			}
  		},
  		doc: "The data type of the image source."
  	},
  	url: {
  		required: true,
  		type: "string",
  		doc: "URL that points to an image."
  	},
  	coordinates: {
  		required: true,
  		doc: "Corners of image specified in longitude, latitude pairs.",
  		type: "array",
  		length: 4,
  		value: {
  			type: "array",
  			length: 2,
  			value: "number",
  			doc: "A single longitude, latitude pair."
  		}
  	}
  };
  var layer = {
  	id: {
  		type: "string",
  		doc: "Unique layer name.",
  		required: true
  	},
  	type: {
  		type: "enum",
  		values: {
  			fill: {
  				doc: "A filled polygon with an optional stroked border.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			line: {
  				doc: "A stroked line.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			symbol: {
  				doc: "An icon or a text label.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			circle: {
  				doc: "A filled circle.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			heatmap: {
  				doc: "A heatmap.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.41.0",
  						android: "6.0.0",
  						ios: "4.0.0",
  						macos: "0.7.0"
  					}
  				}
  			},
  			"fill-extrusion": {
  				doc: "An extruded (3D) polygon.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.27.0",
  						android: "5.1.0",
  						ios: "3.6.0",
  						macos: "0.5.0"
  					}
  				}
  			},
  			raster: {
  				doc: "Raster map textures such as satellite imagery.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			hillshade: {
  				doc: "Client-side hillshading visualization based on DEM data. Currently, the implementation only supports Mapbox Terrain RGB and Mapzen Terrarium tiles.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.43.0",
  						android: "6.0.0",
  						ios: "4.0.0",
  						macos: "0.7.0"
  					}
  				}
  			},
  			background: {
  				doc: "The background color or pattern of the map.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			sky: {
  				doc: "A spherical dome around the map that is always rendered behind all other layers.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "2.0.0"
  					}
  				}
  			}
  		},
  		doc: "Rendering type of this layer.",
  		required: true
  	},
  	metadata: {
  		type: "*",
  		doc: "Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
  	},
  	source: {
  		type: "string",
  		doc: "Name of a source description to be used for this layer. Required for all layer types except `background`."
  	},
  	"source-layer": {
  		type: "string",
  		doc: "Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources."
  	},
  	minzoom: {
  		type: "number",
  		minimum: 0,
  		maximum: 24,
  		doc: "The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden."
  	},
  	maxzoom: {
  		type: "number",
  		minimum: 0,
  		maximum: 24,
  		doc: "The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden."
  	},
  	filter: {
  		type: "filter",
  		doc: "A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions."
  	},
  	layout: {
  		type: "layout",
  		doc: "Layout properties for the layer."
  	},
  	paint: {
  		type: "paint",
  		doc: "Default paint properties for this layer."
  	}
  };
  var layout = [
  	"layout_fill",
  	"layout_line",
  	"layout_circle",
  	"layout_heatmap",
  	"layout_fill-extrusion",
  	"layout_symbol",
  	"layout_raster",
  	"layout_hillshade",
  	"layout_background",
  	"layout_sky"
  ];
  var layout_background = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_sky = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_fill = {
  	"fill-sort-key": {
  		type: "number",
  		doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "1.2.0",
  				android: "9.1.0",
  				ios: "5.8.0",
  				macos: "0.15.0"
  			},
  			"data-driven styling": {
  				js: "1.2.0",
  				android: "9.1.0",
  				ios: "5.8.0",
  				macos: "0.15.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_circle = {
  	"circle-sort-key": {
  		type: "number",
  		doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "1.2.0",
  				android: "9.2.0",
  				ios: "5.9.0",
  				macos: "0.16.0"
  			},
  			"data-driven styling": {
  				js: "1.2.0",
  				android: "9.2.0",
  				ios: "5.9.0",
  				macos: "0.16.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_heatmap = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_line = {
  	"line-cap": {
  		type: "enum",
  		values: {
  			butt: {
  				doc: "A cap with a squared-off end which is drawn to the exact endpoint of the line."
  			},
  			round: {
  				doc: "A cap with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
  			},
  			square: {
  				doc: "A cap with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
  			}
  		},
  		"default": "butt",
  		doc: "The display of line endings.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-join": {
  		type: "enum",
  		values: {
  			bevel: {
  				doc: "A join with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
  			},
  			round: {
  				doc: "A join with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
  			},
  			miter: {
  				doc: "A join with a sharp, angled corner which is drawn with the outer sides beyond the endpoint of the path until they meet."
  			}
  		},
  		"default": "miter",
  		doc: "The display of lines when joining.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-miter-limit": {
  		type: "number",
  		"default": 2,
  		doc: "Used to automatically convert miter joins to bevel joins for sharp angles.",
  		requires: [
  			{
  				"line-join": "miter"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-round-limit": {
  		type: "number",
  		"default": 1.05,
  		doc: "Used to automatically convert round joins to miter joins for shallow angles.",
  		requires: [
  			{
  				"line-join": "round"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-sort-key": {
  		type: "number",
  		doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "1.2.0",
  				android: "9.1.0",
  				ios: "5.8.0",
  				macos: "0.15.0"
  			},
  			"data-driven styling": {
  				js: "1.2.0",
  				android: "9.1.0",
  				ios: "5.8.0",
  				macos: "0.15.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_symbol = {
  	"symbol-placement": {
  		type: "enum",
  		values: {
  			point: {
  				doc: "The label is placed at the point where the geometry is located."
  			},
  			line: {
  				doc: "The label is placed along the line of the geometry. Can only be used on `LineString` and `Polygon` geometries."
  			},
  			"line-center": {
  				doc: "The label is placed at the center of the line of the geometry. Can only be used on `LineString` and `Polygon` geometries. Note that a single feature in a vector tile may contain multiple line geometries."
  			}
  		},
  		"default": "point",
  		doc: "Label placement relative to its geometry.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"`line-center` value": {
  				js: "0.47.0",
  				android: "6.4.0",
  				ios: "4.3.0",
  				macos: "0.10.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"symbol-spacing": {
  		type: "number",
  		"default": 250,
  		minimum: 1,
  		units: "pixels",
  		doc: "Distance between two symbol anchors.",
  		requires: [
  			{
  				"symbol-placement": "line"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"symbol-avoid-edges": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer. When using a client that supports global collision detection, like Mapbox GL JS version 0.42.0 or greater, enabling this property is not needed to prevent clipped labels at tile boundaries.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"symbol-sort-key": {
  		type: "number",
  		doc: "Sorts features in ascending order based on this value. Features with lower sort keys are drawn and placed first.  When `icon-allow-overlap` or `text-allow-overlap` is `false`, features with a lower sort key will have priority during placement. When `icon-allow-overlap` or `text-allow-overlap` is set to `true`, features with a higher sort key will overlap over features with a lower sort key.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.53.0",
  				android: "7.4.0",
  				ios: "4.11.0",
  				macos: "0.14.0"
  			},
  			"data-driven styling": {
  				js: "0.53.0",
  				android: "7.4.0",
  				ios: "4.11.0",
  				macos: "0.14.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"symbol-z-order": {
  		type: "enum",
  		values: {
  			auto: {
  				doc: "Sorts symbols by `symbol-sort-key` if set. Otherwise, sorts symbols by their y-position relative to the viewport if `icon-allow-overlap` or `text-allow-overlap` is set to `true` or `icon-ignore-placement` or `text-ignore-placement` is `false`."
  			},
  			"viewport-y": {
  				doc: "Sorts symbols by their y-position relative to the viewport if `icon-allow-overlap` or `text-allow-overlap` is set to `true` or `icon-ignore-placement` or `text-ignore-placement` is `false`."
  			},
  			source: {
  				doc: "Sorts symbols by `symbol-sort-key` if set. Otherwise, no sorting is applied; symbols are rendered in the same order as the source data."
  			}
  		},
  		"default": "auto",
  		doc: "Determines whether overlapping symbols in the same layer are rendered in the order that they appear in the data source or by their y-position relative to the viewport. To control the order and prioritization of symbols otherwise, use `symbol-sort-key`.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.49.0",
  				android: "6.6.0",
  				ios: "4.5.0",
  				macos: "0.12.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-allow-overlap": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the icon will be visible even if it collides with other previously drawn symbols.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-ignore-placement": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, other symbols can be visible even if they collide with the icon.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-optional": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.",
  		requires: [
  			"icon-image",
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-rotation-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "When `symbol-placement` is set to `point`, aligns icons east-west. When `symbol-placement` is set to `line` or `line-center`, aligns icon x-axes with the line."
  			},
  			viewport: {
  				doc: "Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
  			},
  			auto: {
  				doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
  			}
  		},
  		"default": "auto",
  		doc: "In combination with `symbol-placement`, determines the rotation behavior of icons.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"`auto` value": {
  				js: "0.25.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.3.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-size": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		units: "factor of the original icon size",
  		doc: "Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by `icon-size`. 1 is the original size; 3 triples the size of the image.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-text-fit": {
  		type: "enum",
  		values: {
  			none: {
  				doc: "The icon is displayed at its intrinsic aspect ratio."
  			},
  			width: {
  				doc: "The icon is scaled in the x-dimension to fit the width of the text."
  			},
  			height: {
  				doc: "The icon is scaled in the y-dimension to fit the height of the text."
  			},
  			both: {
  				doc: "The icon is scaled in both x- and y-dimensions."
  			}
  		},
  		"default": "none",
  		doc: "Scales the icon to fit around the associated text.",
  		requires: [
  			"icon-image",
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			},
  			"stretchable icons": {
  				js: "1.6.0",
  				android: "9.2.0",
  				ios: "5.8.0",
  				macos: "0.15.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-text-fit-padding": {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			0,
  			0,
  			0,
  			0
  		],
  		units: "pixels",
  		doc: "Size of the additional area added to dimensions determined by `icon-text-fit`, in clockwise order: top, right, bottom, left.",
  		requires: [
  			"icon-image",
  			"text-field",
  			{
  				"icon-text-fit": [
  					"both",
  					"width",
  					"height"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-image": {
  		type: "resolvedImage",
  		doc: "Name of image in sprite to use for drawing an image background.",
  		tokens: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-rotate": {
  		type: "number",
  		"default": 0,
  		period: 360,
  		units: "degrees",
  		doc: "Rotates the icon clockwise.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.21.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-padding": {
  		type: "number",
  		"default": 2,
  		minimum: 0,
  		units: "pixels",
  		doc: "Size of the additional area around the icon bounding box used for detecting symbol collisions.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-keep-upright": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the icon may be flipped to prevent it from being rendered upside-down.",
  		requires: [
  			"icon-image",
  			{
  				"icon-rotation-alignment": "map"
  			},
  			{
  				"symbol-placement": [
  					"line",
  					"line-center"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-offset": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		doc: "Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of `icon-size` to obtain the final offset in pixels. When combined with `icon-rotate` the offset will be as if the rotated direction was up.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-anchor": {
  		type: "enum",
  		values: {
  			center: {
  				doc: "The center of the icon is placed closest to the anchor."
  			},
  			left: {
  				doc: "The left side of the icon is placed closest to the anchor."
  			},
  			right: {
  				doc: "The right side of the icon is placed closest to the anchor."
  			},
  			top: {
  				doc: "The top of the icon is placed closest to the anchor."
  			},
  			bottom: {
  				doc: "The bottom of the icon is placed closest to the anchor."
  			},
  			"top-left": {
  				doc: "The top left corner of the icon is placed closest to the anchor."
  			},
  			"top-right": {
  				doc: "The top right corner of the icon is placed closest to the anchor."
  			},
  			"bottom-left": {
  				doc: "The bottom left corner of the icon is placed closest to the anchor."
  			},
  			"bottom-right": {
  				doc: "The bottom right corner of the icon is placed closest to the anchor."
  			}
  		},
  		"default": "center",
  		doc: "Part of the icon placed closest to the anchor.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-pitch-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The icon is aligned to the plane of the map."
  			},
  			viewport: {
  				doc: "The icon is aligned to the plane of the viewport."
  			},
  			auto: {
  				doc: "Automatically matches the value of `icon-rotation-alignment`."
  			}
  		},
  		"default": "auto",
  		doc: "Orientation of icon when map is pitched.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-pitch-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The text is aligned to the plane of the map."
  			},
  			viewport: {
  				doc: "The text is aligned to the plane of the viewport."
  			},
  			auto: {
  				doc: "Automatically matches the value of `text-rotation-alignment`."
  			}
  		},
  		"default": "auto",
  		doc: "Orientation of text when map is pitched.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			},
  			"`auto` value": {
  				js: "0.25.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.3.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-rotation-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "When `symbol-placement` is set to `point`, aligns text east-west. When `symbol-placement` is set to `line` or `line-center`, aligns text x-axes with the line."
  			},
  			viewport: {
  				doc: "Produces glyphs whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
  			},
  			auto: {
  				doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
  			}
  		},
  		"default": "auto",
  		doc: "In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"`auto` value": {
  				js: "0.25.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.3.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-field": {
  		type: "formatted",
  		"default": "",
  		tokens: true,
  		doc: "Value to use for a text label. If a plain `string` is provided, it will be treated as a `formatted` with default/inherited formatting options.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-font": {
  		type: "array",
  		value: "string",
  		"default": [
  			"Open Sans Regular",
  			"Arial Unicode MS Regular"
  		],
  		doc: "Font stack to use for displaying text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-size": {
  		type: "number",
  		"default": 16,
  		minimum: 0,
  		units: "pixels",
  		doc: "Font size.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-max-width": {
  		type: "number",
  		"default": 10,
  		minimum: 0,
  		units: "ems",
  		doc: "The maximum line width for text wrapping.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-line-height": {
  		type: "number",
  		"default": 1.2,
  		units: "ems",
  		doc: "Text leading value for multi-line text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-letter-spacing": {
  		type: "number",
  		"default": 0,
  		units: "ems",
  		doc: "Text tracking amount.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-justify": {
  		type: "enum",
  		values: {
  			auto: {
  				doc: "The text is aligned towards the anchor position."
  			},
  			left: {
  				doc: "The text is aligned to the left."
  			},
  			center: {
  				doc: "The text is centered."
  			},
  			right: {
  				doc: "The text is aligned to the right."
  			}
  		},
  		"default": "center",
  		doc: "Text justification options.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			},
  			auto: {
  				js: "0.54.0",
  				android: "7.4.0",
  				ios: "4.10.0",
  				macos: "0.14.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-radial-offset": {
  		type: "number",
  		units: "ems",
  		"default": 0,
  		doc: "Radial offset of text, in the direction of the symbol's anchor. Useful in combination with `text-variable-anchor`, which defaults to using the two-dimensional `text-offset` if present.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.54.0",
  				android: "7.4.0",
  				ios: "4.10.0",
  				macos: "0.14.0"
  			},
  			"data-driven styling": {
  				js: "0.54.0",
  				android: "7.4.0",
  				ios: "4.10.0",
  				macos: "0.14.0"
  			}
  		},
  		requires: [
  			"text-field"
  		],
  		"property-type": "data-driven",
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		}
  	},
  	"text-variable-anchor": {
  		type: "array",
  		value: "enum",
  		values: {
  			center: {
  				doc: "The center of the text is placed closest to the anchor."
  			},
  			left: {
  				doc: "The left side of the text is placed closest to the anchor."
  			},
  			right: {
  				doc: "The right side of the text is placed closest to the anchor."
  			},
  			top: {
  				doc: "The top of the text is placed closest to the anchor."
  			},
  			bottom: {
  				doc: "The bottom of the text is placed closest to the anchor."
  			},
  			"top-left": {
  				doc: "The top left corner of the text is placed closest to the anchor."
  			},
  			"top-right": {
  				doc: "The top right corner of the text is placed closest to the anchor."
  			},
  			"bottom-left": {
  				doc: "The bottom left corner of the text is placed closest to the anchor."
  			},
  			"bottom-right": {
  				doc: "The bottom right corner of the text is placed closest to the anchor."
  			}
  		},
  		requires: [
  			"text-field",
  			{
  				"symbol-placement": [
  					"point"
  				]
  			}
  		],
  		doc: "To increase the chance of placing high-priority labels on the map, you can provide an array of `text-anchor` locations: the renderer will attempt to place the label at each location, in order, before moving onto the next label. Use `text-justify: auto` to choose justification based on anchor position. To apply an offset, use the `text-radial-offset` or the two-dimensional `text-offset`.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.54.0",
  				android: "7.4.0",
  				ios: "4.10.0",
  				macos: "0.14.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-anchor": {
  		type: "enum",
  		values: {
  			center: {
  				doc: "The center of the text is placed closest to the anchor."
  			},
  			left: {
  				doc: "The left side of the text is placed closest to the anchor."
  			},
  			right: {
  				doc: "The right side of the text is placed closest to the anchor."
  			},
  			top: {
  				doc: "The top of the text is placed closest to the anchor."
  			},
  			bottom: {
  				doc: "The bottom of the text is placed closest to the anchor."
  			},
  			"top-left": {
  				doc: "The top left corner of the text is placed closest to the anchor."
  			},
  			"top-right": {
  				doc: "The top right corner of the text is placed closest to the anchor."
  			},
  			"bottom-left": {
  				doc: "The bottom left corner of the text is placed closest to the anchor."
  			},
  			"bottom-right": {
  				doc: "The bottom right corner of the text is placed closest to the anchor."
  			}
  		},
  		"default": "center",
  		doc: "Part of the text placed closest to the anchor.",
  		requires: [
  			"text-field",
  			{
  				"!": "text-variable-anchor"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-max-angle": {
  		type: "number",
  		"default": 45,
  		units: "degrees",
  		doc: "Maximum angle change between adjacent characters.",
  		requires: [
  			"text-field",
  			{
  				"symbol-placement": [
  					"line",
  					"line-center"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-writing-mode": {
  		type: "array",
  		value: "enum",
  		values: {
  			horizontal: {
  				doc: "If a text's language supports horizontal writing mode, symbols with point placement would be laid out horizontally."
  			},
  			vertical: {
  				doc: "If a text's language supports vertical writing mode, symbols with point placement would be laid out vertically."
  			}
  		},
  		doc: "The property allows control over a symbol's orientation. Note that the property values act as a hint, so that a symbol whose language doesn’t support the provided orientation will be laid out in its natural orientation. Example: English point symbol will be rendered horizontally even if array value contains single 'vertical' enum value. The order of elements in an array define priority order for the placement of an orientation variant.",
  		requires: [
  			"text-field",
  			{
  				"symbol-placement": [
  					"point"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "1.3.0",
  				android: "8.3.0",
  				ios: "5.3.0",
  				macos: "0.15.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-rotate": {
  		type: "number",
  		"default": 0,
  		period: 360,
  		units: "degrees",
  		doc: "Rotates the text clockwise.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-padding": {
  		type: "number",
  		"default": 2,
  		minimum: 0,
  		units: "pixels",
  		doc: "Size of the additional area around the text bounding box used for detecting symbol collisions.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-keep-upright": {
  		type: "boolean",
  		"default": true,
  		doc: "If true, the text may be flipped vertically to prevent it from being rendered upside-down.",
  		requires: [
  			"text-field",
  			{
  				"text-rotation-alignment": "map"
  			},
  			{
  				"symbol-placement": [
  					"line",
  					"line-center"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-transform": {
  		type: "enum",
  		values: {
  			none: {
  				doc: "The text is not altered."
  			},
  			uppercase: {
  				doc: "Forces all letters to be displayed in uppercase."
  			},
  			lowercase: {
  				doc: "Forces all letters to be displayed in lowercase."
  			}
  		},
  		"default": "none",
  		doc: "Specifies how to capitalize text, similar to the CSS `text-transform` property.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-offset": {
  		type: "array",
  		doc: "Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up. If used with text-variable-anchor, input values will be taken as absolute values. Offsets along the x- and y-axis will be applied automatically based on the anchor position.",
  		value: "number",
  		units: "ems",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		requires: [
  			"text-field",
  			{
  				"!": "text-radial-offset"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-allow-overlap": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the text will be visible even if it collides with other previously drawn symbols.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-ignore-placement": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, other symbols can be visible even if they collide with the text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-optional": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.",
  		requires: [
  			"text-field",
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_raster = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_hillshade = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var filter = {
  	type: "array",
  	value: "*",
  	doc: "A filter selects specific features from a layer."
  };
  var filter_operator = {
  	type: "enum",
  	values: {
  		"==": {
  			doc: "`[\"==\", key, value]` equality: `feature[key] = value`"
  		},
  		"!=": {
  			doc: "`[\"!=\", key, value]` inequality: `feature[key] ≠ value`"
  		},
  		">": {
  			doc: "`[\">\", key, value]` greater than: `feature[key] > value`"
  		},
  		">=": {
  			doc: "`[\">=\", key, value]` greater than or equal: `feature[key] ≥ value`"
  		},
  		"<": {
  			doc: "`[\"<\", key, value]` less than: `feature[key] < value`"
  		},
  		"<=": {
  			doc: "`[\"<=\", key, value]` less than or equal: `feature[key] ≤ value`"
  		},
  		"in": {
  			doc: "`[\"in\", key, v0, ..., vn]` set inclusion: `feature[key] ∈ {v0, ..., vn}`"
  		},
  		"!in": {
  			doc: "`[\"!in\", key, v0, ..., vn]` set exclusion: `feature[key] ∉ {v0, ..., vn}`"
  		},
  		all: {
  			doc: "`[\"all\", f0, ..., fn]` logical `AND`: `f0 ∧ ... ∧ fn`"
  		},
  		any: {
  			doc: "`[\"any\", f0, ..., fn]` logical `OR`: `f0 ∨ ... ∨ fn`"
  		},
  		none: {
  			doc: "`[\"none\", f0, ..., fn]` logical `NOR`: `¬f0 ∧ ... ∧ ¬fn`"
  		},
  		has: {
  			doc: "`[\"has\", key]` `feature[key]` exists"
  		},
  		"!has": {
  			doc: "`[\"!has\", key]` `feature[key]` does not exist"
  		},
  		within: {
  			doc: "`[\"within\", object]` feature geometry is within object geometry"
  		}
  	},
  	doc: "The filter operator."
  };
  var geometry_type = {
  	type: "enum",
  	values: {
  		Point: {
  			doc: "Filter to point geometries."
  		},
  		LineString: {
  			doc: "Filter to line geometries."
  		},
  		Polygon: {
  			doc: "Filter to polygon geometries."
  		}
  	},
  	doc: "The geometry type for the filter to select."
  };
  var function_stop = {
  	type: "array",
  	minimum: 0,
  	maximum: 24,
  	value: [
  		"number",
  		"color"
  	],
  	length: 2,
  	doc: "Zoom level and value pair."
  };
  var expression = {
  	type: "array",
  	value: "*",
  	minimum: 1,
  	doc: "An expression defines a function that can be used for data-driven style properties or feature filters."
  };
  var expression_name = {
  	doc: "",
  	type: "enum",
  	values: {
  		"let": {
  			doc: "Binds expressions to named variables, which can then be referenced in the result expression using [\"var\", \"variable_name\"].",
  			group: "Variable binding",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"var": {
  			doc: "References variable bound using \"let\".",
  			group: "Variable binding",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		literal: {
  			doc: "Provides a literal array or object value.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		array: {
  			doc: "Asserts that the input is an array (optionally with a specific item type and length).  If, when the input expression is evaluated, it is not of the asserted type, then this assertion will cause the whole expression to be aborted.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		at: {
  			doc: "Retrieves an item from an array.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"in": {
  			doc: "Determines whether an item exists in an array or a substring exists in a string.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "1.6.0",
  					android: "9.1.0",
  					ios: "5.8.0",
  					macos: "0.15.0"
  				}
  			}
  		},
  		"index-of": {
  			doc: "Returns the first position at which an item can be found in an array or a substring can be found in a string, or `-1` if the input cannot be found. Accepts an optional index from where to begin the search.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "1.10.0"
  				}
  			}
  		},
  		slice: {
  			doc: "Returns an item from an array or a substring from a string from a specified start index, or between a start index and an end index if set. The return value is inclusive of the start index but not of the end index.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "1.10.0"
  				}
  			}
  		},
  		"case": {
  			doc: "Selects the first output whose corresponding test condition evaluates to true, or the fallback value otherwise.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		match: {
  			doc: "Selects the output whose label value matches the input value, or the fallback value if no match is found. The input can be any expression (e.g. `[\"get\", \"building_type\"]`). Each label must be either:\n - a single literal value; or\n - an array of literal values, whose values must be all strings or all numbers (e.g. `[100, 101]` or `[\"c\", \"b\"]`). The input matches if any of the values in the array matches, similar to the `\"in\"` operator.\nEach label must be unique. If the input type does not match the type of the labels, the result will be the fallback value.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		coalesce: {
  			doc: "Evaluates each expression in turn until the first non-null value is obtained, and returns that value.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		step: {
  			doc: "Produces discrete, stepped results by evaluating a piecewise-constant function defined by pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. Returns the output value of the stop just less than the input, or the first output if the input is less than the first stop.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.42.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		interpolate: {
  			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. The output type must be `number`, `array<number>`, or `color`.\n\nInterpolation types:\n- `[\"linear\"]`: Interpolates linearly between the pair of stops just less than and just greater than the input.\n- `[\"exponential\", base]`: Interpolates exponentially between the stops just less than and just greater than the input. `base` controls the rate at which the output increases: higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.\n- `[\"cubic-bezier\", x1, y1, x2, y2]`: Interpolates using the cubic bezier curve defined by the given control points.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.42.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"interpolate-hcl": {
  			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the Hue-Chroma-Luminance color space.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.49.0"
  				}
  			}
  		},
  		"interpolate-lab": {
  			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the CIELAB color space.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.49.0"
  				}
  			}
  		},
  		ln2: {
  			doc: "Returns mathematical constant ln(2).",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		pi: {
  			doc: "Returns the mathematical constant pi.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		e: {
  			doc: "Returns the mathematical constant e.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"typeof": {
  			doc: "Returns a string describing the type of the given value.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		string: {
  			doc: "Asserts that the input value is a string. If multiple values are provided, each one is evaluated in order until a string is obtained. If none of the inputs are strings, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		number: {
  			doc: "Asserts that the input value is a number. If multiple values are provided, each one is evaluated in order until a number is obtained. If none of the inputs are numbers, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		boolean: {
  			doc: "Asserts that the input value is a boolean. If multiple values are provided, each one is evaluated in order until a boolean is obtained. If none of the inputs are booleans, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		object: {
  			doc: "Asserts that the input value is an object. If multiple values are provided, each one is evaluated in order until an object is obtained. If none of the inputs are objects, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		collator: {
  			doc: "Returns a `collator` for use in locale-dependent comparison operations. The `case-sensitive` and `diacritic-sensitive` options default to `false`. The `locale` argument specifies the IETF language tag of the locale to use. If none is provided, the default locale is used. If the requested locale is not available, the `collator` will use a system-defined fallback locale. Use `resolved-locale` to test the results of locale fallback behavior.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		format: {
  			doc: "Returns a `formatted` string for displaying mixed-format text in the `text-field` property. The input may contain a string literal or expression, including an [`'image'`](#types-image) expression. Strings may be followed by a style override object that supports the following properties:\n- `\"text-font\"`: Overrides the font stack specified by the root layout property.\n- `\"text-color\"`: Overrides the color specified by the root paint property.\n- `\"font-scale\"`: Applies a scaling factor on `text-size` as specified by the root layout property.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.48.0",
  					android: "6.7.0",
  					ios: "4.6.0",
  					macos: "0.12.0"
  				},
  				"text-font": {
  					js: "0.48.0",
  					android: "6.7.0",
  					ios: "4.6.0",
  					macos: "0.12.0"
  				},
  				"font-scale": {
  					js: "0.48.0",
  					android: "6.7.0",
  					ios: "4.6.0",
  					macos: "0.12.0"
  				},
  				"text-color": {
  					js: "1.3.0",
  					android: "7.3.0",
  					ios: "4.10.0",
  					macos: "0.14.0"
  				},
  				image: {
  					js: "1.6.0",
  					android: "8.6.0",
  					ios: "5.7.0",
  					macos: "0.15.0"
  				}
  			}
  		},
  		image: {
  			doc: "Returns an `image` type for use in `icon-image`, `*-pattern` entries and as a section in the `format` expression. If set, the `image` argument will check that the requested image exists in the style and will return either the resolved image name or `null`, depending on whether or not the image is currently in the style. This validation process is synchronous and requires the image to have been added to the style before requesting it in the `image` argument.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "1.4.0",
  					android: "8.6.0",
  					ios: "5.7.0",
  					macos: "0.15.0"
  				}
  			}
  		},
  		"number-format": {
  			doc: "Converts the input number into a string representation using the providing formatting rules. If set, the `locale` argument specifies the locale to use, as a BCP 47 language tag. If set, the `currency` argument specifies an ISO 4217 code to use for currency-style formatting. If set, the `min-fraction-digits` and `max-fraction-digits` arguments specify the minimum and maximum number of fractional digits to include.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.54.0"
  				}
  			}
  		},
  		"to-string": {
  			doc: "Converts the input value to a string. If the input is `null`, the result is `\"\"`. If the input is a boolean, the result is `\"true\"` or `\"false\"`. If the input is a number, it is converted to a string as specified by the [\"NumberToString\" algorithm](https://tc39.github.io/ecma262/#sec-tostring-applied-to-the-number-type) of the ECMAScript Language Specification. If the input is a color, it is converted to a string of the form `\"rgba(r,g,b,a)\"`, where `r`, `g`, and `b` are numerals ranging from 0 to 255, and `a` ranges from 0 to 1. Otherwise, the input is converted to a string in the format specified by the [`JSON.stringify`](https://tc39.github.io/ecma262/#sec-json.stringify) function of the ECMAScript Language Specification.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-number": {
  			doc: "Converts the input value to a number, if possible. If the input is `null` or `false`, the result is 0. If the input is `true`, the result is 1. If the input is a string, it is converted to a number as specified by the [\"ToNumber Applied to the String Type\" algorithm](https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type) of the ECMAScript Language Specification. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-boolean": {
  			doc: "Converts the input value to a boolean. The result is `false` when then input is an empty string, 0, `false`, `null`, or `NaN`; otherwise it is `true`.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-rgba": {
  			doc: "Returns a four-element array containing the input color's red, green, blue, and alpha components, in that order.",
  			group: "Color",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-color": {
  			doc: "Converts the input value to a color. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		rgb: {
  			doc: "Creates a color value from red, green, and blue components, which must range between 0 and 255, and an alpha component of 1. If any component is out of range, the expression is an error.",
  			group: "Color",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		rgba: {
  			doc: "Creates a color value from red, green, blue components, which must range between 0 and 255, and an alpha component which must range between 0 and 1. If any component is out of range, the expression is an error.",
  			group: "Color",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		get: {
  			doc: "Retrieves a property value from the current feature's properties, or from another object if a second argument is provided. Returns null if the requested property is missing.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		has: {
  			doc: "Tests for the presence of an property value in the current feature's properties, or from another object if a second argument is provided.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		length: {
  			doc: "Gets the length of an array or string.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		properties: {
  			doc: "Gets the feature properties object.  Note that in some cases, it may be more efficient to use [\"get\", \"property_name\"] directly.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"feature-state": {
  			doc: "Retrieves a property value from the current feature's state. Returns null if the requested property is not present on the feature's state. A feature's state is not part of the GeoJSON or vector tile data, and must be set programmatically on each feature. Features are identified by their `id` attribute, which must be an integer or a string that can be cast to an integer. Note that [\"feature-state\"] can only be used with paint properties that support data-driven styling.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.46.0"
  				}
  			}
  		},
  		"geometry-type": {
  			doc: "Gets the feature's geometry type: `Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon`, `MultiPolygon`.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		id: {
  			doc: "Gets the feature's id, if it has one.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		zoom: {
  			doc: "Gets the current zoom level.  Note that in style layout and paint properties, [\"zoom\"] may only appear as the input to a top-level \"step\" or \"interpolate\" expression.",
  			group: "Zoom",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"heatmap-density": {
  			doc: "Gets the kernel density estimation of a pixel in a heatmap layer, which is a relative measure of how many data points are crowded around a particular pixel. Can only be used in the `heatmap-color` property.",
  			group: "Heatmap",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"line-progress": {
  			doc: "Gets the progress along a gradient line. Can only be used in the `line-gradient` property.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.6.0",
  					macos: "0.12.0"
  				}
  			}
  		},
  		"sky-radial-progress": {
  			doc: "Gets the distance of a point on the sky from the sun position. Returns 0 at sun position and 1 when the distance reaches `sky-gradient-radius`. Can only be used in the `sky-gradient` property.",
  			group: "sky",
  			"sdk-support": {
  				"basic functionality": {
  					js: "2.0.0"
  				}
  			}
  		},
  		accumulated: {
  			doc: "Gets the value of a cluster property accumulated so far. Can only be used in the `clusterProperties` option of a clustered GeoJSON source.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.53.0"
  				}
  			}
  		},
  		"+": {
  			doc: "Returns the sum of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"*": {
  			doc: "Returns the product of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"-": {
  			doc: "For two inputs, returns the result of subtracting the second input from the first. For a single input, returns the result of subtracting it from 0.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"/": {
  			doc: "Returns the result of floating point division of the first input by the second.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"%": {
  			doc: "Returns the remainder after integer division of the first input by the second.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"^": {
  			doc: "Returns the result of raising the first input to the power specified by the second.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		sqrt: {
  			doc: "Returns the square root of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.42.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		log10: {
  			doc: "Returns the base-ten logarithm of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		ln: {
  			doc: "Returns the natural logarithm of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		log2: {
  			doc: "Returns the base-two logarithm of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		sin: {
  			doc: "Returns the sine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		cos: {
  			doc: "Returns the cosine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		tan: {
  			doc: "Returns the tangent of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		asin: {
  			doc: "Returns the arcsine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		acos: {
  			doc: "Returns the arccosine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		atan: {
  			doc: "Returns the arctangent of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		min: {
  			doc: "Returns the minimum value of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		max: {
  			doc: "Returns the maximum value of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		round: {
  			doc: "Rounds the input to the nearest integer. Halfway values are rounded away from zero. For example, `[\"round\", -1.5]` evaluates to -2.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		abs: {
  			doc: "Returns the absolute value of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		ceil: {
  			doc: "Returns the smallest integer that is greater than or equal to the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		floor: {
  			doc: "Returns the largest integer that is less than or equal to the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		distance: {
  			doc: "Returns the shortest distance in meters between the evaluated feature and the input geometry. The input value can be a valid GeoJSON of type `Point`, `MultiPoint`, `LineString`, `MultiLineString`, `Polygon`, `MultiPolygon`, `Feature`, or `FeatureCollection`. Distance values returned may vary in precision due to loss in precision from encoding geometries, particularly below zoom level 13.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					android: "9.2.0",
  					ios: "5.9.0",
  					macos: "0.16.0"
  				}
  			}
  		},
  		"==": {
  			doc: "Returns `true` if the input values are equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		"!=": {
  			doc: "Returns `true` if the input values are not equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		">": {
  			doc: "Returns `true` if the first input is strictly greater than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		"<": {
  			doc: "Returns `true` if the first input is strictly less than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		">=": {
  			doc: "Returns `true` if the first input is greater than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		"<=": {
  			doc: "Returns `true` if the first input is less than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		all: {
  			doc: "Returns `true` if all the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `false`, the result is `false` and no further input expressions are evaluated.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		any: {
  			doc: "Returns `true` if any of the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `true`, the result is `true` and no further input expressions are evaluated.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"!": {
  			doc: "Logical negation. Returns `true` if the input is `false`, and `false` if the input is `true`.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		within: {
  			doc: "Returns `true` if the evaluated feature is fully contained inside a boundary of the input geometry, `false` otherwise. The input value can be a valid GeoJSON of type `Polygon`, `MultiPolygon`, `Feature`, or `FeatureCollection`. Supported features for evaluation:\n- `Point`: Returns `false` if a point is on the boundary or falls outside the boundary.\n- `LineString`: Returns `false` if any part of a line falls outside the boundary, the line intersects the boundary, or a line's endpoint is on the boundary.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "1.9.0",
  					android: "9.1.0",
  					ios: "5.8.0",
  					macos: "0.15.0"
  				}
  			}
  		},
  		"is-supported-script": {
  			doc: "Returns `true` if the input string is expected to render legibly. Returns `false` if the input string contains sections that cannot be rendered without potential loss of meaning (e.g. Indic scripts that require complex text shaping, or right-to-left scripts if the the `mapbox-gl-rtl-text` plugin is not in use in Mapbox GL JS).",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.6.0"
  				}
  			}
  		},
  		upcase: {
  			doc: "Returns the input string converted to uppercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		downcase: {
  			doc: "Returns the input string converted to lowercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		concat: {
  			doc: "Returns a `string` consisting of the concatenation of the inputs. Each input is converted to a string as if by `to-string`.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"resolved-locale": {
  			doc: "Returns the IETF language tag of the locale being used by the provided `collator`. This can be used to determine the default system locale, or to determine if a requested locale was successfully loaded.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		}
  	}
  };
  var light = {
  	anchor: {
  		type: "enum",
  		"default": "viewport",
  		values: {
  			map: {
  				doc: "The position of the light source is aligned to the rotation of the map."
  			},
  			viewport: {
  				doc: "The position of the light source is aligned to the rotation of the viewport."
  			}
  		},
  		"property-type": "data-constant",
  		transition: false,
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		doc: "Whether extruded geometries are lit relative to the map or viewport.",
  		example: "map",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	},
  	position: {
  		type: "array",
  		"default": [
  			1.15,
  			210,
  			30
  		],
  		length: 3,
  		value: "number",
  		"property-type": "data-constant",
  		transition: true,
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		doc: "Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).",
  		example: [
  			1.5,
  			90,
  			80
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	},
  	color: {
  		type: "color",
  		"property-type": "data-constant",
  		"default": "#ffffff",
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		transition: true,
  		doc: "Color tint for lighting extruded geometries.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	},
  	intensity: {
  		type: "number",
  		"property-type": "data-constant",
  		"default": 0.5,
  		minimum: 0,
  		maximum: 1,
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		transition: true,
  		doc: "Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	}
  };
  var terrain = {
  	source: {
  		type: "string",
  		doc: "Name of a source of `raster_dem` type to be used for terrain elevation.",
  		required: true
  	},
  	exaggeration: {
  		type: "number",
  		"property-type": "data-constant",
  		"default": 1,
  		minimum: 0,
  		maximum: 1000,
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		transition: true,
  		doc: "Exaggerates the elevation of the terrain by multiplying the data from the DEM with this value.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		}
  	}
  };
  var paint = [
  	"paint_fill",
  	"paint_line",
  	"paint_circle",
  	"paint_heatmap",
  	"paint_fill-extrusion",
  	"paint_symbol",
  	"paint_raster",
  	"paint_hillshade",
  	"paint_background",
  	"paint_sky"
  ];
  var paint_fill = {
  	"fill-antialias": {
  		type: "boolean",
  		"default": true,
  		doc: "Whether or not the fill should be antialiased.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-opacity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		doc: "The opacity of the entire fill layer. In contrast to the `fill-color`, this value will also affect the 1px stroke around the fill, if the stroke is used.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.21.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The color of the filled part of this layer. This color can be specified as `rgba` with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.",
  		transition: true,
  		requires: [
  			{
  				"!": "fill-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.19.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-outline-color": {
  		type: "color",
  		doc: "The outline color of the fill. Matches the value of `fill-color` if unspecified.",
  		transition: true,
  		requires: [
  			{
  				"!": "fill-pattern"
  			},
  			{
  				"fill-antialias": true
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.19.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The fill is translated relative to the map."
  			},
  			viewport: {
  				doc: "The fill is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `fill-translate`.",
  		"default": "map",
  		requires: [
  			"fill-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-pattern": {
  		type: "resolvedImage",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.49.0",
  				android: "6.5.0",
  				macos: "0.11.0",
  				ios: "4.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "cross-faded-data-driven"
  	}
  };
  var paint_line = {
  	"line-opacity": {
  		type: "number",
  		doc: "The opacity at which the line will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-color": {
  		type: "color",
  		doc: "The color with which the line will be drawn.",
  		"default": "#000000",
  		transition: true,
  		requires: [
  			{
  				"!": "line-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.23.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The line is translated relative to the map."
  			},
  			viewport: {
  				doc: "The line is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `line-translate`.",
  		"default": "map",
  		requires: [
  			"line-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-width": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Stroke thickness.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-gap-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		doc: "Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.",
  		transition: true,
  		units: "pixels",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-offset": {
  		type: "number",
  		"default": 0,
  		doc: "The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.",
  		transition: true,
  		units: "pixels",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.12.1",
  				android: "3.0.0",
  				ios: "3.1.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-blur": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Blur applied to the line, in pixels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-dasharray": {
  		type: "array",
  		value: "number",
  		doc: "Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with `lineMetrics: true` specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		minimum: 0,
  		transition: true,
  		units: "line widths",
  		requires: [
  			{
  				"!": "line-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "cross-faded"
  	},
  	"line-pattern": {
  		type: "resolvedImage",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.49.0",
  				android: "6.5.0",
  				macos: "0.11.0",
  				ios: "4.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "cross-faded-data-driven"
  	},
  	"line-gradient": {
  		type: "color",
  		doc: "Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify `\"lineMetrics\": true`.",
  		transition: false,
  		requires: [
  			{
  				"!": "line-dasharray"
  			},
  			{
  				"!": "line-pattern"
  			},
  			{
  				source: "geojson",
  				has: {
  					lineMetrics: true
  				}
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.45.0",
  				android: "6.5.0",
  				ios: "4.4.0",
  				macos: "0.11.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"line-progress"
  			]
  		},
  		"property-type": "color-ramp"
  	}
  };
  var paint_circle = {
  	"circle-radius": {
  		type: "number",
  		"default": 5,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Circle radius.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.18.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The fill color of the circle.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.18.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-blur": {
  		type: "number",
  		"default": 0,
  		doc: "Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.20.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-opacity": {
  		type: "number",
  		doc: "The opacity at which the circle will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.20.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The circle is translated relative to the map."
  			},
  			viewport: {
  				doc: "The circle is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `circle-translate`.",
  		"default": "map",
  		requires: [
  			"circle-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-pitch-scale": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "Circles are scaled according to their apparent distance to the camera."
  			},
  			viewport: {
  				doc: "Circles are not scaled."
  			}
  		},
  		"default": "map",
  		doc: "Controls the scaling behavior of the circle when the map is pitched.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-pitch-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The circle is aligned to the plane of the map."
  			},
  			viewport: {
  				doc: "The circle is aligned to the plane of the viewport."
  			}
  		},
  		"default": "viewport",
  		doc: "Orientation of circle when map is pitched.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-stroke-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "The width of the circle's stroke. Strokes are placed outside of the `circle-radius`.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-stroke-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The stroke color of the circle.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-stroke-opacity": {
  		type: "number",
  		doc: "The opacity of the circle's stroke.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	}
  };
  var paint_heatmap = {
  	"heatmap-radius": {
  		type: "number",
  		"default": 30,
  		minimum: 1,
  		transition: true,
  		units: "pixels",
  		doc: "Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"heatmap-weight": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		transition: false,
  		doc: "A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"heatmap-intensity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		transition: true,
  		doc: "Similar to `heatmap-weight` but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"heatmap-color": {
  		type: "color",
  		"default": [
  			"interpolate",
  			[
  				"linear"
  			],
  			[
  				"heatmap-density"
  			],
  			0,
  			"rgba(0, 0, 255, 0)",
  			0.1,
  			"royalblue",
  			0.3,
  			"cyan",
  			0.5,
  			"lime",
  			0.7,
  			"yellow",
  			1,
  			"red"
  		],
  		doc: "Defines the color of each pixel based on its density value in a heatmap.  Should be an expression that uses `[\"heatmap-density\"]` as input.",
  		transition: false,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"heatmap-density"
  			]
  		},
  		"property-type": "color-ramp"
  	},
  	"heatmap-opacity": {
  		type: "number",
  		doc: "The global opacity at which the heatmap layer will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_symbol = {
  	"icon-opacity": {
  		doc: "The opacity at which the icon will be drawn.",
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-color": {
  		type: "color",
  		"default": "#000000",
  		transition: true,
  		doc: "The color of the icon. This can only be used with sdf icons.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-halo-color": {
  		type: "color",
  		"default": "rgba(0, 0, 0, 0)",
  		transition: true,
  		doc: "The color of the icon's halo. Icon halos can only be used with SDF icons.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-halo-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Distance of halo to the icon outline.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-halo-blur": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Fade out the halo towards the outside.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "Icons are translated relative to the map."
  			},
  			viewport: {
  				doc: "Icons are translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `icon-translate`.",
  		"default": "map",
  		requires: [
  			"icon-image",
  			"icon-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-opacity": {
  		type: "number",
  		doc: "The opacity at which the text will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-color": {
  		type: "color",
  		doc: "The color with which the text will be drawn.",
  		"default": "#000000",
  		transition: true,
  		overridable: true,
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-halo-color": {
  		type: "color",
  		"default": "rgba(0, 0, 0, 0)",
  		transition: true,
  		doc: "The color of the text's halo, which helps it stand out from backgrounds.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-halo-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-halo-blur": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "The halo's fadeout distance towards the outside.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The text is translated relative to the map."
  			},
  			viewport: {
  				doc: "The text is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `text-translate`.",
  		"default": "map",
  		requires: [
  			"text-field",
  			"text-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_raster = {
  	"raster-opacity": {
  		type: "number",
  		doc: "The opacity at which the image will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-hue-rotate": {
  		type: "number",
  		"default": 0,
  		period: 360,
  		transition: true,
  		units: "degrees",
  		doc: "Rotates hues around the color wheel.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-brightness-min": {
  		type: "number",
  		doc: "Increase or reduce the brightness of the image. The value is the minimum brightness.",
  		"default": 0,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-brightness-max": {
  		type: "number",
  		doc: "Increase or reduce the brightness of the image. The value is the maximum brightness.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-saturation": {
  		type: "number",
  		doc: "Increase or reduce the saturation of the image.",
  		"default": 0,
  		minimum: -1,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-contrast": {
  		type: "number",
  		doc: "Increase or reduce the contrast of the image.",
  		"default": 0,
  		minimum: -1,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-resampling": {
  		type: "enum",
  		doc: "The resampling/interpolation method to use for overscaling, also known as texture magnification filter",
  		values: {
  			linear: {
  				doc: "(Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled"
  			},
  			nearest: {
  				doc: "Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled"
  			}
  		},
  		"default": "linear",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.47.0",
  				android: "6.3.0",
  				ios: "4.2.0",
  				macos: "0.9.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-fade-duration": {
  		type: "number",
  		"default": 300,
  		minimum: 0,
  		transition: false,
  		units: "milliseconds",
  		doc: "Fade duration when a new tile is added.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_hillshade = {
  	"hillshade-illumination-direction": {
  		type: "number",
  		"default": 335,
  		minimum: 0,
  		maximum: 359,
  		doc: "The direction of the light source used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to `viewport` and due north if `hillshade-illumination-anchor` is set to `map`.",
  		transition: false,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-illumination-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The hillshade illumination is relative to the north direction."
  			},
  			viewport: {
  				doc: "The hillshade illumination is relative to the top of the viewport."
  			}
  		},
  		"default": "viewport",
  		doc: "Direction of light source when map is rotated.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-exaggeration": {
  		type: "number",
  		doc: "Intensity of the hillshade",
  		"default": 0.5,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-shadow-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The shading color of areas that face away from the light source.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-highlight-color": {
  		type: "color",
  		"default": "#FFFFFF",
  		doc: "The shading color of areas that faces towards the light source.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-accent-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The shading color used to accentuate rugged terrain like sharp cliffs and gorges.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_background = {
  	"background-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The color with which the background will be drawn.",
  		transition: true,
  		requires: [
  			{
  				"!": "background-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"background-pattern": {
  		type: "resolvedImage",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "cross-faded"
  	},
  	"background-opacity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		doc: "The opacity at which the background will be drawn.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_sky = {
  	"sky-type": {
  		type: "enum",
  		values: {
  			gradient: {
  				doc: "Renders the sky with a gradient that can be configured with `sky-gradient-radius` and `sky-gradient`."
  			},
  			atmosphere: {
  				doc: "Renders the sky with a simulated atmospheric scattering algorithm, the sun direction can be attached to the light position or explicitly set through `sky-atmosphere-sun`."
  			}
  		},
  		"default": "atmosphere",
  		doc: "The type of the sky",
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"sky-atmosphere-sun": {
  		type: "array",
  		value: "number",
  		length: 2,
  		transition: false,
  		doc: "Position of the sun center [a azimuthal angle, p polar angle]. The azimuthal angle indicates the position of the sun relative to 0° north, where degrees proceed clockwise. The polar angle indicates the height of the sun, where 0° is directly above, at zenith, and 90° at the horizon. When this property is ommitted, the sun center is directly inherited from the light position.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		requires: [
  			{
  				"sky-type": "atmosphere"
  			}
  		],
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"sky-atmosphere-sun-intensity": {
  		type: "number",
  		requires: [
  			{
  				"sky-type": "atmosphere"
  			}
  		],
  		"default": 10,
  		minimum: 0,
  		maximum: 100,
  		transition: false,
  		doc: "Intensity of the sun as a light source in the atmosphere (on a scale from 0 to a 100). Setting higher values will brighten up the sky.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		"property-type": "data-constant"
  	},
  	"sky-gradient-center": {
  		type: "array",
  		requires: [
  			{
  				"sky-type": "gradient"
  			}
  		],
  		value: "number",
  		"default": [
  			0,
  			0
  		],
  		length: 2,
  		transition: false,
  		doc: "Position of the gradient center [a azimuthal angle, p polar angle]. The azimuthal angle indicates the position of the gradient center relative to 0° north, where degrees proceed clockwise. The polar angle indicates the height of the gradient center, where 0° is directly above, at zenith, and 90° at the horizon.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"sky-gradient-radius": {
  		type: "number",
  		requires: [
  			{
  				"sky-type": "gradient"
  			}
  		],
  		"default": 90,
  		minimum: 0,
  		maximum: 180,
  		transition: false,
  		doc: "The angular distance (measured in degrees) from `sky-gradient-center` up to which the gradient extends. A value of 180 causes the gradient to wrap around to the opposite direction from `sky-gradient-center`.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"sky-gradient": {
  		type: "color",
  		"default": [
  			"interpolate",
  			[
  				"linear"
  			],
  			[
  				"sky-radial-progress"
  			],
  			0.8,
  			"#87ceeb",
  			1,
  			"white"
  		],
  		doc: "Defines a radial color gradient with which to color the sky. The color values can be interpolated with an expression using `sky-radial-progress`. The range [0, 1] for the interpolant covers a radial distance (in degrees) of [0, `sky-gradient-radius`] centered at the position specified by `sky-gradient-center`.",
  		transition: false,
  		requires: [
  			{
  				"sky-type": "gradient"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"sky-radial-progress"
  			]
  		},
  		"property-type": "color-ramp"
  	},
  	"sky-atmosphere-halo-color": {
  		type: "color",
  		"default": "white",
  		doc: "A color applied to the atmosphere sun halo. The alpha channel describes how strongly the sun halo is represented in an atmosphere sky layer.",
  		transition: false,
  		requires: [
  			{
  				"sky-type": "atmosphere"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		"property-type": "data-constant"
  	},
  	"sky-atmosphere-color": {
  		type: "color",
  		"default": "white",
  		doc: "A color used to tweak the main atmospheric scattering coefficients. Using white applies the default coefficients giving the natural blue color to the atmosphere. This color affects how heavily the corresponding wavelength is represented during scattering. The alpha channel describes the density of the atmosphere, with 1 maximum density and 0 no density.",
  		transition: false,
  		requires: [
  			{
  				"sky-type": "atmosphere"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		"property-type": "data-constant"
  	},
  	"sky-opacity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		doc: "The opacity of the entire sky layer.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "2.0.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var transition = {
  	duration: {
  		type: "number",
  		"default": 300,
  		minimum: 0,
  		units: "milliseconds",
  		doc: "Time allotted for transitions to complete."
  	},
  	delay: {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		units: "milliseconds",
  		doc: "Length of time before a transition begins."
  	}
  };
  var promoteId = {
  	"*": {
  		type: "string",
  		doc: "A name of a feature property to use as ID for feature state."
  	}
  };
  var v8 = {
  	$version: $version,
  	$root: $root,
  	sources: sources,
  	source: source,
  	source_vector: source_vector,
  	source_raster: source_raster,
  	source_raster_dem: source_raster_dem,
  	source_geojson: source_geojson,
  	source_video: source_video,
  	source_image: source_image,
  	layer: layer,
  	layout: layout,
  	layout_background: layout_background,
  	layout_sky: layout_sky,
  	layout_fill: layout_fill,
  	layout_circle: layout_circle,
  	layout_heatmap: layout_heatmap,
  	"layout_fill-extrusion": {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		"property-type": "constant"
  	}
  },
  	layout_line: layout_line,
  	layout_symbol: layout_symbol,
  	layout_raster: layout_raster,
  	layout_hillshade: layout_hillshade,
  	filter: filter,
  	filter_operator: filter_operator,
  	geometry_type: geometry_type,
  	"function": {
  	expression: {
  		type: "expression",
  		doc: "An expression."
  	},
  	stops: {
  		type: "array",
  		doc: "An array of stops.",
  		value: "function_stop"
  	},
  	base: {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		doc: "The exponential base of the interpolation curve. It controls the rate at which the result increases. Higher values make the result increase more towards the high end of the range. With `1` the stops are interpolated linearly."
  	},
  	property: {
  		type: "string",
  		doc: "The name of a feature property to use as the function input.",
  		"default": "$zoom"
  	},
  	type: {
  		type: "enum",
  		values: {
  			identity: {
  				doc: "Return the input value as the output value."
  			},
  			exponential: {
  				doc: "Generate an output by interpolating between stops just less than and just greater than the function input."
  			},
  			interval: {
  				doc: "Return the output value of the stop just less than the function input."
  			},
  			categorical: {
  				doc: "Return the output value of the stop equal to the function input."
  			}
  		},
  		doc: "The interpolation strategy to use in function evaluation.",
  		"default": "exponential"
  	},
  	colorSpace: {
  		type: "enum",
  		values: {
  			rgb: {
  				doc: "Use the RGB color space to interpolate color values"
  			},
  			lab: {
  				doc: "Use the LAB color space to interpolate color values."
  			},
  			hcl: {
  				doc: "Use the HCL color space to interpolate color values, interpolating the Hue, Chroma, and Luminance channels individually."
  			}
  		},
  		doc: "The color space in which colors interpolated. Interpolating colors in perceptual color spaces like LAB and HCL tend to produce color ramps that look more consistent and produce colors that can be differentiated more easily than those interpolated in RGB space.",
  		"default": "rgb"
  	},
  	"default": {
  		type: "*",
  		required: false,
  		doc: "A value to serve as a fallback function result when a value isn't otherwise available. It is used in the following circumstances:\n* In categorical functions, when the feature value does not match any of the stop domain values.\n* In property and zoom-and-property functions, when a feature does not contain a value for the specified property.\n* In identity functions, when the feature value is not valid for the style property (for example, if the function is being used for a `circle-color` property but the feature property value is not a string or not a valid color).\n* In interval or exponential property and zoom-and-property functions, when the feature value is not numeric.\nIf no default is provided, the style property's default is used in these circumstances."
  	}
  },
  	function_stop: function_stop,
  	expression: expression,
  	expression_name: expression_name,
  	light: light,
  	terrain: terrain,
  	paint: paint,
  	paint_fill: paint_fill,
  	"paint_fill-extrusion": {
  	"fill-extrusion-opacity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		doc: "The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-extrusion-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root `light` settings. If this color is specified as `rgba` with an alpha component, the alpha component will be ignored; use `fill-extrusion-opacity` to set layer opacity.",
  		transition: true,
  		requires: [
  			{
  				"!": "fill-extrusion-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-extrusion-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-extrusion-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The fill extrusion is translated relative to the map."
  			},
  			viewport: {
  				doc: "The fill extrusion is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `fill-extrusion-translate`.",
  		"default": "map",
  		requires: [
  			"fill-extrusion-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-extrusion-pattern": {
  		type: "resolvedImage",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.49.0",
  				android: "6.5.0",
  				macos: "0.11.0",
  				ios: "4.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "cross-faded-data-driven"
  	},
  	"fill-extrusion-height": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		units: "meters",
  		doc: "The height with which to extrude this layer.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-extrusion-base": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		units: "meters",
  		doc: "The height with which to extrude the base of this layer. Must be less than or equal to `fill-extrusion-height`.",
  		transition: true,
  		requires: [
  			"fill-extrusion-height"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-extrusion-vertical-gradient": {
  		type: "boolean",
  		"default": true,
  		doc: "Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.",
  		transition: false,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.50.0",
  				ios: "4.7.0",
  				macos: "0.13.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  },
  	paint_line: paint_line,
  	paint_circle: paint_circle,
  	paint_heatmap: paint_heatmap,
  	paint_symbol: paint_symbol,
  	paint_raster: paint_raster,
  	paint_hillshade: paint_hillshade,
  	paint_background: paint_background,
  	paint_sky: paint_sky,
  	transition: transition,
  	"property-type": {
  	"data-driven": {
  		type: "property-type",
  		doc: "Property is interpolable and can be represented using a property expression."
  	},
  	"cross-faded": {
  		type: "property-type",
  		doc: "Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms."
  	},
  	"cross-faded-data-driven": {
  		type: "property-type",
  		doc: "Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms. It can be represented using a property expression."
  	},
  	"color-ramp": {
  		type: "property-type",
  		doc: "Property should be specified using a color ramp from which the output color can be sampled based on a property calculation."
  	},
  	"data-constant": {
  		type: "property-type",
  		doc: "Property is interpolable but cannot be represented using a property expression."
  	},
  	constant: {
  		type: "property-type",
  		doc: "Property is constant across all zoom levels and property values."
  	}
  },
  	promoteId: promoteId
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var punycode = createCommonjsModule(function (module, exports) {
  (function(root) {

  	/** Detect free variables */
  	var freeExports =  exports &&
  		!exports.nodeType && exports;
  	var freeModule =  module &&
  		!module.nodeType && module;
  	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
  	if (
  		freeGlobal.global === freeGlobal ||
  		freeGlobal.window === freeGlobal ||
  		freeGlobal.self === freeGlobal
  	) {
  		root = freeGlobal;
  	}

  	/**
  	 * The `punycode` object.
  	 * @name punycode
  	 * @type Object
  	 */
  	var punycode,

  	/** Highest positive signed 32-bit float value */
  	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

  	/** Bootstring parameters */
  	base = 36,
  	tMin = 1,
  	tMax = 26,
  	skew = 38,
  	damp = 700,
  	initialBias = 72,
  	initialN = 128, // 0x80
  	delimiter = '-', // '\x2D'

  	/** Regular expressions */
  	regexPunycode = /^xn--/,
  	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
  	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

  	/** Error messages */
  	errors = {
  		'overflow': 'Overflow: input needs wider integers to process',
  		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  		'invalid-input': 'Invalid input'
  	},

  	/** Convenience shortcuts */
  	baseMinusTMin = base - tMin,
  	floor = Math.floor,
  	stringFromCharCode = String.fromCharCode,

  	/** Temporary variable */
  	key;

  	/*--------------------------------------------------------------------------*/

  	/**
  	 * A generic error utility function.
  	 * @private
  	 * @param {String} type The error type.
  	 * @returns {Error} Throws a `RangeError` with the applicable error message.
  	 */
  	function error(type) {
  		throw RangeError(errors[type]);
  	}

  	/**
  	 * A generic `Array#map` utility function.
  	 * @private
  	 * @param {Array} array The array to iterate over.
  	 * @param {Function} callback The function that gets called for every array
  	 * item.
  	 * @returns {Array} A new array of values returned by the callback function.
  	 */
  	function map(array, fn) {
  		var length = array.length;
  		var result = [];
  		while (length--) {
  			result[length] = fn(array[length]);
  		}
  		return result;
  	}

  	/**
  	 * A simple `Array#map`-like wrapper to work with domain name strings or email
  	 * addresses.
  	 * @private
  	 * @param {String} domain The domain name or email address.
  	 * @param {Function} callback The function that gets called for every
  	 * character.
  	 * @returns {Array} A new string of characters returned by the callback
  	 * function.
  	 */
  	function mapDomain(string, fn) {
  		var parts = string.split('@');
  		var result = '';
  		if (parts.length > 1) {
  			// In email addresses, only the domain name should be punycoded. Leave
  			// the local part (i.e. everything up to `@`) intact.
  			result = parts[0] + '@';
  			string = parts[1];
  		}
  		// Avoid `split(regex)` for IE8 compatibility. See #17.
  		string = string.replace(regexSeparators, '\x2E');
  		var labels = string.split('.');
  		var encoded = map(labels, fn).join('.');
  		return result + encoded;
  	}

  	/**
  	 * Creates an array containing the numeric code points of each Unicode
  	 * character in the string. While JavaScript uses UCS-2 internally,
  	 * this function will convert a pair of surrogate halves (each of which
  	 * UCS-2 exposes as separate characters) into a single code point,
  	 * matching UTF-16.
  	 * @see `punycode.ucs2.encode`
  	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  	 * @memberOf punycode.ucs2
  	 * @name decode
  	 * @param {String} string The Unicode input string (UCS-2).
  	 * @returns {Array} The new array of code points.
  	 */
  	function ucs2decode(string) {
  		var output = [],
  		    counter = 0,
  		    length = string.length,
  		    value,
  		    extra;
  		while (counter < length) {
  			value = string.charCodeAt(counter++);
  			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  				// high surrogate, and there is a next character
  				extra = string.charCodeAt(counter++);
  				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
  					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  				} else {
  					// unmatched surrogate; only append this code unit, in case the next
  					// code unit is the high surrogate of a surrogate pair
  					output.push(value);
  					counter--;
  				}
  			} else {
  				output.push(value);
  			}
  		}
  		return output;
  	}

  	/**
  	 * Creates a string based on an array of numeric code points.
  	 * @see `punycode.ucs2.decode`
  	 * @memberOf punycode.ucs2
  	 * @name encode
  	 * @param {Array} codePoints The array of numeric code points.
  	 * @returns {String} The new Unicode string (UCS-2).
  	 */
  	function ucs2encode(array) {
  		return map(array, function(value) {
  			var output = '';
  			if (value > 0xFFFF) {
  				value -= 0x10000;
  				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  				value = 0xDC00 | value & 0x3FF;
  			}
  			output += stringFromCharCode(value);
  			return output;
  		}).join('');
  	}

  	/**
  	 * Converts a basic code point into a digit/integer.
  	 * @see `digitToBasic()`
  	 * @private
  	 * @param {Number} codePoint The basic numeric code point value.
  	 * @returns {Number} The numeric value of a basic code point (for use in
  	 * representing integers) in the range `0` to `base - 1`, or `base` if
  	 * the code point does not represent a value.
  	 */
  	function basicToDigit(codePoint) {
  		if (codePoint - 48 < 10) {
  			return codePoint - 22;
  		}
  		if (codePoint - 65 < 26) {
  			return codePoint - 65;
  		}
  		if (codePoint - 97 < 26) {
  			return codePoint - 97;
  		}
  		return base;
  	}

  	/**
  	 * Converts a digit/integer into a basic code point.
  	 * @see `basicToDigit()`
  	 * @private
  	 * @param {Number} digit The numeric value of a basic code point.
  	 * @returns {Number} The basic code point whose value (when used for
  	 * representing integers) is `digit`, which needs to be in the range
  	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
  	 * used; else, the lowercase form is used. The behavior is undefined
  	 * if `flag` is non-zero and `digit` has no uppercase form.
  	 */
  	function digitToBasic(digit, flag) {
  		//  0..25 map to ASCII a..z or A..Z
  		// 26..35 map to ASCII 0..9
  		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  	}

  	/**
  	 * Bias adaptation function as per section 3.4 of RFC 3492.
  	 * http://tools.ietf.org/html/rfc3492#section-3.4
  	 * @private
  	 */
  	function adapt(delta, numPoints, firstTime) {
  		var k = 0;
  		delta = firstTime ? floor(delta / damp) : delta >> 1;
  		delta += floor(delta / numPoints);
  		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
  			delta = floor(delta / baseMinusTMin);
  		}
  		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  	}

  	/**
  	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
  	 * symbols.
  	 * @memberOf punycode
  	 * @param {String} input The Punycode string of ASCII-only symbols.
  	 * @returns {String} The resulting string of Unicode symbols.
  	 */
  	function decode(input) {
  		// Don't use UCS-2
  		var output = [],
  		    inputLength = input.length,
  		    out,
  		    i = 0,
  		    n = initialN,
  		    bias = initialBias,
  		    basic,
  		    j,
  		    index,
  		    oldi,
  		    w,
  		    k,
  		    digit,
  		    t,
  		    /** Cached calculation results */
  		    baseMinusT;

  		// Handle the basic code points: let `basic` be the number of input code
  		// points before the last delimiter, or `0` if there is none, then copy
  		// the first basic code points to the output.

  		basic = input.lastIndexOf(delimiter);
  		if (basic < 0) {
  			basic = 0;
  		}

  		for (j = 0; j < basic; ++j) {
  			// if it's not a basic code point
  			if (input.charCodeAt(j) >= 0x80) {
  				error('not-basic');
  			}
  			output.push(input.charCodeAt(j));
  		}

  		// Main decoding loop: start just after the last delimiter if any basic code
  		// points were copied; start at the beginning otherwise.

  		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

  			// `index` is the index of the next character to be consumed.
  			// Decode a generalized variable-length integer into `delta`,
  			// which gets added to `i`. The overflow checking is easier
  			// if we increase `i` as we go, then subtract off its starting
  			// value at the end to obtain `delta`.
  			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

  				if (index >= inputLength) {
  					error('invalid-input');
  				}

  				digit = basicToDigit(input.charCodeAt(index++));

  				if (digit >= base || digit > floor((maxInt - i) / w)) {
  					error('overflow');
  				}

  				i += digit * w;
  				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

  				if (digit < t) {
  					break;
  				}

  				baseMinusT = base - t;
  				if (w > floor(maxInt / baseMinusT)) {
  					error('overflow');
  				}

  				w *= baseMinusT;

  			}

  			out = output.length + 1;
  			bias = adapt(i - oldi, out, oldi == 0);

  			// `i` was supposed to wrap around from `out` to `0`,
  			// incrementing `n` each time, so we'll fix that now:
  			if (floor(i / out) > maxInt - n) {
  				error('overflow');
  			}

  			n += floor(i / out);
  			i %= out;

  			// Insert `n` at position `i` of the output
  			output.splice(i++, 0, n);

  		}

  		return ucs2encode(output);
  	}

  	/**
  	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
  	 * Punycode string of ASCII-only symbols.
  	 * @memberOf punycode
  	 * @param {String} input The string of Unicode symbols.
  	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
  	 */
  	function encode(input) {
  		var n,
  		    delta,
  		    handledCPCount,
  		    basicLength,
  		    bias,
  		    j,
  		    m,
  		    q,
  		    k,
  		    t,
  		    currentValue,
  		    output = [],
  		    /** `inputLength` will hold the number of code points in `input`. */
  		    inputLength,
  		    /** Cached calculation results */
  		    handledCPCountPlusOne,
  		    baseMinusT,
  		    qMinusT;

  		// Convert the input in UCS-2 to Unicode
  		input = ucs2decode(input);

  		// Cache the length
  		inputLength = input.length;

  		// Initialize the state
  		n = initialN;
  		delta = 0;
  		bias = initialBias;

  		// Handle the basic code points
  		for (j = 0; j < inputLength; ++j) {
  			currentValue = input[j];
  			if (currentValue < 0x80) {
  				output.push(stringFromCharCode(currentValue));
  			}
  		}

  		handledCPCount = basicLength = output.length;

  		// `handledCPCount` is the number of code points that have been handled;
  		// `basicLength` is the number of basic code points.

  		// Finish the basic string - if it is not empty - with a delimiter
  		if (basicLength) {
  			output.push(delimiter);
  		}

  		// Main encoding loop:
  		while (handledCPCount < inputLength) {

  			// All non-basic code points < n have been handled already. Find the next
  			// larger one:
  			for (m = maxInt, j = 0; j < inputLength; ++j) {
  				currentValue = input[j];
  				if (currentValue >= n && currentValue < m) {
  					m = currentValue;
  				}
  			}

  			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
  			// but guard against overflow
  			handledCPCountPlusOne = handledCPCount + 1;
  			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  				error('overflow');
  			}

  			delta += (m - n) * handledCPCountPlusOne;
  			n = m;

  			for (j = 0; j < inputLength; ++j) {
  				currentValue = input[j];

  				if (currentValue < n && ++delta > maxInt) {
  					error('overflow');
  				}

  				if (currentValue == n) {
  					// Represent delta as a generalized variable-length integer
  					for (q = delta, k = base; /* no condition */; k += base) {
  						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
  						if (q < t) {
  							break;
  						}
  						qMinusT = q - t;
  						baseMinusT = base - t;
  						output.push(
  							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
  						);
  						q = floor(qMinusT / baseMinusT);
  					}

  					output.push(stringFromCharCode(digitToBasic(q, 0)));
  					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
  					delta = 0;
  					++handledCPCount;
  				}
  			}

  			++delta;
  			++n;

  		}
  		return output.join('');
  	}

  	/**
  	 * Converts a Punycode string representing a domain name or an email address
  	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
  	 * it doesn't matter if you call it on a string that has already been
  	 * converted to Unicode.
  	 * @memberOf punycode
  	 * @param {String} input The Punycoded domain name or email address to
  	 * convert to Unicode.
  	 * @returns {String} The Unicode representation of the given Punycode
  	 * string.
  	 */
  	function toUnicode(input) {
  		return mapDomain(input, function(string) {
  			return regexPunycode.test(string)
  				? decode(string.slice(4).toLowerCase())
  				: string;
  		});
  	}

  	/**
  	 * Converts a Unicode string representing a domain name or an email address to
  	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
  	 * i.e. it doesn't matter if you call it with a domain that's already in
  	 * ASCII.
  	 * @memberOf punycode
  	 * @param {String} input The domain name or email address to convert, as a
  	 * Unicode string.
  	 * @returns {String} The Punycode representation of the given domain name or
  	 * email address.
  	 */
  	function toASCII(input) {
  		return mapDomain(input, function(string) {
  			return regexNonASCII.test(string)
  				? 'xn--' + encode(string)
  				: string;
  		});
  	}

  	/*--------------------------------------------------------------------------*/

  	/** Define the public API */
  	punycode = {
  		/**
  		 * A string representing the current Punycode.js version number.
  		 * @memberOf punycode
  		 * @type String
  		 */
  		'version': '1.3.2',
  		/**
  		 * An object of methods to convert from JavaScript's internal character
  		 * representation (UCS-2) to Unicode code points, and back.
  		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  		 * @memberOf punycode
  		 * @type Object
  		 */
  		'ucs2': {
  			'decode': ucs2decode,
  			'encode': ucs2encode
  		},
  		'decode': decode,
  		'encode': encode,
  		'toASCII': toASCII,
  		'toUnicode': toUnicode
  	};

  	/** Expose `punycode` */
  	// Some AMD build optimizers, like r.js, check for specific condition patterns
  	// like the following:
  	if (freeExports && freeModule) {
  		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
  			freeModule.exports = punycode;
  		} else { // in Narwhal or RingoJS v0.7.0-
  			for (key in punycode) {
  				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
  			}
  		}
  	} else { // in Rhino or a web browser
  		root.punycode = punycode;
  	}

  }(commonjsGlobal));
  });

  var util = {
    isString: function(arg) {
      return typeof(arg) === 'string';
    },
    isObject: function(arg) {
      return typeof(arg) === 'object' && arg !== null;
    },
    isNull: function(arg) {
      return arg === null;
    },
    isNullOrUndefined: function(arg) {
      return arg == null;
    }
  };

  // Copyright Joyent, Inc. and other Node contributors.

  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var decode = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };

  // Copyright Joyent, Inc. and other Node contributors.

  var stringifyPrimitive = function(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  };

  var encode = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).map(function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  };

  var querystring = createCommonjsModule(function (module, exports) {

  exports.decode = exports.parse = decode;
  exports.encode = exports.stringify = encode;
  });
  var querystring_1 = querystring.decode;
  var querystring_2 = querystring.parse;
  var querystring_3 = querystring.encode;
  var querystring_4 = querystring.stringify;

  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,

      // Special case for a simple path URL
      simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

      // RFC 2396: characters reserved for delimiting URLs.
      // We actually just auto-escape these.
      delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

      // RFC 2396: characters not allowed for various reasons.
      unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
      autoEscape = ['\''].concat(unwise),
      // Characters that are never ever allowed in a hostname.
      // Note that any invalid chars are also handled, but these
      // are the ones that are *expected* to be seen, so we fast-path
      // them.
      nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
      hostEndingChars = ['/', '?', '#'],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      // protocols that can allow "unsafe" and "unwise" chars.
      unsafeProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that never have a hostname.
      hostlessProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that always contain a // bit.
      slashedProtocol = {
        'http': true,
        'https': true,
        'ftp': true,
        'gopher': true,
        'file': true,
        'http:': true,
        'https:': true,
        'ftp:': true,
        'gopher:': true,
        'file:': true
      };

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) return url;

    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }

  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
        splitter =
            (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
        uSplit = url.split(splitter),
        slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = '';
          this.query = {};
        }
        return this;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }

    if (!hostlessProtocol[proto] &&
        (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        hostEnd = rest.length;

      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      this.parseHost();

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      this.hostname = this.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = this.hostname[0] === '[' &&
          this.hostname[this.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              this.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = '';
      } else {
        // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname);
      }

      var p = this.port ? ':' + this.port : '';
      var h = this.hostname || '';
      this.host = h + p;
      this.href += this.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
      if (parseQueryString) {
        this.query = querystring.parse(this.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      this.search = '';
      this.query = {};
    }
    if (rest) this.pathname = rest;
    if (slashedProtocol[lowerProto] &&
        this.hostname && !this.pathname) {
      this.pathname = '/';
    }

    //to support http.request
    if (this.pathname || this.search) {
      var p = this.pathname || '';
      var s = this.search || '';
      this.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    this.href = this.format();
    return this;
  };

  Url.prototype.format = function() {
    var auth = this.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = this.protocol || '',
        pathname = this.pathname || '',
        hash = this.hash || '',
        host = false,
        query = '';

    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(':') === -1 ?
          this.hostname :
          '[' + this.hostname + ']');
      if (this.port) {
        host += ':' + this.port;
      }
    }

    if (this.query &&
        util.isObject(this.query) &&
        Object.keys(this.query).length) {
      query = querystring.stringify(this.query);
    }

    var search = this.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes ||
        (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  };

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  Url.prototype.resolveObject = function(relative) {
    if (util.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol')
          result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
          result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }

    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
        isRelAbs = (
            relative.host ||
            relative.pathname && relative.pathname.charAt(0) === '/'
        ),
        mustEndAbs = (isRelAbs || isSourceAbs ||
                      (result.host && relative.pathname)),
        removeAllDots = mustEndAbs,
        srcPath = result.pathname && result.pathname.split('/') || [],
        relPath = relative.pathname && relative.pathname.split('/') || [],
        psychotic = result.protocol && !slashedProtocol[result.protocol];

    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;
        else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;
          else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }

    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
                    relative.host : result.host;
      result.hostname = (relative.hostname || relative.hostname === '') ?
                        relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!util.isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ?
                         result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
                      (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (
        (result.host || relative.host || srcPath.length > 1) &&
        (last === '.' || last === '..') || last === '');

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
        (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' ||
        (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
                                      srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) this.hostname = host;
  };

  function extend (output, ...inputs) {
      for (const input of inputs) {
          for (const k in input) {
              output[k] = input[k];
          }
      }
      return output;
  }

  class ParsingError extends Error {
      constructor(key, message) {
          super(message);
          this.message = message;
          this.key = key;
      }
  }

  class Scope {
      constructor(parent, bindings = []) {
          this.parent = parent;
          this.bindings = {};
          for (const [name, expression] of bindings) {
              this.bindings[name] = expression;
          }
      }
      concat(bindings) {
          return new Scope(this, bindings);
      }
      get(name) {
          if (this.bindings[name]) {
              return this.bindings[name];
          }
          if (this.parent) {
              return this.parent.get(name);
          }
          throw new Error(`${ name } not found in scope.`);
      }
      has(name) {
          if (this.bindings[name])
              return true;
          return this.parent ? this.parent.has(name) : false;
      }
  }

  const NullType = { kind: 'null' };
  const NumberType = { kind: 'number' };
  const StringType = { kind: 'string' };
  const BooleanType = { kind: 'boolean' };
  const ColorType = { kind: 'color' };
  const ObjectType = { kind: 'object' };
  const ValueType = { kind: 'value' };
  const ErrorType = { kind: 'error' };
  const CollatorType = { kind: 'collator' };
  const FormattedType = { kind: 'formatted' };
  const ResolvedImageType = { kind: 'resolvedImage' };
  function array(itemType, N) {
      return {
          kind: 'array',
          itemType,
          N
      };
  }
  function toString(type) {
      if (type.kind === 'array') {
          const itemType = toString(type.itemType);
          return typeof type.N === 'number' ? `array<${ itemType }, ${ type.N }>` : type.itemType.kind === 'value' ? 'array' : `array<${ itemType }>`;
      } else {
          return type.kind;
      }
  }
  const valueMemberTypes = [
      NullType,
      NumberType,
      StringType,
      BooleanType,
      ColorType,
      FormattedType,
      ObjectType,
      array(ValueType),
      ResolvedImageType
  ];
  function checkSubtype(expected, t) {
      if (t.kind === 'error') {
          return null;
      } else if (expected.kind === 'array') {
          if (t.kind === 'array' && (t.N === 0 && t.itemType.kind === 'value' || !checkSubtype(expected.itemType, t.itemType)) && (typeof expected.N !== 'number' || expected.N === t.N)) {
              return null;
          }
      } else if (expected.kind === t.kind) {
          return null;
      } else if (expected.kind === 'value') {
          for (const memberType of valueMemberTypes) {
              if (!checkSubtype(memberType, t)) {
                  return null;
              }
          }
      }
      return `Expected ${ toString(expected) } but found ${ toString(t) } instead.`;
  }
  function isValidType(provided, allowedTypes) {
      return allowedTypes.some(t => t.kind === provided.kind);
  }
  function isValidNativeType(provided, allowedTypes) {
      return allowedTypes.some(t => {
          if (t === 'null') {
              return provided === null;
          } else if (t === 'array') {
              return Array.isArray(provided);
          } else if (t === 'object') {
              return provided && !Array.isArray(provided) && typeof provided === 'object';
          } else {
              return t === typeof provided;
          }
      });
  }

  var csscolorparser = createCommonjsModule(function (module, exports) {
  // (c) Dean McNamee <dean@gmail.com>, 2012.
  //
  // https://github.com/deanm/css-color-parser-js
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to
  // deal in the Software without restriction, including without limitation the
  // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
  // sell copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  //
  // The above copyright notice and this permission notice shall be included in
  // all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  // FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
  // IN THE SOFTWARE.

  // http://www.w3.org/TR/css3-color/
  var kCSSColorTable = {
    "transparent": [0,0,0,0], "aliceblue": [240,248,255,1],
    "antiquewhite": [250,235,215,1], "aqua": [0,255,255,1],
    "aquamarine": [127,255,212,1], "azure": [240,255,255,1],
    "beige": [245,245,220,1], "bisque": [255,228,196,1],
    "black": [0,0,0,1], "blanchedalmond": [255,235,205,1],
    "blue": [0,0,255,1], "blueviolet": [138,43,226,1],
    "brown": [165,42,42,1], "burlywood": [222,184,135,1],
    "cadetblue": [95,158,160,1], "chartreuse": [127,255,0,1],
    "chocolate": [210,105,30,1], "coral": [255,127,80,1],
    "cornflowerblue": [100,149,237,1], "cornsilk": [255,248,220,1],
    "crimson": [220,20,60,1], "cyan": [0,255,255,1],
    "darkblue": [0,0,139,1], "darkcyan": [0,139,139,1],
    "darkgoldenrod": [184,134,11,1], "darkgray": [169,169,169,1],
    "darkgreen": [0,100,0,1], "darkgrey": [169,169,169,1],
    "darkkhaki": [189,183,107,1], "darkmagenta": [139,0,139,1],
    "darkolivegreen": [85,107,47,1], "darkorange": [255,140,0,1],
    "darkorchid": [153,50,204,1], "darkred": [139,0,0,1],
    "darksalmon": [233,150,122,1], "darkseagreen": [143,188,143,1],
    "darkslateblue": [72,61,139,1], "darkslategray": [47,79,79,1],
    "darkslategrey": [47,79,79,1], "darkturquoise": [0,206,209,1],
    "darkviolet": [148,0,211,1], "deeppink": [255,20,147,1],
    "deepskyblue": [0,191,255,1], "dimgray": [105,105,105,1],
    "dimgrey": [105,105,105,1], "dodgerblue": [30,144,255,1],
    "firebrick": [178,34,34,1], "floralwhite": [255,250,240,1],
    "forestgreen": [34,139,34,1], "fuchsia": [255,0,255,1],
    "gainsboro": [220,220,220,1], "ghostwhite": [248,248,255,1],
    "gold": [255,215,0,1], "goldenrod": [218,165,32,1],
    "gray": [128,128,128,1], "green": [0,128,0,1],
    "greenyellow": [173,255,47,1], "grey": [128,128,128,1],
    "honeydew": [240,255,240,1], "hotpink": [255,105,180,1],
    "indianred": [205,92,92,1], "indigo": [75,0,130,1],
    "ivory": [255,255,240,1], "khaki": [240,230,140,1],
    "lavender": [230,230,250,1], "lavenderblush": [255,240,245,1],
    "lawngreen": [124,252,0,1], "lemonchiffon": [255,250,205,1],
    "lightblue": [173,216,230,1], "lightcoral": [240,128,128,1],
    "lightcyan": [224,255,255,1], "lightgoldenrodyellow": [250,250,210,1],
    "lightgray": [211,211,211,1], "lightgreen": [144,238,144,1],
    "lightgrey": [211,211,211,1], "lightpink": [255,182,193,1],
    "lightsalmon": [255,160,122,1], "lightseagreen": [32,178,170,1],
    "lightskyblue": [135,206,250,1], "lightslategray": [119,136,153,1],
    "lightslategrey": [119,136,153,1], "lightsteelblue": [176,196,222,1],
    "lightyellow": [255,255,224,1], "lime": [0,255,0,1],
    "limegreen": [50,205,50,1], "linen": [250,240,230,1],
    "magenta": [255,0,255,1], "maroon": [128,0,0,1],
    "mediumaquamarine": [102,205,170,1], "mediumblue": [0,0,205,1],
    "mediumorchid": [186,85,211,1], "mediumpurple": [147,112,219,1],
    "mediumseagreen": [60,179,113,1], "mediumslateblue": [123,104,238,1],
    "mediumspringgreen": [0,250,154,1], "mediumturquoise": [72,209,204,1],
    "mediumvioletred": [199,21,133,1], "midnightblue": [25,25,112,1],
    "mintcream": [245,255,250,1], "mistyrose": [255,228,225,1],
    "moccasin": [255,228,181,1], "navajowhite": [255,222,173,1],
    "navy": [0,0,128,1], "oldlace": [253,245,230,1],
    "olive": [128,128,0,1], "olivedrab": [107,142,35,1],
    "orange": [255,165,0,1], "orangered": [255,69,0,1],
    "orchid": [218,112,214,1], "palegoldenrod": [238,232,170,1],
    "palegreen": [152,251,152,1], "paleturquoise": [175,238,238,1],
    "palevioletred": [219,112,147,1], "papayawhip": [255,239,213,1],
    "peachpuff": [255,218,185,1], "peru": [205,133,63,1],
    "pink": [255,192,203,1], "plum": [221,160,221,1],
    "powderblue": [176,224,230,1], "purple": [128,0,128,1],
    "rebeccapurple": [102,51,153,1],
    "red": [255,0,0,1], "rosybrown": [188,143,143,1],
    "royalblue": [65,105,225,1], "saddlebrown": [139,69,19,1],
    "salmon": [250,128,114,1], "sandybrown": [244,164,96,1],
    "seagreen": [46,139,87,1], "seashell": [255,245,238,1],
    "sienna": [160,82,45,1], "silver": [192,192,192,1],
    "skyblue": [135,206,235,1], "slateblue": [106,90,205,1],
    "slategray": [112,128,144,1], "slategrey": [112,128,144,1],
    "snow": [255,250,250,1], "springgreen": [0,255,127,1],
    "steelblue": [70,130,180,1], "tan": [210,180,140,1],
    "teal": [0,128,128,1], "thistle": [216,191,216,1],
    "tomato": [255,99,71,1], "turquoise": [64,224,208,1],
    "violet": [238,130,238,1], "wheat": [245,222,179,1],
    "white": [255,255,255,1], "whitesmoke": [245,245,245,1],
    "yellow": [255,255,0,1], "yellowgreen": [154,205,50,1]};

  function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
  }

  function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
  }

  function parse_css_int(str) {  // int or percentage.
    if (str[str.length - 1] === '%')
      return clamp_css_byte(parseFloat(str) / 100 * 255);
    return clamp_css_byte(parseInt(str));
  }

  function parse_css_float(str) {  // float or percentage.
    if (str[str.length - 1] === '%')
      return clamp_css_float(parseFloat(str) / 100);
    return clamp_css_float(parseFloat(str));
  }

  function css_hue_to_rgb(m1, m2, h) {
    if (h < 0) h += 1;
    else if (h > 1) h -= 1;

    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m1 + (m2 - m1) * (2/3 - h) * 6;
    return m1;
  }

  function parseCSSColor(css_str) {
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = css_str.replace(/ /g, '').toLowerCase();

    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable) return kCSSColorTable[str].slice();  // dup.

    // #abc and #abc123 syntax.
    if (str[0] === '#') {
      if (str.length === 4) {
        var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
        if (!(iv >= 0 && iv <= 0xfff)) return null;  // Covers NaN.
        return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
                (iv & 0xf0) | ((iv & 0xf0) >> 4),
                (iv & 0xf) | ((iv & 0xf) << 4),
                1];
      } else if (str.length === 7) {
        var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
        if (!(iv >= 0 && iv <= 0xffffff)) return null;  // Covers NaN.
        return [(iv & 0xff0000) >> 16,
                (iv & 0xff00) >> 8,
                iv & 0xff,
                1];
      }

      return null;
    }

    var op = str.indexOf('('), ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
      var fname = str.substr(0, op);
      var params = str.substr(op+1, ep-(op+1)).split(',');
      var alpha = 1;  // To allow case fallthrough.
      switch (fname) {
        case 'rgba':
          if (params.length !== 4) return null;
          alpha = parse_css_float(params.pop());
          // Fall through.
        case 'rgb':
          if (params.length !== 3) return null;
          return [parse_css_int(params[0]),
                  parse_css_int(params[1]),
                  parse_css_int(params[2]),
                  alpha];
        case 'hsla':
          if (params.length !== 4) return null;
          alpha = parse_css_float(params.pop());
          // Fall through.
        case 'hsl':
          if (params.length !== 3) return null;
          var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
          // NOTE(deanm): According to the CSS spec s/l should only be
          // percentages, but we don't bother and let float or percentage.
          var s = parse_css_float(params[1]);
          var l = parse_css_float(params[2]);
          var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          var m1 = l * 2 - m2;
          return [clamp_css_byte(css_hue_to_rgb(m1, m2, h+1/3) * 255),
                  clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
                  clamp_css_byte(css_hue_to_rgb(m1, m2, h-1/3) * 255),
                  alpha];
        default:
          return null;
      }
    }

    return null;
  }

  try { exports.parseCSSColor = parseCSSColor; } catch(e) { }
  });
  var csscolorparser_1 = csscolorparser.parseCSSColor;

  class Color {
      constructor(r, g, b, a = 1) {
          this.r = r;
          this.g = g;
          this.b = b;
          this.a = a;
      }
      static parse(input) {
          if (!input) {
              return undefined;
          }
          if (input instanceof Color) {
              return input;
          }
          if (typeof input !== 'string') {
              return undefined;
          }
          const rgba = csscolorparser_1(input);
          if (!rgba) {
              return undefined;
          }
          return new Color(rgba[0] / 255 * rgba[3], rgba[1] / 255 * rgba[3], rgba[2] / 255 * rgba[3], rgba[3]);
      }
      toString() {
          const [r, g, b, a] = this.toArray();
          return `rgba(${ Math.round(r) },${ Math.round(g) },${ Math.round(b) },${ a })`;
      }
      toArray() {
          const {r, g, b, a} = this;
          return a === 0 ? [
              0,
              0,
              0,
              0
          ] : [
              r * 255 / a,
              g * 255 / a,
              b * 255 / a,
              a
          ];
      }
  }
  Color.black = new Color(0, 0, 0, 1);
  Color.white = new Color(1, 1, 1, 1);
  Color.transparent = new Color(0, 0, 0, 0);
  Color.red = new Color(1, 0, 0, 1);
  Color.blue = new Color(0, 0, 1, 1);

  class Collator {
      constructor(caseSensitive, diacriticSensitive, locale) {
          if (caseSensitive)
              this.sensitivity = diacriticSensitive ? 'variant' : 'case';
          else
              this.sensitivity = diacriticSensitive ? 'accent' : 'base';
          this.locale = locale;
          this.collator = new Intl.Collator(this.locale ? this.locale : [], {
              sensitivity: this.sensitivity,
              usage: 'search'
          });
      }
      compare(lhs, rhs) {
          return this.collator.compare(lhs, rhs);
      }
      resolvedLocale() {
          return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
      }
  }

  class FormattedSection {
      constructor(text, image, scale, fontStack, textColor) {
          this.text = text;
          this.image = image;
          this.scale = scale;
          this.fontStack = fontStack;
          this.textColor = textColor;
      }
  }
  class Formatted {
      constructor(sections) {
          this.sections = sections;
      }
      static fromString(unformatted) {
          return new Formatted([new FormattedSection(unformatted, null, null, null, null)]);
      }
      isEmpty() {
          if (this.sections.length === 0)
              return true;
          return !this.sections.some(section => section.text.length !== 0 || section.image && section.image.name.length !== 0);
      }
      static factory(text) {
          if (text instanceof Formatted) {
              return text;
          } else {
              return Formatted.fromString(text);
          }
      }
      toString() {
          if (this.sections.length === 0)
              return '';
          return this.sections.map(section => section.text).join('');
      }
      serialize() {
          const serialized = ['format'];
          for (const section of this.sections) {
              if (section.image) {
                  serialized.push([
                      'image',
                      section.image.name
                  ]);
                  continue;
              }
              serialized.push(section.text);
              const options = {};
              if (section.fontStack) {
                  options['text-font'] = [
                      'literal',
                      section.fontStack.split(',')
                  ];
              }
              if (section.scale) {
                  options['font-scale'] = section.scale;
              }
              if (section.textColor) {
                  options['text-color'] = ['rgba'].concat(section.textColor.toArray());
              }
              serialized.push(options);
          }
          return serialized;
      }
  }

  class ResolvedImage {
      constructor(options) {
          this.name = options.name;
          this.available = options.available;
      }
      toString() {
          return this.name;
      }
      static fromString(name) {
          if (!name)
              return null;
          return new ResolvedImage({
              name,
              available: false
          });
      }
      serialize() {
          return [
              'image',
              this.name
          ];
      }
  }

  function validateRGBA(r, g, b, a) {
      if (!(typeof r === 'number' && r >= 0 && r <= 255 && typeof g === 'number' && g >= 0 && g <= 255 && typeof b === 'number' && b >= 0 && b <= 255)) {
          const value = typeof a === 'number' ? [
              r,
              g,
              b,
              a
          ] : [
              r,
              g,
              b
          ];
          return `Invalid rgba value [${ value.join(', ') }]: 'r', 'g', and 'b' must be between 0 and 255.`;
      }
      if (!(typeof a === 'undefined' || typeof a === 'number' && a >= 0 && a <= 1)) {
          return `Invalid rgba value [${ [
            r,
            g,
            b,
            a
        ].join(', ') }]: 'a' must be between 0 and 1.`;
      }
      return null;
  }
  function isValue(mixed) {
      if (mixed === null) {
          return true;
      } else if (typeof mixed === 'string') {
          return true;
      } else if (typeof mixed === 'boolean') {
          return true;
      } else if (typeof mixed === 'number') {
          return true;
      } else if (mixed instanceof Color) {
          return true;
      } else if (mixed instanceof Collator) {
          return true;
      } else if (mixed instanceof Formatted) {
          return true;
      } else if (mixed instanceof ResolvedImage) {
          return true;
      } else if (Array.isArray(mixed)) {
          for (const item of mixed) {
              if (!isValue(item)) {
                  return false;
              }
          }
          return true;
      } else if (typeof mixed === 'object') {
          for (const key in mixed) {
              if (!isValue(mixed[key])) {
                  return false;
              }
          }
          return true;
      } else {
          return false;
      }
  }
  function typeOf(value) {
      if (value === null) {
          return NullType;
      } else if (typeof value === 'string') {
          return StringType;
      } else if (typeof value === 'boolean') {
          return BooleanType;
      } else if (typeof value === 'number') {
          return NumberType;
      } else if (value instanceof Color) {
          return ColorType;
      } else if (value instanceof Collator) {
          return CollatorType;
      } else if (value instanceof Formatted) {
          return FormattedType;
      } else if (value instanceof ResolvedImage) {
          return ResolvedImageType;
      } else if (Array.isArray(value)) {
          const length = value.length;
          let itemType;
          for (const item of value) {
              const t = typeOf(item);
              if (!itemType) {
                  itemType = t;
              } else if (itemType === t) {
                  continue;
              } else {
                  itemType = ValueType;
                  break;
              }
          }
          return array(itemType || ValueType, length);
      } else {
          return ObjectType;
      }
  }
  function toString$1(value) {
      const type = typeof value;
      if (value === null) {
          return '';
      } else if (type === 'string' || type === 'number' || type === 'boolean') {
          return String(value);
      } else if (value instanceof Color || value instanceof Formatted || value instanceof ResolvedImage) {
          return value.toString();
      } else {
          return JSON.stringify(value);
      }
  }

  class Literal {
      constructor(type, value) {
          this.type = type;
          this.value = value;
      }
      static parse(args, context) {
          if (args.length !== 2)
              return context.error(`'literal' expression requires exactly one argument, but found ${ args.length - 1 } instead.`);
          if (!isValue(args[1]))
              return context.error(`invalid value`);
          const value = args[1];
          let type = typeOf(value);
          const expected = context.expectedType;
          if (type.kind === 'array' && type.N === 0 && expected && expected.kind === 'array' && (typeof expected.N !== 'number' || expected.N === 0)) {
              type = expected;
          }
          return new Literal(type, value);
      }
      evaluate() {
          return this.value;
      }
      eachChild() {
      }
      outputDefined() {
          return true;
      }
      serialize() {
          if (this.type.kind === 'array' || this.type.kind === 'object') {
              return [
                  'literal',
                  this.value
              ];
          } else if (this.value instanceof Color) {
              return ['rgba'].concat(this.value.toArray());
          } else if (this.value instanceof Formatted) {
              return this.value.serialize();
          } else {
              return this.value;
          }
      }
  }

  class RuntimeError {
      constructor(message) {
          this.name = 'ExpressionEvaluationError';
          this.message = message;
      }
      toJSON() {
          return this.message;
      }
  }

  const types = {
      string: StringType,
      number: NumberType,
      boolean: BooleanType,
      object: ObjectType
  };
  class Assertion {
      constructor(type, args) {
          this.type = type;
          this.args = args;
      }
      static parse(args, context) {
          if (args.length < 2)
              return context.error(`Expected at least one argument.`);
          let i = 1;
          let type;
          const name = args[0];
          if (name === 'array') {
              let itemType;
              if (args.length > 2) {
                  const type = args[1];
                  if (typeof type !== 'string' || !(type in types) || type === 'object')
                      return context.error('The item type argument of "array" must be one of string, number, boolean', 1);
                  itemType = types[type];
                  i++;
              } else {
                  itemType = ValueType;
              }
              let N;
              if (args.length > 3) {
                  if (args[2] !== null && (typeof args[2] !== 'number' || args[2] < 0 || args[2] !== Math.floor(args[2]))) {
                      return context.error('The length argument to "array" must be a positive integer literal', 2);
                  }
                  N = args[2];
                  i++;
              }
              type = array(itemType, N);
          } else {
              type = types[name];
          }
          const parsed = [];
          for (; i < args.length; i++) {
              const input = context.parse(args[i], i, ValueType);
              if (!input)
                  return null;
              parsed.push(input);
          }
          return new Assertion(type, parsed);
      }
      evaluate(ctx) {
          for (let i = 0; i < this.args.length; i++) {
              const value = this.args[i].evaluate(ctx);
              const error = checkSubtype(this.type, typeOf(value));
              if (!error) {
                  return value;
              } else if (i === this.args.length - 1) {
                  throw new RuntimeError(`Expected value to be of type ${ toString(this.type) }, but found ${ toString(typeOf(value)) } instead.`);
              }
          }
          return null;
      }
      eachChild(fn) {
          this.args.forEach(fn);
      }
      outputDefined() {
          return this.args.every(arg => arg.outputDefined());
      }
      serialize() {
          const type = this.type;
          const serialized = [type.kind];
          if (type.kind === 'array') {
              const itemType = type.itemType;
              if (itemType.kind === 'string' || itemType.kind === 'number' || itemType.kind === 'boolean') {
                  serialized.push(itemType.kind);
                  const N = type.N;
                  if (typeof N === 'number' || this.args.length > 1) {
                      serialized.push(N);
                  }
              }
          }
          return serialized.concat(this.args.map(arg => arg.serialize()));
      }
  }

  class FormatExpression {
      constructor(sections) {
          this.type = FormattedType;
          this.sections = sections;
      }
      static parse(args, context) {
          if (args.length < 2) {
              return context.error(`Expected at least one argument.`);
          }
          const firstArg = args[1];
          if (!Array.isArray(firstArg) && typeof firstArg === 'object') {
              return context.error(`First argument must be an image or text section.`);
          }
          const sections = [];
          let nextTokenMayBeObject = false;
          for (let i = 1; i <= args.length - 1; ++i) {
              const arg = args[i];
              if (nextTokenMayBeObject && typeof arg === 'object' && !Array.isArray(arg)) {
                  nextTokenMayBeObject = false;
                  let scale = null;
                  if (arg['font-scale']) {
                      scale = context.parse(arg['font-scale'], 1, NumberType);
                      if (!scale)
                          return null;
                  }
                  let font = null;
                  if (arg['text-font']) {
                      font = context.parse(arg['text-font'], 1, array(StringType));
                      if (!font)
                          return null;
                  }
                  let textColor = null;
                  if (arg['text-color']) {
                      textColor = context.parse(arg['text-color'], 1, ColorType);
                      if (!textColor)
                          return null;
                  }
                  const lastExpression = sections[sections.length - 1];
                  lastExpression.scale = scale;
                  lastExpression.font = font;
                  lastExpression.textColor = textColor;
              } else {
                  const content = context.parse(args[i], 1, ValueType);
                  if (!content)
                      return null;
                  const kind = content.type.kind;
                  if (kind !== 'string' && kind !== 'value' && kind !== 'null' && kind !== 'resolvedImage')
                      return context.error(`Formatted text type must be 'string', 'value', 'image' or 'null'.`);
                  nextTokenMayBeObject = true;
                  sections.push({
                      content,
                      scale: null,
                      font: null,
                      textColor: null
                  });
              }
          }
          return new FormatExpression(sections);
      }
      evaluate(ctx) {
          const evaluateSection = section => {
              const evaluatedContent = section.content.evaluate(ctx);
              if (typeOf(evaluatedContent) === ResolvedImageType) {
                  return new FormattedSection('', evaluatedContent, null, null, null);
              }
              return new FormattedSection(toString$1(evaluatedContent), null, section.scale ? section.scale.evaluate(ctx) : null, section.font ? section.font.evaluate(ctx).join(',') : null, section.textColor ? section.textColor.evaluate(ctx) : null);
          };
          return new Formatted(this.sections.map(evaluateSection));
      }
      eachChild(fn) {
          for (const section of this.sections) {
              fn(section.content);
              if (section.scale) {
                  fn(section.scale);
              }
              if (section.font) {
                  fn(section.font);
              }
              if (section.textColor) {
                  fn(section.textColor);
              }
          }
      }
      outputDefined() {
          return false;
      }
      serialize() {
          const serialized = ['format'];
          for (const section of this.sections) {
              serialized.push(section.content.serialize());
              const options = {};
              if (section.scale) {
                  options['font-scale'] = section.scale.serialize();
              }
              if (section.font) {
                  options['text-font'] = section.font.serialize();
              }
              if (section.textColor) {
                  options['text-color'] = section.textColor.serialize();
              }
              serialized.push(options);
          }
          return serialized;
      }
  }

  class ImageExpression {
      constructor(input) {
          this.type = ResolvedImageType;
          this.input = input;
      }
      static parse(args, context) {
          if (args.length !== 2) {
              return context.error(`Expected two arguments.`);
          }
          const name = context.parse(args[1], 1, StringType);
          if (!name)
              return context.error(`No image name provided.`);
          return new ImageExpression(name);
      }
      evaluate(ctx) {
          const evaluatedImageName = this.input.evaluate(ctx);
          const value = ResolvedImage.fromString(evaluatedImageName);
          if (value && ctx.availableImages)
              value.available = ctx.availableImages.indexOf(evaluatedImageName) > -1;
          return value;
      }
      eachChild(fn) {
          fn(this.input);
      }
      outputDefined() {
          return false;
      }
      serialize() {
          return [
              'image',
              this.input.serialize()
          ];
      }
  }

  const types$1 = {
      'to-boolean': BooleanType,
      'to-color': ColorType,
      'to-number': NumberType,
      'to-string': StringType
  };
  class Coercion {
      constructor(type, args) {
          this.type = type;
          this.args = args;
      }
      static parse(args, context) {
          if (args.length < 2)
              return context.error(`Expected at least one argument.`);
          const name = args[0];
          if ((name === 'to-boolean' || name === 'to-string') && args.length !== 2)
              return context.error(`Expected one argument.`);
          const type = types$1[name];
          const parsed = [];
          for (let i = 1; i < args.length; i++) {
              const input = context.parse(args[i], i, ValueType);
              if (!input)
                  return null;
              parsed.push(input);
          }
          return new Coercion(type, parsed);
      }
      evaluate(ctx) {
          if (this.type.kind === 'boolean') {
              return Boolean(this.args[0].evaluate(ctx));
          } else if (this.type.kind === 'color') {
              let input;
              let error;
              for (const arg of this.args) {
                  input = arg.evaluate(ctx);
                  error = null;
                  if (input instanceof Color) {
                      return input;
                  } else if (typeof input === 'string') {
                      const c = ctx.parseColor(input);
                      if (c)
                          return c;
                  } else if (Array.isArray(input)) {
                      if (input.length < 3 || input.length > 4) {
                          error = `Invalid rbga value ${ JSON.stringify(input) }: expected an array containing either three or four numeric values.`;
                      } else {
                          error = validateRGBA(input[0], input[1], input[2], input[3]);
                      }
                      if (!error) {
                          return new Color(input[0] / 255, input[1] / 255, input[2] / 255, input[3]);
                      }
                  }
              }
              throw new RuntimeError(error || `Could not parse color from value '${ typeof input === 'string' ? input : String(JSON.stringify(input)) }'`);
          } else if (this.type.kind === 'number') {
              let value = null;
              for (const arg of this.args) {
                  value = arg.evaluate(ctx);
                  if (value === null)
                      return 0;
                  const num = Number(value);
                  if (isNaN(num))
                      continue;
                  return num;
              }
              throw new RuntimeError(`Could not convert ${ JSON.stringify(value) } to number.`);
          } else if (this.type.kind === 'formatted') {
              return Formatted.fromString(toString$1(this.args[0].evaluate(ctx)));
          } else if (this.type.kind === 'resolvedImage') {
              return ResolvedImage.fromString(toString$1(this.args[0].evaluate(ctx)));
          } else {
              return toString$1(this.args[0].evaluate(ctx));
          }
      }
      eachChild(fn) {
          this.args.forEach(fn);
      }
      outputDefined() {
          return this.args.every(arg => arg.outputDefined());
      }
      serialize() {
          if (this.type.kind === 'formatted') {
              return new FormatExpression([{
                      content: this.args[0],
                      scale: null,
                      font: null,
                      textColor: null
                  }]).serialize();
          }
          if (this.type.kind === 'resolvedImage') {
              return new ImageExpression(this.args[0]).serialize();
          }
          const serialized = [`to-${ this.type.kind }`];
          this.eachChild(child => {
              serialized.push(child.serialize());
          });
          return serialized;
      }
  }

  const geometryTypes = [
      'Unknown',
      'Point',
      'LineString',
      'Polygon'
  ];
  class EvaluationContext {
      constructor() {
          this.globals = null;
          this.feature = null;
          this.featureState = null;
          this.formattedSection = null;
          this._parseColorCache = {};
          this.availableImages = null;
          this.canonical = null;
      }
      id() {
          return this.feature && 'id' in this.feature ? this.feature.id : null;
      }
      geometryType() {
          return this.feature ? typeof this.feature.type === 'number' ? geometryTypes[this.feature.type] : this.feature.type : null;
      }
      geometry() {
          return this.feature && 'geometry' in this.feature ? this.feature.geometry : null;
      }
      canonicalID() {
          return this.canonical;
      }
      properties() {
          return this.feature && this.feature.properties || {};
      }
      parseColor(input) {
          let cached = this._parseColorCache[input];
          if (!cached) {
              cached = this._parseColorCache[input] = Color.parse(input);
          }
          return cached;
      }
  }

  class CompoundExpression {
      constructor(name, type, evaluate, args) {
          this.name = name;
          this.type = type;
          this._evaluate = evaluate;
          this.args = args;
      }
      evaluate(ctx) {
          return this._evaluate(ctx, this.args);
      }
      eachChild(fn) {
          this.args.forEach(fn);
      }
      outputDefined() {
          return false;
      }
      serialize() {
          return [this.name].concat(this.args.map(arg => arg.serialize()));
      }
      static parse(args, context) {
          const op = args[0];
          const definition = CompoundExpression.definitions[op];
          if (!definition) {
              return context.error(`Unknown expression "${ op }". If you wanted a literal array, use ["literal", [...]].`, 0);
          }
          const type = Array.isArray(definition) ? definition[0] : definition.type;
          const availableOverloads = Array.isArray(definition) ? [[
                  definition[1],
                  definition[2]
              ]] : definition.overloads;
          const overloads = availableOverloads.filter(([signature]) => !Array.isArray(signature) || signature.length === args.length - 1);
          let signatureContext = null;
          for (const [params, evaluate] of overloads) {
              signatureContext = new ParsingContext(context.registry, context.path, null, context.scope);
              const parsedArgs = [];
              let argParseFailed = false;
              for (let i = 1; i < args.length; i++) {
                  const arg = args[i];
                  const expectedType = Array.isArray(params) ? params[i - 1] : params.type;
                  const parsed = signatureContext.parse(arg, 1 + parsedArgs.length, expectedType);
                  if (!parsed) {
                      argParseFailed = true;
                      break;
                  }
                  parsedArgs.push(parsed);
              }
              if (argParseFailed) {
                  continue;
              }
              if (Array.isArray(params)) {
                  if (params.length !== parsedArgs.length) {
                      signatureContext.error(`Expected ${ params.length } arguments, but found ${ parsedArgs.length } instead.`);
                      continue;
                  }
              }
              for (let i = 0; i < parsedArgs.length; i++) {
                  const expected = Array.isArray(params) ? params[i] : params.type;
                  const arg = parsedArgs[i];
                  signatureContext.concat(i + 1).checkSubtype(expected, arg.type);
              }
              if (signatureContext.errors.length === 0) {
                  return new CompoundExpression(op, type, evaluate, parsedArgs);
              }
          }
          if (overloads.length === 1) {
              context.errors.push(...signatureContext.errors);
          } else {
              const expected = overloads.length ? overloads : availableOverloads;
              const signatures = expected.map(([params]) => stringifySignature(params)).join(' | ');
              const actualTypes = [];
              for (let i = 1; i < args.length; i++) {
                  const parsed = context.parse(args[i], 1 + actualTypes.length);
                  if (!parsed)
                      return null;
                  actualTypes.push(toString(parsed.type));
              }
              context.error(`Expected arguments of type ${ signatures }, but found (${ actualTypes.join(', ') }) instead.`);
          }
          return null;
      }
      static register(registry, definitions) {
          CompoundExpression.definitions = definitions;
          for (const name in definitions) {
              registry[name] = CompoundExpression;
          }
      }
  }
  function stringifySignature(signature) {
      if (Array.isArray(signature)) {
          return `(${ signature.map(toString).join(', ') })`;
      } else {
          return `(${ toString(signature.type) }...)`;
      }
  }

  class CollatorExpression {
      constructor(caseSensitive, diacriticSensitive, locale) {
          this.type = CollatorType;
          this.locale = locale;
          this.caseSensitive = caseSensitive;
          this.diacriticSensitive = diacriticSensitive;
      }
      static parse(args, context) {
          if (args.length !== 2)
              return context.error(`Expected one argument.`);
          const options = args[1];
          if (typeof options !== 'object' || Array.isArray(options))
              return context.error(`Collator options argument must be an object.`);
          const caseSensitive = context.parse(options['case-sensitive'] === undefined ? false : options['case-sensitive'], 1, BooleanType);
          if (!caseSensitive)
              return null;
          const diacriticSensitive = context.parse(options['diacritic-sensitive'] === undefined ? false : options['diacritic-sensitive'], 1, BooleanType);
          if (!diacriticSensitive)
              return null;
          let locale = null;
          if (options['locale']) {
              locale = context.parse(options['locale'], 1, StringType);
              if (!locale)
                  return null;
          }
          return new CollatorExpression(caseSensitive, diacriticSensitive, locale);
      }
      evaluate(ctx) {
          return new Collator(this.caseSensitive.evaluate(ctx), this.diacriticSensitive.evaluate(ctx), this.locale ? this.locale.evaluate(ctx) : null);
      }
      eachChild(fn) {
          fn(this.caseSensitive);
          fn(this.diacriticSensitive);
          if (this.locale) {
              fn(this.locale);
          }
      }
      outputDefined() {
          return false;
      }
      serialize() {
          const options = {};
          options['case-sensitive'] = this.caseSensitive.serialize();
          options['diacritic-sensitive'] = this.diacriticSensitive.serialize();
          if (this.locale) {
              options['locale'] = this.locale.serialize();
          }
          return [
              'collator',
              options
          ];
      }
  }

  const EXTENT = 8192;
  function updateBBox(bbox, coord) {
      bbox[0] = Math.min(bbox[0], coord[0]);
      bbox[1] = Math.min(bbox[1], coord[1]);
      bbox[2] = Math.max(bbox[2], coord[0]);
      bbox[3] = Math.max(bbox[3], coord[1]);
  }
  function mercatorXfromLng(lng) {
      return (180 + lng) / 360;
  }
  function mercatorYfromLat(lat) {
      return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))) / 360;
  }
  function boxWithinBox(bbox1, bbox2) {
      if (bbox1[0] <= bbox2[0])
          return false;
      if (bbox1[2] >= bbox2[2])
          return false;
      if (bbox1[1] <= bbox2[1])
          return false;
      if (bbox1[3] >= bbox2[3])
          return false;
      return true;
  }
  function getTileCoordinates(p, canonical) {
      const x = mercatorXfromLng(p[0]);
      const y = mercatorYfromLat(p[1]);
      const tilesAtZoom = Math.pow(2, canonical.z);
      return [
          Math.round(x * tilesAtZoom * EXTENT),
          Math.round(y * tilesAtZoom * EXTENT)
      ];
  }
  function onBoundary(p, p1, p2) {
      const x1 = p[0] - p1[0];
      const y1 = p[1] - p1[1];
      const x2 = p[0] - p2[0];
      const y2 = p[1] - p2[1];
      return x1 * y2 - x2 * y1 === 0 && x1 * x2 <= 0 && y1 * y2 <= 0;
  }
  function rayIntersect(p, p1, p2) {
      return p1[1] > p[1] !== p2[1] > p[1] && p[0] < (p2[0] - p1[0]) * (p[1] - p1[1]) / (p2[1] - p1[1]) + p1[0];
  }
  function pointWithinPolygon(point, rings) {
      let inside = false;
      for (let i = 0, len = rings.length; i < len; i++) {
          const ring = rings[i];
          for (let j = 0, len2 = ring.length; j < len2 - 1; j++) {
              if (onBoundary(point, ring[j], ring[j + 1]))
                  return false;
              if (rayIntersect(point, ring[j], ring[j + 1]))
                  inside = !inside;
          }
      }
      return inside;
  }
  function pointWithinPolygons(point, polygons) {
      for (let i = 0; i < polygons.length; i++) {
          if (pointWithinPolygon(point, polygons[i]))
              return true;
      }
      return false;
  }
  function perp(v1, v2) {
      return v1[0] * v2[1] - v1[1] * v2[0];
  }
  function twoSided(p1, p2, q1, q2) {
      const x1 = p1[0] - q1[0];
      const y1 = p1[1] - q1[1];
      const x2 = p2[0] - q1[0];
      const y2 = p2[1] - q1[1];
      const x3 = q2[0] - q1[0];
      const y3 = q2[1] - q1[1];
      const det1 = x1 * y3 - x3 * y1;
      const det2 = x2 * y3 - x3 * y2;
      if (det1 > 0 && det2 < 0 || det1 < 0 && det2 > 0)
          return true;
      return false;
  }
  function lineIntersectLine(a, b, c, d) {
      const vectorP = [
          b[0] - a[0],
          b[1] - a[1]
      ];
      const vectorQ = [
          d[0] - c[0],
          d[1] - c[1]
      ];
      if (perp(vectorQ, vectorP) === 0)
          return false;
      if (twoSided(a, b, c, d) && twoSided(c, d, a, b))
          return true;
      return false;
  }
  function lineIntersectPolygon(p1, p2, polygon) {
      for (const ring of polygon) {
          for (let j = 0; j < ring.length - 1; ++j) {
              if (lineIntersectLine(p1, p2, ring[j], ring[j + 1])) {
                  return true;
              }
          }
      }
      return false;
  }
  function lineStringWithinPolygon(line, polygon) {
      for (let i = 0; i < line.length; ++i) {
          if (!pointWithinPolygon(line[i], polygon)) {
              return false;
          }
      }
      for (let i = 0; i < line.length - 1; ++i) {
          if (lineIntersectPolygon(line[i], line[i + 1], polygon)) {
              return false;
          }
      }
      return true;
  }
  function lineStringWithinPolygons(line, polygons) {
      for (let i = 0; i < polygons.length; i++) {
          if (lineStringWithinPolygon(line, polygons[i]))
              return true;
      }
      return false;
  }
  function getTilePolygon(coordinates, bbox, canonical) {
      const polygon = [];
      for (let i = 0; i < coordinates.length; i++) {
          const ring = [];
          for (let j = 0; j < coordinates[i].length; j++) {
              const coord = getTileCoordinates(coordinates[i][j], canonical);
              updateBBox(bbox, coord);
              ring.push(coord);
          }
          polygon.push(ring);
      }
      return polygon;
  }
  function getTilePolygons(coordinates, bbox, canonical) {
      const polygons = [];
      for (let i = 0; i < coordinates.length; i++) {
          const polygon = getTilePolygon(coordinates[i], bbox, canonical);
          polygons.push(polygon);
      }
      return polygons;
  }
  function updatePoint(p, bbox, polyBBox, worldSize) {
      if (p[0] < polyBBox[0] || p[0] > polyBBox[2]) {
          const halfWorldSize = worldSize * 0.5;
          let shift = p[0] - polyBBox[0] > halfWorldSize ? -worldSize : polyBBox[0] - p[0] > halfWorldSize ? worldSize : 0;
          if (shift === 0) {
              shift = p[0] - polyBBox[2] > halfWorldSize ? -worldSize : polyBBox[2] - p[0] > halfWorldSize ? worldSize : 0;
          }
          p[0] += shift;
      }
      updateBBox(bbox, p);
  }
  function resetBBox(bbox) {
      bbox[0] = bbox[1] = Infinity;
      bbox[2] = bbox[3] = -Infinity;
  }
  function getTilePoints(geometry, pointBBox, polyBBox, canonical) {
      const worldSize = Math.pow(2, canonical.z) * EXTENT;
      const shifts = [
          canonical.x * EXTENT,
          canonical.y * EXTENT
      ];
      const tilePoints = [];
      for (const points of geometry) {
          for (const point of points) {
              const p = [
                  point.x + shifts[0],
                  point.y + shifts[1]
              ];
              updatePoint(p, pointBBox, polyBBox, worldSize);
              tilePoints.push(p);
          }
      }
      return tilePoints;
  }
  function getTileLines(geometry, lineBBox, polyBBox, canonical) {
      const worldSize = Math.pow(2, canonical.z) * EXTENT;
      const shifts = [
          canonical.x * EXTENT,
          canonical.y * EXTENT
      ];
      const tileLines = [];
      for (const line of geometry) {
          const tileLine = [];
          for (const point of line) {
              const p = [
                  point.x + shifts[0],
                  point.y + shifts[1]
              ];
              updateBBox(lineBBox, p);
              tileLine.push(p);
          }
          tileLines.push(tileLine);
      }
      if (lineBBox[2] - lineBBox[0] <= worldSize / 2) {
          resetBBox(lineBBox);
          for (const line of tileLines) {
              for (const p of line) {
                  updatePoint(p, lineBBox, polyBBox, worldSize);
              }
          }
      }
      return tileLines;
  }
  function pointsWithinPolygons(ctx, polygonGeometry) {
      const pointBBox = [
          Infinity,
          Infinity,
          -Infinity,
          -Infinity
      ];
      const polyBBox = [
          Infinity,
          Infinity,
          -Infinity,
          -Infinity
      ];
      const canonical = ctx.canonicalID();
      if (polygonGeometry.type === 'Polygon') {
          const tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
          const tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
          if (!boxWithinBox(pointBBox, polyBBox))
              return false;
          for (const point of tilePoints) {
              if (!pointWithinPolygon(point, tilePolygon))
                  return false;
          }
      }
      if (polygonGeometry.type === 'MultiPolygon') {
          const tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
          const tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
          if (!boxWithinBox(pointBBox, polyBBox))
              return false;
          for (const point of tilePoints) {
              if (!pointWithinPolygons(point, tilePolygons))
                  return false;
          }
      }
      return true;
  }
  function linesWithinPolygons(ctx, polygonGeometry) {
      const lineBBox = [
          Infinity,
          Infinity,
          -Infinity,
          -Infinity
      ];
      const polyBBox = [
          Infinity,
          Infinity,
          -Infinity,
          -Infinity
      ];
      const canonical = ctx.canonicalID();
      if (polygonGeometry.type === 'Polygon') {
          const tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
          const tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
          if (!boxWithinBox(lineBBox, polyBBox))
              return false;
          for (const line of tileLines) {
              if (!lineStringWithinPolygon(line, tilePolygon))
                  return false;
          }
      }
      if (polygonGeometry.type === 'MultiPolygon') {
          const tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
          const tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
          if (!boxWithinBox(lineBBox, polyBBox))
              return false;
          for (const line of tileLines) {
              if (!lineStringWithinPolygons(line, tilePolygons))
                  return false;
          }
      }
      return true;
  }
  class Within {
      constructor(geojson, geometries) {
          this.type = BooleanType;
          this.geojson = geojson;
          this.geometries = geometries;
      }
      static parse(args, context) {
          if (args.length !== 2)
              return context.error(`'within' expression requires exactly one argument, but found ${ args.length - 1 } instead.`);
          if (isValue(args[1])) {
              const geojson = args[1];
              if (geojson.type === 'FeatureCollection') {
                  for (let i = 0; i < geojson.features.length; ++i) {
                      const type = geojson.features[i].geometry.type;
                      if (type === 'Polygon' || type === 'MultiPolygon') {
                          return new Within(geojson, geojson.features[i].geometry);
                      }
                  }
              } else if (geojson.type === 'Feature') {
                  const type = geojson.geometry.type;
                  if (type === 'Polygon' || type === 'MultiPolygon') {
                      return new Within(geojson, geojson.geometry);
                  }
              } else if (geojson.type === 'Polygon' || geojson.type === 'MultiPolygon') {
                  return new Within(geojson, geojson);
              }
          }
          return context.error(`'within' expression requires valid geojson object that contains polygon geometry type.`);
      }
      evaluate(ctx) {
          if (ctx.geometry() != null && ctx.canonicalID() != null) {
              if (ctx.geometryType() === 'Point') {
                  return pointsWithinPolygons(ctx, this.geometries);
              } else if (ctx.geometryType() === 'LineString') {
                  return linesWithinPolygons(ctx, this.geometries);
              }
          }
          return false;
      }
      eachChild() {
      }
      outputDefined() {
          return true;
      }
      serialize() {
          return [
              'within',
              this.geojson
          ];
      }
  }

  function isFeatureConstant(e) {
      if (e instanceof CompoundExpression) {
          if (e.name === 'get' && e.args.length === 1) {
              return false;
          } else if (e.name === 'feature-state') {
              return false;
          } else if (e.name === 'has' && e.args.length === 1) {
              return false;
          } else if (e.name === 'properties' || e.name === 'geometry-type' || e.name === 'id') {
              return false;
          } else if (/^filter-/.test(e.name)) {
              return false;
          }
      }
      if (e instanceof Within) {
          return false;
      }
      let result = true;
      e.eachChild(arg => {
          if (result && !isFeatureConstant(arg)) {
              result = false;
          }
      });
      return result;
  }
  function isStateConstant(e) {
      if (e instanceof CompoundExpression) {
          if (e.name === 'feature-state') {
              return false;
          }
      }
      let result = true;
      e.eachChild(arg => {
          if (result && !isStateConstant(arg)) {
              result = false;
          }
      });
      return result;
  }
  function isGlobalPropertyConstant(e, properties) {
      if (e instanceof CompoundExpression && properties.indexOf(e.name) >= 0) {
          return false;
      }
      let result = true;
      e.eachChild(arg => {
          if (result && !isGlobalPropertyConstant(arg, properties)) {
              result = false;
          }
      });
      return result;
  }

  class Var {
      constructor(name, boundExpression) {
          this.type = boundExpression.type;
          this.name = name;
          this.boundExpression = boundExpression;
      }
      static parse(args, context) {
          if (args.length !== 2 || typeof args[1] !== 'string')
              return context.error(`'var' expression requires exactly one string literal argument.`);
          const name = args[1];
          if (!context.scope.has(name)) {
              return context.error(`Unknown variable "${ name }". Make sure "${ name }" has been bound in an enclosing "let" expression before using it.`, 1);
          }
          return new Var(name, context.scope.get(name));
      }
      evaluate(ctx) {
          return this.boundExpression.evaluate(ctx);
      }
      eachChild() {
      }
      outputDefined() {
          return false;
      }
      serialize() {
          return [
              'var',
              this.name
          ];
      }
  }

  class ParsingContext {
      constructor(registry, path = [], expectedType, scope = new Scope(), errors = []) {
          this.registry = registry;
          this.path = path;
          this.key = path.map(part => `[${ part }]`).join('');
          this.scope = scope;
          this.errors = errors;
          this.expectedType = expectedType;
      }
      parse(expr, index, expectedType, bindings, options = {}) {
          if (index) {
              return this.concat(index, expectedType, bindings)._parse(expr, options);
          }
          return this._parse(expr, options);
      }
      _parse(expr, options) {
          if (expr === null || typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
              expr = [
                  'literal',
                  expr
              ];
          }
          function annotate(parsed, type, typeAnnotation) {
              if (typeAnnotation === 'assert') {
                  return new Assertion(type, [parsed]);
              } else if (typeAnnotation === 'coerce') {
                  return new Coercion(type, [parsed]);
              } else {
                  return parsed;
              }
          }
          if (Array.isArray(expr)) {
              if (expr.length === 0) {
                  return this.error(`Expected an array with at least one element. If you wanted a literal array, use ["literal", []].`);
              }
              const op = expr[0];
              if (typeof op !== 'string') {
                  this.error(`Expression name must be a string, but found ${ typeof op } instead. If you wanted a literal array, use ["literal", [...]].`, 0);
                  return null;
              }
              const Expr = this.registry[op];
              if (Expr) {
                  let parsed = Expr.parse(expr, this);
                  if (!parsed)
                      return null;
                  if (this.expectedType) {
                      const expected = this.expectedType;
                      const actual = parsed.type;
                      if ((expected.kind === 'string' || expected.kind === 'number' || expected.kind === 'boolean' || expected.kind === 'object' || expected.kind === 'array') && actual.kind === 'value') {
                          parsed = annotate(parsed, expected, options.typeAnnotation || 'assert');
                      } else if ((expected.kind === 'color' || expected.kind === 'formatted' || expected.kind === 'resolvedImage') && (actual.kind === 'value' || actual.kind === 'string')) {
                          parsed = annotate(parsed, expected, options.typeAnnotation || 'coerce');
                      } else if (this.checkSubtype(expected, actual)) {
                          return null;
                      }
                  }
                  if (!(parsed instanceof Literal) && parsed.type.kind !== 'resolvedImage' && isConstant(parsed)) {
                      const ec = new EvaluationContext();
                      try {
                          parsed = new Literal(parsed.type, parsed.evaluate(ec));
                      } catch (e) {
                          this.error(e.message);
                          return null;
                      }
                  }
                  return parsed;
              }
              return this.error(`Unknown expression "${ op }". If you wanted a literal array, use ["literal", [...]].`, 0);
          } else if (typeof expr === 'undefined') {
              return this.error(`'undefined' value invalid. Use null instead.`);
          } else if (typeof expr === 'object') {
              return this.error(`Bare objects invalid. Use ["literal", {...}] instead.`);
          } else {
              return this.error(`Expected an array, but found ${ typeof expr } instead.`);
          }
      }
      concat(index, expectedType, bindings) {
          const path = typeof index === 'number' ? this.path.concat(index) : this.path;
          const scope = bindings ? this.scope.concat(bindings) : this.scope;
          return new ParsingContext(this.registry, path, expectedType || null, scope, this.errors);
      }
      error(error, ...keys) {
          const key = `${ this.key }${ keys.map(k => `[${ k }]`).join('') }`;
          this.errors.push(new ParsingError(key, error));
      }
      checkSubtype(expected, t) {
          const error = checkSubtype(expected, t);
          if (error)
              this.error(error);
          return error;
      }
  }
  function isConstant(expression) {
      if (expression instanceof Var) {
          return isConstant(expression.boundExpression);
      } else if (expression instanceof CompoundExpression && expression.name === 'error') {
          return false;
      } else if (expression instanceof CollatorExpression) {
          return false;
      } else if (expression instanceof Within) {
          return false;
      }
      const isTypeAnnotation = expression instanceof Coercion || expression instanceof Assertion;
      let childrenConstant = true;
      expression.eachChild(child => {
          if (isTypeAnnotation) {
              childrenConstant = childrenConstant && isConstant(child);
          } else {
              childrenConstant = childrenConstant && child instanceof Literal;
          }
      });
      if (!childrenConstant) {
          return false;
      }
      return isFeatureConstant(expression) && isGlobalPropertyConstant(expression, [
          'zoom',
          'heatmap-density',
          'line-progress',
          'sky-radial-progress',
          'accumulated',
          'is-supported-script'
      ]);
  }

  function findStopLessThanOrEqualTo(stops, input) {
      const lastIndex = stops.length - 1;
      let lowerIndex = 0;
      let upperIndex = lastIndex;
      let currentIndex = 0;
      let currentValue, nextValue;
      while (lowerIndex <= upperIndex) {
          currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
          currentValue = stops[currentIndex];
          nextValue = stops[currentIndex + 1];
          if (currentValue <= input) {
              if (currentIndex === lastIndex || input < nextValue) {
                  return currentIndex;
              }
              lowerIndex = currentIndex + 1;
          } else if (currentValue > input) {
              upperIndex = currentIndex - 1;
          } else {
              throw new RuntimeError('Input is not a number.');
          }
      }
      return 0;
  }

  class Step {
      constructor(type, input, stops) {
          this.type = type;
          this.input = input;
          this.labels = [];
          this.outputs = [];
          for (const [label, expression] of stops) {
              this.labels.push(label);
              this.outputs.push(expression);
          }
      }
      static parse(args, context) {
          if (args.length - 1 < 4) {
              return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
          }
          if ((args.length - 1) % 2 !== 0) {
              return context.error(`Expected an even number of arguments.`);
          }
          const input = context.parse(args[1], 1, NumberType);
          if (!input)
              return null;
          const stops = [];
          let outputType = null;
          if (context.expectedType && context.expectedType.kind !== 'value') {
              outputType = context.expectedType;
          }
          for (let i = 1; i < args.length; i += 2) {
              const label = i === 1 ? -Infinity : args[i];
              const value = args[i + 1];
              const labelKey = i;
              const valueKey = i + 1;
              if (typeof label !== 'number') {
                  return context.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
              }
              if (stops.length && stops[stops.length - 1][0] >= label) {
                  return context.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', labelKey);
              }
              const parsed = context.parse(value, valueKey, outputType);
              if (!parsed)
                  return null;
              outputType = outputType || parsed.type;
              stops.push([
                  label,
                  parsed
              ]);
          }
          return new Step(outputType, input, stops);
      }
      evaluate(ctx) {
          const labels = this.labels;
          const outputs = this.outputs;
          if (labels.length === 1) {
              return outputs[0].evaluate(ctx);
          }
          const value = this.input.evaluate(ctx);
          if (value <= labels[0]) {
              return outputs[0].evaluate(ctx);
          }
          const stopCount = labels.length;
          if (value >= labels[stopCount - 1]) {
              return outputs[stopCount - 1].evaluate(ctx);
          }
          const index = findStopLessThanOrEqualTo(labels, value);
          return outputs[index].evaluate(ctx);
      }
      eachChild(fn) {
          fn(this.input);
          for (const expression of this.outputs) {
              fn(expression);
          }
      }
      outputDefined() {
          return this.outputs.every(out => out.outputDefined());
      }
      serialize() {
          const serialized = [
              'step',
              this.input.serialize()
          ];
          for (let i = 0; i < this.labels.length; i++) {
              if (i > 0) {
                  serialized.push(this.labels[i]);
              }
              serialized.push(this.outputs[i].serialize());
          }
          return serialized;
      }
  }

  /*
   * Copyright (C) 2008 Apple Inc. All Rights Reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions
   * are met:
   * 1. Redistributions of source code must retain the above copyright
   *    notice, this list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright
   *    notice, this list of conditions and the following disclaimer in the
   *    documentation and/or other materials provided with the distribution.
   *
   * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
   * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
   * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
   * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
   * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   * Ported from Webkit
   * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
   */

  var unitbezier = UnitBezier;

  function UnitBezier(p1x, p1y, p2x, p2y) {
      // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
      this.cx = 3.0 * p1x;
      this.bx = 3.0 * (p2x - p1x) - this.cx;
      this.ax = 1.0 - this.cx - this.bx;

      this.cy = 3.0 * p1y;
      this.by = 3.0 * (p2y - p1y) - this.cy;
      this.ay = 1.0 - this.cy - this.by;

      this.p1x = p1x;
      this.p1y = p2y;
      this.p2x = p2x;
      this.p2y = p2y;
  }

  UnitBezier.prototype.sampleCurveX = function(t) {
      // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
      return ((this.ax * t + this.bx) * t + this.cx) * t;
  };

  UnitBezier.prototype.sampleCurveY = function(t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
  };

  UnitBezier.prototype.sampleCurveDerivativeX = function(t) {
      return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  };

  UnitBezier.prototype.solveCurveX = function(x, epsilon) {
      if (typeof epsilon === 'undefined') epsilon = 1e-6;

      var t0, t1, t2, x2, i;

      // First try a few iterations of Newton's method -- normally very fast.
      for (t2 = x, i = 0; i < 8; i++) {

          x2 = this.sampleCurveX(t2) - x;
          if (Math.abs(x2) < epsilon) return t2;

          var d2 = this.sampleCurveDerivativeX(t2);
          if (Math.abs(d2) < 1e-6) break;

          t2 = t2 - x2 / d2;
      }

      // Fall back to the bisection method for reliability.
      t0 = 0.0;
      t1 = 1.0;
      t2 = x;

      if (t2 < t0) return t0;
      if (t2 > t1) return t1;

      while (t0 < t1) {

          x2 = this.sampleCurveX(t2);
          if (Math.abs(x2 - x) < epsilon) return t2;

          if (x > x2) {
              t0 = t2;
          } else {
              t1 = t2;
          }

          t2 = (t1 - t0) * 0.5 + t0;
      }

      // Failure.
      return t2;
  };

  UnitBezier.prototype.solve = function(x, epsilon) {
      return this.sampleCurveY(this.solveCurveX(x, epsilon));
  };

  function number(a, b, t) {
      return a * (1 - t) + b * t;
  }
  function color(from, to, t) {
      return new Color(number(from.r, to.r, t), number(from.g, to.g, t), number(from.b, to.b, t), number(from.a, to.a, t));
  }
  function array$1(from, to, t) {
      return from.map((d, i) => {
          return number(d, to[i], t);
      });
  }

  var interpolate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    number: number,
    color: color,
    array: array$1
  });

  const Xn = 0.95047, Yn = 1, Zn = 1.08883, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1, deg2rad = Math.PI / 180, rad2deg = 180 / Math.PI;
  function xyz2lab(t) {
      return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }
  function lab2xyz(t) {
      return t > t1 ? t * t * t : t2 * (t - t0);
  }
  function xyz2rgb(x) {
      return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }
  function rgb2xyz(x) {
      x /= 255;
      return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }
  function rgbToLab(rgbColor) {
      const b = rgb2xyz(rgbColor.r), a = rgb2xyz(rgbColor.g), l = rgb2xyz(rgbColor.b), x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn), y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.072175 * l) / Yn), z = xyz2lab((0.0193339 * b + 0.119192 * a + 0.9503041 * l) / Zn);
      return {
          l: 116 * y - 16,
          a: 500 * (x - y),
          b: 200 * (y - z),
          alpha: rgbColor.a
      };
  }
  function labToRgb(labColor) {
      let y = (labColor.l + 16) / 116, x = isNaN(labColor.a) ? y : y + labColor.a / 500, z = isNaN(labColor.b) ? y : y - labColor.b / 200;
      y = Yn * lab2xyz(y);
      x = Xn * lab2xyz(x);
      z = Zn * lab2xyz(z);
      return new Color(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), xyz2rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), labColor.alpha);
  }
  function interpolateLab(from, to, t) {
      return {
          l: number(from.l, to.l, t),
          a: number(from.a, to.a, t),
          b: number(from.b, to.b, t),
          alpha: number(from.alpha, to.alpha, t)
      };
  }
  function rgbToHcl(rgbColor) {
      const {l, a, b} = rgbToLab(rgbColor);
      const h = Math.atan2(b, a) * rad2deg;
      return {
          h: h < 0 ? h + 360 : h,
          c: Math.sqrt(a * a + b * b),
          l,
          alpha: rgbColor.a
      };
  }
  function hclToRgb(hclColor) {
      const h = hclColor.h * deg2rad, c = hclColor.c, l = hclColor.l;
      return labToRgb({
          l,
          a: Math.cos(h) * c,
          b: Math.sin(h) * c,
          alpha: hclColor.alpha
      });
  }
  function interpolateHue(a, b, t) {
      const d = b - a;
      return a + t * (d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d);
  }
  function interpolateHcl(from, to, t) {
      return {
          h: interpolateHue(from.h, to.h, t),
          c: number(from.c, to.c, t),
          l: number(from.l, to.l, t),
          alpha: number(from.alpha, to.alpha, t)
      };
  }
  const lab = {
      forward: rgbToLab,
      reverse: labToRgb,
      interpolate: interpolateLab
  };
  const hcl = {
      forward: rgbToHcl,
      reverse: hclToRgb,
      interpolate: interpolateHcl
  };

  var colorSpaces = /*#__PURE__*/Object.freeze({
    __proto__: null,
    lab: lab,
    hcl: hcl
  });

  class Interpolate {
      constructor(type, operator, interpolation, input, stops) {
          this.type = type;
          this.operator = operator;
          this.interpolation = interpolation;
          this.input = input;
          this.labels = [];
          this.outputs = [];
          for (const [label, expression] of stops) {
              this.labels.push(label);
              this.outputs.push(expression);
          }
      }
      static interpolationFactor(interpolation, input, lower, upper) {
          let t = 0;
          if (interpolation.name === 'exponential') {
              t = exponentialInterpolation(input, interpolation.base, lower, upper);
          } else if (interpolation.name === 'linear') {
              t = exponentialInterpolation(input, 1, lower, upper);
          } else if (interpolation.name === 'cubic-bezier') {
              const c = interpolation.controlPoints;
              const ub = new unitbezier(c[0], c[1], c[2], c[3]);
              t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
          }
          return t;
      }
      static parse(args, context) {
          let [operator, interpolation, input, ...rest] = args;
          if (!Array.isArray(interpolation) || interpolation.length === 0) {
              return context.error(`Expected an interpolation type expression.`, 1);
          }
          if (interpolation[0] === 'linear') {
              interpolation = { name: 'linear' };
          } else if (interpolation[0] === 'exponential') {
              const base = interpolation[1];
              if (typeof base !== 'number')
                  return context.error(`Exponential interpolation requires a numeric base.`, 1, 1);
              interpolation = {
                  name: 'exponential',
                  base
              };
          } else if (interpolation[0] === 'cubic-bezier') {
              const controlPoints = interpolation.slice(1);
              if (controlPoints.length !== 4 || controlPoints.some(t => typeof t !== 'number' || t < 0 || t > 1)) {
                  return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1);
              }
              interpolation = {
                  name: 'cubic-bezier',
                  controlPoints: controlPoints
              };
          } else {
              return context.error(`Unknown interpolation type ${ String(interpolation[0]) }`, 1, 0);
          }
          if (args.length - 1 < 4) {
              return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
          }
          if ((args.length - 1) % 2 !== 0) {
              return context.error(`Expected an even number of arguments.`);
          }
          input = context.parse(input, 2, NumberType);
          if (!input)
              return null;
          const stops = [];
          let outputType = null;
          if (operator === 'interpolate-hcl' || operator === 'interpolate-lab') {
              outputType = ColorType;
          } else if (context.expectedType && context.expectedType.kind !== 'value') {
              outputType = context.expectedType;
          }
          for (let i = 0; i < rest.length; i += 2) {
              const label = rest[i];
              const value = rest[i + 1];
              const labelKey = i + 3;
              const valueKey = i + 4;
              if (typeof label !== 'number') {
                  return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
              }
              if (stops.length && stops[stops.length - 1][0] >= label) {
                  return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey);
              }
              const parsed = context.parse(value, valueKey, outputType);
              if (!parsed)
                  return null;
              outputType = outputType || parsed.type;
              stops.push([
                  label,
                  parsed
              ]);
          }
          if (outputType.kind !== 'number' && outputType.kind !== 'color' && !(outputType.kind === 'array' && outputType.itemType.kind === 'number' && typeof outputType.N === 'number')) {
              return context.error(`Type ${ toString(outputType) } is not interpolatable.`);
          }
          return new Interpolate(outputType, operator, interpolation, input, stops);
      }
      evaluate(ctx) {
          const labels = this.labels;
          const outputs = this.outputs;
          if (labels.length === 1) {
              return outputs[0].evaluate(ctx);
          }
          const value = this.input.evaluate(ctx);
          if (value <= labels[0]) {
              return outputs[0].evaluate(ctx);
          }
          const stopCount = labels.length;
          if (value >= labels[stopCount - 1]) {
              return outputs[stopCount - 1].evaluate(ctx);
          }
          const index = findStopLessThanOrEqualTo(labels, value);
          const lower = labels[index];
          const upper = labels[index + 1];
          const t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);
          const outputLower = outputs[index].evaluate(ctx);
          const outputUpper = outputs[index + 1].evaluate(ctx);
          if (this.operator === 'interpolate') {
              return interpolate[this.type.kind.toLowerCase()](outputLower, outputUpper, t);
          } else if (this.operator === 'interpolate-hcl') {
              return hcl.reverse(hcl.interpolate(hcl.forward(outputLower), hcl.forward(outputUpper), t));
          } else {
              return lab.reverse(lab.interpolate(lab.forward(outputLower), lab.forward(outputUpper), t));
          }
      }
      eachChild(fn) {
          fn(this.input);
          for (const expression of this.outputs) {
              fn(expression);
          }
      }
      outputDefined() {
          return this.outputs.every(out => out.outputDefined());
      }
      serialize() {
          let interpolation;
          if (this.interpolation.name === 'linear') {
              interpolation = ['linear'];
          } else if (this.interpolation.name === 'exponential') {
              if (this.interpolation.base === 1) {
                  interpolation = ['linear'];
              } else {
                  interpolation = [
                      'exponential',
                      this.interpolation.base
                  ];
              }
          } else {
              interpolation = ['cubic-bezier'].concat(this.interpolation.controlPoints);
          }
          const serialized = [
              this.operator,
              interpolation,
              this.input.serialize()
          ];
          for (let i = 0; i < this.labels.length; i++) {
              serialized.push(this.labels[i], this.outputs[i].serialize());
          }
          return serialized;
      }
  }
  function exponentialInterpolation(input, base, lowerValue, upperValue) {
      const difference = upperValue - lowerValue;
      const progress = input - lowerValue;
      if (difference === 0) {
          return 0;
      } else if (base === 1) {
          return progress / difference;
      } else {
          return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
      }
  }

  class Coalesce {
      constructor(type, args) {
          this.type = type;
          this.args = args;
      }
      static parse(args, context) {
          if (args.length < 2) {
              return context.error('Expectected at least one argument.');
          }
          let outputType = null;
          const expectedType = context.expectedType;
          if (expectedType && expectedType.kind !== 'value') {
              outputType = expectedType;
          }
          const parsedArgs = [];
          for (const arg of args.slice(1)) {
              const parsed = context.parse(arg, 1 + parsedArgs.length, outputType, undefined, { typeAnnotation: 'omit' });
              if (!parsed)
                  return null;
              outputType = outputType || parsed.type;
              parsedArgs.push(parsed);
          }
          const needsAnnotation = expectedType && parsedArgs.some(arg => checkSubtype(expectedType, arg.type));
          return needsAnnotation ? new Coalesce(ValueType, parsedArgs) : new Coalesce(outputType, parsedArgs);
      }
      evaluate(ctx) {
          let result = null;
          let argCount = 0;
          let requestedImageName;
          for (const arg of this.args) {
              argCount++;
              result = arg.evaluate(ctx);
              if (result && result instanceof ResolvedImage && !result.available) {
                  if (!requestedImageName) {
                      requestedImageName = result.name;
                  }
                  result = null;
                  if (argCount === this.args.length) {
                      result = requestedImageName;
                  }
              }
              if (result !== null)
                  break;
          }
          return result;
      }
      eachChild(fn) {
          this.args.forEach(fn);
      }
      outputDefined() {
          return this.args.every(arg => arg.outputDefined());
      }
      serialize() {
          const serialized = ['coalesce'];
          this.eachChild(child => {
              serialized.push(child.serialize());
          });
          return serialized;
      }
  }

  class Let {
      constructor(bindings, result) {
          this.type = result.type;
          this.bindings = [].concat(bindings);
          this.result = result;
      }
      evaluate(ctx) {
          return this.result.evaluate(ctx);
      }
      eachChild(fn) {
          for (const binding of this.bindings) {
              fn(binding[1]);
          }
          fn(this.result);
      }
      static parse(args, context) {
          if (args.length < 4)
              return context.error(`Expected at least 3 arguments, but found ${ args.length - 1 } instead.`);
          const bindings = [];
          for (let i = 1; i < args.length - 1; i += 2) {
              const name = args[i];
              if (typeof name !== 'string') {
                  return context.error(`Expected string, but found ${ typeof name } instead.`, i);
              }
              if (/[^a-zA-Z0-9_]/.test(name)) {
                  return context.error(`Variable names must contain only alphanumeric characters or '_'.`, i);
              }
              const value = context.parse(args[i + 1], i + 1);
              if (!value)
                  return null;
              bindings.push([
                  name,
                  value
              ]);
          }
          const result = context.parse(args[args.length - 1], args.length - 1, context.expectedType, bindings);
          if (!result)
              return null;
          return new Let(bindings, result);
      }
      outputDefined() {
          return this.result.outputDefined();
      }
      serialize() {
          const serialized = ['let'];
          for (const [name, expr] of this.bindings) {
              serialized.push(name, expr.serialize());
          }
          serialized.push(this.result.serialize());
          return serialized;
      }
  }

  class At {
      constructor(type, index, input) {
          this.type = type;
          this.index = index;
          this.input = input;
      }
      static parse(args, context) {
          if (args.length !== 3)
              return context.error(`Expected 2 arguments, but found ${ args.length - 1 } instead.`);
          const index = context.parse(args[1], 1, NumberType);
          const input = context.parse(args[2], 2, array(context.expectedType || ValueType));
          if (!index || !input)
              return null;
          const t = input.type;
          return new At(t.itemType, index, input);
      }
      evaluate(ctx) {
          const index = this.index.evaluate(ctx);
          const array = this.input.evaluate(ctx);
          if (index < 0) {
              throw new RuntimeError(`Array index out of bounds: ${ index } < 0.`);
          }
          if (index >= array.length) {
              throw new RuntimeError(`Array index out of bounds: ${ index } > ${ array.length - 1 }.`);
          }
          if (index !== Math.floor(index)) {
              throw new RuntimeError(`Array index must be an integer, but found ${ index } instead.`);
          }
          return array[index];
      }
      eachChild(fn) {
          fn(this.index);
          fn(this.input);
      }
      outputDefined() {
          return false;
      }
      serialize() {
          return [
              'at',
              this.index.serialize(),
              this.input.serialize()
          ];
      }
  }

  class In {
      constructor(needle, haystack) {
          this.type = BooleanType;
          this.needle = needle;
          this.haystack = haystack;
      }
      static parse(args, context) {
          if (args.length !== 3) {
              return context.error(`Expected 2 arguments, but found ${ args.length - 1 } instead.`);
          }
          const needle = context.parse(args[1], 1, ValueType);
          const haystack = context.parse(args[2], 2, ValueType);
          if (!needle || !haystack)
              return null;
          if (!isValidType(needle.type, [
                  BooleanType,
                  StringType,
                  NumberType,
                  NullType,
                  ValueType
              ])) {
              return context.error(`Expected first argument to be of type boolean, string, number or null, but found ${ toString(needle.type) } instead`);
          }
          return new In(needle, haystack);
      }
      evaluate(ctx) {
          const needle = this.needle.evaluate(ctx);
          const haystack = this.haystack.evaluate(ctx);
          if (!haystack)
              return false;
          if (!isValidNativeType(needle, [
                  'boolean',
                  'string',
                  'number',
                  'null'
              ])) {
              throw new RuntimeError(`Expected first argument to be of type boolean, string, number or null, but found ${ toString(typeOf(needle)) } instead.`);
          }
          if (!isValidNativeType(haystack, [
                  'string',
                  'array'
              ])) {
              throw new RuntimeError(`Expected second argument to be of type array or string, but found ${ toString(typeOf(haystack)) } instead.`);
          }
          return haystack.indexOf(needle) >= 0;
      }
      eachChild(fn) {
          fn(this.needle);
          fn(this.haystack);
      }
      outputDefined() {
          return true;
      }
      serialize() {
          return [
              'in',
              this.needle.serialize(),
              this.haystack.serialize()
          ];
      }
  }

  class IndexOf {
      constructor(needle, haystack, fromIndex) {
          this.type = NumberType;
          this.needle = needle;
          this.haystack = haystack;
          this.fromIndex = fromIndex;
      }
      static parse(args, context) {
          if (args.length <= 2 || args.length >= 5) {
              return context.error(`Expected 3 or 4 arguments, but found ${ args.length - 1 } instead.`);
          }
          const needle = context.parse(args[1], 1, ValueType);
          const haystack = context.parse(args[2], 2, ValueType);
          if (!needle || !haystack)
              return null;
          if (!isValidType(needle.type, [
                  BooleanType,
                  StringType,
                  NumberType,
                  NullType,
                  ValueType
              ])) {
              return context.error(`Expected first argument to be of type boolean, string, number or null, but found ${ toString(needle.type) } instead`);
          }
          if (args.length === 4) {
              const fromIndex = context.parse(args[3], 3, NumberType);
              if (!fromIndex)
                  return null;
              return new IndexOf(needle, haystack, fromIndex);
          } else {
              return new IndexOf(needle, haystack);
          }
      }
      evaluate(ctx) {
          const needle = this.needle.evaluate(ctx);
          const haystack = this.haystack.evaluate(ctx);
          if (!isValidNativeType(needle, [
                  'boolean',
                  'string',
                  'number',
                  'null'
              ])) {
              throw new RuntimeError(`Expected first argument to be of type boolean, string, number or null, but found ${ toString(typeOf(needle)) } instead.`);
          }
          if (!isValidNativeType(haystack, [
                  'string',
                  'array'
              ])) {
              throw new RuntimeError(`Expected second argument to be of type array or string, but found ${ toString(typeOf(haystack)) } instead.`);
          }
          if (this.fromIndex) {
              const fromIndex = this.fromIndex.evaluate(ctx);
              return haystack.indexOf(needle, fromIndex);
          }
          return haystack.indexOf(needle);
      }
      eachChild(fn) {
          fn(this.needle);
          fn(this.haystack);
          if (this.fromIndex) {
              fn(this.fromIndex);
          }
      }
      outputDefined() {
          return false;
      }
      serialize() {
          if (this.fromIndex != null && this.fromIndex !== undefined) {
              const fromIndex = this.fromIndex.serialize();
              return [
                  'index-of',
                  this.needle.serialize(),
                  this.haystack.serialize(),
                  fromIndex
              ];
          }
          return [
              'index-of',
              this.needle.serialize(),
              this.haystack.serialize()
          ];
      }
  }

  class Match {
      constructor(inputType, outputType, input, cases, outputs, otherwise) {
          this.inputType = inputType;
          this.type = outputType;
          this.input = input;
          this.cases = cases;
          this.outputs = outputs;
          this.otherwise = otherwise;
      }
      static parse(args, context) {
          if (args.length < 5)
              return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
          if (args.length % 2 !== 1)
              return context.error(`Expected an even number of arguments.`);
          let inputType;
          let outputType;
          if (context.expectedType && context.expectedType.kind !== 'value') {
              outputType = context.expectedType;
          }
          const cases = {};
          const outputs = [];
          for (let i = 2; i < args.length - 1; i += 2) {
              let labels = args[i];
              const value = args[i + 1];
              if (!Array.isArray(labels)) {
                  labels = [labels];
              }
              const labelContext = context.concat(i);
              if (labels.length === 0) {
                  return labelContext.error('Expected at least one branch label.');
              }
              for (const label of labels) {
                  if (typeof label !== 'number' && typeof label !== 'string') {
                      return labelContext.error(`Branch labels must be numbers or strings.`);
                  } else if (typeof label === 'number' && Math.abs(label) > Number.MAX_SAFE_INTEGER) {
                      return labelContext.error(`Branch labels must be integers no larger than ${ Number.MAX_SAFE_INTEGER }.`);
                  } else if (typeof label === 'number' && Math.floor(label) !== label) {
                      return labelContext.error(`Numeric branch labels must be integer values.`);
                  } else if (!inputType) {
                      inputType = typeOf(label);
                  } else if (labelContext.checkSubtype(inputType, typeOf(label))) {
                      return null;
                  }
                  if (typeof cases[String(label)] !== 'undefined') {
                      return labelContext.error('Branch labels must be unique.');
                  }
                  cases[String(label)] = outputs.length;
              }
              const result = context.parse(value, i, outputType);
              if (!result)
                  return null;
              outputType = outputType || result.type;
              outputs.push(result);
          }
          const input = context.parse(args[1], 1, ValueType);
          if (!input)
              return null;
          const otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
          if (!otherwise)
              return null;
          if (input.type.kind !== 'value' && context.concat(1).checkSubtype(inputType, input.type)) {
              return null;
          }
          return new Match(inputType, outputType, input, cases, outputs, otherwise);
      }
      evaluate(ctx) {
          const input = this.input.evaluate(ctx);
          const output = typeOf(input) === this.inputType && this.outputs[this.cases[input]] || this.otherwise;
          return output.evaluate(ctx);
      }
      eachChild(fn) {
          fn(this.input);
          this.outputs.forEach(fn);
          fn(this.otherwise);
      }
      outputDefined() {
          return this.outputs.every(out => out.outputDefined()) && this.otherwise.outputDefined();
      }
      serialize() {
          const serialized = [
              'match',
              this.input.serialize()
          ];
          const sortedLabels = Object.keys(this.cases).sort();
          const groupedByOutput = [];
          const outputLookup = {};
          for (const label of sortedLabels) {
              const outputIndex = outputLookup[this.cases[label]];
              if (outputIndex === undefined) {
                  outputLookup[this.cases[label]] = groupedByOutput.length;
                  groupedByOutput.push([
                      this.cases[label],
                      [label]
                  ]);
              } else {
                  groupedByOutput[outputIndex][1].push(label);
              }
          }
          const coerceLabel = label => this.inputType.kind === 'number' ? Number(label) : label;
          for (const [outputIndex, labels] of groupedByOutput) {
              if (labels.length === 1) {
                  serialized.push(coerceLabel(labels[0]));
              } else {
                  serialized.push(labels.map(coerceLabel));
              }
              serialized.push(this.outputs[outputIndex].serialize());
          }
          serialized.push(this.otherwise.serialize());
          return serialized;
      }
  }

  class Case {
      constructor(type, branches, otherwise) {
          this.type = type;
          this.branches = branches;
          this.otherwise = otherwise;
      }
      static parse(args, context) {
          if (args.length < 4)
              return context.error(`Expected at least 3 arguments, but found only ${ args.length - 1 }.`);
          if (args.length % 2 !== 0)
              return context.error(`Expected an odd number of arguments.`);
          let outputType;
          if (context.expectedType && context.expectedType.kind !== 'value') {
              outputType = context.expectedType;
          }
          const branches = [];
          for (let i = 1; i < args.length - 1; i += 2) {
              const test = context.parse(args[i], i, BooleanType);
              if (!test)
                  return null;
              const result = context.parse(args[i + 1], i + 1, outputType);
              if (!result)
                  return null;
              branches.push([
                  test,
                  result
              ]);
              outputType = outputType || result.type;
          }
          const otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
          if (!otherwise)
              return null;
          return new Case(outputType, branches, otherwise);
      }
      evaluate(ctx) {
          for (const [test, expression] of this.branches) {
              if (test.evaluate(ctx)) {
                  return expression.evaluate(ctx);
              }
          }
          return this.otherwise.evaluate(ctx);
      }
      eachChild(fn) {
          for (const [test, expression] of this.branches) {
              fn(test);
              fn(expression);
          }
          fn(this.otherwise);
      }
      outputDefined() {
          return this.branches.every(([_, out]) => out.outputDefined()) && this.otherwise.outputDefined();
      }
      serialize() {
          const serialized = ['case'];
          this.eachChild(child => {
              serialized.push(child.serialize());
          });
          return serialized;
      }
  }

  class Slice {
      constructor(type, input, beginIndex, endIndex) {
          this.type = type;
          this.input = input;
          this.beginIndex = beginIndex;
          this.endIndex = endIndex;
      }
      static parse(args, context) {
          if (args.length <= 2 || args.length >= 5) {
              return context.error(`Expected 3 or 4 arguments, but found ${ args.length - 1 } instead.`);
          }
          const input = context.parse(args[1], 1, ValueType);
          const beginIndex = context.parse(args[2], 2, NumberType);
          if (!input || !beginIndex)
              return null;
          if (!isValidType(input.type, [
                  array(ValueType),
                  StringType,
                  ValueType
              ])) {
              return context.error(`Expected first argument to be of type array or string, but found ${ toString(input.type) } instead`);
          }
          if (args.length === 4) {
              const endIndex = context.parse(args[3], 3, NumberType);
              if (!endIndex)
                  return null;
              return new Slice(input.type, input, beginIndex, endIndex);
          } else {
              return new Slice(input.type, input, beginIndex);
          }
      }
      evaluate(ctx) {
          const input = this.input.evaluate(ctx);
          const beginIndex = this.beginIndex.evaluate(ctx);
          if (!isValidNativeType(input, [
                  'string',
                  'array'
              ])) {
              throw new RuntimeError(`Expected first argument to be of type array or string, but found ${ toString(typeOf(input)) } instead.`);
          }
          if (this.endIndex) {
              const endIndex = this.endIndex.evaluate(ctx);
              return input.slice(beginIndex, endIndex);
          }
          return input.slice(beginIndex);
      }
      eachChild(fn) {
          fn(this.input);
          fn(this.beginIndex);
          if (this.endIndex) {
              fn(this.endIndex);
          }
      }
      outputDefined() {
          return false;
      }
      serialize() {
          if (this.endIndex != null && this.endIndex !== undefined) {
              const endIndex = this.endIndex.serialize();
              return [
                  'slice',
                  this.input.serialize(),
                  this.beginIndex.serialize(),
                  endIndex
              ];
          }
          return [
              'slice',
              this.input.serialize(),
              this.beginIndex.serialize()
          ];
      }
  }

  function isComparableType(op, type) {
      if (op === '==' || op === '!=') {
          return type.kind === 'boolean' || type.kind === 'string' || type.kind === 'number' || type.kind === 'null' || type.kind === 'value';
      } else {
          return type.kind === 'string' || type.kind === 'number' || type.kind === 'value';
      }
  }
  function eq(ctx, a, b) {
      return a === b;
  }
  function neq(ctx, a, b) {
      return a !== b;
  }
  function lt(ctx, a, b) {
      return a < b;
  }
  function gt(ctx, a, b) {
      return a > b;
  }
  function lteq(ctx, a, b) {
      return a <= b;
  }
  function gteq(ctx, a, b) {
      return a >= b;
  }
  function eqCollate(ctx, a, b, c) {
      return c.compare(a, b) === 0;
  }
  function neqCollate(ctx, a, b, c) {
      return !eqCollate(ctx, a, b, c);
  }
  function ltCollate(ctx, a, b, c) {
      return c.compare(a, b) < 0;
  }
  function gtCollate(ctx, a, b, c) {
      return c.compare(a, b) > 0;
  }
  function lteqCollate(ctx, a, b, c) {
      return c.compare(a, b) <= 0;
  }
  function gteqCollate(ctx, a, b, c) {
      return c.compare(a, b) >= 0;
  }
  function makeComparison(op, compareBasic, compareWithCollator) {
      const isOrderComparison = op !== '==' && op !== '!=';
      return class Comparison {
          constructor(lhs, rhs, collator) {
              this.type = BooleanType;
              this.lhs = lhs;
              this.rhs = rhs;
              this.collator = collator;
              this.hasUntypedArgument = lhs.type.kind === 'value' || rhs.type.kind === 'value';
          }
          static parse(args, context) {
              if (args.length !== 3 && args.length !== 4)
                  return context.error(`Expected two or three arguments.`);
              const op = args[0];
              let lhs = context.parse(args[1], 1, ValueType);
              if (!lhs)
                  return null;
              if (!isComparableType(op, lhs.type)) {
                  return context.concat(1).error(`"${ op }" comparisons are not supported for type '${ toString(lhs.type) }'.`);
              }
              let rhs = context.parse(args[2], 2, ValueType);
              if (!rhs)
                  return null;
              if (!isComparableType(op, rhs.type)) {
                  return context.concat(2).error(`"${ op }" comparisons are not supported for type '${ toString(rhs.type) }'.`);
              }
              if (lhs.type.kind !== rhs.type.kind && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                  return context.error(`Cannot compare types '${ toString(lhs.type) }' and '${ toString(rhs.type) }'.`);
              }
              if (isOrderComparison) {
                  if (lhs.type.kind === 'value' && rhs.type.kind !== 'value') {
                      lhs = new Assertion(rhs.type, [lhs]);
                  } else if (lhs.type.kind !== 'value' && rhs.type.kind === 'value') {
                      rhs = new Assertion(lhs.type, [rhs]);
                  }
              }
              let collator = null;
              if (args.length === 4) {
                  if (lhs.type.kind !== 'string' && rhs.type.kind !== 'string' && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                      return context.error(`Cannot use collator to compare non-string types.`);
                  }
                  collator = context.parse(args[3], 3, CollatorType);
                  if (!collator)
                      return null;
              }
              return new Comparison(lhs, rhs, collator);
          }
          evaluate(ctx) {
              const lhs = this.lhs.evaluate(ctx);
              const rhs = this.rhs.evaluate(ctx);
              if (isOrderComparison && this.hasUntypedArgument) {
                  const lt = typeOf(lhs);
                  const rt = typeOf(rhs);
                  if (lt.kind !== rt.kind || !(lt.kind === 'string' || lt.kind === 'number')) {
                      throw new RuntimeError(`Expected arguments for "${ op }" to be (string, string) or (number, number), but found (${ lt.kind }, ${ rt.kind }) instead.`);
                  }
              }
              if (this.collator && !isOrderComparison && this.hasUntypedArgument) {
                  const lt = typeOf(lhs);
                  const rt = typeOf(rhs);
                  if (lt.kind !== 'string' || rt.kind !== 'string') {
                      return compareBasic(ctx, lhs, rhs);
                  }
              }
              return this.collator ? compareWithCollator(ctx, lhs, rhs, this.collator.evaluate(ctx)) : compareBasic(ctx, lhs, rhs);
          }
          eachChild(fn) {
              fn(this.lhs);
              fn(this.rhs);
              if (this.collator) {
                  fn(this.collator);
              }
          }
          outputDefined() {
              return true;
          }
          serialize() {
              const serialized = [op];
              this.eachChild(child => {
                  serialized.push(child.serialize());
              });
              return serialized;
          }
      };
  }
  const Equals = makeComparison('==', eq, eqCollate);
  const NotEquals = makeComparison('!=', neq, neqCollate);
  const LessThan = makeComparison('<', lt, ltCollate);
  const GreaterThan = makeComparison('>', gt, gtCollate);
  const LessThanOrEqual = makeComparison('<=', lteq, lteqCollate);
  const GreaterThanOrEqual = makeComparison('>=', gteq, gteqCollate);

  class NumberFormat {
      constructor(number, locale, currency, minFractionDigits, maxFractionDigits) {
          this.type = StringType;
          this.number = number;
          this.locale = locale;
          this.currency = currency;
          this.minFractionDigits = minFractionDigits;
          this.maxFractionDigits = maxFractionDigits;
      }
      static parse(args, context) {
          if (args.length !== 3)
              return context.error(`Expected two arguments.`);
          const number = context.parse(args[1], 1, NumberType);
          if (!number)
              return null;
          const options = args[2];
          if (typeof options !== 'object' || Array.isArray(options))
              return context.error(`NumberFormat options argument must be an object.`);
          let locale = null;
          if (options['locale']) {
              locale = context.parse(options['locale'], 1, StringType);
              if (!locale)
                  return null;
          }
          let currency = null;
          if (options['currency']) {
              currency = context.parse(options['currency'], 1, StringType);
              if (!currency)
                  return null;
          }
          let minFractionDigits = null;
          if (options['min-fraction-digits']) {
              minFractionDigits = context.parse(options['min-fraction-digits'], 1, NumberType);
              if (!minFractionDigits)
                  return null;
          }
          let maxFractionDigits = null;
          if (options['max-fraction-digits']) {
              maxFractionDigits = context.parse(options['max-fraction-digits'], 1, NumberType);
              if (!maxFractionDigits)
                  return null;
          }
          return new NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits);
      }
      evaluate(ctx) {
          return new Intl.NumberFormat(this.locale ? this.locale.evaluate(ctx) : [], {
              style: this.currency ? 'currency' : 'decimal',
              currency: this.currency ? this.currency.evaluate(ctx) : undefined,
              minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(ctx) : undefined,
              maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(ctx) : undefined
          }).format(this.number.evaluate(ctx));
      }
      eachChild(fn) {
          fn(this.number);
          if (this.locale) {
              fn(this.locale);
          }
          if (this.currency) {
              fn(this.currency);
          }
          if (this.minFractionDigits) {
              fn(this.minFractionDigits);
          }
          if (this.maxFractionDigits) {
              fn(this.maxFractionDigits);
          }
      }
      outputDefined() {
          return false;
      }
      serialize() {
          const options = {};
          if (this.locale) {
              options['locale'] = this.locale.serialize();
          }
          if (this.currency) {
              options['currency'] = this.currency.serialize();
          }
          if (this.minFractionDigits) {
              options['min-fraction-digits'] = this.minFractionDigits.serialize();
          }
          if (this.maxFractionDigits) {
              options['max-fraction-digits'] = this.maxFractionDigits.serialize();
          }
          return [
              'number-format',
              this.number.serialize(),
              options
          ];
      }
  }

  class Length {
      constructor(input) {
          this.type = NumberType;
          this.input = input;
      }
      static parse(args, context) {
          if (args.length !== 2)
              return context.error(`Expected 1 argument, but found ${ args.length - 1 } instead.`);
          const input = context.parse(args[1], 1);
          if (!input)
              return null;
          if (input.type.kind !== 'array' && input.type.kind !== 'string' && input.type.kind !== 'value')
              return context.error(`Expected argument of type string or array, but found ${ toString(input.type) } instead.`);
          return new Length(input);
      }
      evaluate(ctx) {
          const input = this.input.evaluate(ctx);
          if (typeof input === 'string') {
              return input.length;
          } else if (Array.isArray(input)) {
              return input.length;
          } else {
              throw new RuntimeError(`Expected value to be of type string or array, but found ${ toString(typeOf(input)) } instead.`);
          }
      }
      eachChild(fn) {
          fn(this.input);
      }
      outputDefined() {
          return false;
      }
      serialize() {
          const serialized = ['length'];
          this.eachChild(child => {
              serialized.push(child.serialize());
          });
          return serialized;
      }
  }

  const expressions = {
      '==': Equals,
      '!=': NotEquals,
      '>': GreaterThan,
      '<': LessThan,
      '>=': GreaterThanOrEqual,
      '<=': LessThanOrEqual,
      'array': Assertion,
      'at': At,
      'boolean': Assertion,
      'case': Case,
      'coalesce': Coalesce,
      'collator': CollatorExpression,
      'format': FormatExpression,
      'image': ImageExpression,
      'in': In,
      'index-of': IndexOf,
      'interpolate': Interpolate,
      'interpolate-hcl': Interpolate,
      'interpolate-lab': Interpolate,
      'length': Length,
      'let': Let,
      'literal': Literal,
      'match': Match,
      'number': Assertion,
      'number-format': NumberFormat,
      'object': Assertion,
      'slice': Slice,
      'step': Step,
      'string': Assertion,
      'to-boolean': Coercion,
      'to-color': Coercion,
      'to-number': Coercion,
      'to-string': Coercion,
      'var': Var,
      'within': Within
  };
  function rgba(ctx, [r, g, b, a]) {
      r = r.evaluate(ctx);
      g = g.evaluate(ctx);
      b = b.evaluate(ctx);
      const alpha = a ? a.evaluate(ctx) : 1;
      const error = validateRGBA(r, g, b, alpha);
      if (error)
          throw new RuntimeError(error);
      return new Color(r / 255 * alpha, g / 255 * alpha, b / 255 * alpha, alpha);
  }
  function has(key, obj) {
      return key in obj;
  }
  function get(key, obj) {
      const v = obj[key];
      return typeof v === 'undefined' ? null : v;
  }
  function binarySearch(v, a, i, j) {
      while (i <= j) {
          const m = i + j >> 1;
          if (a[m] === v)
              return true;
          if (a[m] > v)
              j = m - 1;
          else
              i = m + 1;
      }
      return false;
  }
  function varargs(type) {
      return { type };
  }
  CompoundExpression.register(expressions, {
      'error': [
          ErrorType,
          [StringType],
          (ctx, [v]) => {
              throw new RuntimeError(v.evaluate(ctx));
          }
      ],
      'typeof': [
          StringType,
          [ValueType],
          (ctx, [v]) => toString(typeOf(v.evaluate(ctx)))
      ],
      'to-rgba': [
          array(NumberType, 4),
          [ColorType],
          (ctx, [v]) => {
              return v.evaluate(ctx).toArray();
          }
      ],
      'rgb': [
          ColorType,
          [
              NumberType,
              NumberType,
              NumberType
          ],
          rgba
      ],
      'rgba': [
          ColorType,
          [
              NumberType,
              NumberType,
              NumberType,
              NumberType
          ],
          rgba
      ],
      'has': {
          type: BooleanType,
          overloads: [
              [
                  [StringType],
                  (ctx, [key]) => has(key.evaluate(ctx), ctx.properties())
              ],
              [
                  [
                      StringType,
                      ObjectType
                  ],
                  (ctx, [key, obj]) => has(key.evaluate(ctx), obj.evaluate(ctx))
              ]
          ]
      },
      'get': {
          type: ValueType,
          overloads: [
              [
                  [StringType],
                  (ctx, [key]) => get(key.evaluate(ctx), ctx.properties())
              ],
              [
                  [
                      StringType,
                      ObjectType
                  ],
                  (ctx, [key, obj]) => get(key.evaluate(ctx), obj.evaluate(ctx))
              ]
          ]
      },
      'feature-state': [
          ValueType,
          [StringType],
          (ctx, [key]) => get(key.evaluate(ctx), ctx.featureState || {})
      ],
      'properties': [
          ObjectType,
          [],
          ctx => ctx.properties()
      ],
      'geometry-type': [
          StringType,
          [],
          ctx => ctx.geometryType()
      ],
      'id': [
          ValueType,
          [],
          ctx => ctx.id()
      ],
      'zoom': [
          NumberType,
          [],
          ctx => ctx.globals.zoom
      ],
      'heatmap-density': [
          NumberType,
          [],
          ctx => ctx.globals.heatmapDensity || 0
      ],
      'line-progress': [
          NumberType,
          [],
          ctx => ctx.globals.lineProgress || 0
      ],
      'sky-radial-progress': [
          NumberType,
          [],
          ctx => ctx.globals.skyRadialProgress || 0
      ],
      'accumulated': [
          ValueType,
          [],
          ctx => ctx.globals.accumulated === undefined ? null : ctx.globals.accumulated
      ],
      '+': [
          NumberType,
          varargs(NumberType),
          (ctx, args) => {
              let result = 0;
              for (const arg of args) {
                  result += arg.evaluate(ctx);
              }
              return result;
          }
      ],
      '*': [
          NumberType,
          varargs(NumberType),
          (ctx, args) => {
              let result = 1;
              for (const arg of args) {
                  result *= arg.evaluate(ctx);
              }
              return result;
          }
      ],
      '-': {
          type: NumberType,
          overloads: [
              [
                  [
                      NumberType,
                      NumberType
                  ],
                  (ctx, [a, b]) => a.evaluate(ctx) - b.evaluate(ctx)
              ],
              [
                  [NumberType],
                  (ctx, [a]) => -a.evaluate(ctx)
              ]
          ]
      },
      '/': [
          NumberType,
          [
              NumberType,
              NumberType
          ],
          (ctx, [a, b]) => a.evaluate(ctx) / b.evaluate(ctx)
      ],
      '%': [
          NumberType,
          [
              NumberType,
              NumberType
          ],
          (ctx, [a, b]) => a.evaluate(ctx) % b.evaluate(ctx)
      ],
      'ln2': [
          NumberType,
          [],
          () => Math.LN2
      ],
      'pi': [
          NumberType,
          [],
          () => Math.PI
      ],
      'e': [
          NumberType,
          [],
          () => Math.E
      ],
      '^': [
          NumberType,
          [
              NumberType,
              NumberType
          ],
          (ctx, [b, e]) => Math.pow(b.evaluate(ctx), e.evaluate(ctx))
      ],
      'sqrt': [
          NumberType,
          [NumberType],
          (ctx, [x]) => Math.sqrt(x.evaluate(ctx))
      ],
      'log10': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.log(n.evaluate(ctx)) / Math.LN10
      ],
      'ln': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.log(n.evaluate(ctx))
      ],
      'log2': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.log(n.evaluate(ctx)) / Math.LN2
      ],
      'sin': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.sin(n.evaluate(ctx))
      ],
      'cos': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.cos(n.evaluate(ctx))
      ],
      'tan': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.tan(n.evaluate(ctx))
      ],
      'asin': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.asin(n.evaluate(ctx))
      ],
      'acos': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.acos(n.evaluate(ctx))
      ],
      'atan': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.atan(n.evaluate(ctx))
      ],
      'min': [
          NumberType,
          varargs(NumberType),
          (ctx, args) => Math.min(...args.map(arg => arg.evaluate(ctx)))
      ],
      'max': [
          NumberType,
          varargs(NumberType),
          (ctx, args) => Math.max(...args.map(arg => arg.evaluate(ctx)))
      ],
      'abs': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.abs(n.evaluate(ctx))
      ],
      'round': [
          NumberType,
          [NumberType],
          (ctx, [n]) => {
              const v = n.evaluate(ctx);
              return v < 0 ? -Math.round(-v) : Math.round(v);
          }
      ],
      'floor': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.floor(n.evaluate(ctx))
      ],
      'ceil': [
          NumberType,
          [NumberType],
          (ctx, [n]) => Math.ceil(n.evaluate(ctx))
      ],
      'filter-==': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          (ctx, [k, v]) => ctx.properties()[k.value] === v.value
      ],
      'filter-id-==': [
          BooleanType,
          [ValueType],
          (ctx, [v]) => ctx.id() === v.value
      ],
      'filter-type-==': [
          BooleanType,
          [StringType],
          (ctx, [v]) => ctx.geometryType() === v.value
      ],
      'filter-<': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          (ctx, [k, v]) => {
              const a = ctx.properties()[k.value];
              const b = v.value;
              return typeof a === typeof b && a < b;
          }
      ],
      'filter-id-<': [
          BooleanType,
          [ValueType],
          (ctx, [v]) => {
              const a = ctx.id();
              const b = v.value;
              return typeof a === typeof b && a < b;
          }
      ],
      'filter->': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          (ctx, [k, v]) => {
              const a = ctx.properties()[k.value];
              const b = v.value;
              return typeof a === typeof b && a > b;
          }
      ],
      'filter-id->': [
          BooleanType,
          [ValueType],
          (ctx, [v]) => {
              const a = ctx.id();
              const b = v.value;
              return typeof a === typeof b && a > b;
          }
      ],
      'filter-<=': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          (ctx, [k, v]) => {
              const a = ctx.properties()[k.value];
              const b = v.value;
              return typeof a === typeof b && a <= b;
          }
      ],
      'filter-id-<=': [
          BooleanType,
          [ValueType],
          (ctx, [v]) => {
              const a = ctx.id();
              const b = v.value;
              return typeof a === typeof b && a <= b;
          }
      ],
      'filter->=': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          (ctx, [k, v]) => {
              const a = ctx.properties()[k.value];
              const b = v.value;
              return typeof a === typeof b && a >= b;
          }
      ],
      'filter-id->=': [
          BooleanType,
          [ValueType],
          (ctx, [v]) => {
              const a = ctx.id();
              const b = v.value;
              return typeof a === typeof b && a >= b;
          }
      ],
      'filter-has': [
          BooleanType,
          [ValueType],
          (ctx, [k]) => k.value in ctx.properties()
      ],
      'filter-has-id': [
          BooleanType,
          [],
          ctx => ctx.id() !== null && ctx.id() !== undefined
      ],
      'filter-type-in': [
          BooleanType,
          [array(StringType)],
          (ctx, [v]) => v.value.indexOf(ctx.geometryType()) >= 0
      ],
      'filter-id-in': [
          BooleanType,
          [array(ValueType)],
          (ctx, [v]) => v.value.indexOf(ctx.id()) >= 0
      ],
      'filter-in-small': [
          BooleanType,
          [
              StringType,
              array(ValueType)
          ],
          (ctx, [k, v]) => v.value.indexOf(ctx.properties()[k.value]) >= 0
      ],
      'filter-in-large': [
          BooleanType,
          [
              StringType,
              array(ValueType)
          ],
          (ctx, [k, v]) => binarySearch(ctx.properties()[k.value], v.value, 0, v.value.length - 1)
      ],
      'all': {
          type: BooleanType,
          overloads: [
              [
                  [
                      BooleanType,
                      BooleanType
                  ],
                  (ctx, [a, b]) => a.evaluate(ctx) && b.evaluate(ctx)
              ],
              [
                  varargs(BooleanType),
                  (ctx, args) => {
                      for (const arg of args) {
                          if (!arg.evaluate(ctx))
                              return false;
                      }
                      return true;
                  }
              ]
          ]
      },
      'any': {
          type: BooleanType,
          overloads: [
              [
                  [
                      BooleanType,
                      BooleanType
                  ],
                  (ctx, [a, b]) => a.evaluate(ctx) || b.evaluate(ctx)
              ],
              [
                  varargs(BooleanType),
                  (ctx, args) => {
                      for (const arg of args) {
                          if (arg.evaluate(ctx))
                              return true;
                      }
                      return false;
                  }
              ]
          ]
      },
      '!': [
          BooleanType,
          [BooleanType],
          (ctx, [b]) => !b.evaluate(ctx)
      ],
      'is-supported-script': [
          BooleanType,
          [StringType],
          (ctx, [s]) => {
              const isSupportedScript = ctx.globals && ctx.globals.isSupportedScript;
              if (isSupportedScript) {
                  return isSupportedScript(s.evaluate(ctx));
              }
              return true;
          }
      ],
      'upcase': [
          StringType,
          [StringType],
          (ctx, [s]) => s.evaluate(ctx).toUpperCase()
      ],
      'downcase': [
          StringType,
          [StringType],
          (ctx, [s]) => s.evaluate(ctx).toLowerCase()
      ],
      'concat': [
          StringType,
          varargs(ValueType),
          (ctx, args) => args.map(arg => toString$1(arg.evaluate(ctx))).join('')
      ],
      'resolved-locale': [
          StringType,
          [CollatorType],
          (ctx, [collator]) => collator.evaluate(ctx).resolvedLocale()
      ]
  });

  function success(value) {
      return {
          result: 'success',
          value
      };
  }
  function error(value) {
      return {
          result: 'error',
          value
      };
  }

  function supportsPropertyExpression(spec) {
      return spec['property-type'] === 'data-driven' || spec['property-type'] === 'cross-faded-data-driven';
  }
  function supportsZoomExpression(spec) {
      return !!spec.expression && spec.expression.parameters.indexOf('zoom') > -1;
  }
  function supportsInterpolation(spec) {
      return !!spec.expression && spec.expression.interpolated;
  }

  function getType(val) {
      if (val instanceof Number) {
          return 'number';
      } else if (val instanceof String) {
          return 'string';
      } else if (val instanceof Boolean) {
          return 'boolean';
      } else if (Array.isArray(val)) {
          return 'array';
      } else if (val === null) {
          return 'null';
      } else {
          return typeof val;
      }
  }

  function isFunction$1(value) {
      return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
  function identityFunction(x) {
      return x;
  }
  function createFunction(parameters, propertySpec) {
      const isColor = propertySpec.type === 'color';
      const zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
      const featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
      const zoomDependent = zoomAndFeatureDependent || !featureDependent;
      const type = parameters.type || (supportsInterpolation(propertySpec) ? 'exponential' : 'interval');
      if (isColor) {
          parameters = extend({}, parameters);
          if (parameters.stops) {
              parameters.stops = parameters.stops.map(stop => {
                  return [
                      stop[0],
                      Color.parse(stop[1])
                  ];
              });
          }
          if (parameters.default) {
              parameters.default = Color.parse(parameters.default);
          } else {
              parameters.default = Color.parse(propertySpec.default);
          }
      }
      if (parameters.colorSpace && parameters.colorSpace !== 'rgb' && !colorSpaces[parameters.colorSpace]) {
          throw new Error(`Unknown color space: ${ parameters.colorSpace }`);
      }
      let innerFun;
      let hashedStops;
      let categoricalKeyType;
      if (type === 'exponential') {
          innerFun = evaluateExponentialFunction;
      } else if (type === 'interval') {
          innerFun = evaluateIntervalFunction;
      } else if (type === 'categorical') {
          innerFun = evaluateCategoricalFunction;
          hashedStops = Object.create(null);
          for (const stop of parameters.stops) {
              hashedStops[stop[0]] = stop[1];
          }
          categoricalKeyType = typeof parameters.stops[0][0];
      } else if (type === 'identity') {
          innerFun = evaluateIdentityFunction;
      } else {
          throw new Error(`Unknown function type "${ type }"`);
      }
      if (zoomAndFeatureDependent) {
          const featureFunctions = {};
          const zoomStops = [];
          for (let s = 0; s < parameters.stops.length; s++) {
              const stop = parameters.stops[s];
              const zoom = stop[0].zoom;
              if (featureFunctions[zoom] === undefined) {
                  featureFunctions[zoom] = {
                      zoom,
                      type: parameters.type,
                      property: parameters.property,
                      default: parameters.default,
                      stops: []
                  };
                  zoomStops.push(zoom);
              }
              featureFunctions[zoom].stops.push([
                  stop[0].value,
                  stop[1]
              ]);
          }
          const featureFunctionStops = [];
          for (const z of zoomStops) {
              featureFunctionStops.push([
                  featureFunctions[z].zoom,
                  createFunction(featureFunctions[z], propertySpec)
              ]);
          }
          const interpolationType = { name: 'linear' };
          return {
              kind: 'composite',
              interpolationType,
              interpolationFactor: Interpolate.interpolationFactor.bind(undefined, interpolationType),
              zoomStops: featureFunctionStops.map(s => s[0]),
              evaluate({zoom}, properties) {
                  return evaluateExponentialFunction({
                      stops: featureFunctionStops,
                      base: parameters.base
                  }, propertySpec, zoom).evaluate(zoom, properties);
              }
          };
      } else if (zoomDependent) {
          const interpolationType = type === 'exponential' ? {
              name: 'exponential',
              base: parameters.base !== undefined ? parameters.base : 1
          } : null;
          return {
              kind: 'camera',
              interpolationType,
              interpolationFactor: Interpolate.interpolationFactor.bind(undefined, interpolationType),
              zoomStops: parameters.stops.map(s => s[0]),
              evaluate: ({zoom}) => innerFun(parameters, propertySpec, zoom, hashedStops, categoricalKeyType)
          };
      } else {
          return {
              kind: 'source',
              evaluate(_, feature) {
                  const value = feature && feature.properties ? feature.properties[parameters.property] : undefined;
                  if (value === undefined) {
                      return coalesce(parameters.default, propertySpec.default);
                  }
                  return innerFun(parameters, propertySpec, value, hashedStops, categoricalKeyType);
              }
          };
      }
  }
  function coalesce(a, b, c) {
      if (a !== undefined)
          return a;
      if (b !== undefined)
          return b;
      if (c !== undefined)
          return c;
  }
  function evaluateCategoricalFunction(parameters, propertySpec, input, hashedStops, keyType) {
      const evaluated = typeof input === keyType ? hashedStops[input] : undefined;
      return coalesce(evaluated, parameters.default, propertySpec.default);
  }
  function evaluateIntervalFunction(parameters, propertySpec, input) {
      if (getType(input) !== 'number')
          return coalesce(parameters.default, propertySpec.default);
      const n = parameters.stops.length;
      if (n === 1)
          return parameters.stops[0][1];
      if (input <= parameters.stops[0][0])
          return parameters.stops[0][1];
      if (input >= parameters.stops[n - 1][0])
          return parameters.stops[n - 1][1];
      const index = findStopLessThanOrEqualTo(parameters.stops.map(stop => stop[0]), input);
      return parameters.stops[index][1];
  }
  function evaluateExponentialFunction(parameters, propertySpec, input) {
      const base = parameters.base !== undefined ? parameters.base : 1;
      if (getType(input) !== 'number')
          return coalesce(parameters.default, propertySpec.default);
      const n = parameters.stops.length;
      if (n === 1)
          return parameters.stops[0][1];
      if (input <= parameters.stops[0][0])
          return parameters.stops[0][1];
      if (input >= parameters.stops[n - 1][0])
          return parameters.stops[n - 1][1];
      const index = findStopLessThanOrEqualTo(parameters.stops.map(stop => stop[0]), input);
      const t = interpolationFactor(input, base, parameters.stops[index][0], parameters.stops[index + 1][0]);
      const outputLower = parameters.stops[index][1];
      const outputUpper = parameters.stops[index + 1][1];
      let interp = interpolate[propertySpec.type] || identityFunction;
      if (parameters.colorSpace && parameters.colorSpace !== 'rgb') {
          const colorspace = colorSpaces[parameters.colorSpace];
          interp = (a, b) => colorspace.reverse(colorspace.interpolate(colorspace.forward(a), colorspace.forward(b), t));
      }
      if (typeof outputLower.evaluate === 'function') {
          return {
              evaluate(...args) {
                  const evaluatedLower = outputLower.evaluate.apply(undefined, args);
                  const evaluatedUpper = outputUpper.evaluate.apply(undefined, args);
                  if (evaluatedLower === undefined || evaluatedUpper === undefined) {
                      return undefined;
                  }
                  return interp(evaluatedLower, evaluatedUpper, t);
              }
          };
      }
      return interp(outputLower, outputUpper, t);
  }
  function evaluateIdentityFunction(parameters, propertySpec, input) {
      if (propertySpec.type === 'color') {
          input = Color.parse(input);
      } else if (propertySpec.type === 'formatted') {
          input = Formatted.fromString(input.toString());
      } else if (propertySpec.type === 'resolvedImage') {
          input = ResolvedImage.fromString(input.toString());
      } else if (getType(input) !== propertySpec.type && (propertySpec.type !== 'enum' || !propertySpec.values[input])) {
          input = undefined;
      }
      return coalesce(input, parameters.default, propertySpec.default);
  }
  function interpolationFactor(input, base, lowerValue, upperValue) {
      const difference = upperValue - lowerValue;
      const progress = input - lowerValue;
      if (difference === 0) {
          return 0;
      } else if (base === 1) {
          return progress / difference;
      } else {
          return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
      }
  }

  class StyleExpression {
      constructor(expression, propertySpec) {
          this.expression = expression;
          this._warningHistory = {};
          this._evaluator = new EvaluationContext();
          this._defaultValue = propertySpec ? getDefaultValue(propertySpec) : null;
          this._enumValues = propertySpec && propertySpec.type === 'enum' ? propertySpec.values : null;
      }
      evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
          this._evaluator.globals = globals;
          this._evaluator.feature = feature;
          this._evaluator.featureState = featureState;
          this._evaluator.canonical = canonical;
          this._evaluator.availableImages = availableImages || null;
          this._evaluator.formattedSection = formattedSection;
          return this.expression.evaluate(this._evaluator);
      }
      evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
          this._evaluator.globals = globals;
          this._evaluator.feature = feature || null;
          this._evaluator.featureState = featureState || null;
          this._evaluator.canonical = canonical;
          this._evaluator.availableImages = availableImages || null;
          this._evaluator.formattedSection = formattedSection || null;
          try {
              const val = this.expression.evaluate(this._evaluator);
              if (val === null || val === undefined || typeof val === 'number' && val !== val) {
                  return this._defaultValue;
              }
              if (this._enumValues && !(val in this._enumValues)) {
                  throw new RuntimeError(`Expected value to be one of ${ Object.keys(this._enumValues).map(v => JSON.stringify(v)).join(', ') }, but found ${ JSON.stringify(val) } instead.`);
              }
              return val;
          } catch (e) {
              if (!this._warningHistory[e.message]) {
                  this._warningHistory[e.message] = true;
                  if (typeof console !== 'undefined') {
                      console.warn(e.message);
                  }
              }
              return this._defaultValue;
          }
      }
  }
  function isExpression(expression) {
      return Array.isArray(expression) && expression.length > 0 && typeof expression[0] === 'string' && expression[0] in expressions;
  }
  function createExpression(expression, propertySpec) {
      const parser = new ParsingContext(expressions, [], propertySpec ? getExpectedType(propertySpec) : undefined);
      const parsed = parser.parse(expression, undefined, undefined, undefined, propertySpec && propertySpec.type === 'string' ? { typeAnnotation: 'coerce' } : undefined);
      if (!parsed) {
          return error(parser.errors);
      }
      return success(new StyleExpression(parsed, propertySpec));
  }
  class ZoomConstantExpression {
      constructor(kind, expression) {
          this.kind = kind;
          this._styleExpression = expression;
          this.isStateDependent = kind !== 'constant' && !isStateConstant(expression.expression);
      }
      evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
          return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
      }
      evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
          return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
      }
  }
  class ZoomDependentExpression {
      constructor(kind, expression, zoomStops, interpolationType) {
          this.kind = kind;
          this.zoomStops = zoomStops;
          this._styleExpression = expression;
          this.isStateDependent = kind !== 'camera' && !isStateConstant(expression.expression);
          this.interpolationType = interpolationType;
      }
      evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
          return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
      }
      evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
          return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
      }
      interpolationFactor(input, lower, upper) {
          if (this.interpolationType) {
              return Interpolate.interpolationFactor(this.interpolationType, input, lower, upper);
          } else {
              return 0;
          }
      }
  }
  function createPropertyExpression(expression, propertySpec) {
      expression = createExpression(expression, propertySpec);
      if (expression.result === 'error') {
          return expression;
      }
      const parsed = expression.value.expression;
      const isFeatureConstant$1 = isFeatureConstant(parsed);
      if (!isFeatureConstant$1 && !supportsPropertyExpression(propertySpec)) {
          return error([new ParsingError('', 'data expressions not supported')]);
      }
      const isZoomConstant = isGlobalPropertyConstant(parsed, ['zoom']);
      if (!isZoomConstant && !supportsZoomExpression(propertySpec)) {
          return error([new ParsingError('', 'zoom expressions not supported')]);
      }
      const zoomCurve = findZoomCurve(parsed);
      if (!zoomCurve && !isZoomConstant) {
          return error([new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
      } else if (zoomCurve instanceof ParsingError) {
          return error([zoomCurve]);
      } else if (zoomCurve instanceof Interpolate && !supportsInterpolation(propertySpec)) {
          return error([new ParsingError('', '"interpolate" expressions cannot be used with this property')]);
      }
      if (!zoomCurve) {
          return success(isFeatureConstant$1 ? new ZoomConstantExpression('constant', expression.value) : new ZoomConstantExpression('source', expression.value));
      }
      const interpolationType = zoomCurve instanceof Interpolate ? zoomCurve.interpolation : undefined;
      return success(isFeatureConstant$1 ? new ZoomDependentExpression('camera', expression.value, zoomCurve.labels, interpolationType) : new ZoomDependentExpression('composite', expression.value, zoomCurve.labels, interpolationType));
  }
  class StylePropertyFunction {
      constructor(parameters, specification) {
          this._parameters = parameters;
          this._specification = specification;
          extend(this, createFunction(this._parameters, this._specification));
      }
      static deserialize(serialized) {
          return new StylePropertyFunction(serialized._parameters, serialized._specification);
      }
      static serialize(input) {
          return {
              _parameters: input._parameters,
              _specification: input._specification
          };
      }
  }
  function normalizePropertyExpression(value, specification) {
      if (isFunction$1(value)) {
          return new StylePropertyFunction(value, specification);
      } else if (isExpression(value)) {
          const expression = createPropertyExpression(value, specification);
          if (expression.result === 'error') {
              throw new Error(expression.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
          }
          return expression.value;
      } else {
          let constant = value;
          if (typeof value === 'string' && specification.type === 'color') {
              constant = Color.parse(value);
          }
          return {
              kind: 'constant',
              evaluate: () => constant
          };
      }
  }
  function findZoomCurve(expression) {
      let result = null;
      if (expression instanceof Let) {
          result = findZoomCurve(expression.result);
      } else if (expression instanceof Coalesce) {
          for (const arg of expression.args) {
              result = findZoomCurve(arg);
              if (result) {
                  break;
              }
          }
      } else if ((expression instanceof Step || expression instanceof Interpolate) && expression.input instanceof CompoundExpression && expression.input.name === 'zoom') {
          result = expression;
      }
      if (result instanceof ParsingError) {
          return result;
      }
      expression.eachChild(child => {
          const childResult = findZoomCurve(child);
          if (childResult instanceof ParsingError) {
              result = childResult;
          } else if (!result && childResult) {
              result = new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.');
          } else if (result && childResult && result !== childResult) {
              result = new ParsingError('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
          }
      });
      return result;
  }
  function getExpectedType(spec) {
      const types = {
          color: ColorType,
          string: StringType,
          number: NumberType,
          enum: StringType,
          boolean: BooleanType,
          formatted: FormattedType,
          resolvedImage: ResolvedImageType
      };
      if (spec.type === 'array') {
          return array(types[spec.value] || ValueType, spec.length);
      }
      return types[spec.type];
  }
  function getDefaultValue(spec) {
      if (spec.type === 'color' && isFunction$1(spec.default)) {
          return new Color(0, 0, 0, 0);
      } else if (spec.type === 'color') {
          return Color.parse(spec.default) || null;
      } else if (spec.default === undefined) {
          return null;
      } else {
          return spec.default;
      }
  }

  function convertLiteral(value) {
      return typeof value === 'object' ? [
          'literal',
          value
      ] : value;
  }
  function convertFunction(parameters, propertySpec) {
      let stops = parameters.stops;
      if (!stops) {
          return convertIdentityFunction(parameters, propertySpec);
      }
      const zoomAndFeatureDependent = stops && typeof stops[0][0] === 'object';
      const featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
      const zoomDependent = zoomAndFeatureDependent || !featureDependent;
      stops = stops.map(stop => {
          if (!featureDependent && propertySpec.tokens && typeof stop[1] === 'string') {
              return [
                  stop[0],
                  convertTokenString(stop[1])
              ];
          }
          return [
              stop[0],
              convertLiteral(stop[1])
          ];
      });
      if (zoomAndFeatureDependent) {
          return convertZoomAndPropertyFunction(parameters, propertySpec, stops);
      } else if (zoomDependent) {
          return convertZoomFunction(parameters, propertySpec, stops);
      } else {
          return convertPropertyFunction(parameters, propertySpec, stops);
      }
  }
  function convertIdentityFunction(parameters, propertySpec) {
      const get = [
          'get',
          parameters.property
      ];
      if (parameters.default === undefined) {
          return propertySpec.type === 'string' ? [
              'string',
              get
          ] : get;
      } else if (propertySpec.type === 'enum') {
          return [
              'match',
              get,
              Object.keys(propertySpec.values),
              get,
              parameters.default
          ];
      } else {
          const expression = [
              propertySpec.type === 'color' ? 'to-color' : propertySpec.type,
              get,
              convertLiteral(parameters.default)
          ];
          if (propertySpec.type === 'array') {
              expression.splice(1, 0, propertySpec.value, propertySpec.length || null);
          }
          return expression;
      }
  }
  function getInterpolateOperator(parameters) {
      switch (parameters.colorSpace) {
      case 'hcl':
          return 'interpolate-hcl';
      case 'lab':
          return 'interpolate-lab';
      default:
          return 'interpolate';
      }
  }
  function convertZoomAndPropertyFunction(parameters, propertySpec, stops) {
      const featureFunctionParameters = {};
      const featureFunctionStops = {};
      const zoomStops = [];
      for (let s = 0; s < stops.length; s++) {
          const stop = stops[s];
          const zoom = stop[0].zoom;
          if (featureFunctionParameters[zoom] === undefined) {
              featureFunctionParameters[zoom] = {
                  zoom,
                  type: parameters.type,
                  property: parameters.property,
                  default: parameters.default
              };
              featureFunctionStops[zoom] = [];
              zoomStops.push(zoom);
          }
          featureFunctionStops[zoom].push([
              stop[0].value,
              stop[1]
          ]);
      }
      const functionType = getFunctionType({}, propertySpec);
      if (functionType === 'exponential') {
          const expression = [
              getInterpolateOperator(parameters),
              ['linear'],
              ['zoom']
          ];
          for (const z of zoomStops) {
              const output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
              appendStopPair(expression, z, output, false);
          }
          return expression;
      } else {
          const expression = [
              'step',
              ['zoom']
          ];
          for (const z of zoomStops) {
              const output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
              appendStopPair(expression, z, output, true);
          }
          fixupDegenerateStepCurve(expression);
          return expression;
      }
  }
  function coalesce$1(a, b) {
      if (a !== undefined)
          return a;
      if (b !== undefined)
          return b;
  }
  function getFallback(parameters, propertySpec) {
      const defaultValue = convertLiteral(coalesce$1(parameters.default, propertySpec.default));
      if (defaultValue === undefined && propertySpec.type === 'resolvedImage') {
          return '';
      }
      return defaultValue;
  }
  function convertPropertyFunction(parameters, propertySpec, stops) {
      const type = getFunctionType(parameters, propertySpec);
      const get = [
          'get',
          parameters.property
      ];
      if (type === 'categorical' && typeof stops[0][0] === 'boolean') {
          const expression = ['case'];
          for (const stop of stops) {
              expression.push([
                  '==',
                  get,
                  stop[0]
              ], stop[1]);
          }
          expression.push(getFallback(parameters, propertySpec));
          return expression;
      } else if (type === 'categorical') {
          const expression = [
              'match',
              get
          ];
          for (const stop of stops) {
              appendStopPair(expression, stop[0], stop[1], false);
          }
          expression.push(getFallback(parameters, propertySpec));
          return expression;
      } else if (type === 'interval') {
          const expression = [
              'step',
              [
                  'number',
                  get
              ]
          ];
          for (const stop of stops) {
              appendStopPair(expression, stop[0], stop[1], true);
          }
          fixupDegenerateStepCurve(expression);
          return parameters.default === undefined ? expression : [
              'case',
              [
                  '==',
                  [
                      'typeof',
                      get
                  ],
                  'number'
              ],
              expression,
              convertLiteral(parameters.default)
          ];
      } else if (type === 'exponential') {
          const base = parameters.base !== undefined ? parameters.base : 1;
          const expression = [
              getInterpolateOperator(parameters),
              base === 1 ? ['linear'] : [
                  'exponential',
                  base
              ],
              [
                  'number',
                  get
              ]
          ];
          for (const stop of stops) {
              appendStopPair(expression, stop[0], stop[1], false);
          }
          return parameters.default === undefined ? expression : [
              'case',
              [
                  '==',
                  [
                      'typeof',
                      get
                  ],
                  'number'
              ],
              expression,
              convertLiteral(parameters.default)
          ];
      } else {
          throw new Error(`Unknown property function type ${ type }`);
      }
  }
  function convertZoomFunction(parameters, propertySpec, stops, input = ['zoom']) {
      const type = getFunctionType(parameters, propertySpec);
      let expression;
      let isStep = false;
      if (type === 'interval') {
          expression = [
              'step',
              input
          ];
          isStep = true;
      } else if (type === 'exponential') {
          const base = parameters.base !== undefined ? parameters.base : 1;
          expression = [
              getInterpolateOperator(parameters),
              base === 1 ? ['linear'] : [
                  'exponential',
                  base
              ],
              input
          ];
      } else {
          throw new Error(`Unknown zoom function type "${ type }"`);
      }
      for (const stop of stops) {
          appendStopPair(expression, stop[0], stop[1], isStep);
      }
      fixupDegenerateStepCurve(expression);
      return expression;
  }
  function fixupDegenerateStepCurve(expression) {
      if (expression[0] === 'step' && expression.length === 3) {
          expression.push(0);
          expression.push(expression[3]);
      }
  }
  function appendStopPair(curve, input, output, isStep) {
      if (curve.length > 3 && input === curve[curve.length - 2]) {
          return;
      }
      if (!(isStep && curve.length === 2)) {
          curve.push(input);
      }
      curve.push(output);
  }
  function getFunctionType(parameters, propertySpec) {
      if (parameters.type) {
          return parameters.type;
      } else {
          return propertySpec.expression.interpolated ? 'exponential' : 'interval';
      }
  }
  function convertTokenString(s) {
      const result = ['concat'];
      const re = /{([^{}]+)}/g;
      let pos = 0;
      for (let match = re.exec(s); match !== null; match = re.exec(s)) {
          const literal = s.slice(pos, re.lastIndex - match[0].length);
          pos = re.lastIndex;
          if (literal.length > 0)
              result.push(literal);
          result.push([
              'get',
              match[1]
          ]);
      }
      if (result.length === 1) {
          return s;
      }
      if (pos < s.length) {
          result.push(s.slice(pos));
      } else if (result.length === 2) {
          return [
              'to-string',
              result[1]
          ];
      }
      return result;
  }

  function isExpressionFilter(filter) {
      if (filter === true || filter === false) {
          return true;
      }
      if (!Array.isArray(filter) || filter.length === 0) {
          return false;
      }
      switch (filter[0]) {
      case 'has':
          return filter.length >= 2 && filter[1] !== '$id' && filter[1] !== '$type';
      case 'in':
          return filter.length >= 3 && (typeof filter[1] !== 'string' || Array.isArray(filter[2]));
      case '!in':
      case '!has':
      case 'none':
          return false;
      case '==':
      case '!=':
      case '>':
      case '>=':
      case '<':
      case '<=':
          return filter.length !== 3 || (Array.isArray(filter[1]) || Array.isArray(filter[2]));
      case 'any':
      case 'all':
          for (const f of filter.slice(1)) {
              if (!isExpressionFilter(f) && typeof f !== 'boolean') {
                  return false;
              }
          }
          return true;
      default:
          return true;
      }
  }
  const filterSpec = {
      'type': 'boolean',
      'default': false,
      'transition': false,
      'property-type': 'data-driven',
      'expression': {
          'interpolated': false,
          'parameters': [
              'zoom',
              'feature'
          ]
      }
  };
  function createFilter(filter) {
      if (filter === null || filter === undefined) {
          return {
              filter: () => true,
              needGeometry: false
          };
      }
      if (!isExpressionFilter(filter)) {
          filter = convertFilter(filter);
      }
      const compiled = createExpression(filter, filterSpec);
      if (compiled.result === 'error') {
          throw new Error(compiled.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
      } else {
          const needGeometry = geometryNeeded(filter);
          return {
              filter: (globalProperties, feature, canonical) => compiled.value.evaluate(globalProperties, feature, {}, canonical),
              needGeometry
          };
      }
  }
  function compare(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
  }
  function geometryNeeded(filter) {
      if (!Array.isArray(filter))
          return false;
      if (filter[0] === 'within')
          return true;
      for (let index = 1; index < filter.length; index++) {
          if (geometryNeeded(filter[index]))
              return true;
      }
      return false;
  }
  function convertFilter(filter) {
      if (!filter)
          return true;
      const op = filter[0];
      if (filter.length <= 1)
          return op !== 'any';
      const converted = op === '==' ? convertComparisonOp(filter[1], filter[2], '==') : op === '!=' ? convertNegation(convertComparisonOp(filter[1], filter[2], '==')) : op === '<' || op === '>' || op === '<=' || op === '>=' ? convertComparisonOp(filter[1], filter[2], op) : op === 'any' ? convertDisjunctionOp(filter.slice(1)) : op === 'all' ? ['all'].concat(filter.slice(1).map(convertFilter)) : op === 'none' ? ['all'].concat(filter.slice(1).map(convertFilter).map(convertNegation)) : op === 'in' ? convertInOp(filter[1], filter.slice(2)) : op === '!in' ? convertNegation(convertInOp(filter[1], filter.slice(2))) : op === 'has' ? convertHasOp(filter[1]) : op === '!has' ? convertNegation(convertHasOp(filter[1])) : op === 'within' ? filter : true;
      return converted;
  }
  function convertComparisonOp(property, value, op) {
      switch (property) {
      case '$type':
          return [
              `filter-type-${ op }`,
              value
          ];
      case '$id':
          return [
              `filter-id-${ op }`,
              value
          ];
      default:
          return [
              `filter-${ op }`,
              property,
              value
          ];
      }
  }
  function convertDisjunctionOp(filters) {
      return ['any'].concat(filters.map(convertFilter));
  }
  function convertInOp(property, values) {
      if (values.length === 0) {
          return false;
      }
      switch (property) {
      case '$type':
          return [
              `filter-type-in`,
              [
                  'literal',
                  values
              ]
          ];
      case '$id':
          return [
              `filter-id-in`,
              [
                  'literal',
                  values
              ]
          ];
      default:
          if (values.length > 200 && !values.some(v => typeof v !== typeof values[0])) {
              return [
                  'filter-in-large',
                  property,
                  [
                      'literal',
                      values.sort(compare)
                  ]
              ];
          } else {
              return [
                  'filter-in-small',
                  property,
                  [
                      'literal',
                      values
                  ]
              ];
          }
      }
  }
  function convertHasOp(property) {
      switch (property) {
      case '$type':
          return true;
      case '$id':
          return [`filter-has-id`];
      default:
          return [
              `filter-has`,
              property
          ];
      }
  }
  function convertNegation(filter) {
      return [
          '!',
          filter
      ];
  }

  var refProperties = [
      'type',
      'source',
      'source-layer',
      'minzoom',
      'maxzoom',
      'filter',
      'layout'
  ];

  function deref(layer, parent) {
      const result = {};
      for (const k in layer) {
          if (k !== 'ref') {
              result[k] = layer[k];
          }
      }
      refProperties.forEach(k => {
          if (k in parent) {
              result[k] = parent[k];
          }
      });
      return result;
  }
  function derefLayers(layers) {
      layers = layers.slice();
      const map = Object.create(null);
      for (let i = 0; i < layers.length; i++) {
          map[layers[i].id] = layers[i];
      }
      for (let i = 0; i < layers.length; i++) {
          if ('ref' in layers[i]) {
              layers[i] = deref(layers[i], map[layers[i].ref]);
          }
      }
      return layers;
  }

  var jsonlint = createCommonjsModule(function (module, exports) {
  /* parser generated by jison 0.4.15 */
  /*
    Returns a Parser object of the following structure:

    Parser: {
      yy: {}
    }

    Parser.prototype: {
      yy: {},
      trace: function(),
      symbols_: {associative list: name ==> number},
      terminals_: {associative list: number ==> name},
      productions_: [...],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
      table: [...],
      defaultActions: {...},
      parseError: function(str, hash),
      parse: function(input),

      lexer: {
          EOF: 1,
          parseError: function(str, hash),
          setInput: function(input),
          input: function(),
          unput: function(str),
          more: function(),
          less: function(n),
          pastInput: function(),
          upcomingInput: function(),
          showPosition: function(),
          test_match: function(regex_match_array, rule_index),
          next: function(),
          lex: function(),
          begin: function(condition),
          popState: function(),
          _currentRules: function(),
          topState: function(),
          pushState: function(condition),

          options: {
              ranges: boolean           (optional: true ==> token location info will include a .range[] member)
              flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
              backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
          },

          performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
          rules: [...],
          conditions: {associative list: name ==> set},
      }
    }


    token location info (@$, _$, etc.): {
      first_line: n,
      last_line: n,
      first_column: n,
      last_column: n,
      range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
    }


    the parseError function receives a 'hash' object with these members for lexer and parser errors: {
      text:        (matched text)
      token:       (the produced terminal token, if any)
      line:        (yylineno)
    }
    while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
      loc:         (yylloc)
      expected:    (string describing the set of expected tokens)
      recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
    }
  */
  var parser = (function(){
  var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,12],$V1=[1,13],$V2=[1,9],$V3=[1,10],$V4=[1,11],$V5=[1,14],$V6=[1,15],$V7=[14,18,22,24],$V8=[18,22],$V9=[22,24];
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"JSONString":3,"STRING":4,"JSONNumber":5,"NUMBER":6,"JSONNullLiteral":7,"NULL":8,"JSONBooleanLiteral":9,"TRUE":10,"FALSE":11,"JSONText":12,"JSONValue":13,"EOF":14,"JSONObject":15,"JSONArray":16,"{":17,"}":18,"JSONMemberList":19,"JSONMember":20,":":21,",":22,"[":23,"]":24,"JSONElementList":25,"$accept":0,"$end":1},
  terminals_: {2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},
  productions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],
  performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
  /* this == yyval */

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1:
   // replace escaped characters with actual character
            this.$ = new String(yytext.replace(/\\(\\|")/g, "$"+"1")
                       .replace(/\\n/g,'\n')
                       .replace(/\\r/g,'\r')
                       .replace(/\\t/g,'\t')
                       .replace(/\\v/g,'\v')
                       .replace(/\\f/g,'\f')
                       .replace(/\\b/g,'\b'));
            this.$.__line__ =  this._$.first_line;
          
  break;
  case 2:

              this.$ = new Number(yytext);
              this.$.__line__ =  this._$.first_line;
          
  break;
  case 3:

              this.$ = null;
          
  break;
  case 4:

              this.$ = new Boolean(true);
              this.$.__line__ = this._$.first_line;
          
  break;
  case 5:

              this.$ = new Boolean(false);
              this.$.__line__ = this._$.first_line;
          
  break;
  case 6:
  return this.$ = $$[$0-1];
  case 13:
  this.$ = {}; Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
          });
  break;
  case 14: case 19:
  this.$ = $$[$0-1]; Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
          });
  break;
  case 15:
  this.$ = [$$[$0-2], $$[$0]];
  break;
  case 16:
  this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];
  break;
  case 17:
  this.$ = $$[$0-2]; $$[$0-2][$$[$0][0]] = $$[$0][1];
  break;
  case 18:
  this.$ = []; Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
          });
  break;
  case 20:
  this.$ = [$$[$0]];
  break;
  case 21:
  this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
  break;
  }
  },
  table: [{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,12:1,13:2,15:7,16:8,17:$V5,23:$V6},{1:[3]},{14:[1,16]},o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),o($V7,[2,12]),o($V7,[2,3]),o($V7,[2,4]),o($V7,[2,5]),o([14,18,21,22,24],[2,1]),o($V7,[2,2]),{3:20,4:$V0,18:[1,17],19:18,20:19},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:23,15:7,16:8,17:$V5,23:$V6,24:[1,21],25:22},{1:[2,6]},o($V7,[2,13]),{18:[1,24],22:[1,25]},o($V8,[2,16]),{21:[1,26]},o($V7,[2,18]),{22:[1,28],24:[1,27]},o($V9,[2,20]),o($V7,[2,14]),{3:20,4:$V0,20:29},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:30,15:7,16:8,17:$V5,23:$V6},o($V7,[2,19]),{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:31,15:7,16:8,17:$V5,23:$V6},o($V8,[2,17]),o($V8,[2,15]),o($V9,[2,21])],
  defaultActions: {16:[2,6]},
  parseError: function parseError(str, hash) {
      if (hash.recoverable) {
          this.trace(str);
      } else {
          throw new Error(str);
      }
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
          if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
              sharedState.yy[k] = this.yy[k];
          }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc == 'undefined') {
          lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
          this.parseError = sharedState.yy.parseError;
      } else {
          this.parseError = Object.getPrototypeOf(this).parseError;
      }
      
          function lex() {
              var token;
              token = lexer.lex() || EOF;
              if (typeof token !== 'number') {
                  token = self.symbols_[token] || token;
              }
              return token;
          }
      var symbol, state, action, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == 'undefined') {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
                      if (typeof action === 'undefined' || !action.length || !action[0]) {
                  var errStr = '';
                  expected = [];
                  for (p in table[state]) {
                      if (this.terminals_[p] && p > TERROR) {
                          expected.push('\'' + this.terminals_[p] + '\'');
                      }
                  }
                  if (lexer.showPosition) {
                      errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                  } else {
                      errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                  }
                  this.parseError(errStr, {
                      text: lexer.match,
                      token: this.terminals_[symbol] || symbol,
                      line: lexer.yylineno,
                      loc: yyloc,
                      expected: expected
                  });
              }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(lexer.yytext);
              lstack.push(lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              {
                  yyleng = lexer.yyleng;
                  yytext = lexer.yytext;
                  yylineno = lexer.yylineno;
                  yyloc = lexer.yylloc;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
              };
              if (ranges) {
                  yyval._$.range = [
                      lstack[lstack.length - (len || 1)].range[0],
                      lstack[lstack.length - 1].range[1]
                  ];
              }
              r = this.performAction.apply(yyval, [
                  yytext,
                  yyleng,
                  yylineno,
                  sharedState.yy,
                  action[1],
                  vstack,
                  lstack
              ].concat(args));
              if (typeof r !== 'undefined') {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }};
  /* generated by jison-lex 0.3.4 */
  var lexer = (function(){
  var lexer = ({

  EOF:1,

  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },

  // resets the lexer, sets new input
  setInput:function (input, yy) {
          this.yy = yy || this.yy || {};
          this._input = input;
          this._more = this._backtrack = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
          };
          if (this.options.ranges) {
              this.yylloc.range = [0,0];
          }
          this.offset = 0;
          return this;
      },

  // consumes and returns one char from the input
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) {
              this.yylloc.range[1]++;
          }

          this._input = this._input.slice(1);
          return ch;
      },

  // unshifts one char (or a string) into the input
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);

          if (lines.length - 1) {
              this.yylineno -= lines.length - 1;
          }
          var r = this.yylloc.range;

          this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ?
                  (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                   + oldLines[oldLines.length - lines.length].length - lines[0].length :
                this.yylloc.first_column - len
          };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          this.yyleng = this.yytext.length;
          return this;
      },

  // When called from action, caches matched text and appends it on next action
  more:function () {
          this._more = true;
          return this;
      },

  // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
  reject:function () {
          if (this.options.backtrack_lexer) {
              this._backtrack = true;
          } else {
              return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
              });

          }
          return this;
      },

  // retain first n characters of the match
  less:function (n) {
          this.unput(this.match.slice(n));
      },

  // displays already matched input, i.e. for error messages
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },

  // displays upcoming input, i.e. for error messages
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
      },

  // displays the character position where the lexing error occurred, i.e. for error messages
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
      },

  // test the lexed token: return FALSE when not a match, otherwise return token
  test_match:function (match, indexed_rule) {
          var token,
              lines,
              backup;

          if (this.options.backtrack_lexer) {
              // save context
              backup = {
                  yylineno: this.yylineno,
                  yylloc: {
                      first_line: this.yylloc.first_line,
                      last_line: this.last_line,
                      first_column: this.yylloc.first_column,
                      last_column: this.yylloc.last_column
                  },
                  yytext: this.yytext,
                  match: this.match,
                  matches: this.matches,
                  matched: this.matched,
                  yyleng: this.yyleng,
                  offset: this.offset,
                  _more: this._more,
                  _input: this._input,
                  yy: this.yy,
                  conditionStack: this.conditionStack.slice(0),
                  done: this.done
              };
              if (this.options.ranges) {
                  backup.yylloc.range = this.yylloc.range.slice(0);
              }
          }

          lines = match[0].match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno += lines.length;
          }
          this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ?
                           lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                           this.yylloc.last_column + match[0].length
          };
          this.yytext += match[0];
          this.match += match[0];
          this.matches = match;
          this.yyleng = this.yytext.length;
          if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
          }
          this._more = false;
          this._backtrack = false;
          this._input = this._input.slice(match[0].length);
          this.matched += match[0];
          token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
          if (this.done && this._input) {
              this.done = false;
          }
          if (token) {
              return token;
          } else if (this._backtrack) {
              // recover context
              for (var k in backup) {
                  this[k] = backup[k];
              }
              return false; // rule action called reject() implying the next rule should be tested instead.
          }
          return false;
      },

  // return next match in input
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) {
              this.done = true;
          }

          var token,
              match,
              tempMatch,
              index;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (this.options.backtrack_lexer) {
                      token = this.test_match(tempMatch, rules[i]);
                      if (token !== false) {
                          return token;
                      } else if (this._backtrack) {
                          match = false;
                          continue; // rule action called reject() implying a rule MISmatch.
                      } else {
                          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                          return false;
                      }
                  } else if (!this.options.flex) {
                      break;
                  }
              }
          }
          if (match) {
              token = this.test_match(match, rules[index]);
              if (token !== false) {
                  return token;
              }
              // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
              return false;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
              });
          }
      },

  // return next match that has a token
  lex:function lex() {
          var r = this.next();
          if (r) {
              return r;
          } else {
              return this.lex();
          }
      },

  // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },

  // pop the previously active lexer condition state off the condition stack
  popState:function popState() {
          var n = this.conditionStack.length - 1;
          if (n > 0) {
              return this.conditionStack.pop();
          } else {
              return this.conditionStack[0];
          }
      },

  // produce the lexer rule set which is active for the currently active lexer condition state
  _currentRules:function _currentRules() {
          if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
              return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
          } else {
              return this.conditions["INITIAL"].rules;
          }
      },

  // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
  topState:function topState(n) {
          n = this.conditionStack.length - 1 - Math.abs(n || 0);
          if (n >= 0) {
              return this.conditionStack[n];
          } else {
              return "INITIAL";
          }
      },

  // alias for begin(condition)
  pushState:function pushState(condition) {
          this.begin(condition);
      },

  // return the number of states currently on the stack
  stateStackSize:function stateStackSize() {
          return this.conditionStack.length;
      },
  options: {},
  performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
  switch($avoiding_name_collisions) {
  case 0:/* skip whitespace */
  break;
  case 1:return 6
  case 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4
  case 3:return 17
  case 4:return 18
  case 5:return 23
  case 6:return 24
  case 7:return 22
  case 8:return 21
  case 9:return 10
  case 10:return 11
  case 11:return 8
  case 12:return 14
  case 13:return 'INVALID'
  }
  },
  rules: [/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],
  conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
  });
  return lexer;
  })();
  parser.lexer = lexer;
  function Parser () {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();


  if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () { return parser.parse.apply(parser, arguments); };
  }
  });
  var jsonlint_1 = jsonlint.parser;
  var jsonlint_2 = jsonlint.Parser;
  var jsonlint_3 = jsonlint.parse;

  const expression$1 = {
      StyleExpression,
      isExpression,
      isExpressionFilter,
      createExpression,
      createPropertyExpression,
      normalizePropertyExpression,
      ZoomConstantExpression,
      ZoomDependentExpression,
      StylePropertyFunction
  };
  const styleFunction = {
      convertFunction,
      createFunction,
      isFunction: isFunction$1
  };

  var fontWeights = {
    thin: 100,
    hairline: 100,
    'ultra-light': 100,
    'extra-light': 100,
    light: 200,
    book: 300,
    regular: 400,
    normal: 400,
    plain: 400,
    roman: 400,
    standard: 400,
    medium: 500,
    'semi-bold': 600,
    'demi-bold': 600,
    bold: 700,
    heavy: 800,
    black: 800,
    'extra-bold': 800,
    'ultra-black': 900,
    'extra-black': 900,
    'ultra-bold': 900,
    'heavy-black': 900,
    fat: 900,
    poster: 900
  };
  var sp = ' ';
  var italicRE = /(italic|oblique)$/i;

  var fontCache = {};

  var mapboxToCssFont = function(fonts, size, lineHeight) {
    var cssData = fontCache[fonts];
    if (!cssData) {
      if (!Array.isArray(fonts)) {
        fonts = [fonts];
      }
      var weight = 400;
      var style = 'normal';
      var fontFamilies = [];
      var haveWeight, haveStyle;
      for (var i = 0, ii = fonts.length; i < ii; ++i) {
        var font = fonts[i];
        var parts = font.split(' ');
        var maybeWeight = parts[parts.length - 1].toLowerCase();
        if (maybeWeight == 'normal' || maybeWeight == 'italic' || maybeWeight == 'oblique') {
          style = haveStyle ? style : maybeWeight;
          parts.pop();
          maybeWeight = parts[parts.length - 1].toLowerCase();
        } else if (italicRE.test(maybeWeight)) {
          maybeWeight = maybeWeight.replace(italicRE, '');
          style = haveStyle ? style : parts[parts.length - 1].replace(maybeWeight, '');
        }
        for (var w in fontWeights) {
          if (maybeWeight == w || maybeWeight == w.replace('-', '') || maybeWeight == w.replace('-', sp)) {
            weight = haveWeight ? weight : fontWeights[w];
            parts.pop();
            break;
          }
        }
        if (!haveWeight && typeof maybeWeight == 'number') {
          weight = maybeWeight;
        }
        var fontFamily = parts.join(sp)
          .replace('Klokantech Noto Sans', 'Noto Sans');
        if (fontFamily.indexOf(sp) !== -1) {
          fontFamily = '"' + fontFamily + '"';
        }
        fontFamilies.push(fontFamily);
      }
      // CSS font property: font-style font-weight font-size/line-height font-family
      cssData = fontCache[fonts] = [style, weight, fontFamilies];
    }
    return cssData[0] + sp + cssData[1] + sp + size + 'px' + (lineHeight ? '/' + lineHeight : '') + sp + cssData[2];
  };

  function deg2rad$1(degrees) {
    return degrees * Math.PI / 180;
  }

  const defaultResolutions = (function() {
    const resolutions = [];
    for (let res = 78271.51696402048; resolutions.length <= 24; res /= 2) {
      resolutions.push(res);
    }
    return resolutions;
  })();

  /**
   * @param {number} width Width of the canvas.
   * @param {number} height Height of the canvas.
   * @return {HTMLCanvasElement} Canvas.
   */
  function createCanvas(width, height) {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && typeof OffscreenCanvas !== 'undefined') { // eslint-disable-line
      return /** @type {?} */ (new OffscreenCanvas(width, height));
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
  }

  function getZoomForResolution(resolution, resolutions) {
    let i = 0;
    const ii = resolutions.length;
    for (; i < ii; ++i) {
      const candidate = resolutions[i];
      if (candidate < resolution && i + 1 < ii) {
        const zoomFactor = resolutions[i] / resolutions[i + 1];
        return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
      }
    }
    return ii - 1;
  }

  const hairSpacePool = Array(256).join('\u200A');
  function applyLetterSpacing(text, letterSpacing) {
    if (letterSpacing >= 0.05) {
      let textWithLetterSpacing = '';
      const lines = text.split('\n');
      const joinSpaceString = hairSpacePool.slice(0, Math.round(letterSpacing / 0.1));
      for (let l = 0, ll = lines.length; l < ll; ++l) {
        if (l > 0) {
          textWithLetterSpacing += '\n';
        }
        textWithLetterSpacing += lines[l].split('').join(joinSpaceString);
      }
      return textWithLetterSpacing;
    }
    return text;
  }

  let measureContext;
  function getMeasureContext() {
    if (!measureContext) {
      measureContext = createCanvas(1, 1).getContext('2d');
    }
    return measureContext;
  }

  function measureText(text, letterSpacing) {
    return getMeasureContext().measureText(text).width + (text.length - 1) * letterSpacing;
  }

  let measureCache = {};
  if (canvas.labelCache) {
    // Only available when using ES modules
    events.listen(canvas.labelCache, EventType__default['default'].CLEAR, function() {
      measureCache = {};
    });
  }
  function wrapText(text, font, em, letterSpacing) {
    if (text.indexOf('\n') !== -1) {
      const hardLines = text.split('\n');
      const lines = [];
      for (let i = 0, ii = hardLines.length; i < ii; ++i) {
        lines.push(wrapText(hardLines[i], font, em, letterSpacing));
      }
      return lines.join('\n');
    }
    const key = em + ',' + font + ',' + text + ',' + letterSpacing;
    let wrappedText = measureCache[key];
    if (!wrappedText) {
      const words = text.split(' ');
      if (words.length > 1) {
        const ctx = getMeasureContext();
        ctx.font = font;
        const oneEm = ctx.measureText('M').width;
        const maxWidth = oneEm * em;
        let line = '';
        const lines = [];
        // Pass 1 - wrap lines to not exceed maxWidth
        for (let i = 0, ii = words.length; i < ii; ++i) {
          const word = words[i];
          const testLine = line + (line ? ' ' : '') + word;
          if (measureText(testLine, letterSpacing) <= maxWidth) {
            line = testLine;
          } else {
            if (line) {
              lines.push(line);
            }
            line = word;
          }
        }
        if (line) {
          lines.push(line);
        }
        // Pass 2 - add lines with a width of less than 30% of maxWidth to the previous or next line
        for (let i = 0, ii = lines.length; i < ii && ii > 1; ++i) {
          const line = lines[i];
          if (measureText(line, letterSpacing) < maxWidth * 0.35) {
            const prevWidth = i > 0 ? measureText(lines[i - 1], letterSpacing) : Infinity;
            const nextWidth = i < ii - 1 ? measureText(lines[i + 1], letterSpacing) : Infinity;
            lines.splice(i, 1);
            ii -= 1;
            if (prevWidth < nextWidth) {
              lines[i - 1] += ' ' + line;
              i -= 1;
            } else {
              lines[i] = line + ' ' + lines[i];
            }
          }
        }
        // Pass 3 - try to fill 80% of maxWidth for each line
        for (let i = 0, ii = lines.length - 1; i < ii; ++i) {
          const line = lines[i];
          const next = lines[i + 1];
          if (measureText(line, letterSpacing) > maxWidth * 0.7 &&
              measureText(next, letterSpacing) < maxWidth * 0.6) {
            const lineWords = line.split(' ');
            const lastWord = lineWords.pop();
            if (measureText(lastWord, letterSpacing) < maxWidth * 0.2) {
              lines[i] = lineWords.join(' ');
              lines[i + 1] = lastWord + ' ' + next;
            }
            ii -= 1;
          }
        }
        wrappedText = lines.join('\n');
      } else {
        wrappedText = text;
      }
      wrappedText = applyLetterSpacing(wrappedText, letterSpacing);
      measureCache[key] = wrappedText;
    }
    return wrappedText;
  }

  /*
  ol-mapbox-style - Use Mapbox Style objects with OpenLayers
  Copyright 2016-present ol-mapbox-style contributors
  License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
  */

  /**
   * @typedef {import("ol/layer/Vector").default} VectorLayer
   * @typedef {import("ol/layer/VectorTile").default} VectorTileLayer
   * @typedef {import("ol/style/Style").StyleFunction} StyleFunction
   */

  const isFunction = styleFunction.isFunction;
  const convertFunction$1 = styleFunction.convertFunction;
  const isExpression$1 = expression$1.isExpression;
  const createPropertyExpression$1 = expression$1.createPropertyExpression;

  const types$2 = {
    'Point': 1,
    'MultiPoint': 1,
    'LineString': 2,
    'MultiLineString': 2,
    'Polygon': 3,
    'MultiPolygon': 3
  };
  const anchor = {
    'center': [0.5, 0.5],
    'left': [0, 0.5],
    'right': [1, 0.5],
    'top': [0.5, 0],
    'bottom': [0.5, 1],
    'top-left': [0, 0],
    'top-right': [1, 0],
    'bottom-left': [0, 1],
    'bottom-right': [1, 1]
  };

  const expressionData = function(rawExpression, propertySpec) {
    const compiledExpression = createPropertyExpression$1(rawExpression, propertySpec);
    if (compiledExpression.result === 'error') {
      throw new Error(compiledExpression.value.map(err => `${err.key}: ${err.message}`).join(', '));
    }
    return compiledExpression.value;
  };

  const emptyObj = {};
  const zoomObj = {zoom: 0};
  /** @private */
  const functionCache = {};
  let renderFeatureCoordinates, renderFeature;

  /**
   * @private
   * @param {Object} layer Gl object layer.
   * @param {string} layoutOrPaint 'layout' or 'paint'.
   * @param {string} property Feature property.
   * @param {number} zoom Zoom.
   * @param {Object} feature Gl feature.
   * @return {?} Value.
   */
  function getValue(layer, layoutOrPaint, property, zoom, feature) {
    const layerId = layer.id;
    if (!functionCache[layerId]) {
      functionCache[layerId] = {};
    }
    const functions = functionCache[layerId];
    if (!functions[property]) {
      let value = (layer[layoutOrPaint] || emptyObj)[property];
      const propertySpec = v8[`${layoutOrPaint}_${layer.type}`][property];
      if (value === undefined) {
        value = propertySpec.default;
      }
      let isExpr = isExpression$1((value));
      if (!isExpr && isFunction(value)) {
        value = convertFunction$1(value, propertySpec);
        isExpr = true;
      }
      if (isExpr) {
        const compiledExpression = expressionData(value, propertySpec);
        functions[property] = compiledExpression.evaluate.bind(compiledExpression);
      } else {
        if (propertySpec.type == 'color') {
          value = Color.parse(value);
        }
        functions[property] = function() {
          return value;
        };
      }
    }
    zoomObj.zoom = zoom;
    return functions[property](zoomObj, feature);
  }

  /** @private */
  const filterCache = {};

  /**
   * @private
   * @param {string} layerId Layer id.
   * @param {?} filter Filter.
   * @param {Object} feature Feature.
   * @param {number} zoom Zoom.
   * @return {boolean} Filter result.
   */
  function evaluateFilter(layerId, filter, feature, zoom) {
    if (!(layerId in filterCache)) {
      filterCache[layerId] = createFilter(filter).filter;
    }
    zoomObj.zoom = zoom;
    return filterCache[layerId](zoomObj, feature);
  }

  /**
   * @private
   * @param {?} color Color.
   * @param {number} opacity Opacity.
   * @return {string} Color.
   */
  function colorWithOpacity(color, opacity) {
    if (color) {
      if (color.a === 0 || opacity === 0) {
        return undefined;
      }
      const a = color.a;
      opacity = opacity === undefined ? 1 : opacity;
      return 'rgba(' + Math.round(color.r * 255 / a) + ',' + Math.round(color.g * 255 / a) +
        ',' + Math.round(color.b * 255 / a) + ',' + (a * opacity) + ')';
    }
    return color;
  }

  const templateRegEx = /^([^]*)\{(.*)\}([^]*)$/;

  /**
   * @private
   * @param {string} text Text.
   * @param {Object} properties Properties.
   * @return {string} Text.
   */
  function fromTemplate(text, properties) {
    let parts;
    do {
      parts = text.match(templateRegEx);
      if (parts) {
        const value = properties[parts[2]] || '';
        text = parts[1] + value + parts[3];
      }
    } while (parts);
    return text;
  }

  /**
   * ```js
   * import stylefunction from 'ol-mapbox-style/dist/stylefunction';
   * ```
   * Creates a style function from the `glStyle` object for all layers that use
   * the specified `source`, which needs to be a `"type": "vector"` or
   * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
   *
   * Two additional properties will be set on the provided layer:
   *
   *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
   *    OpenLayers layer was created from. Usually `apply()` creates one
   *    OpenLayers layer per Mapbox Style source, unless the layer stack has
   *    layers from different sources in between.
   *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
   *    included in the OpenLayers layer.
   *
   * This function also works in a web worker. In worker mode, the main thread needs
   * to listen to messages from the worker and respond with another message to make
   * sure that sprite image loading works:
   *
   * ```js
   *  worker.addEventListener('message', event => {
   *   if (event.data.action === 'loadImage') {
   *     const image = new Image();
   *     image.crossOrigin = 'anonymous';
   *     image.addEventListener('load', function() {
   *       createImageBitmap(image, 0, 0, image.width, image.height).then(imageBitmap => {
   *         worker.postMessage({
   *           action: 'imageLoaded',
   *           image: imageBitmap,
   *           src: event.data.src
   *         }, [imageBitmap]);
   *       });
   *     });
   *     image.src = event.data.src;
   *   }
   * });
   * ```
   *
   * @param {VectorLayer|VectorTileLayer} olLayer OpenLayers layer to
   * apply the style to. In addition to the style, the layer will get two
   * properties: `mapbox-source` will be the `id` of the `glStyle`'s source used
   * for the layer, and `mapbox-layers` will be an array of the `id`s of the
   * `glStyle`'s layers.
   * @param {string|Object} glStyle Mapbox Style object.
   * @param {string|Array<string>} source `source` key or an array of layer `id`s
   * from the Mapbox Style object. When a `source` key is provided, all layers for
   * the specified source will be included in the style function. When layer `id`s
   * are provided, they must be from layers that use the same source.
   * @param {Array<number>} [resolutions=[78271.51696402048, 39135.75848201024,
     19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564,
     1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525,
     76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032,
     4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395,
     0.29858214173896974, 0.14929107086948487, 0.07464553543474244]]
   * Resolutions for mapping resolution to zoom level.
   * @param {Object} [spriteData=undefined] Sprite data from the url specified in
   * the Mapbox Style object's `sprite` property. Only required if a `sprite`
   * property is specified in the Mapbox Style object.
   * @param {Object} [spriteImageUrl=undefined] Sprite image url for the sprite
   * specified in the Mapbox Style object's `sprite` property. Only required if a
   * `sprite` property is specified in the Mapbox Style object.
   * @param {function(Array<string>):Array<string>} [getFonts=undefined] Function that
   * receives a font stack as arguments, and returns a (modified) font stack that
   * is available. Font names are the names used in the Mapbox Style object. If
   * not provided, the font stack will be used as-is. This function can also be
   * used for loading web fonts.
   * @return {StyleFunction} Style function for use in
   * `ol.layer.Vector` or `ol.layer.VectorTile`.
   */
  function stylefunction(olLayer, glStyle, source, resolutions = defaultResolutions, spriteData, spriteImageUrl, getFonts) {
    if (typeof glStyle == 'string') {
      glStyle = JSON.parse(glStyle);
    }
    if (glStyle.version != 8) {
      throw new Error('glStyle version 8 required.');
    }

    let spriteImage, spriteImgSize;
    if (spriteImageUrl) {
      if (typeof Image !== 'undefined') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
          spriteImage = img;
          spriteImgSize = [img.width, img.height];
          olLayer.changed();
          img.onload = null;
        };
        img.src = spriteImageUrl;
      } else if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) { //eslint-disable-line
        const worker = /** @type {*} */ (self);
        // Main thread needs to handle 'loadImage' and dispatch 'imageLoaded'
        worker.postMessage({
          action: 'loadImage',
          src: spriteImageUrl
        });
        worker.addEventListener('message', function handler(event) {
          if (event.data.action === 'imageLoaded' && event.data.src === spriteImageUrl) {
            spriteImage = event.data.image;
            spriteImgSize = [spriteImage.width, spriteImage.height];
          }
        });
      }
    }


    const allLayers = derefLayers(glStyle.layers);

    const layersBySourceLayer = {};
    const mapboxLayers = [];
    let mapboxSource;
    for (let i = 0, ii = allLayers.length; i < ii; ++i) {
      const layer = allLayers[i];
      const layerId = layer.id;
      if (typeof source == 'string' && layer.source == source ||
          source.indexOf(layerId) !== -1) {
        const sourceLayer = layer['source-layer'];
        if (!mapboxSource) {
          mapboxSource = layer.source;
          const source = glStyle.sources[mapboxSource];
          if (!source) {
            throw new Error(`Source "${mapboxSource}" is not defined`);
          }
          const type = source.type;
          if (type !== 'vector' && type !== 'geojson') {
            throw new Error(`Source "${mapboxSource}" is not of type "vector" or "geojson", but "${type}"`);
          }
        }
        let layers = layersBySourceLayer[sourceLayer];
        if (!layers) {
          layers = layersBySourceLayer[sourceLayer] = [];
        }
        layers.push({
          layer: layer,
          index: i
        });
        mapboxLayers.push(layerId);
      }
      // TODO revisit when diffing gets added
      delete functionCache[layerId];
      delete filterCache[layerId];
    }

    const textHalo = new Stroke__default['default']();
    const textColor = new Fill__default['default']();

    const iconImageCache = {};
    const patternCache = {};
    const styles = [];

    const styleFunction = function(feature, resolution) {
      const properties = feature.getProperties();
      const layers = layersBySourceLayer[properties.layer];
      if (!layers) {
        return;
      }
      let zoom = resolutions.indexOf(resolution);
      if (zoom == -1) {
        zoom = getZoomForResolution(resolution, resolutions);
      }
      const type = types$2[feature.getGeometry().getType()];
      const f = {
        properties: properties,
        type: type
      };
      let stylesLength = -1;
      for (let i = 0, ii = layers.length; i < ii; ++i) {
        const layerData = layers[i];
        const layer = layerData.layer;
        const layerId = layer.id;

        const layout = layer.layout || emptyObj;
        const paint = layer.paint || emptyObj;
        if (layout.visibility === 'none' || ('minzoom' in layer && zoom < layer.minzoom) ||
            ('maxzoom' in layer && zoom >= layer.maxzoom)) {
          continue;
        }
        const filter = layer.filter;
        if (!filter || evaluateFilter(layerId, filter, f, zoom)) {
          let color, opacity, fill, stroke, strokeColor, style;
          const index = layerData.index;
          if (type == 3 && (layer.type == 'fill' || layer.type == 'fill-extrusion')) {
            opacity = getValue(layer, 'paint', layer.type + '-opacity', zoom, f);
            if (layer.type + '-pattern' in paint) {
              const fillIcon = getValue(layer, 'paint', layer.type + '-pattern', zoom, f);
              if (fillIcon) {
                const icon = typeof fillIcon === 'string'
                  ? fromTemplate(fillIcon, properties)
                  : fillIcon.toString();
                if (spriteImage && spriteData && spriteData[icon]) {
                  ++stylesLength;
                  style = styles[stylesLength];
                  if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                    style = styles[stylesLength] = new Style__default['default']({
                      fill: new Fill__default['default']()
                    });
                  }
                  fill = style.getFill();
                  style.setZIndex(index);
                  const icon_cache_key = icon + '.' + opacity;
                  let pattern = patternCache[icon_cache_key];
                  if (!pattern) {
                    const spriteImageData = spriteData[icon];
                    const canvas = createCanvas(spriteImageData.width, spriteImageData.height);
                    const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
                    ctx.globalAlpha = opacity;
                    ctx.drawImage(
                      spriteImage,
                      spriteImageData.x,
                      spriteImageData.y,
                      spriteImageData.width,
                      spriteImageData.height,
                      0,
                      0,
                      spriteImageData.width,
                      spriteImageData.height
                    );
                    pattern = ctx.createPattern(canvas, 'repeat');
                    patternCache[icon_cache_key] = pattern;
                  }
                  fill.setColor(pattern);
                }
              }
            } else {
              color = colorWithOpacity(getValue(layer, 'paint', layer.type + '-color', zoom, f), opacity);
              if (color) {
                if (layer.type + '-outline-color' in paint) {
                  strokeColor = colorWithOpacity(getValue(layer, 'paint', layer.type + '-outline-color', zoom, f), opacity);
                }
                if (!strokeColor) {
                  strokeColor = color;
                }
                ++stylesLength;
                style = styles[stylesLength];
                if (!style || !(style.getFill() && style.getStroke()) || style.getText()) {
                  style = styles[stylesLength] = new Style__default['default']({
                    fill: new Fill__default['default'](),
                    stroke: new Stroke__default['default']()
                  });
                }
                fill = style.getFill();
                fill.setColor(color);
                stroke = style.getStroke();
                stroke.setColor(strokeColor);
                stroke.setWidth(1);
                style.setZIndex(index);
              }
            }
          }
          if (type != 1 && layer.type == 'line') {
            color = !('line-pattern' in paint) && 'line-color' in paint ?
              colorWithOpacity(getValue(layer, 'paint', 'line-color', zoom, f), getValue(layer, 'paint', 'line-opacity', zoom, f)) :
              undefined;
            const width = getValue(layer, 'paint', 'line-width', zoom, f);
            if (color && width > 0) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                style = styles[stylesLength] = new Style__default['default']({
                  stroke: new Stroke__default['default']()
                });
              }
              stroke = style.getStroke();
              stroke.setLineCap(getValue(layer, 'layout', 'line-cap', zoom, f));
              stroke.setLineJoin(getValue(layer, 'layout', 'line-join', zoom, f));
              stroke.setMiterLimit(getValue(layer, 'layout', 'line-miter-limit', zoom, f));
              stroke.setColor(color);
              stroke.setWidth(width);
              stroke.setLineDash(paint['line-dasharray'] ?
                getValue(layer, 'paint', 'line-dasharray', zoom, f).map(function(x) {
                  return x * width;
                }) : null);
              style.setZIndex(index);
            }
          }

          let hasImage = false;
          let text = null;
          let placementAngle = 0;
          let icon, iconImg, skipLabel;
          if ((type == 1 || type == 2) && 'icon-image' in layout) {
            const iconImage = getValue(layer, 'layout', 'icon-image', zoom, f);
            if (iconImage) {
              icon = typeof iconImage === 'string'
                ? fromTemplate(iconImage, properties)
                : iconImage.toString();
              let styleGeom = undefined;
              if (spriteImage && spriteData && spriteData[icon]) {
                const iconRotationAlignment = getValue(layer, 'layout', 'icon-rotation-alignment', zoom, f);
                if (type == 2) {
                  const geom = feature.getGeometry();
                  // ol package and ol-debug.js only
                  if (geom.getFlatMidpoint || geom.getFlatMidpoints) {
                    const extent = geom.getExtent();
                    const size = Math.sqrt(Math.max(
                      Math.pow((extent[2] - extent[0]) / resolution, 2),
                      Math.pow((extent[3] - extent[1]) / resolution, 2))
                    );
                    if (size > 150) {
                      //FIXME Do not hard-code a size of 150
                      const midpoint = geom.getType() === 'MultiLineString' ? geom.getFlatMidpoints() : geom.getFlatMidpoint();
                      if (!renderFeature) {
                        renderFeatureCoordinates = [NaN, NaN];
                        renderFeature = new RenderFeature__default['default']('Point', renderFeatureCoordinates, [], {}, null);
                      }
                      styleGeom = renderFeature;
                      renderFeatureCoordinates[0] = midpoint[0];
                      renderFeatureCoordinates[1] = midpoint[1];
                      const placement = getValue(layer, 'layout', 'symbol-placement', zoom, f);
                      if (placement === 'line' && iconRotationAlignment === 'map') {
                        const stride = geom.getStride();
                        const coordinates = geom.getFlatCoordinates();
                        for (let i = 0, ii = coordinates.length - stride; i < ii; i += stride) {
                          const x1 = coordinates[i];
                          const y1 = coordinates[i + 1];
                          const x2 = coordinates[i + stride];
                          const y2 = coordinates[i + stride + 1];
                          const minX = Math.min(x1, x2);
                          const minY = Math.min(y1, y2);
                          const maxX = Math.max(x1, x2);
                          const maxY = Math.max(y1, y2);
                          if (midpoint[0] >= minX && midpoint[0] <= maxX &&
                              midpoint[1] >= minY && midpoint[1] <= maxY) {
                            placementAngle = Math.atan2(y1 - y2, x2 - x1);
                            break;
                          }
                        }
                      }
                    }
                  }
                }
                if (type !== 2 || styleGeom) {
                  ++stylesLength;
                  style = styles[stylesLength];
                  if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                    style = styles[stylesLength] = new Style__default['default']();
                  }
                  style.setGeometry(styleGeom);
                  const iconSize = getValue(layer, 'layout', 'icon-size', zoom, f);
                  const iconColor = paint['icon-color'] !== undefined ? getValue(layer, 'paint', 'icon-color', zoom, f) : null;
                  let icon_cache_key = icon + '.' + iconSize;
                  if (iconColor !== null) {
                    icon_cache_key += '.' + iconColor;
                  }
                  iconImg = iconImageCache[icon_cache_key];
                  if (!iconImg) {
                    const spriteImageData = spriteData[icon];
                    if (iconColor !== null) {
                      // cut out the sprite and color it
                      const canvas = createCanvas(spriteImageData.width, spriteImageData.height);
                      const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
                      ctx.drawImage(
                        spriteImage,
                        spriteImageData.x,
                        spriteImageData.y,
                        spriteImageData.width,
                        spriteImageData.height,
                        0,
                        0,
                        spriteImageData.width,
                        spriteImageData.height
                      );
                      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
                      for (let c = 0, cc = data.data.length; c < cc; c += 4) {
                        const a = iconColor.a;
                        if (a !== 0) {
                          data.data[c] = iconColor.r * 255 / a;
                          data.data[c + 1] = iconColor.g * 255 / a;
                          data.data[c + 2] = iconColor.b * 255 / a;
                        }
                        data.data[c + 3] = a;
                      }
                      ctx.putImageData(data, 0, 0);
                      iconImg = iconImageCache[icon_cache_key] = new Icon__default['default']({
                        img: canvas,
                        imgSize: [canvas.width, canvas.height],
                        scale: iconSize / spriteImageData.pixelRatio
                      });
                    } else {
                      iconImg = iconImageCache[icon_cache_key] = new Icon__default['default']({
                        img: spriteImage,
                        imgSize: spriteImgSize,
                        size: [spriteImageData.width, spriteImageData.height],
                        offset: [spriteImageData.x, spriteImageData.y],
                        rotateWithView: iconRotationAlignment === 'map',
                        scale: iconSize / spriteImageData.pixelRatio
                      });
                    }
                  }
                  iconImg.setRotation(placementAngle + deg2rad$1(getValue(layer, 'layout', 'icon-rotate', zoom, f)));
                  iconImg.setOpacity(getValue(layer, 'paint', 'icon-opacity', zoom, f));
                  iconImg.setAnchor(anchor[getValue(layer, 'layout', 'icon-anchor', zoom, f)]);
                  style.setImage(iconImg);
                  text = style.getText();
                  style.setText(undefined);
                  style.setZIndex(index);
                  hasImage = true;
                  skipLabel = false;
                } else {
                  skipLabel = true;
                }
              }
            }
          }

          if (type == 1 && 'circle-radius' in paint) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
              style = styles[stylesLength] = new Style__default['default']();
            }
            const circleRadius = getValue(layer, 'paint', 'circle-radius', zoom, f);
            const circleStrokeColor = colorWithOpacity(getValue(layer, 'paint', 'circle-stroke-color', zoom, f), getValue(layer, 'paint', 'circle-stroke-opacity', zoom, f));
            const circleColor = colorWithOpacity(getValue(layer, 'paint', 'circle-color', zoom, f), getValue(layer, 'paint', 'circle-opacity', zoom, f));
            const circleStrokeWidth = getValue(layer, 'paint', 'circle-stroke-width', zoom, f);
            const cache_key = circleRadius + '.' + circleStrokeColor + '.' +
              circleColor + '.' + circleStrokeWidth;
            iconImg = iconImageCache[cache_key];
            if (!iconImg) {
              iconImg = iconImageCache[cache_key] = new Circle__default['default']({
                radius: circleRadius,
                stroke: circleStrokeColor && circleStrokeWidth > 0 ? new Stroke__default['default']({
                  width: circleStrokeWidth,
                  color: circleStrokeColor
                }) : undefined,
                fill: circleColor ? new Fill__default['default']({
                  color: circleColor
                }) : undefined
              });
            }
            style.setImage(iconImg);
            text = style.getText();
            style.setText(undefined);
            style.setGeometry(undefined);
            style.setZIndex(index);
            hasImage = true;
          }

          let label;
          if ('text-field' in layout) {
            const textField = getValue(layer, 'layout', 'text-field', zoom, f).toString();
            label = fromTemplate(textField, properties).trim();
            opacity = getValue(layer, 'paint', 'text-opacity', zoom, f);
          }
          if (label && opacity && !skipLabel) {
            if (!hasImage) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getText() || style.getFill() || style.getStroke()) {
                style = styles[stylesLength] = new Style__default['default']();
              }
              style.setImage(undefined);
              style.setGeometry(undefined);
            }
            if (!style.getText()) {
              style.setText(text || new Text__default['default']({
                padding: [2, 2, 2, 2]
              }));
            }
            text = style.getText();
            const textSize = Math.round(getValue(layer, 'layout', 'text-size', zoom, f));
            const fontArray = getValue(layer, 'layout', 'text-font', zoom, f);
            const textLineHeight = getValue(layer, 'layout', 'text-line-height', zoom, f);
            const font = mapboxToCssFont(getFonts ? getFonts(fontArray) : fontArray, textSize, textLineHeight);
            const textTransform = layout['text-transform'];
            if (textTransform == 'uppercase') {
              label = label.toUpperCase();
            } else if (textTransform == 'lowercase') {
              label = label.toLowerCase();
            }
            const maxTextWidth = getValue(layer, 'layout', 'text-max-width', zoom, f);
            const letterSpacing = getValue(layer, 'layout', 'text-letter-spacing', zoom, f);
            const wrappedLabel = type == 2 ? applyLetterSpacing(label, letterSpacing) : wrapText(label, font, maxTextWidth, letterSpacing);
            text.setText(wrappedLabel);
            text.setFont(font);
            text.setRotation(deg2rad$1(getValue(layer, 'layout', 'text-rotate', zoom, f)));
            const textAnchor = getValue(layer, 'layout', 'text-anchor', zoom, f);
            const placement = (hasImage || type == 1) ? 'point' : getValue(layer, 'layout', 'symbol-placement', zoom, f);
            text.setPlacement(placement);
            let textHaloWidth = getValue(layer, 'paint', 'text-halo-width', zoom, f);
            const textOffset = getValue(layer, 'layout', 'text-offset', zoom, f);
            const textTranslate = getValue(layer, 'paint', 'text-translate', zoom, f);
            // Text offset has to take halo width and line height into account
            let vOffset = 0;
            let hOffset = 0;
            if (placement == 'point') {
              let textAlign = 'center';
              if (textAnchor.indexOf('left') !== -1) {
                textAlign = 'left';
                hOffset = textHaloWidth;
              } else if (textAnchor.indexOf('right') !== -1) {
                textAlign = 'right';
                hOffset = -textHaloWidth;
              }
              text.setTextAlign(textAlign);
              const textRotationAlignment = getValue(layer, 'layout', 'text-rotation-alignment', zoom, f);
              text.setRotateWithView(textRotationAlignment == 'map');
            } else {
              text.setMaxAngle(deg2rad$1(getValue(layer, 'layout', 'text-max-angle', zoom, f)) * label.length / wrappedLabel.length);
              text.setTextAlign();
              text.setRotateWithView(false);
            }
            let textBaseline = 'middle';
            if (textAnchor.indexOf('bottom') == 0) {
              textBaseline = 'bottom';
              vOffset = -textHaloWidth - (0.5 * (textLineHeight - 1)) * textSize;
            } else if (textAnchor.indexOf('top') == 0) {
              textBaseline = 'top';
              vOffset = textHaloWidth + (0.5 * (textLineHeight - 1)) * textSize;
            }
            text.setTextBaseline(textBaseline);
            text.setOffsetX(textOffset[0] * textSize + hOffset + textTranslate[0]);
            text.setOffsetY(textOffset[1] * textSize + vOffset + textTranslate[1]);
            textColor.setColor(colorWithOpacity(getValue(layer, 'paint', 'text-color', zoom, f), opacity));
            text.setFill(textColor);
            const haloColor = colorWithOpacity(getValue(layer, 'paint', 'text-halo-color', zoom, f), opacity);
            if (haloColor) {
              textHalo.setColor(haloColor);
              // spec here : https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-symbol-text-halo-width
              // Halo width must be doubled because it is applied around the center of the text outline
              textHaloWidth *= 2;
              // 1/4 of text size (spec) x 2
              const halfTextSize = 0.5 * textSize;
              textHalo.setWidth(textHaloWidth <= halfTextSize ? textHaloWidth : halfTextSize);
              text.setStroke(textHalo);
            } else {
              text.setStroke(undefined);
            }
            const textPadding = getValue(layer, 'layout', 'text-padding', zoom, f);
            const padding = text.getPadding();
            if (textPadding !== padding[0]) {
              padding[0] = padding[1] = padding[2] = padding[3] = textPadding;
            }
            style.setZIndex(index);
          }
        }
      }

      if (stylesLength > -1) {
        styles.length = stylesLength + 1;
        return styles;
      }
    };

    olLayer.setStyle(styleFunction);
    olLayer.set('mapbox-source', mapboxSource);
    olLayer.set('mapbox-layers', mapboxLayers);
    return styleFunction;
  }

  function loadStyle(styleJson, vectorTileLayer, spriteUrl) {
    const {
      source,
      visible,
      credentials,
      headers
    } = vectorTileLayer;
    const spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
    const sizeFactor = spriteScale === 0.5 ? '@2x' : '';
    const sourceName = Object.keys(styleJson.sources)[0];
    const tileGrid = source.getTileGrid();
    const resolutions = tileGrid.getResolutions();
    const spriteImageUrl = spriteUrl + sizeFactor + '.png';
    const style = getStyle(vectorTileLayer, styleJson, sourceName, resolutions, null, spriteImageUrl);
    vectorTileLayer.setStyle(style);
    const spriteJsonUrl = spriteUrl + sizeFactor + '.json';
    fetch(spriteJsonUrl, {
      headers,
      credentials
    }).then(response => response.json()).then(data => {
      const style = getStyle(vectorTileLayer, styleJson, sourceName, resolutions, data, spriteImageUrl);
      vectorTileLayer.setStyle(style);
      vectorTileLayer.setVisible(visible);
    }).catch(e => {
      console.error('load sprite error', e);
    });
  }

  function getStyle(vectorTileLayer, styleJson, sourceName, resolutions, sprite, spriteImageUrl) {
    const fun = stylefunction(vectorTileLayer, styleJson, sourceName, resolutions, sprite, spriteImageUrl, () => []);
    return (feature, resolution) => {
      return fun(feature, resolution);
    };
  }

  const loadVectorTileStyle = (vectorTileLayer, styleUrl, spriteUrl) => {
    const {
      credentials,
      headers
    } = vectorTileLayer;
    fetch(styleUrl, {
      headers,
      credentials
    }).then(response => response.json()).then(data => {
      loadStyle(data, vectorTileLayer, spriteUrl);
    }).catch(e => {
      console.error('load style error', e);
    });
  };

  class VectorTileArcGISRest extends VectorTile__default['default'] {
    constructor(options) {
      const visible = typeof options.visible === 'undefined' ? true : options.visible;
      options.visible = false;
      super(options);
      this.visible = visible;
      this.source = options.source;
      this.credentials = options.withCredentials ? 'include' : 'omit';
      this.headers = options.headers || {};
      this.styleLoadFunction();
    }

    styleLoadFunction() {
      const styleUrl = this.source.baseUrl + '/resources/styles';
      const spriteUrl = this.source.baseUrl + '/resources/sprites/sprite';
      loadVectorTileStyle(this, styleUrl, spriteUrl);
    }

  }

  class VectorTileArcGISRest$1 extends VectorTile__default['default'] {
    constructor(options) {
      const visible = typeof options.visible === 'undefined' ? true : options.visible;
      options.visible = false;
      super(options);
      this.visible = visible;
      this.source = options.source;
      this.credentials = options.withCredentials ? 'include' : 'omit';
      this.headers = options.headers || {};
      this.styleLoadFunction();
    }

    styleLoadFunction() {
      const styleUrl = this.source.baseUrl + '/style.json';
      const spriteUrl = this.source.baseUrl + '/sprites/sprite';
      loadVectorTileStyle(this, styleUrl, spriteUrl);
    }

  }

  class TileWMTS extends TileLayer__default['default'] {
    constructor(options) {
      const source = options.source;
      source && delete options.source;
      super(options);
      source && this.setSourceFunction(source);
    }

    setSourceFunction(source) {
      const urls = source.getUrls();

      if (!urls || urls.length < 1) {
        console.error("url is required");
        return;
      }

      let layer = source.getLayer();
      let matrixSet = source.getMatrixSet();
      let style = source.getStyle();
      const url = `${urls[0]}${urls[0].indexOf('?') > -1 ? '&' : '?'}request=GetCapabilities&service=wmts`;
      fetch(url).then(response => response.text()).then(text => {
        const parser = new WMTSCapabilities__default['default']();
        const result = parser.read(text);
        const layers = result.Contents.Layer;
        let layerNode = layers[0];

        if (!layer) {
          layer = layerNode.Identifier;
        }

        layers.forEach(item => {
          if (item.Identifier === layer) {
            layerNode = item;
          }
        });

        if (!matrixSet) {
          if (layerNode.Identifier === layer) {
            matrixSet = layerNode.TileMatrixSetLink[0].TileMatrixSet;
          }
        }

        if (!style) {
          if (layerNode.Identifier === layer) {
            style = layerNode.Style[0].Identifier;
          }
        }

        const options = WMTSSource.optionsFromCapabilities(result, {
          layer,
          matrixSet,
          style,
          urls
        });
        this.setSource(new WMTSSource__default['default'](options));
      });
    }

  }

  var layer$1 = {
    VectorTileArcGISRest,
    VectorTileSuperMapRest: VectorTileArcGISRest$1,
    TileWMTS
  };

  class VectorTileArcGISRest$2 extends VectorTile__default$1['default'] {
    constructor(options) {
      if (options.url === undefined) {
        console.error("options.url is required");
      }

      const baseUrl = options.url;
      options.url = baseUrl + '/tile/{z}/{y}/{x}.pbf';
      super(options);
      this.baseUrl = baseUrl;
    }

  }

  class VectorTileArcGISRest$3 extends VectorTile__default$1['default'] {
    constructor(options) {
      if (options.url === undefined) {
        console.error("options.url is required");
      }

      const baseUrl = options.url;
      options.url = baseUrl + '/tiles/{z}/{x}/{y}.mvt';
      super(options);
      this.baseUrl = baseUrl;
    }

  }

  const default4326TileGrid = function () {
    const resolutions = [];
    const matrixIds = [];

    for (let i = 1; i < 19; i++) {
      resolutions.push(0.703125 * 2 / Math.pow(2, i));
      matrixIds.push(i);
    }

    const tileGird = new WMTSTileGrid__default['default']({
      extent: [-180, -90, 180, 90],
      resolutions,
      origin: [-180, 90],
      matrixIds: matrixIds,
      minZoom: 1
    });
    return tileGird;
  };

  const default3857TileGrid = function () {
    const resolutions = [];
    const matrixIds = [];

    for (let i = 1; i < 19; i++) {
      resolutions.push(78271.5169640203125 * 2 / Math.pow(2, i));
      matrixIds.push(i);
    }

    const tileGird = new WMTSTileGrid__default['default']({
      extent: [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892],
      resolutions,
      matrixIds: matrixIds,
      origin: [-20037508.3427892, 20037508.3427892],
      minZoom: 1
    });
    return tileGird;
  };

  class WMTSTDT extends WMTSSource__default['default'] {
    constructor(options) {
      const matrixSet = options.matrixSet || 'c';
      const layer = options.layer || 'vec';
      const defaultOptions = {
        tileGrid: matrixSet === 'c' ? default4326TileGrid() : default3857TileGrid(),
        style: 'default',
        format: 'tiles',
        layer,
        matrixSet,
        url: `http://t{0-7}.tianditu.gov.cn/${layer}_${matrixSet}/wmts?tk=${options.tk}`
      };
      super(Object.assign(defaultOptions, options));
    }

  }

  class XYZArcGISRest extends XYZSource__default['default'] {
    constructor(options) {
      const baseUrl = options.url;
      options.url = `${baseUrl}/tile/{z}/{y}/{x}`;
      super(options);
      this.setTileGridFunction(baseUrl);
    }

    setTileGridFunction(baseUrl) {
      const url = `${baseUrl}?f=pjson`;
      fetch(url).then(response => response.json()).then(data => {
        const {
          tileInfo,
          fullExtent
        } = data;
        const origin = [tileInfo.origin.x, tileInfo.origin.y];
        const resolutions = tileInfo.lods.map(item => {
          return item.resolution;
        });
        const extent = [fullExtent.xmin, fullExtent.ymin, fullExtent.xmax, fullExtent.ymax];
        const tileGrid = new TileGrid__default['default']({
          tileSize: tileInfo.rows,
          origin,
          resolutions,
          extent
        });
        this.tileGrid = tileGrid;
      });
    }

  }

  var source$1 = {
    VectorTileArcGISRest: VectorTileArcGISRest$2,
    VectorTileSuperMapRest: VectorTileArcGISRest$3,
    WMTSTDT,
    XYZArcGISRest
  };

  function globals(defs) {
    defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
    defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
    defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");

    defs.WGS84 = defs['EPSG:4326'];
    defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
    defs.GOOGLE = defs['EPSG:3857'];
    defs['EPSG:900913'] = defs['EPSG:3857'];
    defs['EPSG:102113'] = defs['EPSG:3857'];
  }

  var PJD_3PARAM = 1;
  var PJD_7PARAM = 2;
  var PJD_WGS84 = 4; // WGS84 or equivalent
  var PJD_NODATUM = 5; // WGS84 or equivalent
  var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
  var HALF_PI = Math.PI/2;
  // ellipoid pj_set_ell.c
  var SIXTH = 0.1666666666666666667;
  /* 1/6 */
  var RA4 = 0.04722222222222222222;
  /* 17/360 */
  var RA6 = 0.02215608465608465608;
  var EPSLN = 1.0e-10;
  // you'd think you could use Number.EPSILON above but that makes
  // Mollweide get into an infinate loop.

  var D2R = 0.01745329251994329577;
  var R2D = 57.29577951308232088;
  var FORTPI = Math.PI/4;
  var TWO_PI = Math.PI * 2;
  // SPI is slightly greater than Math.PI, so values that exceed the -180..180
  // degree range by a tiny amount don't get wrapped. This prevents points that
  // have drifted from their original location along the 180th meridian (due to
  // floating point error) from changing their sign.
  var SPI = 3.14159265359;

  var exports$1 = {};

  exports$1.greenwich = 0.0; //"0dE",
  exports$1.lisbon = -9.131906111111; //"9d07'54.862\"W",
  exports$1.paris = 2.337229166667; //"2d20'14.025\"E",
  exports$1.bogota = -74.080916666667; //"74d04'51.3\"W",
  exports$1.madrid = -3.687938888889; //"3d41'16.58\"W",
  exports$1.rome = 12.452333333333; //"12d27'8.4\"E",
  exports$1.bern = 7.439583333333; //"7d26'22.5\"E",
  exports$1.jakarta = 106.807719444444; //"106d48'27.79\"E",
  exports$1.ferro = -17.666666666667; //"17d40'W",
  exports$1.brussels = 4.367975; //"4d22'4.71\"E",
  exports$1.stockholm = 18.058277777778; //"18d3'29.8\"E",
  exports$1.athens = 23.7163375; //"23d42'58.815\"E",
  exports$1.oslo = 10.722916666667; //"10d43'22.5\"E"

  var units = {
    ft: {to_meter: 0.3048},
    'us-ft': {to_meter: 1200 / 3937}
  };

  var ignoredChar = /[\s_\-\/\(\)]/g;
  function match(obj, key) {
    if (obj[key]) {
      return obj[key];
    }
    var keys = Object.keys(obj);
    var lkey = key.toLowerCase().replace(ignoredChar, '');
    var i = -1;
    var testkey, processedKey;
    while (++i < keys.length) {
      testkey = keys[i];
      processedKey = testkey.toLowerCase().replace(ignoredChar, '');
      if (processedKey === lkey) {
        return obj[testkey];
      }
    }
  }

  function projStr(defData) {
    var self = {};
    var paramObj = defData.split('+').map(function(v) {
      return v.trim();
    }).filter(function(a) {
      return a;
    }).reduce(function(p, a) {
      var split = a.split('=');
      split.push(true);
      p[split[0].toLowerCase()] = split[1];
      return p;
    }, {});
    var paramName, paramVal, paramOutname;
    var params = {
      proj: 'projName',
      datum: 'datumCode',
      rf: function(v) {
        self.rf = parseFloat(v);
      },
      lat_0: function(v) {
        self.lat0 = v * D2R;
      },
      lat_1: function(v) {
        self.lat1 = v * D2R;
      },
      lat_2: function(v) {
        self.lat2 = v * D2R;
      },
      lat_ts: function(v) {
        self.lat_ts = v * D2R;
      },
      lon_0: function(v) {
        self.long0 = v * D2R;
      },
      lon_1: function(v) {
        self.long1 = v * D2R;
      },
      lon_2: function(v) {
        self.long2 = v * D2R;
      },
      alpha: function(v) {
        self.alpha = parseFloat(v) * D2R;
      },
      lonc: function(v) {
        self.longc = v * D2R;
      },
      x_0: function(v) {
        self.x0 = parseFloat(v);
      },
      y_0: function(v) {
        self.y0 = parseFloat(v);
      },
      k_0: function(v) {
        self.k0 = parseFloat(v);
      },
      k: function(v) {
        self.k0 = parseFloat(v);
      },
      a: function(v) {
        self.a = parseFloat(v);
      },
      b: function(v) {
        self.b = parseFloat(v);
      },
      r_a: function() {
        self.R_A = true;
      },
      zone: function(v) {
        self.zone = parseInt(v, 10);
      },
      south: function() {
        self.utmSouth = true;
      },
      towgs84: function(v) {
        self.datum_params = v.split(",").map(function(a) {
          return parseFloat(a);
        });
      },
      to_meter: function(v) {
        self.to_meter = parseFloat(v);
      },
      units: function(v) {
        self.units = v;
        var unit = match(units, v);
        if (unit) {
          self.to_meter = unit.to_meter;
        }
      },
      from_greenwich: function(v) {
        self.from_greenwich = v * D2R;
      },
      pm: function(v) {
        var pm = match(exports$1, v);
        self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R;
      },
      nadgrids: function(v) {
        if (v === '@null') {
          self.datumCode = 'none';
        }
        else {
          self.nadgrids = v;
        }
      },
      axis: function(v) {
        var legalAxis = "ewnsud";
        if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
          self.axis = v;
        }
      }
    };
    for (paramName in paramObj) {
      paramVal = paramObj[paramName];
      if (paramName in params) {
        paramOutname = params[paramName];
        if (typeof paramOutname === 'function') {
          paramOutname(paramVal);
        }
        else {
          self[paramOutname] = paramVal;
        }
      }
      else {
        self[paramName] = paramVal;
      }
    }
    if(typeof self.datumCode === 'string' && self.datumCode !== "WGS84"){
      self.datumCode = self.datumCode.toLowerCase();
    }
    return self;
  }

  var NEUTRAL = 1;
  var KEYWORD = 2;
  var NUMBER = 3;
  var QUOTED = 4;
  var AFTERQUOTE = 5;
  var ENDED = -1;
  var whitespace = /\s/;
  var latin = /[A-Za-z]/;
  var keyword = /[A-Za-z84]/;
  var endThings = /[,\]]/;
  var digets = /[\d\.E\-\+]/;
  // const ignoredChar = /[\s_\-\/\(\)]/g;
  function Parser(text) {
    if (typeof text !== 'string') {
      throw new Error('not a string');
    }
    this.text = text.trim();
    this.level = 0;
    this.place = 0;
    this.root = null;
    this.stack = [];
    this.currentObject = null;
    this.state = NEUTRAL;
  }
  Parser.prototype.readCharicter = function() {
    var char = this.text[this.place++];
    if (this.state !== QUOTED) {
      while (whitespace.test(char)) {
        if (this.place >= this.text.length) {
          return;
        }
        char = this.text[this.place++];
      }
    }
    switch (this.state) {
      case NEUTRAL:
        return this.neutral(char);
      case KEYWORD:
        return this.keyword(char)
      case QUOTED:
        return this.quoted(char);
      case AFTERQUOTE:
        return this.afterquote(char);
      case NUMBER:
        return this.number(char);
      case ENDED:
        return;
    }
  };
  Parser.prototype.afterquote = function(char) {
    if (char === '"') {
      this.word += '"';
      this.state = QUOTED;
      return;
    }
    if (endThings.test(char)) {
      this.word = this.word.trim();
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in afterquote yet, index ' + this.place);
  };
  Parser.prototype.afterItem = function(char) {
    if (char === ',') {
      if (this.word !== null) {
        this.currentObject.push(this.word);
      }
      this.word = null;
      this.state = NEUTRAL;
      return;
    }
    if (char === ']') {
      this.level--;
      if (this.word !== null) {
        this.currentObject.push(this.word);
        this.word = null;
      }
      this.state = NEUTRAL;
      this.currentObject = this.stack.pop();
      if (!this.currentObject) {
        this.state = ENDED;
      }

      return;
    }
  };
  Parser.prototype.number = function(char) {
    if (digets.test(char)) {
      this.word += char;
      return;
    }
    if (endThings.test(char)) {
      this.word = parseFloat(this.word);
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in number yet, index ' + this.place);
  };
  Parser.prototype.quoted = function(char) {
    if (char === '"') {
      this.state = AFTERQUOTE;
      return;
    }
    this.word += char;
    return;
  };
  Parser.prototype.keyword = function(char) {
    if (keyword.test(char)) {
      this.word += char;
      return;
    }
    if (char === '[') {
      var newObjects = [];
      newObjects.push(this.word);
      this.level++;
      if (this.root === null) {
        this.root = newObjects;
      } else {
        this.currentObject.push(newObjects);
      }
      this.stack.push(this.currentObject);
      this.currentObject = newObjects;
      this.state = NEUTRAL;
      return;
    }
    if (endThings.test(char)) {
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in keyword yet, index ' + this.place);
  };
  Parser.prototype.neutral = function(char) {
    if (latin.test(char)) {
      this.word = char;
      this.state = KEYWORD;
      return;
    }
    if (char === '"') {
      this.word = '';
      this.state = QUOTED;
      return;
    }
    if (digets.test(char)) {
      this.word = char;
      this.state = NUMBER;
      return;
    }
    if (endThings.test(char)) {
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in neutral yet, index ' + this.place);
  };
  Parser.prototype.output = function() {
    while (this.place < this.text.length) {
      this.readCharicter();
    }
    if (this.state === ENDED) {
      return this.root;
    }
    throw new Error('unable to parse string "' +this.text + '". State is ' + this.state);
  };

  function parseString(txt) {
    var parser = new Parser(txt);
    return parser.output();
  }

  function mapit(obj, key, value) {
    if (Array.isArray(key)) {
      value.unshift(key);
      key = null;
    }
    var thing = key ? {} : obj;

    var out = value.reduce(function(newObj, item) {
      sExpr(item, newObj);
      return newObj
    }, thing);
    if (key) {
      obj[key] = out;
    }
  }

  function sExpr(v, obj) {
    if (!Array.isArray(v)) {
      obj[v] = true;
      return;
    }
    var key = v.shift();
    if (key === 'PARAMETER') {
      key = v.shift();
    }
    if (v.length === 1) {
      if (Array.isArray(v[0])) {
        obj[key] = {};
        sExpr(v[0], obj[key]);
        return;
      }
      obj[key] = v[0];
      return;
    }
    if (!v.length) {
      obj[key] = true;
      return;
    }
    if (key === 'TOWGS84') {
      obj[key] = v;
      return;
    }
    if (key === 'AXIS') {
      if (!(key in obj)) {
        obj[key] = [];
      }
      obj[key].push(v);
      return;
    }
    if (!Array.isArray(key)) {
      obj[key] = {};
    }

    var i;
    switch (key) {
      case 'UNIT':
      case 'PRIMEM':
      case 'VERT_DATUM':
        obj[key] = {
          name: v[0].toLowerCase(),
          convert: v[1]
        };
        if (v.length === 3) {
          sExpr(v[2], obj[key]);
        }
        return;
      case 'SPHEROID':
      case 'ELLIPSOID':
        obj[key] = {
          name: v[0],
          a: v[1],
          rf: v[2]
        };
        if (v.length === 4) {
          sExpr(v[3], obj[key]);
        }
        return;
      case 'PROJECTEDCRS':
      case 'PROJCRS':
      case 'GEOGCS':
      case 'GEOCCS':
      case 'PROJCS':
      case 'LOCAL_CS':
      case 'GEODCRS':
      case 'GEODETICCRS':
      case 'GEODETICDATUM':
      case 'EDATUM':
      case 'ENGINEERINGDATUM':
      case 'VERT_CS':
      case 'VERTCRS':
      case 'VERTICALCRS':
      case 'COMPD_CS':
      case 'COMPOUNDCRS':
      case 'ENGINEERINGCRS':
      case 'ENGCRS':
      case 'FITTED_CS':
      case 'LOCAL_DATUM':
      case 'DATUM':
        v[0] = ['name', v[0]];
        mapit(obj, key, v);
        return;
      default:
        i = -1;
        while (++i < v.length) {
          if (!Array.isArray(v[i])) {
            return sExpr(v, obj[key]);
          }
        }
        return mapit(obj, key, v);
    }
  }

  var D2R$1 = 0.01745329251994329577;



  function rename(obj, params) {
    var outName = params[0];
    var inName = params[1];
    if (!(outName in obj) && (inName in obj)) {
      obj[outName] = obj[inName];
      if (params.length === 3) {
        obj[outName] = params[2](obj[outName]);
      }
    }
  }

  function d2r(input) {
    return input * D2R$1;
  }

  function cleanWKT(wkt) {
    if (wkt.type === 'GEOGCS') {
      wkt.projName = 'longlat';
    } else if (wkt.type === 'LOCAL_CS') {
      wkt.projName = 'identity';
      wkt.local = true;
    } else {
      if (typeof wkt.PROJECTION === 'object') {
        wkt.projName = Object.keys(wkt.PROJECTION)[0];
      } else {
        wkt.projName = wkt.PROJECTION;
      }
    }
    if (wkt.AXIS) {
      var axisOrder = '';
      for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
        var axis = wkt.AXIS[i];
        var descriptor = axis[0].toLowerCase();
        if (descriptor.indexOf('north') !== -1) {
          axisOrder += 'n';
        } else if (descriptor.indexOf('south') !== -1) {
          axisOrder += 's';
        } else if (descriptor.indexOf('east') !== -1) {
          axisOrder += 'e';
        } else if (descriptor.indexOf('west') !== -1) {
          axisOrder += 'w';
        }
      }
      if (axisOrder.length === 2) {
        axisOrder += 'u';
      }
      if (axisOrder.length === 3) {
        wkt.axis = axisOrder;
      }
    }
    if (wkt.UNIT) {
      wkt.units = wkt.UNIT.name.toLowerCase();
      if (wkt.units === 'metre') {
        wkt.units = 'meter';
      }
      if (wkt.UNIT.convert) {
        if (wkt.type === 'GEOGCS') {
          if (wkt.DATUM && wkt.DATUM.SPHEROID) {
            wkt.to_meter = wkt.UNIT.convert*wkt.DATUM.SPHEROID.a;
          }
        } else {
          wkt.to_meter = wkt.UNIT.convert;
        }
      }
    }
    var geogcs = wkt.GEOGCS;
    if (wkt.type === 'GEOGCS') {
      geogcs = wkt;
    }
    if (geogcs) {
      //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
      //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
      //}
      if (geogcs.DATUM) {
        wkt.datumCode = geogcs.DATUM.name.toLowerCase();
      } else {
        wkt.datumCode = geogcs.name.toLowerCase();
      }
      if (wkt.datumCode.slice(0, 2) === 'd_') {
        wkt.datumCode = wkt.datumCode.slice(2);
      }
      if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
        wkt.datumCode = 'nzgd49';
      }
      if (wkt.datumCode === 'wgs_1984' || wkt.datumCode === 'world_geodetic_system_1984') {
        if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
          wkt.sphere = true;
        }
        wkt.datumCode = 'wgs84';
      }
      if (wkt.datumCode.slice(-6) === '_ferro') {
        wkt.datumCode = wkt.datumCode.slice(0, - 6);
      }
      if (wkt.datumCode.slice(-8) === '_jakarta') {
        wkt.datumCode = wkt.datumCode.slice(0, - 8);
      }
      if (~wkt.datumCode.indexOf('belge')) {
        wkt.datumCode = 'rnb72';
      }
      if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
        wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
        if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {
          wkt.ellps = 'intl';
        }

        wkt.a = geogcs.DATUM.SPHEROID.a;
        wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
      }

      if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
        wkt.datum_params = geogcs.DATUM.TOWGS84;
      }
      if (~wkt.datumCode.indexOf('osgb_1936')) {
        wkt.datumCode = 'osgb36';
      }
      if (~wkt.datumCode.indexOf('osni_1952')) {
        wkt.datumCode = 'osni52';
      }
      if (~wkt.datumCode.indexOf('tm65')
        || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
        wkt.datumCode = 'ire65';
      }
      if (wkt.datumCode === 'ch1903+') {
        wkt.datumCode = 'ch1903';
      }
      if (~wkt.datumCode.indexOf('israel')) {
        wkt.datumCode = 'isr93';
      }
    }
    if (wkt.b && !isFinite(wkt.b)) {
      wkt.b = wkt.a;
    }

    function toMeter(input) {
      var ratio = wkt.to_meter || 1;
      return input * ratio;
    }
    var renamer = function(a) {
      return rename(wkt, a);
    };
    var list = [
      ['standard_parallel_1', 'Standard_Parallel_1'],
      ['standard_parallel_2', 'Standard_Parallel_2'],
      ['false_easting', 'False_Easting'],
      ['false_northing', 'False_Northing'],
      ['central_meridian', 'Central_Meridian'],
      ['latitude_of_origin', 'Latitude_Of_Origin'],
      ['latitude_of_origin', 'Central_Parallel'],
      ['scale_factor', 'Scale_Factor'],
      ['k0', 'scale_factor'],
      ['latitude_of_center', 'Latitude_Of_Center'],
      ['latitude_of_center', 'Latitude_of_center'],
      ['lat0', 'latitude_of_center', d2r],
      ['longitude_of_center', 'Longitude_Of_Center'],
      ['longitude_of_center', 'Longitude_of_center'],
      ['longc', 'longitude_of_center', d2r],
      ['x0', 'false_easting', toMeter],
      ['y0', 'false_northing', toMeter],
      ['long0', 'central_meridian', d2r],
      ['lat0', 'latitude_of_origin', d2r],
      ['lat0', 'standard_parallel_1', d2r],
      ['lat1', 'standard_parallel_1', d2r],
      ['lat2', 'standard_parallel_2', d2r],
      ['azimuth', 'Azimuth'],
      ['alpha', 'azimuth', d2r],
      ['srsCode', 'name']
    ];
    list.forEach(renamer);
    if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {
      wkt.long0 = wkt.longc;
    }
    if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {
      wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
      wkt.lat_ts = wkt.lat1;
    }
  }
  function wkt(wkt) {
    var lisp = parseString(wkt);
    var type = lisp.shift();
    var name = lisp.shift();
    lisp.unshift(['name', name]);
    lisp.unshift(['type', type]);
    var obj = {};
    sExpr(lisp, obj);
    cleanWKT(obj);
    return obj;
  }

  function defs(name) {
    /*global console*/
    var that = this;
    if (arguments.length === 2) {
      var def = arguments[1];
      if (typeof def === 'string') {
        if (def.charAt(0) === '+') {
          defs[name] = projStr(arguments[1]);
        }
        else {
          defs[name] = wkt(arguments[1]);
        }
      } else {
        defs[name] = def;
      }
    }
    else if (arguments.length === 1) {
      if (Array.isArray(name)) {
        return name.map(function(v) {
          if (Array.isArray(v)) {
            defs.apply(that, v);
          }
          else {
            defs(v);
          }
        });
      }
      else if (typeof name === 'string') {
        if (name in defs) {
          return defs[name];
        }
      }
      else if ('EPSG' in name) {
        defs['EPSG:' + name.EPSG] = name;
      }
      else if ('ESRI' in name) {
        defs['ESRI:' + name.ESRI] = name;
      }
      else if ('IAU2000' in name) {
        defs['IAU2000:' + name.IAU2000] = name;
      }
      else {
        console.log(name);
      }
      return;
    }


  }
  globals(defs);

  function testObj(code){
    return typeof code === 'string';
  }
  function testDef(code){
    return code in defs;
  }
   var codeWords = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS','GEOCCS','PROJCS','LOCAL_CS', 'GEODCRS', 'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];
  function testWKT(code){
    return codeWords.some(function (word) {
      return code.indexOf(word) > -1;
    });
  }
  var codes = ['3857', '900913', '3785', '102113'];
  function checkMercator(item) {
    var auth = match(item, 'authority');
    if (!auth) {
      return;
    }
    var code = match(auth, 'epsg');
    return code && codes.indexOf(code) > -1;
  }
  function checkProjStr(item) {
    var ext = match(item, 'extension');
    if (!ext) {
      return;
    }
    return match(ext, 'proj4');
  }
  function testProj(code){
    return code[0] === '+';
  }
  function parse(code){
    if (testObj(code)) {
      //check to see if this is a WKT string
      if (testDef(code)) {
        return defs[code];
      }
      if (testWKT(code)) {
        var out = wkt(code);
        // test of spetial case, due to this being a very common and often malformed
        if (checkMercator(out)) {
          return defs['EPSG:3857'];
        }
        var maybeProjStr = checkProjStr(out);
        if (maybeProjStr) {
          return projStr(maybeProjStr);
        }
        return out;
      }
      if (testProj(code)) {
        return projStr(code);
      }
    }else {
      return code;
    }
  }

  function extend$1(destination, source) {
    destination = destination || {};
    var value, property;
    if (!source) {
      return destination;
    }
    for (property in source) {
      value = source[property];
      if (value !== undefined) {
        destination[property] = value;
      }
    }
    return destination;
  }

  function msfnz(eccent, sinphi, cosphi) {
    var con = eccent * sinphi;
    return cosphi / (Math.sqrt(1 - con * con));
  }

  function sign(x) {
    return x<0 ? -1 : 1;
  }

  function adjust_lon(x) {
    return (Math.abs(x) <= SPI) ? x : (x - (sign(x) * TWO_PI));
  }

  function tsfnz(eccent, phi, sinphi) {
    var con = eccent * sinphi;
    var com = 0.5 * eccent;
    con = Math.pow(((1 - con) / (1 + con)), com);
    return (Math.tan(0.5 * (HALF_PI - phi)) / con);
  }

  function phi2z(eccent, ts) {
    var eccnth = 0.5 * eccent;
    var con, dphi;
    var phi = HALF_PI - 2 * Math.atan(ts);
    for (var i = 0; i <= 15; i++) {
      con = eccent * Math.sin(phi);
      dphi = HALF_PI - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
      phi += dphi;
      if (Math.abs(dphi) <= 0.0000000001) {
        return phi;
      }
    }
    //console.log("phi2z has NoConvergence");
    return -9999;
  }

  function init() {
    var con = this.b / this.a;
    this.es = 1 - con * con;
    if(!('x0' in this)){
      this.x0 = 0;
    }
    if(!('y0' in this)){
      this.y0 = 0;
    }
    this.e = Math.sqrt(this.es);
    if (this.lat_ts) {
      if (this.sphere) {
        this.k0 = Math.cos(this.lat_ts);
      }
      else {
        this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
      }
    }
    else {
      if (!this.k0) {
        if (this.k) {
          this.k0 = this.k;
        }
        else {
          this.k0 = 1;
        }
      }
    }
  }

  /* Mercator forward equations--mapping lat,long to x,y
    --------------------------------------------------*/

  function forward(p) {
    var lon = p.x;
    var lat = p.y;
    // convert to radians
    if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
      return null;
    }

    var x, y;
    if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
      return null;
    }
    else {
      if (this.sphere) {
        x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
        y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
      }
      else {
        var sinphi = Math.sin(lat);
        var ts = tsfnz(this.e, lat, sinphi);
        x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
        y = this.y0 - this.a * this.k0 * Math.log(ts);
      }
      p.x = x;
      p.y = y;
      return p;
    }
  }

  /* Mercator inverse equations--mapping x,y to lat/long
    --------------------------------------------------*/
  function inverse(p) {

    var x = p.x - this.x0;
    var y = p.y - this.y0;
    var lon, lat;

    if (this.sphere) {
      lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
    }
    else {
      var ts = Math.exp(-y / (this.a * this.k0));
      lat = phi2z(this.e, ts);
      if (lat === -9999) {
        return null;
      }
    }
    lon = adjust_lon(this.long0 + x / (this.a * this.k0));

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
  var merc = {
    init: init,
    forward: forward,
    inverse: inverse,
    names: names
  };

  function init$1() {
    //no-op for longlat
  }

  function identity(pt) {
    return pt;
  }
  var names$1 = ["longlat", "identity"];
  var longlat = {
    init: init$1,
    forward: identity,
    inverse: identity,
    names: names$1
  };

  var projs = [merc, longlat];
  var names$2 = {};
  var projStore = [];

  function add(proj, i) {
    var len = projStore.length;
    if (!proj.names) {
      console.log(i);
      return true;
    }
    projStore[len] = proj;
    proj.names.forEach(function(n) {
      names$2[n.toLowerCase()] = len;
    });
    return this;
  }

  function get$1(name) {
    if (!name) {
      return false;
    }
    var n = name.toLowerCase();
    if (typeof names$2[n] !== 'undefined' && projStore[names$2[n]]) {
      return projStore[names$2[n]];
    }
  }

  function start() {
    projs.forEach(add);
  }
  var projections = {
    start: start,
    add: add,
    get: get$1
  };

  var exports$2 = {};
  exports$2.MERIT = {
    a: 6378137.0,
    rf: 298.257,
    ellipseName: "MERIT 1983"
  };

  exports$2.SGS85 = {
    a: 6378136.0,
    rf: 298.257,
    ellipseName: "Soviet Geodetic System 85"
  };

  exports$2.GRS80 = {
    a: 6378137.0,
    rf: 298.257222101,
    ellipseName: "GRS 1980(IUGG, 1980)"
  };

  exports$2.IAU76 = {
    a: 6378140.0,
    rf: 298.257,
    ellipseName: "IAU 1976"
  };

  exports$2.airy = {
    a: 6377563.396,
    b: 6356256.910,
    ellipseName: "Airy 1830"
  };

  exports$2.APL4 = {
    a: 6378137,
    rf: 298.25,
    ellipseName: "Appl. Physics. 1965"
  };

  exports$2.NWL9D = {
    a: 6378145.0,
    rf: 298.25,
    ellipseName: "Naval Weapons Lab., 1965"
  };

  exports$2.mod_airy = {
    a: 6377340.189,
    b: 6356034.446,
    ellipseName: "Modified Airy"
  };

  exports$2.andrae = {
    a: 6377104.43,
    rf: 300.0,
    ellipseName: "Andrae 1876 (Den., Iclnd.)"
  };

  exports$2.aust_SA = {
    a: 6378160.0,
    rf: 298.25,
    ellipseName: "Australian Natl & S. Amer. 1969"
  };

  exports$2.GRS67 = {
    a: 6378160.0,
    rf: 298.2471674270,
    ellipseName: "GRS 67(IUGG 1967)"
  };

  exports$2.bessel = {
    a: 6377397.155,
    rf: 299.1528128,
    ellipseName: "Bessel 1841"
  };

  exports$2.bess_nam = {
    a: 6377483.865,
    rf: 299.1528128,
    ellipseName: "Bessel 1841 (Namibia)"
  };

  exports$2.clrk66 = {
    a: 6378206.4,
    b: 6356583.8,
    ellipseName: "Clarke 1866"
  };

  exports$2.clrk80 = {
    a: 6378249.145,
    rf: 293.4663,
    ellipseName: "Clarke 1880 mod."
  };

  exports$2.clrk58 = {
    a: 6378293.645208759,
    rf: 294.2606763692654,
    ellipseName: "Clarke 1858"
  };

  exports$2.CPM = {
    a: 6375738.7,
    rf: 334.29,
    ellipseName: "Comm. des Poids et Mesures 1799"
  };

  exports$2.delmbr = {
    a: 6376428.0,
    rf: 311.5,
    ellipseName: "Delambre 1810 (Belgium)"
  };

  exports$2.engelis = {
    a: 6378136.05,
    rf: 298.2566,
    ellipseName: "Engelis 1985"
  };

  exports$2.evrst30 = {
    a: 6377276.345,
    rf: 300.8017,
    ellipseName: "Everest 1830"
  };

  exports$2.evrst48 = {
    a: 6377304.063,
    rf: 300.8017,
    ellipseName: "Everest 1948"
  };

  exports$2.evrst56 = {
    a: 6377301.243,
    rf: 300.8017,
    ellipseName: "Everest 1956"
  };

  exports$2.evrst69 = {
    a: 6377295.664,
    rf: 300.8017,
    ellipseName: "Everest 1969"
  };

  exports$2.evrstSS = {
    a: 6377298.556,
    rf: 300.8017,
    ellipseName: "Everest (Sabah & Sarawak)"
  };

  exports$2.fschr60 = {
    a: 6378166.0,
    rf: 298.3,
    ellipseName: "Fischer (Mercury Datum) 1960"
  };

  exports$2.fschr60m = {
    a: 6378155.0,
    rf: 298.3,
    ellipseName: "Fischer 1960"
  };

  exports$2.fschr68 = {
    a: 6378150.0,
    rf: 298.3,
    ellipseName: "Fischer 1968"
  };

  exports$2.helmert = {
    a: 6378200.0,
    rf: 298.3,
    ellipseName: "Helmert 1906"
  };

  exports$2.hough = {
    a: 6378270.0,
    rf: 297.0,
    ellipseName: "Hough"
  };

  exports$2.intl = {
    a: 6378388.0,
    rf: 297.0,
    ellipseName: "International 1909 (Hayford)"
  };

  exports$2.kaula = {
    a: 6378163.0,
    rf: 298.24,
    ellipseName: "Kaula 1961"
  };

  exports$2.lerch = {
    a: 6378139.0,
    rf: 298.257,
    ellipseName: "Lerch 1979"
  };

  exports$2.mprts = {
    a: 6397300.0,
    rf: 191.0,
    ellipseName: "Maupertius 1738"
  };

  exports$2.new_intl = {
    a: 6378157.5,
    b: 6356772.2,
    ellipseName: "New International 1967"
  };

  exports$2.plessis = {
    a: 6376523.0,
    rf: 6355863.0,
    ellipseName: "Plessis 1817 (France)"
  };

  exports$2.krass = {
    a: 6378245.0,
    rf: 298.3,
    ellipseName: "Krassovsky, 1942"
  };

  exports$2.SEasia = {
    a: 6378155.0,
    b: 6356773.3205,
    ellipseName: "Southeast Asia"
  };

  exports$2.walbeck = {
    a: 6376896.0,
    b: 6355834.8467,
    ellipseName: "Walbeck"
  };

  exports$2.WGS60 = {
    a: 6378165.0,
    rf: 298.3,
    ellipseName: "WGS 60"
  };

  exports$2.WGS66 = {
    a: 6378145.0,
    rf: 298.25,
    ellipseName: "WGS 66"
  };

  exports$2.WGS7 = {
    a: 6378135.0,
    rf: 298.26,
    ellipseName: "WGS 72"
  };

  var WGS84 = exports$2.WGS84 = {
    a: 6378137.0,
    rf: 298.257223563,
    ellipseName: "WGS 84"
  };

  exports$2.sphere = {
    a: 6370997.0,
    b: 6370997.0,
    ellipseName: "Normal Sphere (r=6370997)"
  };

  function eccentricity(a, b, rf, R_A) {
    var a2 = a * a; // used in geocentric
    var b2 = b * b; // used in geocentric
    var es = (a2 - b2) / a2; // e ^ 2
    var e = 0;
    if (R_A) {
      a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
      a2 = a * a;
      es = 0;
    } else {
      e = Math.sqrt(es); // eccentricity
    }
    var ep2 = (a2 - b2) / b2; // used in geocentric
    return {
      es: es,
      e: e,
      ep2: ep2
    };
  }
  function sphere(a, b, rf, ellps, sphere) {
    if (!a) { // do we have an ellipsoid?
      var ellipse = match(exports$2, ellps);
      if (!ellipse) {
        ellipse = WGS84;
      }
      a = ellipse.a;
      b = ellipse.b;
      rf = ellipse.rf;
    }

    if (rf && !b) {
      b = (1.0 - 1.0 / rf) * a;
    }
    if (rf === 0 || Math.abs(a - b) < EPSLN) {
      sphere = true;
      b = a;
    }
    return {
      a: a,
      b: b,
      rf: rf,
      sphere: sphere
    };
  }

  var exports$3 = {};
  exports$3.wgs84 = {
    towgs84: "0,0,0",
    ellipse: "WGS84",
    datumName: "WGS84"
  };

  exports$3.ch1903 = {
    towgs84: "674.374,15.056,405.346",
    ellipse: "bessel",
    datumName: "swiss"
  };

  exports$3.ggrs87 = {
    towgs84: "-199.87,74.79,246.62",
    ellipse: "GRS80",
    datumName: "Greek_Geodetic_Reference_System_1987"
  };

  exports$3.nad83 = {
    towgs84: "0,0,0",
    ellipse: "GRS80",
    datumName: "North_American_Datum_1983"
  };

  exports$3.nad27 = {
    nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
    ellipse: "clrk66",
    datumName: "North_American_Datum_1927"
  };

  exports$3.potsdam = {
    towgs84: "606.0,23.0,413.0",
    ellipse: "bessel",
    datumName: "Potsdam Rauenberg 1950 DHDN"
  };

  exports$3.carthage = {
    towgs84: "-263.0,6.0,431.0",
    ellipse: "clark80",
    datumName: "Carthage 1934 Tunisia"
  };

  exports$3.hermannskogel = {
    towgs84: "653.0,-212.0,449.0",
    ellipse: "bessel",
    datumName: "Hermannskogel"
  };

  exports$3.osni52 = {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "airy",
    datumName: "Irish National"
  };

  exports$3.ire65 = {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "mod_airy",
    datumName: "Ireland 1965"
  };

  exports$3.rassadiran = {
    towgs84: "-133.63,-157.5,-158.62",
    ellipse: "intl",
    datumName: "Rassadiran"
  };

  exports$3.nzgd49 = {
    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
    ellipse: "intl",
    datumName: "New Zealand Geodetic Datum 1949"
  };

  exports$3.osgb36 = {
    towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
    ellipse: "airy",
    datumName: "Airy 1830"
  };

  exports$3.s_jtsk = {
    towgs84: "589,76,480",
    ellipse: 'bessel',
    datumName: 'S-JTSK (Ferro)'
  };

  exports$3.beduaram = {
    towgs84: '-106,-87,188',
    ellipse: 'clrk80',
    datumName: 'Beduaram'
  };

  exports$3.gunung_segara = {
    towgs84: '-403,684,41',
    ellipse: 'bessel',
    datumName: 'Gunung Segara Jakarta'
  };

  exports$3.rnb72 = {
    towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
    ellipse: "intl",
    datumName: "Reseau National Belge 1972"
  };

  function datum(datumCode, datum_params, a, b, es, ep2) {
    var out = {};

    if (datumCode === undefined || datumCode === 'none') {
      out.datum_type = PJD_NODATUM;
    } else {
      out.datum_type = PJD_WGS84;
    }

    if (datum_params) {
      out.datum_params = datum_params.map(parseFloat);
      if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
        out.datum_type = PJD_3PARAM;
      }
      if (out.datum_params.length > 3) {
        if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
          out.datum_type = PJD_7PARAM;
          out.datum_params[3] *= SEC_TO_RAD;
          out.datum_params[4] *= SEC_TO_RAD;
          out.datum_params[5] *= SEC_TO_RAD;
          out.datum_params[6] = (out.datum_params[6] / 1000000.0) + 1.0;
        }
      }
    }

    out.a = a; //datum object also uses these values
    out.b = b;
    out.es = es;
    out.ep2 = ep2;
    return out;
  }

  function Projection(srsCode,callback) {
    if (!(this instanceof Projection)) {
      return new Projection(srsCode);
    }
    callback = callback || function(error){
      if(error){
        throw error;
      }
    };
    var json = parse(srsCode);
    if(typeof json !== 'object'){
      callback(srsCode);
      return;
    }
    var ourProj = Projection.projections.get(json.projName);
    if(!ourProj){
      callback(srsCode);
      return;
    }
    if (json.datumCode && json.datumCode !== 'none') {
      var datumDef = match(exports$3, json.datumCode);
      if (datumDef) {
        json.datum_params = datumDef.towgs84 ? datumDef.towgs84.split(',') : null;
        json.ellps = datumDef.ellipse;
        json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
      }
    }
    json.k0 = json.k0 || 1.0;
    json.axis = json.axis || 'enu';
    json.ellps = json.ellps || 'wgs84';
    var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
    var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
    var datumObj = json.datum || datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2);

    extend$1(this, json); // transfer everything over from the projection because we don't know what we'll need
    extend$1(this, ourProj); // transfer all the methods from the projection

    // copy the 4 things over we calulated in deriveConstants.sphere
    this.a = sphere_.a;
    this.b = sphere_.b;
    this.rf = sphere_.rf;
    this.sphere = sphere_.sphere;

    // copy the 3 things we calculated in deriveConstants.eccentricity
    this.es = ecc.es;
    this.e = ecc.e;
    this.ep2 = ecc.ep2;

    // add in the datum object
    this.datum = datumObj;

    // init the projection
    this.init();

    // legecy callback from back in the day when it went to spatialreference.org
    callback(null, this);

  }
  Projection.projections = projections;
  Projection.projections.start();

  function compareDatums(source, dest) {
    if (source.datum_type !== dest.datum_type) {
      return false; // false, datums are not equal
    } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
      // the tolerance for es is to ensure that GRS80 and WGS84
      // are considered identical
      return false;
    } else if (source.datum_type === PJD_3PARAM) {
      return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2]);
    } else if (source.datum_type === PJD_7PARAM) {
      return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6]);
    } else {
      return true; // datums are equal
    }
  } // cs_compare_datums()

  /*
   * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
   * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
   * according to the current ellipsoid parameters.
   *
   *    Latitude  : Geodetic latitude in radians                     (input)
   *    Longitude : Geodetic longitude in radians                    (input)
   *    Height    : Geodetic height, in meters                       (input)
   *    X         : Calculated Geocentric X coordinate, in meters    (output)
   *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
   *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
   *
   */
  function geodeticToGeocentric(p, es, a) {
    var Longitude = p.x;
    var Latitude = p.y;
    var Height = p.z ? p.z : 0; //Z value not always supplied

    var Rn; /*  Earth radius at location  */
    var Sin_Lat; /*  Math.sin(Latitude)  */
    var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
    var Cos_Lat; /*  Math.cos(Latitude)  */

    /*
     ** Don't blow up if Latitude is just a little out of the value
     ** range as it may just be a rounding issue.  Also removed longitude
     ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
     */
    if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
      Latitude = -HALF_PI;
    } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
      Latitude = HALF_PI;
    } else if (Latitude < -HALF_PI) {
      /* Latitude out of range */
      //..reportError('geocent:lat out of range:' + Latitude);
      return { x: -Infinity, y: -Infinity, z: p.z };
    } else if (Latitude > HALF_PI) {
      /* Latitude out of range */
      return { x: Infinity, y: Infinity, z: p.z };
    }

    if (Longitude > Math.PI) {
      Longitude -= (2 * Math.PI);
    }
    Sin_Lat = Math.sin(Latitude);
    Cos_Lat = Math.cos(Latitude);
    Sin2_Lat = Sin_Lat * Sin_Lat;
    Rn = a / (Math.sqrt(1.0e0 - es * Sin2_Lat));
    return {
      x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
      y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
      z: ((Rn * (1 - es)) + Height) * Sin_Lat
    };
  } // cs_geodetic_to_geocentric()

  function geocentricToGeodetic(p, es, a, b) {
    /* local defintions and variables */
    /* end-criterium of loop, accuracy of sin(Latitude) */
    var genau = 1e-12;
    var genau2 = (genau * genau);
    var maxiter = 30;

    var P; /* distance between semi-minor axis and location */
    var RR; /* distance between center and location */
    var CT; /* sin of geocentric latitude */
    var ST; /* cos of geocentric latitude */
    var RX;
    var RK;
    var RN; /* Earth radius at location */
    var CPHI0; /* cos of start or old geodetic latitude in iterations */
    var SPHI0; /* sin of start or old geodetic latitude in iterations */
    var CPHI; /* cos of searched geodetic latitude */
    var SPHI; /* sin of searched geodetic latitude */
    var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
    var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

    var X = p.x;
    var Y = p.y;
    var Z = p.z ? p.z : 0.0; //Z value not always supplied
    var Longitude;
    var Latitude;
    var Height;

    P = Math.sqrt(X * X + Y * Y);
    RR = Math.sqrt(X * X + Y * Y + Z * Z);

    /*      special cases for latitude and longitude */
    if (P / a < genau) {

      /*  special case, if P=0. (X=0., Y=0.) */
      Longitude = 0.0;

      /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
       *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
      if (RR / a < genau) {
        Latitude = HALF_PI;
        Height = -b;
        return {
          x: p.x,
          y: p.y,
          z: p.z
        };
      }
    } else {
      /*  ellipsoidal (geodetic) longitude
       *  interval: -PI < Longitude <= +PI */
      Longitude = Math.atan2(Y, X);
    }

    /* --------------------------------------------------------------
     * Following iterative algorithm was developped by
     * "Institut for Erdmessung", University of Hannover, July 1988.
     * Internet: www.ife.uni-hannover.de
     * Iterative computation of CPHI,SPHI and Height.
     * Iteration of CPHI and SPHI to 10**-12 radian resp.
     * 2*10**-7 arcsec.
     * --------------------------------------------------------------
     */
    CT = Z / RR;
    ST = P / RR;
    RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST);
    CPHI0 = ST * (1.0 - es) * RX;
    SPHI0 = CT * RX;
    iter = 0;

    /* loop to find sin(Latitude) resp. Latitude
     * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
    do {
      iter++;
      RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0);

      /*  ellipsoidal (geodetic) height */
      Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0);

      RK = es * RN / (RN + Height);
      RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
      CPHI = ST * (1.0 - RK) * RX;
      SPHI = CT * RX;
      SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
      CPHI0 = CPHI;
      SPHI0 = SPHI;
    }
    while (SDPHI * SDPHI > genau2 && iter < maxiter);

    /*      ellipsoidal (geodetic) latitude */
    Latitude = Math.atan(SPHI / Math.abs(CPHI));
    return {
      x: Longitude,
      y: Latitude,
      z: Height
    };
  } // cs_geocentric_to_geodetic()

  /****************************************************************/
  // pj_geocentic_to_wgs84( p )
  //  p = point to transform in geocentric coordinates (x,y,z)


  /** point object, nothing fancy, just allows values to be
      passed back and forth by reference rather than by value.
      Other point classes may be used as long as they have
      x and y properties, which will get modified in the transform method.
  */
  function geocentricToWgs84(p, datum_type, datum_params) {

    if (datum_type === PJD_3PARAM) {
      // if( x[io] === HUGE_VAL )
      //    continue;
      return {
        x: p.x + datum_params[0],
        y: p.y + datum_params[1],
        z: p.z + datum_params[2],
      };
    } else if (datum_type === PJD_7PARAM) {
      var Dx_BF = datum_params[0];
      var Dy_BF = datum_params[1];
      var Dz_BF = datum_params[2];
      var Rx_BF = datum_params[3];
      var Ry_BF = datum_params[4];
      var Rz_BF = datum_params[5];
      var M_BF = datum_params[6];
      // if( x[io] === HUGE_VAL )
      //    continue;
      return {
        x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
        y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
        z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
      };
    }
  } // cs_geocentric_to_wgs84

  /****************************************************************/
  // pj_geocentic_from_wgs84()
  //  coordinate system definition,
  //  point to transform in geocentric coordinates (x,y,z)
  function geocentricFromWgs84(p, datum_type, datum_params) {

    if (datum_type === PJD_3PARAM) {
      //if( x[io] === HUGE_VAL )
      //    continue;
      return {
        x: p.x - datum_params[0],
        y: p.y - datum_params[1],
        z: p.z - datum_params[2],
      };

    } else if (datum_type === PJD_7PARAM) {
      var Dx_BF = datum_params[0];
      var Dy_BF = datum_params[1];
      var Dz_BF = datum_params[2];
      var Rx_BF = datum_params[3];
      var Ry_BF = datum_params[4];
      var Rz_BF = datum_params[5];
      var M_BF = datum_params[6];
      var x_tmp = (p.x - Dx_BF) / M_BF;
      var y_tmp = (p.y - Dy_BF) / M_BF;
      var z_tmp = (p.z - Dz_BF) / M_BF;
      //if( x[io] === HUGE_VAL )
      //    continue;

      return {
        x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
        y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
        z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
      };
    } //cs_geocentric_from_wgs84()
  }

  function checkParams(type) {
    return (type === PJD_3PARAM || type === PJD_7PARAM);
  }

  function datum_transform(source, dest, point) {
    // Short cut if the datums are identical.
    if (compareDatums(source, dest)) {
      return point; // in this case, zero is sucess,
      // whereas cs_compare_datums returns 1 to indicate TRUE
      // confusing, should fix this
    }

    // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
    if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
      return point;
    }

    // If this datum requires grid shifts, then apply it to geodetic coordinates.

    // Do we need to go through geocentric coordinates?
    if (source.es === dest.es && source.a === dest.a && !checkParams(source.datum_type) &&  !checkParams(dest.datum_type)) {
      return point;
    }

    // Convert to geocentric coordinates.
    point = geodeticToGeocentric(point, source.es, source.a);
    // Convert between datums
    if (checkParams(source.datum_type)) {
      point = geocentricToWgs84(point, source.datum_type, source.datum_params);
    }
    if (checkParams(dest.datum_type)) {
      point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
    }
    return geocentricToGeodetic(point, dest.es, dest.a, dest.b);

  }

  function adjust_axis(crs, denorm, point) {
    var xin = point.x,
      yin = point.y,
      zin = point.z || 0.0;
    var v, t, i;
    var out = {};
    for (i = 0; i < 3; i++) {
      if (denorm && i === 2 && point.z === undefined) {
        continue;
      }
      if (i === 0) {
        v = xin;
        if ("ew".indexOf(crs.axis[i]) !== -1) {
          t = 'x';
        } else {
          t = 'y';
        }

      }
      else if (i === 1) {
        v = yin;
        if ("ns".indexOf(crs.axis[i]) !== -1) {
          t = 'y';
        } else {
          t = 'x';
        }
      }
      else {
        v = zin;
        t = 'z';
      }
      switch (crs.axis[i]) {
      case 'e':
        out[t] = v;
        break;
      case 'w':
        out[t] = -v;
        break;
      case 'n':
        out[t] = v;
        break;
      case 's':
        out[t] = -v;
        break;
      case 'u':
        if (point[t] !== undefined) {
          out.z = v;
        }
        break;
      case 'd':
        if (point[t] !== undefined) {
          out.z = -v;
        }
        break;
      default:
        //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
        return null;
      }
    }
    return out;
  }

  function common (array){
    var out = {
      x: array[0],
      y: array[1]
    };
    if (array.length>2) {
      out.z = array[2];
    }
    if (array.length>3) {
      out.m = array[3];
    }
    return out;
  }

  function checkSanity (point) {
    checkCoord(point.x);
    checkCoord(point.y);
  }
  function checkCoord(num) {
    if (typeof Number.isFinite === 'function') {
      if (Number.isFinite(num)) {
        return;
      }
      throw new TypeError('coordinates must be finite numbers');
    }
    if (typeof num !== 'number' || num !== num || !isFinite(num)) {
      throw new TypeError('coordinates must be finite numbers');
    }
  }

  function checkNotWGS(source, dest) {
    return ((source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM) && dest.datumCode !== 'WGS84') || ((dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM) && source.datumCode !== 'WGS84');
  }

  function transform(source, dest, point) {
    var wgs84;
    if (Array.isArray(point)) {
      point = common(point);
    }
    checkSanity(point);
    // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
    if (source.datum && dest.datum && checkNotWGS(source, dest)) {
      wgs84 = new Projection('WGS84');
      point = transform(source, wgs84, point);
      source = wgs84;
    }
    // DGR, 2010/11/12
    if (source.axis !== 'enu') {
      point = adjust_axis(source, false, point);
    }
    // Transform source points to long/lat, if they aren't already.
    if (source.projName === 'longlat') {
      point = {
        x: point.x * D2R,
        y: point.y * D2R,
        z: point.z || 0
      };
    } else {
      if (source.to_meter) {
        point = {
          x: point.x * source.to_meter,
          y: point.y * source.to_meter,
          z: point.z || 0
        };
      }
      point = source.inverse(point); // Convert Cartesian to longlat
      if (!point) {
        return;
      }
    }
    // Adjust for the prime meridian if necessary
    if (source.from_greenwich) {
      point.x += source.from_greenwich;
    }

    // Convert datums if needed, and if possible.
    point = datum_transform(source.datum, dest.datum, point);

    // Adjust for the prime meridian if necessary
    if (dest.from_greenwich) {
      point = {
        x: point.x - dest.from_greenwich,
        y: point.y,
        z: point.z || 0
      };
    }

    if (dest.projName === 'longlat') {
      // convert radians to decimal degrees
      point = {
        x: point.x * R2D,
        y: point.y * R2D,
        z: point.z || 0
      };
    } else { // else project
      point = dest.forward(point);
      if (dest.to_meter) {
        point = {
          x: point.x / dest.to_meter,
          y: point.y / dest.to_meter,
          z: point.z || 0
        };
      }
    }

    // DGR, 2010/11/12
    if (dest.axis !== 'enu') {
      return adjust_axis(dest, true, point);
    }

    return point;
  }

  var wgs84 = Projection('WGS84');

  function transformer(from, to, coords) {
    var transformedArray, out, keys;
    if (Array.isArray(coords)) {
      transformedArray = transform(from, to, coords) || {x: NaN, y: NaN};
      if (coords.length > 2) {
        if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
          if (typeof transformedArray.z === 'number') {
            return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3));
          } else {
            return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3));
          }
        } else {
          return [transformedArray.x, transformedArray.y].concat(coords.splice(2));
        }
      } else {
        return [transformedArray.x, transformedArray.y];
      }
    } else {
      out = transform(from, to, coords);
      keys = Object.keys(coords);
      if (keys.length === 2) {
        return out;
      }
      keys.forEach(function (key) {
        if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
          if (key === 'x' || key === 'y' || key === 'z') {
            return;
          }
        } else {
          if (key === 'x' || key === 'y') {
            return;
          }
        }
        out[key] = coords[key];
      });
      return out;
    }
  }

  function checkProj(item) {
    if (item instanceof Projection) {
      return item;
    }
    if (item.oProj) {
      return item.oProj;
    }
    return Projection(item);
  }

  function proj4(fromProj, toProj, coord) {
    fromProj = checkProj(fromProj);
    var single = false;
    var obj;
    if (typeof toProj === 'undefined') {
      toProj = fromProj;
      fromProj = wgs84;
      single = true;
    } else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
      coord = toProj;
      toProj = fromProj;
      fromProj = wgs84;
      single = true;
    }
    toProj = checkProj(toProj);
    if (coord) {
      return transformer(fromProj, toProj, coord);
    } else {
      obj = {
        forward: function (coords) {
          return transformer(fromProj, toProj, coords);
        },
        inverse: function (coords) {
          return transformer(toProj, fromProj, coords);
        }
      };
      if (single) {
        obj.oProj = toProj;
      }
      return obj;
    }
  }

  /**
   * UTM zones are grouped, and assigned to one of a group of 6
   * sets.
   *
   * {int} @private
   */
  var NUM_100K_SETS = 6;

  /**
   * The column letters (for easting) of the lower left value, per
   * set.
   *
   * {string} @private
   */
  var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

  /**
   * The row letters (for northing) of the lower left value, per
   * set.
   *
   * {string} @private
   */
  var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

  var A = 65; // A
  var I = 73; // I
  var O = 79; // O
  var V = 86; // V
  var Z = 90; // Z
  var mgrs = {
    forward: forward$1,
    inverse: inverse$1,
    toPoint: toPoint
  };
  /**
   * Conversion of lat/lon to MGRS.
   *
   * @param {object} ll Object literal with lat and lon properties on a
   *     WGS84 ellipsoid.
   * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
   *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
   * @return {string} the MGRS string for the given location and accuracy.
   */
  function forward$1(ll, accuracy) {
    accuracy = accuracy || 5; // default accuracy 1m
    return encode$1(LLtoUTM({
      lat: ll[1],
      lon: ll[0]
    }), accuracy);
  }
  /**
   * Conversion of MGRS to lat/lon.
   *
   * @param {string} mgrs MGRS string.
   * @return {array} An array with left (longitude), bottom (latitude), right
   *     (longitude) and top (latitude) values in WGS84, representing the
   *     bounding box for the provided MGRS reference.
   */
  function inverse$1(mgrs) {
    var bbox = UTMtoLL(decode$1(mgrs.toUpperCase()));
    if (bbox.lat && bbox.lon) {
      return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
    }
    return [bbox.left, bbox.bottom, bbox.right, bbox.top];
  }
  function toPoint(mgrs) {
    var bbox = UTMtoLL(decode$1(mgrs.toUpperCase()));
    if (bbox.lat && bbox.lon) {
      return [bbox.lon, bbox.lat];
    }
    return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
  }/**
   * Conversion from degrees to radians.
   *
   * @private
   * @param {number} deg the angle in degrees.
   * @return {number} the angle in radians.
   */
  function degToRad(deg) {
    return (deg * (Math.PI / 180.0));
  }

  /**
   * Conversion from radians to degrees.
   *
   * @private
   * @param {number} rad the angle in radians.
   * @return {number} the angle in degrees.
   */
  function radToDeg(rad) {
    return (180.0 * (rad / Math.PI));
  }

  /**
   * Converts a set of Longitude and Latitude co-ordinates to UTM
   * using the WGS84 ellipsoid.
   *
   * @private
   * @param {object} ll Object literal with lat and lon properties
   *     representing the WGS84 coordinate to be converted.
   * @return {object} Object literal containing the UTM value with easting,
   *     northing, zoneNumber and zoneLetter properties, and an optional
   *     accuracy property in digits. Returns null if the conversion failed.
   */
  function LLtoUTM(ll) {
    var Lat = ll.lat;
    var Long = ll.lon;
    var a = 6378137.0; //ellip.radius;
    var eccSquared = 0.00669438; //ellip.eccsq;
    var k0 = 0.9996;
    var LongOrigin;
    var eccPrimeSquared;
    var N, T, C, A, M;
    var LatRad = degToRad(Lat);
    var LongRad = degToRad(Long);
    var LongOriginRad;
    var ZoneNumber;
    // (int)
    ZoneNumber = Math.floor((Long + 180) / 6) + 1;

    //Make sure the longitude 180.00 is in Zone 60
    if (Long === 180) {
      ZoneNumber = 60;
    }

    // Special zone for Norway
    if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
      ZoneNumber = 32;
    }

    // Special zones for Svalbard
    if (Lat >= 72.0 && Lat < 84.0) {
      if (Long >= 0.0 && Long < 9.0) {
        ZoneNumber = 31;
      }
      else if (Long >= 9.0 && Long < 21.0) {
        ZoneNumber = 33;
      }
      else if (Long >= 21.0 && Long < 33.0) {
        ZoneNumber = 35;
      }
      else if (Long >= 33.0 && Long < 42.0) {
        ZoneNumber = 37;
      }
    }

    LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
    // in middle of
    // zone
    LongOriginRad = degToRad(LongOrigin);

    eccPrimeSquared = (eccSquared) / (1 - eccSquared);

    N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
    T = Math.tan(LatRad) * Math.tan(LatRad);
    C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
    A = Math.cos(LatRad) * (LongRad - LongOriginRad);

    M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

    var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

    var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
    if (Lat < 0.0) {
      UTMNorthing += 10000000.0; //10000000 meter offset for
      // southern hemisphere
    }

    return {
      northing: Math.round(UTMNorthing),
      easting: Math.round(UTMEasting),
      zoneNumber: ZoneNumber,
      zoneLetter: getLetterDesignator(Lat)
    };
  }

  /**
   * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
   * class where the Zone can be specified as a single string eg."60N" which
   * is then broken down into the ZoneNumber and ZoneLetter.
   *
   * @private
   * @param {object} utm An object literal with northing, easting, zoneNumber
   *     and zoneLetter properties. If an optional accuracy property is
   *     provided (in meters), a bounding box will be returned instead of
   *     latitude and longitude.
   * @return {object} An object literal containing either lat and lon values
   *     (if no accuracy was provided), or top, right, bottom and left values
   *     for the bounding box calculated according to the provided accuracy.
   *     Returns null if the conversion failed.
   */
  function UTMtoLL(utm) {

    var UTMNorthing = utm.northing;
    var UTMEasting = utm.easting;
    var zoneLetter = utm.zoneLetter;
    var zoneNumber = utm.zoneNumber;
    // check the ZoneNummber is valid
    if (zoneNumber < 0 || zoneNumber > 60) {
      return null;
    }

    var k0 = 0.9996;
    var a = 6378137.0; //ellip.radius;
    var eccSquared = 0.00669438; //ellip.eccsq;
    var eccPrimeSquared;
    var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
    var N1, T1, C1, R1, D, M;
    var LongOrigin;
    var mu, phi1Rad;

    // remove 500,000 meter offset for longitude
    var x = UTMEasting - 500000.0;
    var y = UTMNorthing;

    // We must know somehow if we are in the Northern or Southern
    // hemisphere, this is the only time we use the letter So even
    // if the Zone letter isn't exactly correct it should indicate
    // the hemisphere correctly
    if (zoneLetter < 'N') {
      y -= 10000000.0; // remove 10,000,000 meter offset used
      // for southern hemisphere
    }

    // There are 60 zones with zone 1 being at West -180 to -174
    LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
    // in middle of
    // zone

    eccPrimeSquared = (eccSquared) / (1 - eccSquared);

    M = y / k0;
    mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

    phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
    // double phi1 = ProjMath.radToDeg(phi1Rad);

    N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
    C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
    R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
    D = x / (N1 * k0);

    var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
    lat = radToDeg(lat);

    var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
    lon = LongOrigin + radToDeg(lon);

    var result;
    if (utm.accuracy) {
      var topRight = UTMtoLL({
        northing: utm.northing + utm.accuracy,
        easting: utm.easting + utm.accuracy,
        zoneLetter: utm.zoneLetter,
        zoneNumber: utm.zoneNumber
      });
      result = {
        top: topRight.lat,
        right: topRight.lon,
        bottom: lat,
        left: lon
      };
    }
    else {
      result = {
        lat: lat,
        lon: lon
      };
    }
    return result;
  }

  /**
   * Calculates the MGRS letter designator for the given latitude.
   *
   * @private
   * @param {number} lat The latitude in WGS84 to get the letter designator
   *     for.
   * @return {char} The letter designator.
   */
  function getLetterDesignator(lat) {
    //This is here as an error flag to show that the Latitude is
    //outside MGRS limits
    var LetterDesignator = 'Z';

    if ((84 >= lat) && (lat >= 72)) {
      LetterDesignator = 'X';
    }
    else if ((72 > lat) && (lat >= 64)) {
      LetterDesignator = 'W';
    }
    else if ((64 > lat) && (lat >= 56)) {
      LetterDesignator = 'V';
    }
    else if ((56 > lat) && (lat >= 48)) {
      LetterDesignator = 'U';
    }
    else if ((48 > lat) && (lat >= 40)) {
      LetterDesignator = 'T';
    }
    else if ((40 > lat) && (lat >= 32)) {
      LetterDesignator = 'S';
    }
    else if ((32 > lat) && (lat >= 24)) {
      LetterDesignator = 'R';
    }
    else if ((24 > lat) && (lat >= 16)) {
      LetterDesignator = 'Q';
    }
    else if ((16 > lat) && (lat >= 8)) {
      LetterDesignator = 'P';
    }
    else if ((8 > lat) && (lat >= 0)) {
      LetterDesignator = 'N';
    }
    else if ((0 > lat) && (lat >= -8)) {
      LetterDesignator = 'M';
    }
    else if ((-8 > lat) && (lat >= -16)) {
      LetterDesignator = 'L';
    }
    else if ((-16 > lat) && (lat >= -24)) {
      LetterDesignator = 'K';
    }
    else if ((-24 > lat) && (lat >= -32)) {
      LetterDesignator = 'J';
    }
    else if ((-32 > lat) && (lat >= -40)) {
      LetterDesignator = 'H';
    }
    else if ((-40 > lat) && (lat >= -48)) {
      LetterDesignator = 'G';
    }
    else if ((-48 > lat) && (lat >= -56)) {
      LetterDesignator = 'F';
    }
    else if ((-56 > lat) && (lat >= -64)) {
      LetterDesignator = 'E';
    }
    else if ((-64 > lat) && (lat >= -72)) {
      LetterDesignator = 'D';
    }
    else if ((-72 > lat) && (lat >= -80)) {
      LetterDesignator = 'C';
    }
    return LetterDesignator;
  }

  /**
   * Encodes a UTM location as MGRS string.
   *
   * @private
   * @param {object} utm An object literal with easting, northing,
   *     zoneLetter, zoneNumber
   * @param {number} accuracy Accuracy in digits (1-5).
   * @return {string} MGRS string for the given UTM location.
   */
  function encode$1(utm, accuracy) {
    // prepend with leading zeroes
    var seasting = "00000" + utm.easting,
      snorthing = "00000" + utm.northing;

    return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
  }

  /**
   * Get the two letter 100k designator for a given UTM easting,
   * northing and zone number value.
   *
   * @private
   * @param {number} easting
   * @param {number} northing
   * @param {number} zoneNumber
   * @return the two letter 100k designator for the given UTM location.
   */
  function get100kID(easting, northing, zoneNumber) {
    var setParm = get100kSetForZone(zoneNumber);
    var setColumn = Math.floor(easting / 100000);
    var setRow = Math.floor(northing / 100000) % 20;
    return getLetter100kID(setColumn, setRow, setParm);
  }

  /**
   * Given a UTM zone number, figure out the MGRS 100K set it is in.
   *
   * @private
   * @param {number} i An UTM zone number.
   * @return {number} the 100k set the UTM zone is in.
   */
  function get100kSetForZone(i) {
    var setParm = i % NUM_100K_SETS;
    if (setParm === 0) {
      setParm = NUM_100K_SETS;
    }

    return setParm;
  }

  /**
   * Get the two-letter MGRS 100k designator given information
   * translated from the UTM northing, easting and zone number.
   *
   * @private
   * @param {number} column the column index as it relates to the MGRS
   *        100k set spreadsheet, created from the UTM easting.
   *        Values are 1-8.
   * @param {number} row the row index as it relates to the MGRS 100k set
   *        spreadsheet, created from the UTM northing value. Values
   *        are from 0-19.
   * @param {number} parm the set block, as it relates to the MGRS 100k set
   *        spreadsheet, created from the UTM zone. Values are from
   *        1-60.
   * @return two letter MGRS 100k code.
   */
  function getLetter100kID(column, row, parm) {
    // colOrigin and rowOrigin are the letters at the origin of the set
    var index = parm - 1;
    var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
    var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

    // colInt and rowInt are the letters to build to return
    var colInt = colOrigin + column - 1;
    var rowInt = rowOrigin + row;
    var rollover = false;

    if (colInt > Z) {
      colInt = colInt - Z + A - 1;
      rollover = true;
    }

    if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
      colInt++;
    }

    if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
      colInt++;

      if (colInt === I) {
        colInt++;
      }
    }

    if (colInt > Z) {
      colInt = colInt - Z + A - 1;
    }

    if (rowInt > V) {
      rowInt = rowInt - V + A - 1;
      rollover = true;
    }
    else {
      rollover = false;
    }

    if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
      rowInt++;
    }

    if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
      rowInt++;

      if (rowInt === I) {
        rowInt++;
      }
    }

    if (rowInt > V) {
      rowInt = rowInt - V + A - 1;
    }

    var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
    return twoLetter;
  }

  /**
   * Decode the UTM parameters from a MGRS string.
   *
   * @private
   * @param {string} mgrsString an UPPERCASE coordinate string is expected.
   * @return {object} An object literal with easting, northing, zoneLetter,
   *     zoneNumber and accuracy (in meters) properties.
   */
  function decode$1(mgrsString) {

    if (mgrsString && mgrsString.length === 0) {
      throw ("MGRSPoint coverting from nothing");
    }

    var length = mgrsString.length;

    var hunK = null;
    var sb = "";
    var testChar;
    var i = 0;

    // get Zone number
    while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
      if (i >= 2) {
        throw ("MGRSPoint bad conversion from: " + mgrsString);
      }
      sb += testChar;
      i++;
    }

    var zoneNumber = parseInt(sb, 10);

    if (i === 0 || i + 3 > length) {
      // A good MGRS string has to be 4-5 digits long,
      // ##AAA/#AAA at least.
      throw ("MGRSPoint bad conversion from: " + mgrsString);
    }

    var zoneLetter = mgrsString.charAt(i++);

    // Should we check the zone letter here? Why not.
    if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
      throw ("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
    }

    hunK = mgrsString.substring(i, i += 2);

    var set = get100kSetForZone(zoneNumber);

    var east100k = getEastingFromChar(hunK.charAt(0), set);
    var north100k = getNorthingFromChar(hunK.charAt(1), set);

    // We have a bug where the northing may be 2000000 too low.
    // How
    // do we know when to roll over?

    while (north100k < getMinNorthing(zoneLetter)) {
      north100k += 2000000;
    }

    // calculate the char index for easting/northing separator
    var remainder = length - i;

    if (remainder % 2 !== 0) {
      throw ("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
    }

    var sep = remainder / 2;

    var sepEasting = 0.0;
    var sepNorthing = 0.0;
    var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
    if (sep > 0) {
      accuracyBonus = 100000.0 / Math.pow(10, sep);
      sepEastingString = mgrsString.substring(i, i + sep);
      sepEasting = parseFloat(sepEastingString) * accuracyBonus;
      sepNorthingString = mgrsString.substring(i + sep);
      sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
    }

    easting = sepEasting + east100k;
    northing = sepNorthing + north100k;

    return {
      easting: easting,
      northing: northing,
      zoneLetter: zoneLetter,
      zoneNumber: zoneNumber,
      accuracy: accuracyBonus
    };
  }

  /**
   * Given the first letter from a two-letter MGRS 100k zone, and given the
   * MGRS table set for the zone number, figure out the easting value that
   * should be added to the other, secondary easting value.
   *
   * @private
   * @param {char} e The first letter from a two-letter MGRS 100´k zone.
   * @param {number} set The MGRS table set for the zone number.
   * @return {number} The easting value for the given letter and set.
   */
  function getEastingFromChar(e, set) {
    // colOrigin is the letter at the origin of the set for the
    // column
    var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
    var eastingValue = 100000.0;
    var rewindMarker = false;

    while (curCol !== e.charCodeAt(0)) {
      curCol++;
      if (curCol === I) {
        curCol++;
      }
      if (curCol === O) {
        curCol++;
      }
      if (curCol > Z) {
        if (rewindMarker) {
          throw ("Bad character: " + e);
        }
        curCol = A;
        rewindMarker = true;
      }
      eastingValue += 100000.0;
    }

    return eastingValue;
  }

  /**
   * Given the second letter from a two-letter MGRS 100k zone, and given the
   * MGRS table set for the zone number, figure out the northing value that
   * should be added to the other, secondary northing value. You have to
   * remember that Northings are determined from the equator, and the vertical
   * cycle of letters mean a 2000000 additional northing meters. This happens
   * approx. every 18 degrees of latitude. This method does *NOT* count any
   * additional northings. You have to figure out how many 2000000 meters need
   * to be added for the zone letter of the MGRS coordinate.
   *
   * @private
   * @param {char} n Second letter of the MGRS 100k zone
   * @param {number} set The MGRS table set number, which is dependent on the
   *     UTM zone number.
   * @return {number} The northing value for the given letter and set.
   */
  function getNorthingFromChar(n, set) {

    if (n > 'V') {
      throw ("MGRSPoint given invalid Northing " + n);
    }

    // rowOrigin is the letter at the origin of the set for the
    // column
    var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
    var northingValue = 0.0;
    var rewindMarker = false;

    while (curRow !== n.charCodeAt(0)) {
      curRow++;
      if (curRow === I) {
        curRow++;
      }
      if (curRow === O) {
        curRow++;
      }
      // fixing a bug making whole application hang in this loop
      // when 'n' is a wrong character
      if (curRow > V) {
        if (rewindMarker) { // making sure that this loop ends
          throw ("Bad character: " + n);
        }
        curRow = A;
        rewindMarker = true;
      }
      northingValue += 100000.0;
    }

    return northingValue;
  }

  /**
   * The function getMinNorthing returns the minimum northing value of a MGRS
   * zone.
   *
   * Ported from Geotrans' c Lattitude_Band_Value structure table.
   *
   * @private
   * @param {char} zoneLetter The MGRS zone to get the min northing for.
   * @return {number}
   */
  function getMinNorthing(zoneLetter) {
    var northing;
    switch (zoneLetter) {
    case 'C':
      northing = 1100000.0;
      break;
    case 'D':
      northing = 2000000.0;
      break;
    case 'E':
      northing = 2800000.0;
      break;
    case 'F':
      northing = 3700000.0;
      break;
    case 'G':
      northing = 4600000.0;
      break;
    case 'H':
      northing = 5500000.0;
      break;
    case 'J':
      northing = 6400000.0;
      break;
    case 'K':
      northing = 7300000.0;
      break;
    case 'L':
      northing = 8200000.0;
      break;
    case 'M':
      northing = 9100000.0;
      break;
    case 'N':
      northing = 0.0;
      break;
    case 'P':
      northing = 800000.0;
      break;
    case 'Q':
      northing = 1700000.0;
      break;
    case 'R':
      northing = 2600000.0;
      break;
    case 'S':
      northing = 3500000.0;
      break;
    case 'T':
      northing = 4400000.0;
      break;
    case 'U':
      northing = 5300000.0;
      break;
    case 'V':
      northing = 6200000.0;
      break;
    case 'W':
      northing = 7000000.0;
      break;
    case 'X':
      northing = 7900000.0;
      break;
    default:
      northing = -1.0;
    }
    if (northing >= 0.0) {
      return northing;
    }
    else {
      throw ("Invalid zone letter: " + zoneLetter);
    }

  }

  function Point(x, y, z) {
    if (!(this instanceof Point)) {
      return new Point(x, y, z);
    }
    if (Array.isArray(x)) {
      this.x = x[0];
      this.y = x[1];
      this.z = x[2] || 0.0;
    } else if(typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z || 0.0;
    } else if (typeof x === 'string' && typeof y === 'undefined') {
      var coords = x.split(',');
      this.x = parseFloat(coords[0], 10);
      this.y = parseFloat(coords[1], 10);
      this.z = parseFloat(coords[2], 10) || 0.0;
    } else {
      this.x = x;
      this.y = y;
      this.z = z || 0.0;
    }
    console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
  }

  Point.fromMGRS = function(mgrsStr) {
    return new Point(toPoint(mgrsStr));
  };
  Point.prototype.toMGRS = function(accuracy) {
    return forward$1([this.x, this.y], accuracy);
  };

  var C00 = 1;
  var C02 = 0.25;
  var C04 = 0.046875;
  var C06 = 0.01953125;
  var C08 = 0.01068115234375;
  var C22 = 0.75;
  var C44 = 0.46875;
  var C46 = 0.01302083333333333333;
  var C48 = 0.00712076822916666666;
  var C66 = 0.36458333333333333333;
  var C68 = 0.00569661458333333333;
  var C88 = 0.3076171875;

  function pj_enfn(es) {
    var en = [];
    en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
    en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
    var t = es * es;
    en[2] = t * (C44 - es * (C46 + es * C48));
    t *= es;
    en[3] = t * (C66 - es * C68);
    en[4] = t * es * C88;
    return en;
  }

  function pj_mlfn(phi, sphi, cphi, en) {
    cphi *= sphi;
    sphi *= sphi;
    return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4]))));
  }

  var MAX_ITER = 20;

  function pj_inv_mlfn(arg, es, en) {
    var k = 1 / (1 - es);
    var phi = arg;
    for (var i = MAX_ITER; i; --i) { /* rarely goes over 2 iterations */
      var s = Math.sin(phi);
      var t = 1 - es * s * s;
      //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
      //phi -= t * (t * Math.sqrt(t)) * k;
      t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
      phi -= t;
      if (Math.abs(t) < EPSLN) {
        return phi;
      }
    }
    //..reportError("cass:pj_inv_mlfn: Convergence error");
    return phi;
  }

  // Heavily based on this tmerc projection implementation

  function init$2() {
    this.x0 = this.x0 !== undefined ? this.x0 : 0;
    this.y0 = this.y0 !== undefined ? this.y0 : 0;
    this.long0 = this.long0 !== undefined ? this.long0 : 0;
    this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

    if (this.es) {
      this.en = pj_enfn(this.es);
      this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
    }
  }

  /**
      Transverse Mercator Forward  - long/lat to x/y
      long/lat in radians
    */
  function forward$2(p) {
    var lon = p.x;
    var lat = p.y;

    var delta_lon = adjust_lon(lon - this.long0);
    var con;
    var x, y;
    var sin_phi = Math.sin(lat);
    var cos_phi = Math.cos(lat);

    if (!this.es) {
      var b = cos_phi * Math.sin(delta_lon);

      if ((Math.abs(Math.abs(b) - 1)) < EPSLN) {
        return (93);
      }
      else {
        x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
        y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
        b = Math.abs(y);

        if (b >= 1) {
          if ((b - 1) > EPSLN) {
            return (93);
          }
          else {
            y = 0;
          }
        }
        else {
          y = Math.acos(y);
        }

        if (lat < 0) {
          y = -y;
        }

        y = this.a * this.k0 * (y - this.lat0) + this.y0;
      }
    }
    else {
      var al = cos_phi * delta_lon;
      var als = Math.pow(al, 2);
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
      var t = Math.pow(tq, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      al = al / Math.sqrt(con);
      var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en);

      x = this.a * (this.k0 * al * (1 +
        als / 6 * (1 - t + c +
        als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c +
        als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) +
        this.x0;

      y = this.a * (this.k0 * (ml - this.ml0 +
        sin_phi * delta_lon * al / 2 * (1 +
        als / 12 * (5 - t + 9 * c + 4 * cs +
        als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c +
        als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) +
        this.y0;
    }

    p.x = x;
    p.y = y;

    return p;
  }

  /**
      Transverse Mercator Inverse  -  x/y to long/lat
    */
  function inverse$2(p) {
    var con, phi;
    var lat, lon;
    var x = (p.x - this.x0) * (1 / this.a);
    var y = (p.y - this.y0) * (1 / this.a);

    if (!this.es) {
      var f = Math.exp(x / this.k0);
      var g = 0.5 * (f - 1 / f);
      var temp = this.lat0 + y / this.k0;
      var h = Math.cos(temp);
      con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
      lat = Math.asin(con);

      if (y < 0) {
        lat = -lat;
      }

      if ((g === 0) && (h === 0)) {
        lon = 0;
      }
      else {
        lon = adjust_lon(Math.atan2(g, h) + this.long0);
      }
    }
    else { // ellipsoidal form
      con = this.ml0 + y / this.k0;
      phi = pj_inv_mlfn(con, this.es, this.en);

      if (Math.abs(phi) < HALF_PI) {
        var sin_phi = Math.sin(phi);
        var cos_phi = Math.cos(phi);
        var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
        var c = this.ep2 * Math.pow(cos_phi, 2);
        var cs = Math.pow(c, 2);
        var t = Math.pow(tan_phi, 2);
        var ts = Math.pow(t, 2);
        con = 1 - this.es * Math.pow(sin_phi, 2);
        var d = x * Math.sqrt(con) / this.k0;
        var ds = Math.pow(d, 2);
        con = con * tan_phi;

        lat = phi - (con * ds / (1 - this.es)) * 0.5 * (1 -
          ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs -
          ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c -
          ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));

        lon = adjust_lon(this.long0 + (d * (1 -
          ds / 6 * (1 + 2 * t + c -
          ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c -
          ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi));
      }
      else {
        lat = HALF_PI * sign(y);
        lon = 0;
      }
    }

    p.x = lon;
    p.y = lat;

    return p;
  }

  var names$3 = ["Transverse_Mercator", "Transverse Mercator", "tmerc"];
  var tmerc = {
    init: init$2,
    forward: forward$2,
    inverse: inverse$2,
    names: names$3
  };

  function sinh(x) {
    var r = Math.exp(x);
    r = (r - 1 / r) / 2;
    return r;
  }

  function hypot(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    var a = Math.max(x, y);
    var b = Math.min(x, y) / (a ? a : 1);

    return a * Math.sqrt(1 + Math.pow(b, 2));
  }

  function log1py(x) {
    var y = 1 + x;
    var z = y - 1;

    return z === 0 ? x : x * Math.log(y) / z;
  }

  function asinhy(x) {
    var y = Math.abs(x);
    y = log1py(y * (1 + y / (hypot(1, y) + 1)));

    return x < 0 ? -y : y;
  }

  function gatg(pp, B) {
    var cos_2B = 2 * Math.cos(2 * B);
    var i = pp.length - 1;
    var h1 = pp[i];
    var h2 = 0;
    var h;

    while (--i >= 0) {
      h = -h2 + cos_2B * h1 + pp[i];
      h2 = h1;
      h1 = h;
    }

    return (B + h * Math.sin(2 * B));
  }

  function clens(pp, arg_r) {
    var r = 2 * Math.cos(arg_r);
    var i = pp.length - 1;
    var hr1 = pp[i];
    var hr2 = 0;
    var hr;

    while (--i >= 0) {
      hr = -hr2 + r * hr1 + pp[i];
      hr2 = hr1;
      hr1 = hr;
    }

    return Math.sin(arg_r) * hr;
  }

  function cosh(x) {
    var r = Math.exp(x);
    r = (r + 1 / r) / 2;
    return r;
  }

  function clens_cmplx(pp, arg_r, arg_i) {
    var sin_arg_r = Math.sin(arg_r);
    var cos_arg_r = Math.cos(arg_r);
    var sinh_arg_i = sinh(arg_i);
    var cosh_arg_i = cosh(arg_i);
    var r = 2 * cos_arg_r * cosh_arg_i;
    var i = -2 * sin_arg_r * sinh_arg_i;
    var j = pp.length - 1;
    var hr = pp[j];
    var hi1 = 0;
    var hr1 = 0;
    var hi = 0;
    var hr2;
    var hi2;

    while (--j >= 0) {
      hr2 = hr1;
      hi2 = hi1;
      hr1 = hr;
      hi1 = hi;
      hr = -hr2 + r * hr1 - i * hi1 + pp[j];
      hi = -hi2 + i * hr1 + r * hi1;
    }

    r = sin_arg_r * cosh_arg_i;
    i = cos_arg_r * sinh_arg_i;

    return [r * hr - i * hi, r * hi + i * hr];
  }

  // Heavily based on this etmerc projection implementation

  function init$3() {
    if (this.es === undefined || this.es <= 0) {
      throw new Error('incorrect elliptical usage');
    }

    this.x0 = this.x0 !== undefined ? this.x0 : 0;
    this.y0 = this.y0 !== undefined ? this.y0 : 0;
    this.long0 = this.long0 !== undefined ? this.long0 : 0;
    this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

    this.cgb = [];
    this.cbg = [];
    this.utg = [];
    this.gtu = [];

    var f = this.es / (1 + Math.sqrt(1 - this.es));
    var n = f / (2 - f);
    var np = n;

    this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675 ))))));
    this.cbg[0] = n * (-2 + n * ( 2 / 3 + n * ( 4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));

    np = np * n;
    this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
    this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * ( -13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));

    np = np * n;
    this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
    this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));

    np = np * n;
    this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
    this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * ( -24832 / 14175)));

    np = np * n;
    this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
    this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));

    np = np * n;
    this.cgb[5] = np * (601676 / 22275);
    this.cbg[5] = np * (444337 / 155925);

    np = Math.pow(n, 2);
    this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));

    this.utg[0] = n * (-0.5 + n * ( 2 / 3 + n * (-37 / 96 + n * ( 1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
    this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));

    this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
    this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));

    np = np * n;
    this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720 ))));
    this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));

    np = np * n;
    this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
    this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));

    np = np * n;
    this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
    this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));

    np = np * n;
    this.utg[5] = np * (-20648693 / 638668800);
    this.gtu[5] = np * (212378941 / 319334400);

    var Z = gatg(this.cbg, this.lat0);
    this.Zb = -this.Qn * (Z + clens(this.gtu, 2 * Z));
  }

  function forward$3(p) {
    var Ce = adjust_lon(p.x - this.long0);
    var Cn = p.y;

    Cn = gatg(this.cbg, Cn);
    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);

    Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
    Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce));
    Ce = asinhy(Math.tan(Ce));

    var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);

    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];

    var x;
    var y;

    if (Math.abs(Ce) <= 2.623395162778) {
      x = this.a * (this.Qn * Ce) + this.x0;
      y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
    }
    else {
      x = Infinity;
      y = Infinity;
    }

    p.x = x;
    p.y = y;

    return p;
  }

  function inverse$3(p) {
    var Ce = (p.x - this.x0) * (1 / this.a);
    var Cn = (p.y - this.y0) * (1 / this.a);

    Cn = (Cn - this.Zb) / this.Qn;
    Ce = Ce / this.Qn;

    var lon;
    var lat;

    if (Math.abs(Ce) <= 2.623395162778) {
      var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);

      Cn = Cn + tmp[0];
      Ce = Ce + tmp[1];
      Ce = Math.atan(sinh(Ce));

      var sin_Cn = Math.sin(Cn);
      var cos_Cn = Math.cos(Cn);
      var sin_Ce = Math.sin(Ce);
      var cos_Ce = Math.cos(Ce);

      Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn));
      Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);

      lon = adjust_lon(Ce + this.long0);
      lat = gatg(this.cgb, Cn);
    }
    else {
      lon = Infinity;
      lat = Infinity;
    }

    p.x = lon;
    p.y = lat;

    return p;
  }

  var names$4 = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc"];
  var etmerc = {
    init: init$3,
    forward: forward$3,
    inverse: inverse$3,
    names: names$4
  };

  function adjust_zone(zone, lon) {
    if (zone === undefined) {
      zone = Math.floor((adjust_lon(lon) + Math.PI) * 30 / Math.PI) + 1;

      if (zone < 0) {
        return 0;
      } else if (zone > 60) {
        return 60;
      }
    }
    return zone;
  }

  var dependsOn = 'etmerc';


  function init$4() {
    var zone = adjust_zone(this.zone, this.long0);
    if (zone === undefined) {
      throw new Error('unknown utm zone');
    }
    this.lat0 = 0;
    this.long0 =  ((6 * Math.abs(zone)) - 183) * D2R;
    this.x0 = 500000;
    this.y0 = this.utmSouth ? 10000000 : 0;
    this.k0 = 0.9996;

    etmerc.init.apply(this);
    this.forward = etmerc.forward;
    this.inverse = etmerc.inverse;
  }

  var names$5 = ["Universal Transverse Mercator System", "utm"];
  var utm = {
    init: init$4,
    names: names$5,
    dependsOn: dependsOn
  };

  function srat(esinp, exp) {
    return (Math.pow((1 - esinp) / (1 + esinp), exp));
  }

  var MAX_ITER$1 = 20;

  function init$5() {
    var sphi = Math.sin(this.lat0);
    var cphi = Math.cos(this.lat0);
    cphi *= cphi;
    this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
    this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
    this.phic0 = Math.asin(sphi / this.C);
    this.ratexp = 0.5 * this.C * this.e;
    this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
  }

  function forward$4(p) {
    var lon = p.x;
    var lat = p.y;

    p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
    p.x = this.C * lon;
    return p;
  }

  function inverse$4(p) {
    var DEL_TOL = 1e-14;
    var lon = p.x / this.C;
    var lat = p.y;
    var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
    for (var i = MAX_ITER$1; i > 0; --i) {
      lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), - 0.5 * this.e)) - HALF_PI;
      if (Math.abs(lat - p.y) < DEL_TOL) {
        break;
      }
      p.y = lat;
    }
    /* convergence failed */
    if (!i) {
      return null;
    }
    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$6 = ["gauss"];
  var gauss = {
    init: init$5,
    forward: forward$4,
    inverse: inverse$4,
    names: names$6
  };

  function init$6() {
    gauss.init.apply(this);
    if (!this.rc) {
      return;
    }
    this.sinc0 = Math.sin(this.phic0);
    this.cosc0 = Math.cos(this.phic0);
    this.R2 = 2 * this.rc;
    if (!this.title) {
      this.title = "Oblique Stereographic Alternative";
    }
  }

  function forward$5(p) {
    var sinc, cosc, cosl, k;
    p.x = adjust_lon(p.x - this.long0);
    gauss.forward.apply(this, [p]);
    sinc = Math.sin(p.y);
    cosc = Math.cos(p.y);
    cosl = Math.cos(p.x);
    k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
    p.x = k * cosc * Math.sin(p.x);
    p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
    p.x = this.a * p.x + this.x0;
    p.y = this.a * p.y + this.y0;
    return p;
  }

  function inverse$5(p) {
    var sinc, cosc, lon, lat, rho;
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    p.x /= this.k0;
    p.y /= this.k0;
    if ((rho = Math.sqrt(p.x * p.x + p.y * p.y))) {
      var c = 2 * Math.atan2(rho, this.R2);
      sinc = Math.sin(c);
      cosc = Math.cos(c);
      lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
      lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
    }
    else {
      lat = this.phic0;
      lon = 0;
    }

    p.x = lon;
    p.y = lat;
    gauss.inverse.apply(this, [p]);
    p.x = adjust_lon(p.x + this.long0);
    return p;
  }

  var names$7 = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea","Oblique Stereographic Alternative","Double_Stereographic"];
  var sterea = {
    init: init$6,
    forward: forward$5,
    inverse: inverse$5,
    names: names$7
  };

  function ssfn_(phit, sinphi, eccen) {
    sinphi *= eccen;
    return (Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen));
  }

  function init$7() {
    this.coslat0 = Math.cos(this.lat0);
    this.sinlat0 = Math.sin(this.lat0);
    if (this.sphere) {
      if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
        this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
      }
    }
    else {
      if (Math.abs(this.coslat0) <= EPSLN) {
        if (this.lat0 > 0) {
          //North pole
          //trace('stere:north pole');
          this.con = 1;
        }
        else {
          //South pole
          //trace('stere:south pole');
          this.con = -1;
        }
      }
      this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
      if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
        this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
      }
      this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
      this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
      this.cosX0 = Math.cos(this.X0);
      this.sinX0 = Math.sin(this.X0);
    }
  }

  // Stereographic forward equations--mapping lat,long to x,y
  function forward$6(p) {
    var lon = p.x;
    var lat = p.y;
    var sinlat = Math.sin(lat);
    var coslat = Math.cos(lat);
    var A, X, sinX, cosX, ts, rh;
    var dlon = adjust_lon(lon - this.long0);

    if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
      //case of the origine point
      //trace('stere:this is the origin point');
      p.x = NaN;
      p.y = NaN;
      return p;
    }
    if (this.sphere) {
      //trace('stere:sphere case');
      A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
      p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
      p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
      return p;
    }
    else {
      X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
      cosX = Math.cos(X);
      sinX = Math.sin(X);
      if (Math.abs(this.coslat0) <= EPSLN) {
        ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
        rh = 2 * this.a * this.k0 * ts / this.cons;
        p.x = this.x0 + rh * Math.sin(lon - this.long0);
        p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
        //trace(p.toString());
        return p;
      }
      else if (Math.abs(this.sinlat0) < EPSLN) {
        //Eq
        //trace('stere:equateur');
        A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
        p.y = A * sinX;
      }
      else {
        //other case
        //trace('stere:normal case');
        A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
        p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
      }
      p.x = A * cosX * Math.sin(dlon) + this.x0;
    }
    //trace(p.toString());
    return p;
  }

  //* Stereographic inverse equations--mapping x,y to lat/long
  function inverse$6(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var lon, lat, ts, ce, Chi;
    var rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (this.sphere) {
      var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
      lon = this.long0;
      lat = this.lat0;
      if (rh <= EPSLN) {
        p.x = lon;
        p.y = lat;
        return p;
      }
      lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
      if (Math.abs(this.coslat0) < EPSLN) {
        if (this.lat0 > 0) {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
        }
        else {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
        }
      }
      else {
        lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
      }
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      if (Math.abs(this.coslat0) <= EPSLN) {
        if (rh <= EPSLN) {
          lat = this.lat0;
          lon = this.long0;
          p.x = lon;
          p.y = lat;
          //trace(p.toString());
          return p;
        }
        p.x *= this.con;
        p.y *= this.con;
        ts = rh * this.cons / (2 * this.a * this.k0);
        lat = this.con * phi2z(this.e, ts);
        lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, - 1 * p.y));
      }
      else {
        ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
        lon = this.long0;
        if (rh <= EPSLN) {
          Chi = this.X0;
        }
        else {
          Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
          lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
        }
        lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
      }
    }
    p.x = lon;
    p.y = lat;

    //trace(p.toString());
    return p;

  }

  var names$8 = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"];
  var stere = {
    init: init$7,
    forward: forward$6,
    inverse: inverse$6,
    names: names$8,
    ssfn_: ssfn_
  };

  /*
    references:
      Formules et constantes pour le Calcul pour la
      projection cylindrique conforme à axe oblique et pour la transformation entre
      des systèmes de référence.
      http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
    */

  function init$8() {
    var phy0 = this.lat0;
    this.lambda0 = this.long0;
    var sinPhy0 = Math.sin(phy0);
    var semiMajorAxis = this.a;
    var invF = this.rf;
    var flattening = 1 / invF;
    var e2 = 2 * flattening - Math.pow(flattening, 2);
    var e = this.e = Math.sqrt(e2);
    this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
    this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
    this.b0 = Math.asin(sinPhy0 / this.alpha);
    var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
    var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
    var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
    this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
  }

  function forward$7(p) {
    var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
    var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
    var S = -this.alpha * (Sa1 + Sa2) + this.K;

    // spheric latitude
    var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

    // spheric longitude
    var I = this.alpha * (p.x - this.lambda0);

    // psoeudo equatorial rotation
    var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));

    var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

    p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
    p.x = this.R * rotI + this.x0;
    return p;
  }

  function inverse$7(p) {
    var Y = p.x - this.x0;
    var X = p.y - this.y0;

    var rotI = Y / this.R;
    var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);

    var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
    var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));

    var lambda = this.lambda0 + I / this.alpha;

    var S = 0;
    var phy = b;
    var prevPhy = -1000;
    var iteration = 0;
    while (Math.abs(phy - prevPhy) > 0.0000001) {
      if (++iteration > 20) {
        //...reportError("omercFwdInfinity");
        return;
      }
      //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
      S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
      prevPhy = phy;
      phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
    }

    p.x = lambda;
    p.y = phy;
    return p;
  }

  var names$9 = ["somerc"];
  var somerc = {
    init: init$8,
    forward: forward$7,
    inverse: inverse$7,
    names: names$9
  };

  /* Initialize the Oblique Mercator  projection
      ------------------------------------------*/
  function init$9() {
    this.no_off = this.no_off || false;
    this.no_rot = this.no_rot || false;

    if (isNaN(this.k0)) {
      this.k0 = 1;
    }
    var sinlat = Math.sin(this.lat0);
    var coslat = Math.cos(this.lat0);
    var con = this.e * sinlat;

    this.bl = Math.sqrt(1 + this.es / (1 - this.es) * Math.pow(coslat, 4));
    this.al = this.a * this.bl * this.k0 * Math.sqrt(1 - this.es) / (1 - con * con);
    var t0 = tsfnz(this.e, this.lat0, sinlat);
    var dl = this.bl / coslat * Math.sqrt((1 - this.es) / (1 - con * con));
    if (dl * dl < 1) {
      dl = 1;
    }
    var fl;
    var gl;
    if (!isNaN(this.longc)) {
      //Central point and azimuth method

      if (this.lat0 >= 0) {
        fl = dl + Math.sqrt(dl * dl - 1);
      }
      else {
        fl = dl - Math.sqrt(dl * dl - 1);
      }
      this.el = fl * Math.pow(t0, this.bl);
      gl = 0.5 * (fl - 1 / fl);
      this.gamma0 = Math.asin(Math.sin(this.alpha) / dl);
      this.long0 = this.longc - Math.asin(gl * Math.tan(this.gamma0)) / this.bl;

    }
    else {
      //2 points method
      var t1 = tsfnz(this.e, this.lat1, Math.sin(this.lat1));
      var t2 = tsfnz(this.e, this.lat2, Math.sin(this.lat2));
      if (this.lat0 >= 0) {
        this.el = (dl + Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
      }
      else {
        this.el = (dl - Math.sqrt(dl * dl - 1)) * Math.pow(t0, this.bl);
      }
      var hl = Math.pow(t1, this.bl);
      var ll = Math.pow(t2, this.bl);
      fl = this.el / hl;
      gl = 0.5 * (fl - 1 / fl);
      var jl = (this.el * this.el - ll * hl) / (this.el * this.el + ll * hl);
      var pl = (ll - hl) / (ll + hl);
      var dlon12 = adjust_lon(this.long1 - this.long2);
      this.long0 = 0.5 * (this.long1 + this.long2) - Math.atan(jl * Math.tan(0.5 * this.bl * (dlon12)) / pl) / this.bl;
      this.long0 = adjust_lon(this.long0);
      var dlon10 = adjust_lon(this.long1 - this.long0);
      this.gamma0 = Math.atan(Math.sin(this.bl * (dlon10)) / gl);
      this.alpha = Math.asin(dl * Math.sin(this.gamma0));
    }

    if (this.no_off) {
      this.uc = 0;
    }
    else {
      if (this.lat0 >= 0) {
        this.uc = this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
      }
      else {
        this.uc = -1 * this.al / this.bl * Math.atan2(Math.sqrt(dl * dl - 1), Math.cos(this.alpha));
      }
    }

  }

  /* Oblique Mercator forward equations--mapping lat,long to x,y
      ----------------------------------------------------------*/
  function forward$8(p) {
    var lon = p.x;
    var lat = p.y;
    var dlon = adjust_lon(lon - this.long0);
    var us, vs;
    var con;
    if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
      if (lat > 0) {
        con = -1;
      }
      else {
        con = 1;
      }
      vs = this.al / this.bl * Math.log(Math.tan(FORTPI + con * this.gamma0 * 0.5));
      us = -1 * con * HALF_PI * this.al / this.bl;
    }
    else {
      var t = tsfnz(this.e, lat, Math.sin(lat));
      var ql = this.el / Math.pow(t, this.bl);
      var sl = 0.5 * (ql - 1 / ql);
      var tl = 0.5 * (ql + 1 / ql);
      var vl = Math.sin(this.bl * (dlon));
      var ul = (sl * Math.sin(this.gamma0) - vl * Math.cos(this.gamma0)) / tl;
      if (Math.abs(Math.abs(ul) - 1) <= EPSLN) {
        vs = Number.POSITIVE_INFINITY;
      }
      else {
        vs = 0.5 * this.al * Math.log((1 - ul) / (1 + ul)) / this.bl;
      }
      if (Math.abs(Math.cos(this.bl * (dlon))) <= EPSLN) {
        us = this.al * this.bl * (dlon);
      }
      else {
        us = this.al * Math.atan2(sl * Math.cos(this.gamma0) + vl * Math.sin(this.gamma0), Math.cos(this.bl * dlon)) / this.bl;
      }
    }

    if (this.no_rot) {
      p.x = this.x0 + us;
      p.y = this.y0 + vs;
    }
    else {

      us -= this.uc;
      p.x = this.x0 + vs * Math.cos(this.alpha) + us * Math.sin(this.alpha);
      p.y = this.y0 + us * Math.cos(this.alpha) - vs * Math.sin(this.alpha);
    }
    return p;
  }

  function inverse$8(p) {
    var us, vs;
    if (this.no_rot) {
      vs = p.y - this.y0;
      us = p.x - this.x0;
    }
    else {
      vs = (p.x - this.x0) * Math.cos(this.alpha) - (p.y - this.y0) * Math.sin(this.alpha);
      us = (p.y - this.y0) * Math.cos(this.alpha) + (p.x - this.x0) * Math.sin(this.alpha);
      us += this.uc;
    }
    var qp = Math.exp(-1 * this.bl * vs / this.al);
    var sp = 0.5 * (qp - 1 / qp);
    var tp = 0.5 * (qp + 1 / qp);
    var vp = Math.sin(this.bl * us / this.al);
    var up = (vp * Math.cos(this.gamma0) + sp * Math.sin(this.gamma0)) / tp;
    var ts = Math.pow(this.el / Math.sqrt((1 + up) / (1 - up)), 1 / this.bl);
    if (Math.abs(up - 1) < EPSLN) {
      p.x = this.long0;
      p.y = HALF_PI;
    }
    else if (Math.abs(up + 1) < EPSLN) {
      p.x = this.long0;
      p.y = -1 * HALF_PI;
    }
    else {
      p.y = phi2z(this.e, ts);
      p.x = adjust_lon(this.long0 - Math.atan2(sp * Math.cos(this.gamma0) - vp * Math.sin(this.gamma0), Math.cos(this.bl * us / this.al)) / this.bl);
    }
    return p;
  }

  var names$a = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "omerc"];
  var omerc = {
    init: init$9,
    forward: forward$8,
    inverse: inverse$8,
    names: names$a
  };

  function init$a() {

    // array of:  r_maj,r_min,lat1,lat2,c_lon,c_lat,false_east,false_north
    //double c_lat;                   /* center latitude                      */
    //double c_lon;                   /* center longitude                     */
    //double lat1;                    /* first standard parallel              */
    //double lat2;                    /* second standard parallel             */
    //double r_maj;                   /* major axis                           */
    //double r_min;                   /* minor axis                           */
    //double false_east;              /* x offset in meters                   */
    //double false_north;             /* y offset in meters                   */

    if (!this.lat2) {
      this.lat2 = this.lat1;
    } //if lat2 is not defined
    if (!this.k0) {
      this.k0 = 1;
    }
    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    // Standard Parallels cannot be equal and on opposite sides of the equator
    if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
      return;
    }

    var temp = this.b / this.a;
    this.e = Math.sqrt(1 - temp * temp);

    var sin1 = Math.sin(this.lat1);
    var cos1 = Math.cos(this.lat1);
    var ms1 = msfnz(this.e, sin1, cos1);
    var ts1 = tsfnz(this.e, this.lat1, sin1);

    var sin2 = Math.sin(this.lat2);
    var cos2 = Math.cos(this.lat2);
    var ms2 = msfnz(this.e, sin2, cos2);
    var ts2 = tsfnz(this.e, this.lat2, sin2);

    var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));

    if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
      this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
    }
    else {
      this.ns = sin1;
    }
    if (isNaN(this.ns)) {
      this.ns = sin1;
    }
    this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
    this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
    if (!this.title) {
      this.title = "Lambert Conformal Conic";
    }
  }

  // Lambert Conformal conic forward equations--mapping lat,long to x,y
  // -----------------------------------------------------------------
  function forward$9(p) {

    var lon = p.x;
    var lat = p.y;

    // singular cases :
    if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
      lat = sign(lat) * (HALF_PI - 2 * EPSLN);
    }

    var con = Math.abs(Math.abs(lat) - HALF_PI);
    var ts, rh1;
    if (con > EPSLN) {
      ts = tsfnz(this.e, lat, Math.sin(lat));
      rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
    }
    else {
      con = lat * this.ns;
      if (con <= 0) {
        return null;
      }
      rh1 = 0;
    }
    var theta = this.ns * adjust_lon(lon - this.long0);
    p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
    p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

    return p;
  }

  // Lambert Conformal Conic inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  function inverse$9(p) {

    var rh1, con, ts;
    var lat, lon;
    var x = (p.x - this.x0) / this.k0;
    var y = (this.rh - (p.y - this.y0) / this.k0);
    if (this.ns > 0) {
      rh1 = Math.sqrt(x * x + y * y);
      con = 1;
    }
    else {
      rh1 = -Math.sqrt(x * x + y * y);
      con = -1;
    }
    var theta = 0;
    if (rh1 !== 0) {
      theta = Math.atan2((con * x), (con * y));
    }
    if ((rh1 !== 0) || (this.ns > 0)) {
      con = 1 / this.ns;
      ts = Math.pow((rh1 / (this.a * this.f0)), con);
      lat = phi2z(this.e, ts);
      if (lat === -9999) {
        return null;
      }
    }
    else {
      lat = -HALF_PI;
    }
    lon = adjust_lon(theta / this.ns + this.long0);

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$b = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_2SP", "lcc"];
  var lcc = {
    init: init$a,
    forward: forward$9,
    inverse: inverse$9,
    names: names$b
  };

  function init$b() {
    this.a = 6377397.155;
    this.es = 0.006674372230614;
    this.e = Math.sqrt(this.es);
    if (!this.lat0) {
      this.lat0 = 0.863937979737193;
    }
    if (!this.long0) {
      this.long0 = 0.7417649320975901 - 0.308341501185665;
    }
    /* if scale not set default to 0.9999 */
    if (!this.k0) {
      this.k0 = 0.9999;
    }
    this.s45 = 0.785398163397448; /* 45 */
    this.s90 = 2 * this.s45;
    this.fi0 = this.lat0;
    this.e2 = this.es;
    this.e = Math.sqrt(this.e2);
    this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2));
    this.uq = 1.04216856380474;
    this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
    this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
    this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
    this.k1 = this.k0;
    this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
    this.s0 = 1.37008346281555;
    this.n = Math.sin(this.s0);
    this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
    this.ad = this.s90 - this.uq;
  }

  /* ellipsoid */
  /* calculate xy from lat/lon */
  /* Constants, identical to inverse transform function */
  function forward$a(p) {
    var gfi, u, deltav, s, d, eps, ro;
    var lon = p.x;
    var lat = p.y;
    var delta_lon = adjust_lon(lon - this.long0);
    /* Transformation */
    gfi = Math.pow(((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat))), (this.alfa * this.e / 2));
    u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
    deltav = -delta_lon * this.alfa;
    s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
    d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
    eps = this.n * d;
    ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
    p.y = ro * Math.cos(eps) / 1;
    p.x = ro * Math.sin(eps) / 1;

    if (!this.czech) {
      p.y *= -1;
      p.x *= -1;
    }
    return (p);
  }

  /* calculate lat/lon from xy */
  function inverse$a(p) {
    var u, deltav, s, d, eps, ro, fi1;
    var ok;

    /* Transformation */
    /* revert y, x*/
    var tmp = p.x;
    p.x = p.y;
    p.y = tmp;
    if (!this.czech) {
      p.y *= -1;
      p.x *= -1;
    }
    ro = Math.sqrt(p.x * p.x + p.y * p.y);
    eps = Math.atan2(p.y, p.x);
    d = eps / Math.sin(this.s0);
    s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
    u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
    deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
    p.x = this.long0 - deltav / this.alfa;
    fi1 = u;
    ok = 0;
    var iter = 0;
    do {
      p.y = 2 * (Math.atan(Math.pow(this.k, - 1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
      if (Math.abs(fi1 - p.y) < 0.0000000001) {
        ok = 1;
      }
      fi1 = p.y;
      iter += 1;
    } while (ok === 0 && iter < 15);
    if (iter >= 15) {
      return null;
    }

    return (p);
  }

  var names$c = ["Krovak", "krovak"];
  var krovak = {
    init: init$b,
    forward: forward$a,
    inverse: inverse$a,
    names: names$c
  };

  function mlfn(e0, e1, e2, e3, phi) {
    return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi));
  }

  function e0fn(x) {
    return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)));
  }

  function e1fn(x) {
    return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)));
  }

  function e2fn(x) {
    return (0.05859375 * x * x * (1 + 0.75 * x));
  }

  function e3fn(x) {
    return (x * x * x * (35 / 3072));
  }

  function gN(a, e, sinphi) {
    var temp = e * sinphi;
    return a / Math.sqrt(1 - temp * temp);
  }

  function adjust_lat(x) {
    return (Math.abs(x) < HALF_PI) ? x : (x - (sign(x) * Math.PI));
  }

  function imlfn(ml, e0, e1, e2, e3) {
    var phi;
    var dphi;

    phi = ml / e0;
    for (var i = 0; i < 15; i++) {
      dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
      phi += dphi;
      if (Math.abs(dphi) <= 0.0000000001) {
        return phi;
      }
    }

    //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
    return NaN;
  }

  function init$c() {
    if (!this.sphere) {
      this.e0 = e0fn(this.es);
      this.e1 = e1fn(this.es);
      this.e2 = e2fn(this.es);
      this.e3 = e3fn(this.es);
      this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
    }
  }

  /* Cassini forward equations--mapping lat,long to x,y
    -----------------------------------------------------------------------*/
  function forward$b(p) {

    /* Forward equations
        -----------------*/
    var x, y;
    var lam = p.x;
    var phi = p.y;
    lam = adjust_lon(lam - this.long0);

    if (this.sphere) {
      x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
      y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
    }
    else {
      //ellipsoid
      var sinphi = Math.sin(phi);
      var cosphi = Math.cos(phi);
      var nl = gN(this.a, this.e, sinphi);
      var tl = Math.tan(phi) * Math.tan(phi);
      var al = lam * Math.cos(phi);
      var asq = al * al;
      var cl = this.es * cosphi * cosphi / (1 - this.es);
      var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);

      x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
      y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);


    }

    p.x = x + this.x0;
    p.y = y + this.y0;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$b(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var x = p.x / this.a;
    var y = p.y / this.a;
    var phi, lam;

    if (this.sphere) {
      var dd = y + this.lat0;
      phi = Math.asin(Math.sin(dd) * Math.cos(x));
      lam = Math.atan2(Math.tan(x), Math.cos(dd));
    }
    else {
      /* ellipsoid */
      var ml1 = this.ml0 / this.a + y;
      var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
      if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
        p.x = this.long0;
        p.y = HALF_PI;
        if (y < 0) {
          p.y *= -1;
        }
        return p;
      }
      var nl1 = gN(this.a, this.e, Math.sin(phi1));

      var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
      var tl1 = Math.pow(Math.tan(phi1), 2);
      var dl = x * this.a / nl1;
      var dsq = dl * dl;
      phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
      lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);

    }

    p.x = adjust_lon(lam + this.long0);
    p.y = adjust_lat(phi);
    return p;

  }

  var names$d = ["Cassini", "Cassini_Soldner", "cass"];
  var cass = {
    init: init$c,
    forward: forward$b,
    inverse: inverse$b,
    names: names$d
  };

  function qsfnz(eccent, sinphi) {
    var con;
    if (eccent > 1.0e-7) {
      con = eccent * sinphi;
      return ((1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con))));
    }
    else {
      return (2 * sinphi);
    }
  }

  /*
    reference
      "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
      The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
    */

  var S_POLE = 1;

  var N_POLE = 2;
  var EQUIT = 3;
  var OBLIQ = 4;

  /* Initialize the Lambert Azimuthal Equal Area projection
    ------------------------------------------------------*/
  function init$d() {
    var t = Math.abs(this.lat0);
    if (Math.abs(t - HALF_PI) < EPSLN) {
      this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
    }
    else if (Math.abs(t) < EPSLN) {
      this.mode = this.EQUIT;
    }
    else {
      this.mode = this.OBLIQ;
    }
    if (this.es > 0) {
      var sinphi;

      this.qp = qsfnz(this.e, 1);
      this.mmf = 0.5 / (1 - this.es);
      this.apa = authset(this.es);
      switch (this.mode) {
      case this.N_POLE:
        this.dd = 1;
        break;
      case this.S_POLE:
        this.dd = 1;
        break;
      case this.EQUIT:
        this.rq = Math.sqrt(0.5 * this.qp);
        this.dd = 1 / this.rq;
        this.xmf = 1;
        this.ymf = 0.5 * this.qp;
        break;
      case this.OBLIQ:
        this.rq = Math.sqrt(0.5 * this.qp);
        sinphi = Math.sin(this.lat0);
        this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
        this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
        this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
        this.ymf = (this.xmf = this.rq) / this.dd;
        this.xmf *= this.dd;
        break;
      }
    }
    else {
      if (this.mode === this.OBLIQ) {
        this.sinph0 = Math.sin(this.lat0);
        this.cosph0 = Math.cos(this.lat0);
      }
    }
  }

  /* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
    -----------------------------------------------------------------------*/
  function forward$c(p) {

    /* Forward equations
        -----------------*/
    var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
    var lam = p.x;
    var phi = p.y;

    lam = adjust_lon(lam - this.long0);
    if (this.sphere) {
      sinphi = Math.sin(phi);
      cosphi = Math.cos(phi);
      coslam = Math.cos(lam);
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        y = (this.mode === this.EQUIT) ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
        if (y <= EPSLN) {
          return null;
        }
        y = Math.sqrt(2 / y);
        x = y * cosphi * Math.sin(lam);
        y *= (this.mode === this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      }
      else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
        if (this.mode === this.N_POLE) {
          coslam = -coslam;
        }
        if (Math.abs(phi + this.lat0) < EPSLN) {
          return null;
        }
        y = FORTPI - phi * 0.5;
        y = 2 * ((this.mode === this.S_POLE) ? Math.cos(y) : Math.sin(y));
        x = y * Math.sin(lam);
        y *= coslam;
      }
    }
    else {
      sinb = 0;
      cosb = 0;
      b = 0;
      coslam = Math.cos(lam);
      sinlam = Math.sin(lam);
      sinphi = Math.sin(phi);
      q = qsfnz(this.e, sinphi);
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        sinb = q / this.qp;
        cosb = Math.sqrt(1 - sinb * sinb);
      }
      switch (this.mode) {
      case this.OBLIQ:
        b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
        break;
      case this.EQUIT:
        b = 1 + cosb * coslam;
        break;
      case this.N_POLE:
        b = HALF_PI + phi;
        q = this.qp - q;
        break;
      case this.S_POLE:
        b = phi - HALF_PI;
        q = this.qp + q;
        break;
      }
      if (Math.abs(b) < EPSLN) {
        return null;
      }
      switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        b = Math.sqrt(2 / b);
        if (this.mode === this.OBLIQ) {
          y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
        }
        else {
          y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
        }
        x = this.xmf * b * cosb * sinlam;
        break;
      case this.N_POLE:
      case this.S_POLE:
        if (q >= 0) {
          x = (b = Math.sqrt(q)) * sinlam;
          y = coslam * ((this.mode === this.S_POLE) ? b : -b);
        }
        else {
          x = y = 0;
        }
        break;
      }
    }

    p.x = this.a * x + this.x0;
    p.y = this.a * y + this.y0;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$c(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var x = p.x / this.a;
    var y = p.y / this.a;
    var lam, phi, cCe, sCe, q, rho, ab;
    if (this.sphere) {
      var cosz = 0,
        rh, sinz = 0;

      rh = Math.sqrt(x * x + y * y);
      phi = rh * 0.5;
      if (phi > 1) {
        return null;
      }
      phi = 2 * Math.asin(phi);
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        sinz = Math.sin(phi);
        cosz = Math.cos(phi);
      }
      switch (this.mode) {
      case this.EQUIT:
        phi = (Math.abs(rh) <= EPSLN) ? 0 : Math.asin(y * sinz / rh);
        x *= sinz;
        y = cosz * rh;
        break;
      case this.OBLIQ:
        phi = (Math.abs(rh) <= EPSLN) ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
        x *= sinz * this.cosph0;
        y = (cosz - Math.sin(phi) * this.sinph0) * rh;
        break;
      case this.N_POLE:
        y = -y;
        phi = HALF_PI - phi;
        break;
      case this.S_POLE:
        phi -= HALF_PI;
        break;
      }
      lam = (y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ)) ? 0 : Math.atan2(x, y);
    }
    else {
      ab = 0;
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        x /= this.dd;
        y *= this.dd;
        rho = Math.sqrt(x * x + y * y);
        if (rho < EPSLN) {
          p.x = this.long0;
          p.y = this.lat0;
          return p;
        }
        sCe = 2 * Math.asin(0.5 * rho / this.rq);
        cCe = Math.cos(sCe);
        x *= (sCe = Math.sin(sCe));
        if (this.mode === this.OBLIQ) {
          ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
          q = this.qp * ab;
          y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
        }
        else {
          ab = y * sCe / rho;
          q = this.qp * ab;
          y = rho * cCe;
        }
      }
      else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
        if (this.mode === this.N_POLE) {
          y = -y;
        }
        q = (x * x + y * y);
        if (!q) {
          p.x = this.long0;
          p.y = this.lat0;
          return p;
        }
        ab = 1 - q / this.qp;
        if (this.mode === this.S_POLE) {
          ab = -ab;
        }
      }
      lam = Math.atan2(x, y);
      phi = authlat(Math.asin(ab), this.apa);
    }

    p.x = adjust_lon(this.long0 + lam);
    p.y = phi;
    return p;
  }

  /* determine latitude from authalic latitude */
  var P00 = 0.33333333333333333333;

  var P01 = 0.17222222222222222222;
  var P02 = 0.10257936507936507936;
  var P10 = 0.06388888888888888888;
  var P11 = 0.06640211640211640211;
  var P20 = 0.01641501294219154443;

  function authset(es) {
    var t;
    var APA = [];
    APA[0] = es * P00;
    t = es * es;
    APA[0] += t * P01;
    APA[1] = t * P10;
    t *= es;
    APA[0] += t * P02;
    APA[1] += t * P11;
    APA[2] = t * P20;
    return APA;
  }

  function authlat(beta, APA) {
    var t = beta + beta;
    return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t));
  }

  var names$e = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
  var laea = {
    init: init$d,
    forward: forward$c,
    inverse: inverse$c,
    names: names$e,
    S_POLE: S_POLE,
    N_POLE: N_POLE,
    EQUIT: EQUIT,
    OBLIQ: OBLIQ
  };

  function asinz(x) {
    if (Math.abs(x) > 1) {
      x = (x > 1) ? 1 : -1;
    }
    return Math.asin(x);
  }

  function init$e() {

    if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
      return;
    }
    this.temp = this.b / this.a;
    this.es = 1 - Math.pow(this.temp, 2);
    this.e3 = Math.sqrt(this.es);

    this.sin_po = Math.sin(this.lat1);
    this.cos_po = Math.cos(this.lat1);
    this.t1 = this.sin_po;
    this.con = this.sin_po;
    this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
    this.qs1 = qsfnz(this.e3, this.sin_po, this.cos_po);

    this.sin_po = Math.sin(this.lat2);
    this.cos_po = Math.cos(this.lat2);
    this.t2 = this.sin_po;
    this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
    this.qs2 = qsfnz(this.e3, this.sin_po, this.cos_po);

    this.sin_po = Math.sin(this.lat0);
    this.cos_po = Math.cos(this.lat0);
    this.t3 = this.sin_po;
    this.qs0 = qsfnz(this.e3, this.sin_po, this.cos_po);

    if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
      this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
    }
    else {
      this.ns0 = this.con;
    }
    this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
    this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
  }

  /* Albers Conical Equal Area forward equations--mapping lat,long to x,y
    -------------------------------------------------------------------*/
  function forward$d(p) {

    var lon = p.x;
    var lat = p.y;

    this.sin_phi = Math.sin(lat);
    this.cos_phi = Math.cos(lat);

    var qs = qsfnz(this.e3, this.sin_phi, this.cos_phi);
    var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
    var theta = this.ns0 * adjust_lon(lon - this.long0);
    var x = rh1 * Math.sin(theta) + this.x0;
    var y = this.rh - rh1 * Math.cos(theta) + this.y0;

    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$d(p) {
    var rh1, qs, con, theta, lon, lat;

    p.x -= this.x0;
    p.y = this.rh - p.y + this.y0;
    if (this.ns0 >= 0) {
      rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
      con = 1;
    }
    else {
      rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
      con = -1;
    }
    theta = 0;
    if (rh1 !== 0) {
      theta = Math.atan2(con * p.x, con * p.y);
    }
    con = rh1 * this.ns0 / this.a;
    if (this.sphere) {
      lat = Math.asin((this.c - con * con) / (2 * this.ns0));
    }
    else {
      qs = (this.c - con * con) / this.ns0;
      lat = this.phi1z(this.e3, qs);
    }

    lon = adjust_lon(theta / this.ns0 + this.long0);
    p.x = lon;
    p.y = lat;
    return p;
  }

  /* Function to compute phi1, the latitude for the inverse of the
     Albers Conical Equal-Area projection.
  -------------------------------------------*/
  function phi1z(eccent, qs) {
    var sinphi, cosphi, con, com, dphi;
    var phi = asinz(0.5 * qs);
    if (eccent < EPSLN) {
      return phi;
    }

    var eccnts = eccent * eccent;
    for (var i = 1; i <= 25; i++) {
      sinphi = Math.sin(phi);
      cosphi = Math.cos(phi);
      con = eccent * sinphi;
      com = 1 - con * con;
      dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
      phi = phi + dphi;
      if (Math.abs(dphi) <= 1e-7) {
        return phi;
      }
    }
    return null;
  }

  var names$f = ["Albers_Conic_Equal_Area", "Albers", "aea"];
  var aea = {
    init: init$e,
    forward: forward$d,
    inverse: inverse$d,
    names: names$f,
    phi1z: phi1z
  };

  /*
    reference:
      Wolfram Mathworld "Gnomonic Projection"
      http://mathworld.wolfram.com/GnomonicProjection.html
      Accessed: 12th November 2009
    */
  function init$f() {

    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    this.sin_p14 = Math.sin(this.lat0);
    this.cos_p14 = Math.cos(this.lat0);
    // Approximation for projecting points to the horizon (infinity)
    this.infinity_dist = 1000 * this.a;
    this.rc = 1;
  }

  /* Gnomonic forward equations--mapping lat,long to x,y
      ---------------------------------------------------*/
  function forward$e(p) {
    var sinphi, cosphi; /* sin and cos value        */
    var dlon; /* delta longitude value      */
    var coslon; /* cos of longitude        */
    var ksp; /* scale factor          */
    var g;
    var x, y;
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
        -----------------*/
    dlon = adjust_lon(lon - this.long0);

    sinphi = Math.sin(lat);
    cosphi = Math.cos(lat);

    coslon = Math.cos(dlon);
    g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
    ksp = 1;
    if ((g > 0) || (Math.abs(g) <= EPSLN)) {
      x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
      y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
    }
    else {

      // Point is in the opposing hemisphere and is unprojectable
      // We still need to return a reasonable point, so we project
      // to infinity, on a bearing
      // equivalent to the northern hemisphere equivalent
      // This is a reasonable approximation for short shapes and lines that
      // straddle the horizon.

      x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
      y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

    }
    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$e(p) {
    var rh; /* Rho */
    var sinc, cosc;
    var c;
    var lon, lat;

    /* Inverse equations
        -----------------*/
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    p.x /= this.k0;
    p.y /= this.k0;

    if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
      c = Math.atan2(rh, this.rc);
      sinc = Math.sin(c);
      cosc = Math.cos(c);

      lat = asinz(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh);
      lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
      lon = adjust_lon(this.long0 + lon);
    }
    else {
      lat = this.phic0;
      lon = 0;
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$g = ["gnom"];
  var gnom = {
    init: init$f,
    forward: forward$e,
    inverse: inverse$e,
    names: names$g
  };

  function iqsfnz(eccent, q) {
    var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
    if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
      if (q < 0) {
        return (-1 * HALF_PI);
      }
      else {
        return HALF_PI;
      }
    }
    //var phi = 0.5* q/(1-eccent*eccent);
    var phi = Math.asin(0.5 * q);
    var dphi;
    var sin_phi;
    var cos_phi;
    var con;
    for (var i = 0; i < 30; i++) {
      sin_phi = Math.sin(phi);
      cos_phi = Math.cos(phi);
      con = eccent * sin_phi;
      dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
      phi += dphi;
      if (Math.abs(dphi) <= 0.0000000001) {
        return phi;
      }
    }

    //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
    return NaN;
  }

  /*
    reference:
      "Cartographic Projection Procedures for the UNIX Environment-
      A User's Manual" by Gerald I. Evenden,
      USGS Open File Report 90-284and Release 4 Interim Reports (2003)
  */
  function init$g() {
    //no-op
    if (!this.sphere) {
      this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  }

  /* Cylindrical Equal Area forward equations--mapping lat,long to x,y
      ------------------------------------------------------------*/
  function forward$f(p) {
    var lon = p.x;
    var lat = p.y;
    var x, y;
    /* Forward equations
        -----------------*/
    var dlon = adjust_lon(lon - this.long0);
    if (this.sphere) {
      x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
      y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
    }
    else {
      var qs = qsfnz(this.e, Math.sin(lat));
      x = this.x0 + this.a * this.k0 * dlon;
      y = this.y0 + this.a * qs * 0.5 / this.k0;
    }

    p.x = x;
    p.y = y;
    return p;
  }

  /* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
      ------------------------------------------------------------*/
  function inverse$f(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var lon, lat;

    if (this.sphere) {
      lon = adjust_lon(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts));
      lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts));
    }
    else {
      lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
      lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$h = ["cea"];
  var cea = {
    init: init$g,
    forward: forward$f,
    inverse: inverse$f,
    names: names$h
  };

  function init$h() {

    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.lat0 = this.lat0 || 0;
    this.long0 = this.long0 || 0;
    this.lat_ts = this.lat_ts || 0;
    this.title = this.title || "Equidistant Cylindrical (Plate Carre)";

    this.rc = Math.cos(this.lat_ts);
  }

  // forward equations--mapping lat,long to x,y
  // -----------------------------------------------------------------
  function forward$g(p) {

    var lon = p.x;
    var lat = p.y;

    var dlon = adjust_lon(lon - this.long0);
    var dlat = adjust_lat(lat - this.lat0);
    p.x = this.x0 + (this.a * dlon * this.rc);
    p.y = this.y0 + (this.a * dlat);
    return p;
  }

  // inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  function inverse$g(p) {

    var x = p.x;
    var y = p.y;

    p.x = adjust_lon(this.long0 + ((x - this.x0) / (this.a * this.rc)));
    p.y = adjust_lat(this.lat0 + ((y - this.y0) / (this.a)));
    return p;
  }

  var names$i = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
  var eqc = {
    init: init$h,
    forward: forward$g,
    inverse: inverse$g,
    names: names$i
  };

  var MAX_ITER$2 = 20;

  function init$i() {
    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    this.temp = this.b / this.a;
    this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
    this.e = Math.sqrt(this.es);
    this.e0 = e0fn(this.es);
    this.e1 = e1fn(this.es);
    this.e2 = e2fn(this.es);
    this.e3 = e3fn(this.es);
    this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
  }

  /* Polyconic forward equations--mapping lat,long to x,y
      ---------------------------------------------------*/
  function forward$h(p) {
    var lon = p.x;
    var lat = p.y;
    var x, y, el;
    var dlon = adjust_lon(lon - this.long0);
    el = dlon * Math.sin(lat);
    if (this.sphere) {
      if (Math.abs(lat) <= EPSLN) {
        x = this.a * dlon;
        y = -1 * this.a * this.lat0;
      }
      else {
        x = this.a * Math.sin(el) / Math.tan(lat);
        y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
      }
    }
    else {
      if (Math.abs(lat) <= EPSLN) {
        x = this.a * dlon;
        y = -1 * this.ml0;
      }
      else {
        var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
        x = nl * Math.sin(el);
        y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
      }

    }
    p.x = x + this.x0;
    p.y = y + this.y0;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$h(p) {
    var lon, lat, x, y, i;
    var al, bl;
    var phi, dphi;
    x = p.x - this.x0;
    y = p.y - this.y0;

    if (this.sphere) {
      if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
        lon = adjust_lon(x / this.a + this.long0);
        lat = 0;
      }
      else {
        al = this.lat0 + y / this.a;
        bl = x * x / this.a / this.a + al * al;
        phi = al;
        var tanphi;
        for (i = MAX_ITER$2; i; --i) {
          tanphi = Math.tan(phi);
          dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
          phi += dphi;
          if (Math.abs(dphi) <= EPSLN) {
            lat = phi;
            break;
          }
        }
        lon = adjust_lon(this.long0 + (Math.asin(x * Math.tan(phi) / this.a)) / Math.sin(lat));
      }
    }
    else {
      if (Math.abs(y + this.ml0) <= EPSLN) {
        lat = 0;
        lon = adjust_lon(this.long0 + x / this.a);
      }
      else {

        al = (this.ml0 + y) / this.a;
        bl = x * x / this.a / this.a + al * al;
        phi = al;
        var cl, mln, mlnp, ma;
        var con;
        for (i = MAX_ITER$2; i; --i) {
          con = this.e * Math.sin(phi);
          cl = Math.sqrt(1 - con * con) * Math.tan(phi);
          mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
          mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
          ma = mln / this.a;
          dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
          phi -= dphi;
          if (Math.abs(dphi) <= EPSLN) {
            lat = phi;
            break;
          }
        }

        //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
        cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
        lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$j = ["Polyconic", "poly"];
  var poly = {
    init: init$i,
    forward: forward$h,
    inverse: inverse$h,
    names: names$j
  };

  function init$j() {
    this.A = [];
    this.A[1] = 0.6399175073;
    this.A[2] = -0.1358797613;
    this.A[3] = 0.063294409;
    this.A[4] = -0.02526853;
    this.A[5] = 0.0117879;
    this.A[6] = -0.0055161;
    this.A[7] = 0.0026906;
    this.A[8] = -0.001333;
    this.A[9] = 0.00067;
    this.A[10] = -0.00034;

    this.B_re = [];
    this.B_im = [];
    this.B_re[1] = 0.7557853228;
    this.B_im[1] = 0;
    this.B_re[2] = 0.249204646;
    this.B_im[2] = 0.003371507;
    this.B_re[3] = -0.001541739;
    this.B_im[3] = 0.041058560;
    this.B_re[4] = -0.10162907;
    this.B_im[4] = 0.01727609;
    this.B_re[5] = -0.26623489;
    this.B_im[5] = -0.36249218;
    this.B_re[6] = -0.6870983;
    this.B_im[6] = -1.1651967;

    this.C_re = [];
    this.C_im = [];
    this.C_re[1] = 1.3231270439;
    this.C_im[1] = 0;
    this.C_re[2] = -0.577245789;
    this.C_im[2] = -0.007809598;
    this.C_re[3] = 0.508307513;
    this.C_im[3] = -0.112208952;
    this.C_re[4] = -0.15094762;
    this.C_im[4] = 0.18200602;
    this.C_re[5] = 1.01418179;
    this.C_im[5] = 1.64497696;
    this.C_re[6] = 1.9660549;
    this.C_im[6] = 2.5127645;

    this.D = [];
    this.D[1] = 1.5627014243;
    this.D[2] = 0.5185406398;
    this.D[3] = -0.03333098;
    this.D[4] = -0.1052906;
    this.D[5] = -0.0368594;
    this.D[6] = 0.007317;
    this.D[7] = 0.01220;
    this.D[8] = 0.00394;
    this.D[9] = -0.0013;
  }

  /**
      New Zealand Map Grid Forward  - long/lat to x/y
      long/lat in radians
    */
  function forward$i(p) {
    var n;
    var lon = p.x;
    var lat = p.y;

    var delta_lat = lat - this.lat0;
    var delta_lon = lon - this.long0;

    // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
    // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
    var d_phi = delta_lat / SEC_TO_RAD * 1E-5;
    var d_lambda = delta_lon;
    var d_phi_n = 1; // d_phi^0

    var d_psi = 0;
    for (n = 1; n <= 10; n++) {
      d_phi_n = d_phi_n * d_phi;
      d_psi = d_psi + this.A[n] * d_phi_n;
    }

    // 2. Calculate theta
    var th_re = d_psi;
    var th_im = d_lambda;

    // 3. Calculate z
    var th_n_re = 1;
    var th_n_im = 0; // theta^0
    var th_n_re1;
    var th_n_im1;

    var z_re = 0;
    var z_im = 0;
    for (n = 1; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
      z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
    }

    // 4. Calculate easting and northing
    p.x = (z_im * this.a) + this.x0;
    p.y = (z_re * this.a) + this.y0;

    return p;
  }

  /**
      New Zealand Map Grid Inverse  -  x/y to long/lat
    */
  function inverse$i(p) {
    var n;
    var x = p.x;
    var y = p.y;

    var delta_x = x - this.x0;
    var delta_y = y - this.y0;

    // 1. Calculate z
    var z_re = delta_y / this.a;
    var z_im = delta_x / this.a;

    // 2a. Calculate theta - first approximation gives km accuracy
    var z_n_re = 1;
    var z_n_im = 0; // z^0
    var z_n_re1;
    var z_n_im1;

    var th_re = 0;
    var th_im = 0;
    for (n = 1; n <= 6; n++) {
      z_n_re1 = z_n_re * z_re - z_n_im * z_im;
      z_n_im1 = z_n_im * z_re + z_n_re * z_im;
      z_n_re = z_n_re1;
      z_n_im = z_n_im1;
      th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
      th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
    }

    // 2b. Iterate to refine the accuracy of the calculation
    //        0 iterations gives km accuracy
    //        1 iteration gives m accuracy -- good enough for most mapping applications
    //        2 iterations bives mm accuracy
    for (var i = 0; i < this.iterations; i++) {
      var th_n_re = th_re;
      var th_n_im = th_im;
      var th_n_re1;
      var th_n_im1;

      var num_re = z_re;
      var num_im = z_im;
      for (n = 2; n <= 6; n++) {
        th_n_re1 = th_n_re * th_re - th_n_im * th_im;
        th_n_im1 = th_n_im * th_re + th_n_re * th_im;
        th_n_re = th_n_re1;
        th_n_im = th_n_im1;
        num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
        num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
      }

      th_n_re = 1;
      th_n_im = 0;
      var den_re = this.B_re[1];
      var den_im = this.B_im[1];
      for (n = 2; n <= 6; n++) {
        th_n_re1 = th_n_re * th_re - th_n_im * th_im;
        th_n_im1 = th_n_im * th_re + th_n_re * th_im;
        th_n_re = th_n_re1;
        th_n_im = th_n_im1;
        den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
        den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
      }

      // Complex division
      var den2 = den_re * den_re + den_im * den_im;
      th_re = (num_re * den_re + num_im * den_im) / den2;
      th_im = (num_im * den_re - num_re * den_im) / den2;
    }

    // 3. Calculate d_phi              ...                                    // and d_lambda
    var d_psi = th_re;
    var d_lambda = th_im;
    var d_psi_n = 1; // d_psi^0

    var d_phi = 0;
    for (n = 1; n <= 9; n++) {
      d_psi_n = d_psi_n * d_psi;
      d_phi = d_phi + this.D[n] * d_psi_n;
    }

    // 4. Calculate latitude and longitude
    // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
    var lat = this.lat0 + (d_phi * SEC_TO_RAD * 1E5);
    var lon = this.long0 + d_lambda;

    p.x = lon;
    p.y = lat;

    return p;
  }

  var names$k = ["New_Zealand_Map_Grid", "nzmg"];
  var nzmg = {
    init: init$j,
    forward: forward$i,
    inverse: inverse$i,
    names: names$k
  };

  /*
    reference
      "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
      The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
    */


  /* Initialize the Miller Cylindrical projection
    -------------------------------------------*/
  function init$k() {
    //no-op
  }

  /* Miller Cylindrical forward equations--mapping lat,long to x,y
      ------------------------------------------------------------*/
  function forward$j(p) {
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
        -----------------*/
    var dlon = adjust_lon(lon - this.long0);
    var x = this.x0 + this.a * dlon;
    var y = this.y0 + this.a * Math.log(Math.tan((Math.PI / 4) + (lat / 2.5))) * 1.25;

    p.x = x;
    p.y = y;
    return p;
  }

  /* Miller Cylindrical inverse equations--mapping x,y to lat/long
      ------------------------------------------------------------*/
  function inverse$j(p) {
    p.x -= this.x0;
    p.y -= this.y0;

    var lon = adjust_lon(this.long0 + p.x / this.a);
    var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$l = ["Miller_Cylindrical", "mill"];
  var mill = {
    init: init$k,
    forward: forward$j,
    inverse: inverse$j,
    names: names$l
  };

  var MAX_ITER$3 = 20;


  function init$l() {
    /* Place parameters in static storage for common use
      -------------------------------------------------*/


    if (!this.sphere) {
      this.en = pj_enfn(this.es);
    }
    else {
      this.n = 1;
      this.m = 0;
      this.es = 0;
      this.C_y = Math.sqrt((this.m + 1) / this.n);
      this.C_x = this.C_y / (this.m + 1);
    }

  }

  /* Sinusoidal forward equations--mapping lat,long to x,y
    -----------------------------------------------------*/
  function forward$k(p) {
    var x, y;
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
      -----------------*/
    lon = adjust_lon(lon - this.long0);

    if (this.sphere) {
      if (!this.m) {
        lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
      }
      else {
        var k = this.n * Math.sin(lat);
        for (var i = MAX_ITER$3; i; --i) {
          var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
          lat -= V;
          if (Math.abs(V) < EPSLN) {
            break;
          }
        }
      }
      x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
      y = this.a * this.C_y * lat;

    }
    else {

      var s = Math.sin(lat);
      var c = Math.cos(lat);
      y = this.a * pj_mlfn(lat, s, c, this.en);
      x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
    }

    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$k(p) {
    var lat, temp, lon, s;

    p.x -= this.x0;
    lon = p.x / this.a;
    p.y -= this.y0;
    lat = p.y / this.a;

    if (this.sphere) {
      lat /= this.C_y;
      lon = lon / (this.C_x * (this.m + Math.cos(lat)));
      if (this.m) {
        lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
      }
      else if (this.n !== 1) {
        lat = asinz(Math.sin(lat) / this.n);
      }
      lon = adjust_lon(lon + this.long0);
      lat = adjust_lat(lat);
    }
    else {
      lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
      s = Math.abs(lat);
      if (s < HALF_PI) {
        s = Math.sin(lat);
        temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
        //temp = this.long0 + p.x / (this.a * Math.cos(lat));
        lon = adjust_lon(temp);
      }
      else if ((s - EPSLN) < HALF_PI) {
        lon = this.long0;
      }
    }
    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$m = ["Sinusoidal", "sinu"];
  var sinu = {
    init: init$l,
    forward: forward$k,
    inverse: inverse$k,
    names: names$m
  };

  function init$m() {}
  /* Mollweide forward equations--mapping lat,long to x,y
      ----------------------------------------------------*/
  function forward$l(p) {

    /* Forward equations
        -----------------*/
    var lon = p.x;
    var lat = p.y;

    var delta_lon = adjust_lon(lon - this.long0);
    var theta = lat;
    var con = Math.PI * Math.sin(lat);

    /* Iterate using the Newton-Raphson method to find theta
        -----------------------------------------------------*/
    while (true) {
      var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
      theta += delta_theta;
      if (Math.abs(delta_theta) < EPSLN) {
        break;
      }
    }
    theta /= 2;

    /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
         this is done here because of precision problems with "cos(theta)"
         --------------------------------------------------------------------------*/
    if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
      delta_lon = 0;
    }
    var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
    var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$l(p) {
    var theta;
    var arg;

    /* Inverse equations
        -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    arg = p.y / (1.4142135623731 * this.a);

    /* Because of division by zero problems, 'arg' can not be 1.  Therefore
         a number very close to one is used instead.
         -------------------------------------------------------------------*/
    if (Math.abs(arg) > 0.999999999999) {
      arg = 0.999999999999;
    }
    theta = Math.asin(arg);
    var lon = adjust_lon(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
    if (lon < (-Math.PI)) {
      lon = -Math.PI;
    }
    if (lon > Math.PI) {
      lon = Math.PI;
    }
    arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
    if (Math.abs(arg) > 1) {
      arg = 1;
    }
    var lat = Math.asin(arg);

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$n = ["Mollweide", "moll"];
  var moll = {
    init: init$m,
    forward: forward$l,
    inverse: inverse$l,
    names: names$n
  };

  function init$n() {

    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    // Standard Parallels cannot be equal and on opposite sides of the equator
    if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
      return;
    }
    this.lat2 = this.lat2 || this.lat1;
    this.temp = this.b / this.a;
    this.es = 1 - Math.pow(this.temp, 2);
    this.e = Math.sqrt(this.es);
    this.e0 = e0fn(this.es);
    this.e1 = e1fn(this.es);
    this.e2 = e2fn(this.es);
    this.e3 = e3fn(this.es);

    this.sinphi = Math.sin(this.lat1);
    this.cosphi = Math.cos(this.lat1);

    this.ms1 = msfnz(this.e, this.sinphi, this.cosphi);
    this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);

    if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
      this.ns = this.sinphi;
    }
    else {
      this.sinphi = Math.sin(this.lat2);
      this.cosphi = Math.cos(this.lat2);
      this.ms2 = msfnz(this.e, this.sinphi, this.cosphi);
      this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
      this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
    }
    this.g = this.ml1 + this.ms1 / this.ns;
    this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
    this.rh = this.a * (this.g - this.ml0);
  }

  /* Equidistant Conic forward equations--mapping lat,long to x,y
    -----------------------------------------------------------*/
  function forward$m(p) {
    var lon = p.x;
    var lat = p.y;
    var rh1;

    /* Forward equations
        -----------------*/
    if (this.sphere) {
      rh1 = this.a * (this.g - lat);
    }
    else {
      var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
      rh1 = this.a * (this.g - ml);
    }
    var theta = this.ns * adjust_lon(lon - this.long0);
    var x = this.x0 + rh1 * Math.sin(theta);
    var y = this.y0 + this.rh - rh1 * Math.cos(theta);
    p.x = x;
    p.y = y;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$m(p) {
    p.x -= this.x0;
    p.y = this.rh - p.y + this.y0;
    var con, rh1, lat, lon;
    if (this.ns >= 0) {
      rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
      con = 1;
    }
    else {
      rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
      con = -1;
    }
    var theta = 0;
    if (rh1 !== 0) {
      theta = Math.atan2(con * p.x, con * p.y);
    }

    if (this.sphere) {
      lon = adjust_lon(this.long0 + theta / this.ns);
      lat = adjust_lat(this.g - rh1 / this.a);
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      var ml = this.g - rh1 / this.a;
      lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
      lon = adjust_lon(this.long0 + theta / this.ns);
      p.x = lon;
      p.y = lat;
      return p;
    }

  }

  var names$o = ["Equidistant_Conic", "eqdc"];
  var eqdc = {
    init: init$n,
    forward: forward$m,
    inverse: inverse$m,
    names: names$o
  };

  /* Initialize the Van Der Grinten projection
    ----------------------------------------*/
  function init$o() {
    //this.R = 6370997; //Radius of earth
    this.R = this.a;
  }

  function forward$n(p) {

    var lon = p.x;
    var lat = p.y;

    /* Forward equations
      -----------------*/
    var dlon = adjust_lon(lon - this.long0);
    var x, y;

    if (Math.abs(lat) <= EPSLN) {
      x = this.x0 + this.R * dlon;
      y = this.y0;
    }
    var theta = asinz(2 * Math.abs(lat / Math.PI));
    if ((Math.abs(dlon) <= EPSLN) || (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN)) {
      x = this.x0;
      if (lat >= 0) {
        y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
      }
      else {
        y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
      }
      //  return(OK);
    }
    var al = 0.5 * Math.abs((Math.PI / dlon) - (dlon / Math.PI));
    var asq = al * al;
    var sinth = Math.sin(theta);
    var costh = Math.cos(theta);

    var g = costh / (sinth + costh - 1);
    var gsq = g * g;
    var m = g * (2 / sinth - 1);
    var msq = m * m;
    var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
    if (dlon < 0) {
      con = -con;
    }
    x = this.x0 + con;
    //con = Math.abs(con / (Math.PI * this.R));
    var q = asq + g;
    con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
    if (lat >= 0) {
      //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
      y = this.y0 + con;
    }
    else {
      //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
      y = this.y0 - con;
    }
    p.x = x;
    p.y = y;
    return p;
  }

  /* Van Der Grinten inverse equations--mapping x,y to lat/long
    ---------------------------------------------------------*/
  function inverse$n(p) {
    var lon, lat;
    var xx, yy, xys, c1, c2, c3;
    var a1;
    var m1;
    var con;
    var th1;
    var d;

    /* inverse equations
      -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    con = Math.PI * this.R;
    xx = p.x / con;
    yy = p.y / con;
    xys = xx * xx + yy * yy;
    c1 = -Math.abs(yy) * (1 + xys);
    c2 = c1 - 2 * yy * yy + xx * xx;
    c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
    d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
    a1 = (c1 - c2 * c2 / 3 / c3) / c3;
    m1 = 2 * Math.sqrt(-a1 / 3);
    con = ((3 * d) / a1) / m1;
    if (Math.abs(con) > 1) {
      if (con >= 0) {
        con = 1;
      }
      else {
        con = -1;
      }
    }
    th1 = Math.acos(con) / 3;
    if (p.y >= 0) {
      lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
    }
    else {
      lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
    }

    if (Math.abs(xx) < EPSLN) {
      lon = this.long0;
    }
    else {
      lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$p = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
  var vandg = {
    init: init$o,
    forward: forward$n,
    inverse: inverse$n,
    names: names$p
  };

  function init$p() {
    this.sin_p12 = Math.sin(this.lat0);
    this.cos_p12 = Math.cos(this.lat0);
  }

  function forward$o(p) {
    var lon = p.x;
    var lat = p.y;
    var sinphi = Math.sin(p.y);
    var cosphi = Math.cos(p.y);
    var dlon = adjust_lon(lon - this.long0);
    var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
    if (this.sphere) {
      if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
        //North Pole case
        p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
        p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
        return p;
      }
      else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
        //South Pole case
        p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
        p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
        return p;
      }
      else {
        //default case
        cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
        c = Math.acos(cos_c);
        kp = c ? c / Math.sin(c) : 1;
        p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
        p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
        return p;
      }
    }
    else {
      e0 = e0fn(this.es);
      e1 = e1fn(this.es);
      e2 = e2fn(this.es);
      e3 = e3fn(this.es);
      if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
        //North Pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        Ml = this.a * mlfn(e0, e1, e2, e3, lat);
        p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
        p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
        return p;
      }
      else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
        //South Pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        Ml = this.a * mlfn(e0, e1, e2, e3, lat);
        p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
        p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
        return p;
      }
      else {
        //Default case
        tanphi = sinphi / cosphi;
        Nl1 = gN(this.a, this.e, this.sin_p12);
        Nl = gN(this.a, this.e, sinphi);
        psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
        Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
        if (Az === 0) {
          s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
        }
        else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
          s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
        }
        else {
          s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
        }
        G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
        H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
        GH = G * H;
        Hs = H * H;
        s2 = s * s;
        s3 = s2 * s;
        s4 = s3 * s;
        s5 = s4 * s;
        c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
        p.x = this.x0 + c * Math.sin(Az);
        p.y = this.y0 + c * Math.cos(Az);
        return p;
      }
    }


  }

  function inverse$o(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F, sinpsi;
    if (this.sphere) {
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      if (rh > (2 * HALF_PI * this.a)) {
        return;
      }
      z = rh / this.a;

      sinz = Math.sin(z);
      cosz = Math.cos(z);

      lon = this.long0;
      if (Math.abs(rh) <= EPSLN) {
        lat = this.lat0;
      }
      else {
        lat = asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
        con = Math.abs(this.lat0) - HALF_PI;
        if (Math.abs(con) <= EPSLN) {
          if (this.lat0 >= 0) {
            lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
          }
          else {
            lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
          }
        }
        else {
          /*con = cosz - this.sin_p12 * Math.sin(lat);
          if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
            //no-op, just keep the lon value as is
          } else {
            var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
            lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
          }*/
          lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
        }
      }

      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      e0 = e0fn(this.es);
      e1 = e1fn(this.es);
      e2 = e2fn(this.es);
      e3 = e3fn(this.es);
      if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
        //North pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        M = Mlp - rh;
        lat = imlfn(M / this.a, e0, e1, e2, e3);
        lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
        p.x = lon;
        p.y = lat;
        return p;
      }
      else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
        //South pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        M = rh - Mlp;

        lat = imlfn(M / this.a, e0, e1, e2, e3);
        lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
        p.x = lon;
        p.y = lat;
        return p;
      }
      else {
        //default case
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        Az = Math.atan2(p.x, p.y);
        N1 = gN(this.a, this.e, this.sin_p12);
        cosAz = Math.cos(Az);
        tmp = this.e * this.cos_p12 * cosAz;
        A = -tmp * tmp / (1 - this.es);
        B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
        D = rh / N1;
        Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
        F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
        psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
        lon = adjust_lon(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
        sinpsi = Math.sin(psi);
        lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es));
        p.x = lon;
        p.y = lat;
        return p;
      }
    }

  }

  var names$q = ["Azimuthal_Equidistant", "aeqd"];
  var aeqd = {
    init: init$p,
    forward: forward$o,
    inverse: inverse$o,
    names: names$q
  };

  function init$q() {
    //double temp;      /* temporary variable    */

    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    this.sin_p14 = Math.sin(this.lat0);
    this.cos_p14 = Math.cos(this.lat0);
  }

  /* Orthographic forward equations--mapping lat,long to x,y
      ---------------------------------------------------*/
  function forward$p(p) {
    var sinphi, cosphi; /* sin and cos value        */
    var dlon; /* delta longitude value      */
    var coslon; /* cos of longitude        */
    var ksp; /* scale factor          */
    var g, x, y;
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
        -----------------*/
    dlon = adjust_lon(lon - this.long0);

    sinphi = Math.sin(lat);
    cosphi = Math.cos(lat);

    coslon = Math.cos(dlon);
    g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
    ksp = 1;
    if ((g > 0) || (Math.abs(g) <= EPSLN)) {
      x = this.a * ksp * cosphi * Math.sin(dlon);
      y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
    }
    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$p(p) {
    var rh; /* height above ellipsoid      */
    var z; /* angle          */
    var sinz, cosz; /* sin of z and cos of z      */
    var con;
    var lon, lat;
    /* Inverse equations
        -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    z = asinz(rh / this.a);

    sinz = Math.sin(z);
    cosz = Math.cos(z);

    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = asinz(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh);
    con = Math.abs(this.lat0) - HALF_PI;
    if (Math.abs(con) <= EPSLN) {
      if (this.lat0 >= 0) {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
      }
      else {
        lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
      }
      p.x = lon;
      p.y = lat;
      return p;
    }
    lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz), rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$r = ["ortho"];
  var ortho = {
    init: init$q,
    forward: forward$p,
    inverse: inverse$p,
    names: names$r
  };

  // QSC projection rewritten from the original PROJ4

  /* constants */
  var FACE_ENUM = {
      FRONT: 1,
      RIGHT: 2,
      BACK: 3,
      LEFT: 4,
      TOP: 5,
      BOTTOM: 6
  };

  var AREA_ENUM = {
      AREA_0: 1,
      AREA_1: 2,
      AREA_2: 3,
      AREA_3: 4
  };

  function init$r() {

    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.lat0 = this.lat0 || 0;
    this.long0 = this.long0 || 0;
    this.lat_ts = this.lat_ts || 0;
    this.title = this.title || "Quadrilateralized Spherical Cube";

    /* Determine the cube face from the center of projection. */
    if (this.lat0 >= HALF_PI - FORTPI / 2.0) {
      this.face = FACE_ENUM.TOP;
    } else if (this.lat0 <= -(HALF_PI - FORTPI / 2.0)) {
      this.face = FACE_ENUM.BOTTOM;
    } else if (Math.abs(this.long0) <= FORTPI) {
      this.face = FACE_ENUM.FRONT;
    } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
      this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
    } else {
      this.face = FACE_ENUM.BACK;
    }

    /* Fill in useful values for the ellipsoid <-> sphere shift
     * described in [LK12]. */
    if (this.es !== 0) {
      this.one_minus_f = 1 - (this.a - this.b) / this.a;
      this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
    }
  }

  // QSC forward equations--mapping lat,long to x,y
  // -----------------------------------------------------------------
  function forward$q(p) {
    var xy = {x: 0, y: 0};
    var lat, lon;
    var theta, phi;
    var t, mu;
    /* nu; */
    var area = {value: 0};

    // move lon according to projection's lon
    p.x -= this.long0;

    /* Convert the geodetic latitude to a geocentric latitude.
     * This corresponds to the shift from the ellipsoid to the sphere
     * described in [LK12]. */
    if (this.es !== 0) {//if (P->es != 0) {
      lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
    } else {
      lat = p.y;
    }

    /* Convert the input lat, lon into theta, phi as used by QSC.
     * This depends on the cube face and the area on it.
     * For the top and bottom face, we can compute theta and phi
     * directly from phi, lam. For the other faces, we must use
     * unit sphere cartesian coordinates as an intermediate step. */
    lon = p.x; //lon = lp.lam;
    if (this.face === FACE_ENUM.TOP) {
      phi = HALF_PI - lat;
      if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
        area.value = AREA_ENUM.AREA_0;
        theta = lon - HALF_PI;
      } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
        area.value = AREA_ENUM.AREA_1;
        theta = (lon > 0.0 ? lon - SPI : lon + SPI);
      } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
        area.value = AREA_ENUM.AREA_2;
        theta = lon + HALF_PI;
      } else {
        area.value = AREA_ENUM.AREA_3;
        theta = lon;
      }
    } else if (this.face === FACE_ENUM.BOTTOM) {
      phi = HALF_PI + lat;
      if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
        area.value = AREA_ENUM.AREA_0;
        theta = -lon + HALF_PI;
      } else if (lon < FORTPI && lon >= -FORTPI) {
        area.value = AREA_ENUM.AREA_1;
        theta = -lon;
      } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
        area.value = AREA_ENUM.AREA_2;
        theta = -lon - HALF_PI;
      } else {
        area.value = AREA_ENUM.AREA_3;
        theta = (lon > 0.0 ? -lon + SPI : -lon - SPI);
      }
    } else {
      var q, r, s;
      var sinlat, coslat;
      var sinlon, coslon;

      if (this.face === FACE_ENUM.RIGHT) {
        lon = qsc_shift_lon_origin(lon, +HALF_PI);
      } else if (this.face === FACE_ENUM.BACK) {
        lon = qsc_shift_lon_origin(lon, +SPI);
      } else if (this.face === FACE_ENUM.LEFT) {
        lon = qsc_shift_lon_origin(lon, -HALF_PI);
      }
      sinlat = Math.sin(lat);
      coslat = Math.cos(lat);
      sinlon = Math.sin(lon);
      coslon = Math.cos(lon);
      q = coslat * coslon;
      r = coslat * sinlon;
      s = sinlat;

      if (this.face === FACE_ENUM.FRONT) {
        phi = Math.acos(q);
        theta = qsc_fwd_equat_face_theta(phi, s, r, area);
      } else if (this.face === FACE_ENUM.RIGHT) {
        phi = Math.acos(r);
        theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
      } else if (this.face === FACE_ENUM.BACK) {
        phi = Math.acos(-q);
        theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
      } else if (this.face === FACE_ENUM.LEFT) {
        phi = Math.acos(-r);
        theta = qsc_fwd_equat_face_theta(phi, s, q, area);
      } else {
        /* Impossible */
        phi = theta = 0;
        area.value = AREA_ENUM.AREA_0;
      }
    }

    /* Compute mu and nu for the area of definition.
     * For mu, see Eq. (3-21) in [OL76], but note the typos:
     * compare with Eq. (3-14). For nu, see Eq. (3-38). */
    mu = Math.atan((12 / SPI) * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
    t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));

    /* Apply the result to the real area. */
    if (area.value === AREA_ENUM.AREA_1) {
      mu += HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_2) {
      mu += SPI;
    } else if (area.value === AREA_ENUM.AREA_3) {
      mu += 1.5 * SPI;
    }

    /* Now compute x, y from mu and nu */
    xy.x = t * Math.cos(mu);
    xy.y = t * Math.sin(mu);
    xy.x = xy.x * this.a + this.x0;
    xy.y = xy.y * this.a + this.y0;

    p.x = xy.x;
    p.y = xy.y;
    return p;
  }

  // QSC inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  function inverse$q(p) {
    var lp = {lam: 0, phi: 0};
    var mu, nu, cosmu, tannu;
    var tantheta, theta, cosphi, phi;
    var t;
    var area = {value: 0};

    /* de-offset */
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    /* Convert the input x, y to the mu and nu angles as used by QSC.
     * This depends on the area of the cube face. */
    nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
    mu = Math.atan2(p.y, p.x);
    if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
      area.value = AREA_ENUM.AREA_0;
    } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
      area.value = AREA_ENUM.AREA_1;
      mu -= HALF_PI;
    } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
      area.value = AREA_ENUM.AREA_2;
      mu = (mu < 0.0 ? mu + SPI : mu - SPI);
    } else {
      area.value = AREA_ENUM.AREA_3;
      mu += HALF_PI;
    }

    /* Compute phi and theta for the area of definition.
     * The inverse projection is not described in the original paper, but some
     * good hints can be found here (as of 2011-12-14):
     * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
     * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
    t = (SPI / 12) * Math.tan(mu);
    tantheta = Math.sin(t) / (Math.cos(t) - (1 / Math.sqrt(2)));
    theta = Math.atan(tantheta);
    cosmu = Math.cos(mu);
    tannu = Math.tan(nu);
    cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
    if (cosphi < -1) {
      cosphi = -1;
    } else if (cosphi > +1) {
      cosphi = +1;
    }

    /* Apply the result to the real area on the cube face.
     * For the top and bottom face, we can compute phi and lam directly.
     * For the other faces, we must use unit sphere cartesian coordinates
     * as an intermediate step. */
    if (this.face === FACE_ENUM.TOP) {
      phi = Math.acos(cosphi);
      lp.phi = HALF_PI - phi;
      if (area.value === AREA_ENUM.AREA_0) {
        lp.lam = theta + HALF_PI;
      } else if (area.value === AREA_ENUM.AREA_1) {
        lp.lam = (theta < 0.0 ? theta + SPI : theta - SPI);
      } else if (area.value === AREA_ENUM.AREA_2) {
        lp.lam = theta - HALF_PI;
      } else /* area.value == AREA_ENUM.AREA_3 */ {
        lp.lam = theta;
      }
    } else if (this.face === FACE_ENUM.BOTTOM) {
      phi = Math.acos(cosphi);
      lp.phi = phi - HALF_PI;
      if (area.value === AREA_ENUM.AREA_0) {
        lp.lam = -theta + HALF_PI;
      } else if (area.value === AREA_ENUM.AREA_1) {
        lp.lam = -theta;
      } else if (area.value === AREA_ENUM.AREA_2) {
        lp.lam = -theta - HALF_PI;
      } else /* area.value == AREA_ENUM.AREA_3 */ {
        lp.lam = (theta < 0.0 ? -theta - SPI : -theta + SPI);
      }
    } else {
      /* Compute phi and lam via cartesian unit sphere coordinates. */
      var q, r, s;
      q = cosphi;
      t = q * q;
      if (t >= 1) {
        s = 0;
      } else {
        s = Math.sqrt(1 - t) * Math.sin(theta);
      }
      t += s * s;
      if (t >= 1) {
        r = 0;
      } else {
        r = Math.sqrt(1 - t);
      }
      /* Rotate q,r,s into the correct area. */
      if (area.value === AREA_ENUM.AREA_1) {
        t = r;
        r = -s;
        s = t;
      } else if (area.value === AREA_ENUM.AREA_2) {
        r = -r;
        s = -s;
      } else if (area.value === AREA_ENUM.AREA_3) {
        t = r;
        r = s;
        s = -t;
      }
      /* Rotate q,r,s into the correct cube face. */
      if (this.face === FACE_ENUM.RIGHT) {
        t = q;
        q = -r;
        r = t;
      } else if (this.face === FACE_ENUM.BACK) {
        q = -q;
        r = -r;
      } else if (this.face === FACE_ENUM.LEFT) {
        t = q;
        q = r;
        r = -t;
      }
      /* Now compute phi and lam from the unit sphere coordinates. */
      lp.phi = Math.acos(-s) - HALF_PI;
      lp.lam = Math.atan2(r, q);
      if (this.face === FACE_ENUM.RIGHT) {
        lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
      } else if (this.face === FACE_ENUM.BACK) {
        lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
      } else if (this.face === FACE_ENUM.LEFT) {
        lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
      }
    }

    /* Apply the shift from the sphere to the ellipsoid as described
     * in [LK12]. */
    if (this.es !== 0) {
      var invert_sign;
      var tanphi, xa;
      invert_sign = (lp.phi < 0 ? 1 : 0);
      tanphi = Math.tan(lp.phi);
      xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
      lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
      if (invert_sign) {
        lp.phi = -lp.phi;
      }
    }

    lp.lam += this.long0;
    p.x = lp.lam;
    p.y = lp.phi;
    return p;
  }

  /* Helper function for forward projection: compute the theta angle
   * and determine the area number. */
  function qsc_fwd_equat_face_theta(phi, y, x, area) {
    var theta;
    if (phi < EPSLN) {
      area.value = AREA_ENUM.AREA_0;
      theta = 0.0;
    } else {
      theta = Math.atan2(y, x);
      if (Math.abs(theta) <= FORTPI) {
        area.value = AREA_ENUM.AREA_0;
      } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
        area.value = AREA_ENUM.AREA_1;
        theta -= HALF_PI;
      } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
        area.value = AREA_ENUM.AREA_2;
        theta = (theta >= 0.0 ? theta - SPI : theta + SPI);
      } else {
        area.value = AREA_ENUM.AREA_3;
        theta += HALF_PI;
      }
    }
    return theta;
  }

  /* Helper function: shift the longitude. */
  function qsc_shift_lon_origin(lon, offset) {
    var slon = lon + offset;
    if (slon < -SPI) {
      slon += TWO_PI;
    } else if (slon > +SPI) {
      slon -= TWO_PI;
    }
    return slon;
  }

  var names$s = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
  var qsc = {
    init: init$r,
    forward: forward$q,
    inverse: inverse$q,
    names: names$s
  };

  // Robinson projection

  var COEFS_X = [
      [1.0000, 2.2199e-17, -7.15515e-05, 3.1103e-06],
      [0.9986, -0.000482243, -2.4897e-05, -1.3309e-06],
      [0.9954, -0.00083103, -4.48605e-05, -9.86701e-07],
      [0.9900, -0.00135364, -5.9661e-05, 3.6777e-06],
      [0.9822, -0.00167442, -4.49547e-06, -5.72411e-06],
      [0.9730, -0.00214868, -9.03571e-05, 1.8736e-08],
      [0.9600, -0.00305085, -9.00761e-05, 1.64917e-06],
      [0.9427, -0.00382792, -6.53386e-05, -2.6154e-06],
      [0.9216, -0.00467746, -0.00010457, 4.81243e-06],
      [0.8962, -0.00536223, -3.23831e-05, -5.43432e-06],
      [0.8679, -0.00609363, -0.000113898, 3.32484e-06],
      [0.8350, -0.00698325, -6.40253e-05, 9.34959e-07],
      [0.7986, -0.00755338, -5.00009e-05, 9.35324e-07],
      [0.7597, -0.00798324, -3.5971e-05, -2.27626e-06],
      [0.7186, -0.00851367, -7.01149e-05, -8.6303e-06],
      [0.6732, -0.00986209, -0.000199569, 1.91974e-05],
      [0.6213, -0.010418, 8.83923e-05, 6.24051e-06],
      [0.5722, -0.00906601, 0.000182, 6.24051e-06],
      [0.5322, -0.00677797, 0.000275608, 6.24051e-06]
  ];

  var COEFS_Y = [
      [-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11],
      [0.0620, 0.0124, -1.26793e-09, 4.22642e-10],
      [0.1240, 0.0124, 5.07171e-09, -1.60604e-09],
      [0.1860, 0.0123999, -1.90189e-08, 6.00152e-09],
      [0.2480, 0.0124002, 7.10039e-08, -2.24e-08],
      [0.3100, 0.0123992, -2.64997e-07, 8.35986e-08],
      [0.3720, 0.0124029, 9.88983e-07, -3.11994e-07],
      [0.4340, 0.0123893, -3.69093e-06, -4.35621e-07],
      [0.4958, 0.0123198, -1.02252e-05, -3.45523e-07],
      [0.5571, 0.0121916, -1.54081e-05, -5.82288e-07],
      [0.6176, 0.0119938, -2.41424e-05, -5.25327e-07],
      [0.6769, 0.011713, -3.20223e-05, -5.16405e-07],
      [0.7346, 0.0113541, -3.97684e-05, -6.09052e-07],
      [0.7903, 0.0109107, -4.89042e-05, -1.04739e-06],
      [0.8435, 0.0103431, -6.4615e-05, -1.40374e-09],
      [0.8936, 0.00969686, -6.4636e-05, -8.547e-06],
      [0.9394, 0.00840947, -0.000192841, -4.2106e-06],
      [0.9761, 0.00616527, -0.000256, -4.2106e-06],
      [1.0000, 0.00328947, -0.000319159, -4.2106e-06]
  ];

  var FXC = 0.8487;
  var FYC = 1.3523;
  var C1 = R2D/5; // rad to 5-degree interval
  var RC1 = 1/C1;
  var NODES = 18;

  var poly3_val = function(coefs, x) {
      return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
  };

  var poly3_der = function(coefs, x) {
      return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
  };

  function newton_rapshon(f_df, start, max_err, iters) {
      var x = start;
      for (; iters; --iters) {
          var upd = f_df(x);
          x -= upd;
          if (Math.abs(upd) < max_err) {
              break;
          }
      }
      return x;
  }

  function init$s() {
      this.x0 = this.x0 || 0;
      this.y0 = this.y0 || 0;
      this.long0 = this.long0 || 0;
      this.es = 0;
      this.title = this.title || "Robinson";
  }

  function forward$r(ll) {
      var lon = adjust_lon(ll.x - this.long0);

      var dphi = Math.abs(ll.y);
      var i = Math.floor(dphi * C1);
      if (i < 0) {
          i = 0;
      } else if (i >= NODES) {
          i = NODES - 1;
      }
      dphi = R2D * (dphi - RC1 * i);
      var xy = {
          x: poly3_val(COEFS_X[i], dphi) * lon,
          y: poly3_val(COEFS_Y[i], dphi)
      };
      if (ll.y < 0) {
          xy.y = -xy.y;
      }

      xy.x = xy.x * this.a * FXC + this.x0;
      xy.y = xy.y * this.a * FYC + this.y0;
      return xy;
  }

  function inverse$r(xy) {
      var ll = {
          x: (xy.x - this.x0) / (this.a * FXC),
          y: Math.abs(xy.y - this.y0) / (this.a * FYC)
      };

      if (ll.y >= 1) { // pathologic case
          ll.x /= COEFS_X[NODES][0];
          ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
      } else {
          // find table interval
          var i = Math.floor(ll.y * NODES);
          if (i < 0) {
              i = 0;
          } else if (i >= NODES) {
              i = NODES - 1;
          }
          for (;;) {
              if (COEFS_Y[i][0] > ll.y) {
                  --i;
              } else if (COEFS_Y[i+1][0] <= ll.y) {
                  ++i;
              } else {
                  break;
              }
          }
          // linear interpolation in 5 degree interval
          var coefs = COEFS_Y[i];
          var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i+1][0] - coefs[0]);
          // find t so that poly3_val(coefs, t) = ll.y
          t = newton_rapshon(function(x) {
              return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
          }, t, EPSLN, 100);

          ll.x /= poly3_val(COEFS_X[i], t);
          ll.y = (5 * i + t) * D2R;
          if (xy.y < 0) {
              ll.y = -ll.y;
          }
      }

      ll.x = adjust_lon(ll.x + this.long0);
      return ll;
  }

  var names$t = ["Robinson", "robin"];
  var robin = {
    init: init$s,
    forward: forward$r,
    inverse: inverse$r,
    names: names$t
  };

  function init$t() {
      this.name = 'geocent';

  }

  function forward$s(p) {
      var point = geodeticToGeocentric(p, this.es, this.a);
      return point;
  }

  function inverse$s(p) {
      var point = geocentricToGeodetic(p, this.es, this.a, this.b);
      return point;
  }

  var names$u = ["Geocentric", 'geocentric', "geocent", "Geocent"];
  var geocent = {
      init: init$t,
      forward: forward$s,
      inverse: inverse$s,
      names: names$u
  };

  var mode = {
    N_POLE: 0,
    S_POLE: 1,
    EQUIT: 2,
    OBLIQ: 3
  };

  var params = {
    h:     { def: 100000, num: true },           // default is Karman line, no default in PROJ.7
    azi:   { def: 0, num: true, degrees: true }, // default is North
    tilt:  { def: 0, num: true, degrees: true }, // default is Nadir
    long0: { def: 0, num: true },                // default is Greenwich, conversion to rad is automatic
    lat0:  { def: 0, num: true }                 // default is Equator, conversion to rad is automatic
  };

  function init$u() {
    Object.keys(params).forEach(function (p) {
      if (typeof this[p] === "undefined") {
        this[p] = params[p].def;
      } else if (params[p].num && isNaN(this[p])) {
        throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
      } else if (params[p].num) {
        this[p] = parseFloat(this[p]);
      }
      if (params[p].degrees) {
        this[p] = this[p] * D2R;
      }
    }.bind(this));

    if (Math.abs((Math.abs(this.lat0) - HALF_PI)) < EPSLN) {
      this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
    } else if (Math.abs(this.lat0) < EPSLN) {
      this.mode = mode.EQUIT;
    } else {
      this.mode = mode.OBLIQ;
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }

    this.pn1 = this.h / this.a;  // Normalize relative to the Earth's radius

    if (this.pn1 <= 0 || this.pn1 > 1e10) {
      throw new Error("Invalid height");
    }
    
    this.p = 1 + this.pn1;
    this.rp = 1 / this.p;
    this.h1 = 1 / this.pn1;
    this.pfact = (this.p + 1) * this.h1;
    this.es = 0;

    var omega = this.tilt;
    var gamma = this.azi;
    this.cg = Math.cos(gamma);
    this.sg = Math.sin(gamma);
    this.cw = Math.cos(omega);
    this.sw = Math.sin(omega);
  }

  function forward$t(p) {
    p.x -= this.long0;
    var sinphi = Math.sin(p.y);
    var cosphi = Math.cos(p.y);
    var coslam = Math.cos(p.x);
    var x, y;
    switch (this.mode) {
      case mode.OBLIQ:
        y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
        break;
      case mode.EQUIT:
        y = cosphi * coslam;
        break;
      case mode.S_POLE:
        y = -sinphi;
        break;
      case mode.N_POLE:
        y = sinphi;
        break;
    }
    y = this.pn1 / (this.p - y);
    x = y * cosphi * Math.sin(p.x);

    switch (this.mode) {
      case mode.OBLIQ:
        y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
        break;
      case mode.EQUIT:
        y *= sinphi;
        break;
      case mode.N_POLE:
        y *= -(cosphi * coslam);
        break;
      case mode.S_POLE:
        y *= cosphi * coslam;
        break;
    }

    // Tilt 
    var yt, ba;
    yt = y * this.cg + x * this.sg;
    ba = 1 / (yt * this.sw * this.h1 + this.cw);
    x = (x * this.cg - y * this.sg) * this.cw * ba;
    y = yt * ba;

    p.x = x * this.a;
    p.y = y * this.a;
    return p;
  }

  function inverse$t(p) {
    p.x /= this.a;
    p.y /= this.a;
    var r = { x: p.x, y: p.y };

    // Un-Tilt
    var bm, bq, yt;
    yt = 1 / (this.pn1 - p.y * this.sw);
    bm = this.pn1 * p.x * yt;
    bq = this.pn1 * p.y * this.cw * yt;
    p.x = bm * this.cg + bq * this.sg;
    p.y = bq * this.cg - bm * this.sg;

    var rh = hypot(p.x, p.y);
    if (Math.abs(rh) < EPSLN) {
      r.x = 0;
      r.y = p.y;
    } else {
      var cosz, sinz;
      sinz = 1 - rh * rh * this.pfact;
      sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
      cosz = Math.sqrt(1 - sinz * sinz);
      switch (this.mode) {
        case mode.OBLIQ:
          r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
          p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
          p.x *= sinz * this.cosph0;
          break;
        case mode.EQUIT:
          r.y = Math.asin(p.y * sinz / rh);
          p.y = cosz * rh;
          p.x *= sinz;
          break;
        case mode.N_POLE:
          r.y = Math.asin(cosz);
          p.y = -p.y;
          break;
        case mode.S_POLE:
          r.y = -Math.asin(cosz);
          break;
      }
      r.x = Math.atan2(p.x, p.y);
    }

    p.x = r.x + this.long0;
    p.y = r.y;
    return p;
  }

  var names$v = ["Tilted_Perspective", "tpers"];
  var tpers = {
    init: init$u,
    forward: forward$t,
    inverse: inverse$t,
    names: names$v
  };

  function includedProjections(proj4){
    proj4.Proj.projections.add(tmerc);
    proj4.Proj.projections.add(etmerc);
    proj4.Proj.projections.add(utm);
    proj4.Proj.projections.add(sterea);
    proj4.Proj.projections.add(stere);
    proj4.Proj.projections.add(somerc);
    proj4.Proj.projections.add(omerc);
    proj4.Proj.projections.add(lcc);
    proj4.Proj.projections.add(krovak);
    proj4.Proj.projections.add(cass);
    proj4.Proj.projections.add(laea);
    proj4.Proj.projections.add(aea);
    proj4.Proj.projections.add(gnom);
    proj4.Proj.projections.add(cea);
    proj4.Proj.projections.add(eqc);
    proj4.Proj.projections.add(poly);
    proj4.Proj.projections.add(nzmg);
    proj4.Proj.projections.add(mill);
    proj4.Proj.projections.add(sinu);
    proj4.Proj.projections.add(moll);
    proj4.Proj.projections.add(eqdc);
    proj4.Proj.projections.add(vandg);
    proj4.Proj.projections.add(aeqd);
    proj4.Proj.projections.add(ortho);
    proj4.Proj.projections.add(qsc);
    proj4.Proj.projections.add(robin);
    proj4.Proj.projections.add(geocent);
    proj4.Proj.projections.add(tpers);
  }

  proj4.defaultDatum = 'WGS84'; //default datum
  proj4.Proj = Projection;
  proj4.WGS84 = new proj4.Proj('WGS84');
  proj4.Point = Point;
  proj4.toPoint = common;
  proj4.defs = defs;
  proj4.transform = transform;
  proj4.mgrs = mgrs;
  proj4.version = '__VERSION__';
  includedProjections(proj4);

  const registerProjection = (code, proj4Str, options = {}) => {
    proj4.defs(code, proj4Str);
    proj4$1.register(proj4);
    const opt = Object.assign({
      code
    }, options);
    return new proj$1.Projection(opt);
  };

  var proj = {
    registerProjection
  };

  var oles = {
    layer: layer$1,
    source: source$1,
    proj
  };

  return oles;

})));
