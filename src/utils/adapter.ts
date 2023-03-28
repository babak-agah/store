export function adapter<T extends {}, S>(
  data: S,
  convert: { [key in keyof typeof data]?: keyof T },
  remove?: (keyof typeof data)[],
) {
  let t: any = {};

  Object.keys(data).forEach((key) => {
    if (remove?.find((e) => e === key)) return;

    if (convert[key]) {
      t[convert[key]] = data[key];
    } else {
      t[key] = data[key];
    }
  });

  return t as T;
}

type Record1<K, T> = {
  [P in keyof K]: keyof T;
};

interface ProductModel {
  _id: string;
}

const t: Record1<ProductModel, { id: string }> = {
  _id: 'id',
};

export type Projection<T> = Partial<{ [key in keyof T]: boolean }>;
