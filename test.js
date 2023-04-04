db.products.find({ _id: ObjectId('642ab9285a7151148d100c8c') });
db.products.updateOne({ _id: ObjectId('642ab9285a7151148d100c8c') }, [
  {
    $addFields: {
      productItems: {
        $filter: {
          input: '$productItems',
          as: 'product_item',
          cond: {
            $ne: ['$$product_item.sku', 200],
          },
        },
      },
    },
  },
  {
    $addFields: {
      productItems: {
        $concatArrays: ['$productItems', [{ sku: 500, price: 0 }]],
      },
    },
  },
]);

// $addFields: {
//   productItems: {

// $concatArrays: ['$productItems', [{ sku: 500, price: 0 }]],

//   },
// },
