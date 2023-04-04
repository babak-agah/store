export interface ProductInShoppingCart {
  productId: string;
  sku: string;
  qty: string;
}
export interface ShoppingCartInstace {
  _id: string;
  userId: string;
  products: ProductInShoppingCart[];
  saveFroNextBuy: ProductInShoppingCart[];
}

export type ShoppingCart = ShoppingCartInstace & Document;
