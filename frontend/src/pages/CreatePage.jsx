import { useState } from 'react';
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
  });

  const { createProduct } = useProductStore();

  const handleNewProduct = async () => {
    setIsLoading(true); // Start the loading state.
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct); // Call Zustand store.

    // Display toast notifications based on the response.
    if (success) {
      toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setIsLoading(false); // Stop the loading state.
  };

  return (
    <div id="about" className="flex flex-col items-center justify-center pt-32">
      <h2 className="text-center text-2xl">Create New Product</h2>

      <div className="w-full lg:w-1/2 bg-white p-10 shadow-lg mt-6">
        <form className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-gray-800 font-medium">
              Product Name
            </label>
            <input
              required
              type="text"
              name="productName"
              value={newProduct.name}
              placeholder="e.g Unsealed Album"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-800 font-medium">Price</label>
            <input
              required
              type="text"
              name="price"
              value={newProduct.price}
              placeholder="e.g $199.00"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-800 font-medium">Category</label>
            <input
              required
              type="text"
              name="category"
              value={newProduct.category}
              placeholder="Select a category"
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-800 font-medium">Image</label>
            <input
              required
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-800 font-medium">
              Description
            </label>
            <textarea
              required
              rows="4"
              name="description"
              value={newProduct.description}
              placeholder="Description"
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleNewProduct}
            className={`w-full py-3 transition ${
              isLoading
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            {isLoading ? 'Creating a product...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
