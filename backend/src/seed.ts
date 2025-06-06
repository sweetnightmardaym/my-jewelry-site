import dataSource from '../ormconfig';
import { Category } from './entities/Category';
import { Product } from './entities/Product';

async function seed() {
  await dataSource.initialize();

  const rings = new Category();
  rings.slug = 'rings';
  rings.nameRu = 'Кольца';
  rings.nameUa = 'Кільця';
  rings.nameEn = 'Rings';
  await dataSource.manager.save(rings);

  const bracelets = new Category();
  bracelets.slug = 'bracelets';
  bracelets.nameRu = 'Браслеты';
  bracelets.nameUa = 'Браслети';
  bracelets.nameEn = 'Bracelets';
  await dataSource.manager.save(bracelets);

  const p1 = new Product();
  p1.slug = 'ring-test';
  p1.nameRu = 'Тестовое кольцо';
  p1.nameUa = 'Тестове кільце';
  p1.nameEn = 'Test Ring';
  p1.price = 1000;
  p1.currency = 'UAH';
  p1.category = rings;
  await dataSource.manager.save(p1);

  const p2 = new Product();
  p2.slug = 'bracelet-test';
  p2.nameRu = 'Тестовый браслет';
  p2.nameUa = 'Тестовий браслет';
  p2.nameEn = 'Test Bracelet';
  p2.price = 1500;
  p2.currency = 'UAH';
  p2.category = bracelets;
  await dataSource.manager.save(p2);

  const p3 = new Product();
  p3.slug = 'necklace-test';
  p3.nameRu = 'Тестовое ожерелье';
  p3.nameUa = 'Тестове намисто';
  p3.nameEn = 'Test Necklace';
  p3.price = 2000;
  p3.currency = 'UAH';
  p3.category = rings;
  await dataSource.manager.save(p3);

  console.log('Seed completed');
  await dataSource.destroy();
}

seed().catch((err) => console.error(err));
