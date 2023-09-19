const normaliseValue = (val: number, max: number, min: number) =>
  (val - min) / (max - min);

export default normaliseValue;
