function meterUnitConvert(unit) {
  let meterPerUnit = 1;
  switch (unit.toUpperCase()) {
    case 'DEGREES':
      meterPerUnit = (Math.PI * 2 * 6378137) / 360;
      break;
    case 'KILOMETER':
      meterPerUnit = 1.0e-3;
      break;
    case 'INCH':
      meterPerUnit = 1 / 2.5399999918e-2;
      break;
    case 'FOOT':
      meterPerUnit = 0.3048;
      break;
  }
  return meterPerUnit;
}

const resolutionToScale = (resolution, dpi, unit) => {
  var inchPerMeter = 1 / 0.0254;
  const meterPerUnit = meterUnitConvert(unit);
  return 1 / (resolution * dpi * inchPerMeter * meterPerUnit);
};


export { resolutionToScale };
