/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPage = () => {
  const { products, editProduct } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product to edit
  const existingProduct = products.find((product) => product._id === id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize form values with the existing product details
  useEffect(() => {
    if (existingProduct) {
      setForm({
        name: existingProduct.name,
        price: existingProduct.price,
        category: existingProduct.category,
        description: existingProduct.description,
        image: null, // Image is not pre-filled
      });
    }
  }, [existingProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Log form data before submitting
      console.log('Form data before submission:', form);

      const response = await editProduct(id, form);

      if (response.success) {
        toast.success(response.message, {
          /* toast options */
        });
        navigate('/collections');
      } else {
        toast.error(response.message || 'Failed to update the product', {
          /* toast options */
        });
      }
    } catch (error) {
      toast.error('An error occurred while updating the product.', {
        /* toast options */
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!existingProduct) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-32">
      <h2 className="text-center text-2xl">Edit Product</h2>
      <div className="w-full lg:w-1/2 bg-white p-10 shadow-lg mt-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Price</label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Category</label>
            <select
              required
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Album">Album</option>
              <option value="Photocard">Photocard</option>
              <option value="Lightstick">Lightstick</option>
              <option value="Magazine">Magazine</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-medium">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleInputChange}
              className="w-full border border-gray-400 bg-white px-4 py-3 mt-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 transition ${
              isLoading
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            {isLoading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
