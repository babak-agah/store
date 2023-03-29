import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

const products = [
  {
    name: 'shirt',
    categoryId: '64231ee1dfaead4157a05f56',
    description:
      'Good Omens is one of the funniest works of fiction ever. Pratchett and Gaiman have managed to create a story that weaves together large doses of satire, cynicism, slapstick and wacky unconventional humour into a cohesive yet surprisingly accurate observation of human life all over the world. The characters, one of the biggest strengths in this book, bring a lot of charm and humour to the book. This collaboration between two fine fantasy authors is nothing short of brilliant.',
    userId: '6421e1b3114508b7aa83ab36',
    price: 30,
  },
  {
    name: 'pants',
    categoryId: '64231ee1dfaead4157a05f56',
    description:
      'Good Omens is one of the funniest works of fiction ever. Pratchett and Gaiman have managed to create a story that weaves together large doses of satire, cynicism, slapstick and wacky unconventional humour into a cohesive yet surprisingly accurate observation of human life all over the world. The characters, one of the biggest strengths in this book, bring a lot of charm and humour to the book. This collaboration between two fine fantasy authors is nothing short of brilliant.',
    userId: '6421e1b3114508b7aa83ab36',
    price: 30,
  },
];

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    products.forEach((product) => {
      service.createProduct(product, '6421e1b3114508b7aa83ab36');
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
