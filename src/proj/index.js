import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import { Projection } from 'ol/proj';

const registerProjection = (code, proj4Str, options = {}) => {
  proj4.defs(code, proj4Str);
  register(proj4);
  const opt = Object.assign({ code }, options);
  return new Projection(opt);
};
export { registerProjection };
