const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

// list filter
const listProducts = (ids, productsList) =>
  productsList.filter((product) => ids.includes(product.id));

// list map products
const listProductsMap = (productsList) =>
  productsList.map((product) => ({
    name: product.name,
    category: product.category,
  }));

// list map category
const listCategoryMap = (productsList) =>
  productsList.map((product) => product.category);

// category unique id
const categoryUnique = (categories) => [...new Set(categories)];

// type promotion
const promotionType = (categories, promotions) => {
  switch (categories.length) {
    case 1:
      return promotions[0];
    case 2:
      return promotions[1];
    case 3:
      return promotions[2];
    case 4:
      return promotions[3];
    default:
      return 'EMPTY';
  }
};

// total buy
const totCart = (products, promotion, checkDescont) => {
  return products.reduce((prev, curr) => {
    if (checkDescont) {
      const objPrice = curr.promotions.find((value) =>
        value.looks.includes(promotion)
      );

      if (objPrice) {
        return prev + objPrice.price;
      }
    }

    return prev + curr.regularPrice;
  }, 0);
};

// function base
function getShoppingCart(ids, productsList) {
  const checkDescont = true;
  const filterProducts = listProducts(ids, productsList);
  const products = listProductsMap(filterProducts);

  const promotion = promotionType(
    categoryUnique(listCategoryMap(products)),
    promotions
  );

  const totalPrice = totCart(filterProducts, promotion, checkDescont).toFixed(
    2
  );

  const totalOrig = totCart(filterProducts, promotion, !checkDescont).toFixed(
    2
  );

  const discountValue = (totalOrig - totalPrice).toFixed(2);
  const discount = `${((discountValue * 100) / totalOrig).toFixed(2)}%`;

  return { products, promotion, totalPrice, discountValue, discount };
}

module.exports = { getShoppingCart };
