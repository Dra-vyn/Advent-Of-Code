export const computeFuelValue = (module) =>
  Math.floor(module / 3) - 2;

export const evalModules = (modules, fn) =>
  modules.split("\n").map(x => fn(+x));

export const fuelOfFuel = (modules) => {
  const moduleData = { mass: modules, totalFuel: 0 };
  while (moduleData.mass > 5) {
    moduleData.mass = computeFuelValue(moduleData.mass);
    moduleData.totalFuel += moduleData.mass;
  }
  return moduleData.totalFuel;
}

export const totalFuelRequired = (modules, fn) => 
  evalModules(modules, fn)
    .reduce((sumOfFuel, fuel) => sumOfFuel + fuel, 0);

export const part1 = (modules) =>
    totalFuelRequired(modules, computeFuelValue)

export const part2 = (modules) => 
  totalFuelRequired(modules, fuelOfFuel)