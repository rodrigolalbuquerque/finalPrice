const getFullPrice = (obj) => {
  let sum = 0;
  for (let prod in obj) {
    sum = sum + obj[prod][0];
  }
  return sum.toFixed(2);
};

function GetWeight(productsPricesObject, fullPrice) {
  const productsWeightsObject = {};
  for (let prod in productsPricesObject) {
    let value = ((100 * productsPricesObject[prod][0]) / fullPrice).toFixed(2);
    productsWeightsObject[prod] = value;
  }
  return { ...productsWeightsObject };
}

function GetNewValues(productsWeightsObject, totalPricePaid) {
  const newPricesProductObject = {};
  for (let prod in productsWeightsObject) {
    let value = ((totalPricePaid * productsWeightsObject[prod]) / 100).toFixed(
      2,
    );
    newPricesProductObject[prod] = value;
  }
  return { ...newPricesProductObject };
}

const dividePriceByAmount = (newPricesObject, OldPricesObject) => {
  const finalObject = {};
  for (item in newPricesObject) {
    finalObject[item] = (
      newPricesObject[item] / OldPricesObject[item][1]
    ).toFixed(2);
  }
  return { ...finalObject };
};

const novosValores = GetNewValues();

const getNewPrices = (pricesObject, totalPricePaid) => {
  const fullPrice = getFullPrice(pricesObject);
  const tpp = totalPricePaid ? totalPricePaid : fullPrice;
  const productsWeightsObject = GetWeight(pricesObject, fullPrice);
  const newPricesProductObject = GetNewValues(productsWeightsObject, tpp);
  const finalPricesObject = dividePriceByAmount(
    newPricesProductObject,
    pricesObject,
  );
  console.log(finalPricesObject);
};

// ------------------------------------------------------------------------------------------------

const testObject = {
  nescau: [6, 2],
  jujuba: [4, 3],
  beringela: [5, 5],
};

const newValues = getNewPrices(testObject, 8);
