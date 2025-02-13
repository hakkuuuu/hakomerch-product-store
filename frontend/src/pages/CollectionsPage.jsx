import { useEffect } from 'react';
import { useProductStore } from '../store/product';
import CollectionsCard from '../components/CollectionsCard';

export default function CollectionsPage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center pt-32">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-8">
          {products.map((product) => (
            <CollectionsCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-10">No products available.</p>
      )}
    </div>
  );
}
