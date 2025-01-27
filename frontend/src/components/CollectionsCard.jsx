/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/product';

export default function CollectionsCard({ product }) {
  const { name, price, category, image, _id } = product;
  const navigate = useNavigate();
  const { deleteProduct } = useProductStore();

  const [isModalOpen, setModalOpen] = useState(false); // State to handle modal visibility
  const [productToDelete, setProductToDelete] = useState(null); // Store product ID to delete

  const handleEdit = () => {
    navigate(`/edit/${_id}`);
    console.log(`Editing product: ${name}`);
  };

  const confirmDelete = (pid) => {
    setProductToDelete(pid);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(productToDelete);
    setModalOpen(false);

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

  const BASE_URL = `https://hakomerch-product-store.onrender.com`;

  return (
    <div className="bg-white shadow-md overflow-hidden hover:bg-gray-100">
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
          onClick={() => confirmDelete(_id)} // Open modal for confirmation
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg text-gray-900">
              Are you sure you want to delete{' '}
              <strong>&quot;{name}&quot;</strong>?
            </h2>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-white border border-gray-900 text-gray-900 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
