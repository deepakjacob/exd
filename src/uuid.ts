const gen4 = () =>
  Math.random()
    .toString(16)
    .slice(-4);

const uuid = (prefix: string) =>
  (prefix || "").concat([gen4(), gen4(), gen4(), gen4(), gen4(), gen4(), gen4(), gen4()].join("-"));

export default uuid;
