/* eslint-disable react/prop-types */

import { toast } from 'react-toastify';
import { useProductStore } from '../store/product';

export default function CollectionsCard({ product }) {
  const { name, price, category, image } = product;

  const { deleteProduct } = useProductStore();

  const handleEdit = () => {
    console.log(`Editing product: ${name}`);
  };

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    console.log(`Deleting product: ${name}`);

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
  };

  const BASE_URL = `${import.meta.env.VITE_API_URL}/uploads/`;
  return (
    <div className="bg-white shadow-md overflow-hidden  hover:bg-gray-100">
      <img
        src={`${BASE_URL}${image}`}
        alt={name}
        className="w-[380px] h-72 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg text-gray-900 font-semibold mb-2">{name}</h2>
        <p className="text-gray-700">Price: ${price}</p>
        <p className="text-gray-700">Category: {category}</p>
      </div>
      <div className="flex justify-end p-4 gap-1">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
