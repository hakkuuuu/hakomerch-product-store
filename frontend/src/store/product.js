import { create } from "zustand";

// Create and export the `useProductStore` store.
export const useProductStore = create((set) => ({
    // 1. State definition: `products` is an array to hold the list of products.
    products: [],

    // 2. Action to set the products array: 
    // This function allows updating the `products` state with a new array.
    setProducts: (products) => set({ products }),

    // 3. Action to create a new product asynchronously:
    createProduct: async (newProduct) => {
        const { name, price, category, image, description } = newProduct;

        // Validate required fields
        if (!name || !price || !category || !image || !description) {
            return { success: false, message: "Please provide all fields, including an image." };
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("image", image);

        // Make an API request to create the product
        const res = await fetch("/api/products", {
            method: "POST",
            body: formData, // Use FormData as the request body
        });

        // Parse the response JSON data
        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        // Update the `products` state by appending the newly created product
        set((state) => ({ products: [...state.products, data.data] }));

        // Return a success response
        return { success: true, message: "Product created successfully." };
    },


    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },


    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));

        return { success: true, message: data.message };
    },

    editProduct: async (pid, updatedProduct) => {
        const { name, price, category, image, description } = updatedProduct;

        // Validate required fields
        if (!name || !price || !category || !description) {
            return { success: false, message: "Please provide all fields (image is optional)." };
        }

        // Create FormData to handle the image upload
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", description);

        if (image) {
            formData.append("image", image); // Add image only if it's updated
        }

        // Make an API request to update the product
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            body: formData, // Use FormData as the request body
        });

        const data = await res.json();

        if (!data.success) {
            return { success: false, message: data.message };
        }

        // Update the `products` state by replacing the edited product
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));

        return { success: true, message: "Product updated successfully." };
    },

}));