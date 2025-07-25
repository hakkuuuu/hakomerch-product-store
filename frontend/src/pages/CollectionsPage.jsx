import { useEffect, useState } from 'react';
import { useProductStore } from '../store/product';
import CollectionsCard from '../components/CollectionsCard';
import { toast } from 'react-toastify';

export default function CollectionsPage() {
  const { fetchProducts, products } = useProductStore();
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        await fetchProducts();
      } catch (error) {
        console.error('Failed to fetch products:', error);
        if (retryCount < 3) {
          toast.info('Server is starting up, please wait...', {
            autoClose: 3000
          });
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 5000);
        } else {
          toast.error('Failed to load products. Please refresh the page.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts, retryCount]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
        {retryCount > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Server is warming up, please wait... (Attempt {retryCount}/3)
          </p>
        )}
      </div>
    );
  }

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
