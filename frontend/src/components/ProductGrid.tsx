import { useEffect, useState } from 'react';

interface Product {
  id: number;
  nameEn: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);
  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>{p.nameEn}</div>
      ))}
    </div>
  );
}
