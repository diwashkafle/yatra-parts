import { create } from "zustand";

interface Product {
  name: string;
  category: string;
  description: string;
  crossedPrice: number;
  sellingPrice: number;
  costPrice: number;
  numOfProduct: number;
  regularSizes: string[]; // Ensure proper type
  extraSizes: string[];
  image: string; // Fixed typo from `imager` to `image`
}

interface ProductState {
  products: Product[]; // Stores the list of products
  addProduct: (cat: Partial<Product>) => void;
  fetchProducts: () => Promise<void>; // Fetch products from API
}

export const useProductStore = create<ProductState>((set) => ({
  products: [], // Initial empty product list

  addProduct: (productPartial: Partial<Product>) =>{
    set((state) => ({
      products: [
        ...state.products,
        {
          name: "",
          category: "",
          description: "",
          crossedPrice: 0,
          sellingPrice: 0,
          costPrice: 0,
          numOfProduct: 0,
          regularSizes: [],
          extraSizes: [],
          image: "",
          ...productPartial,
        }
      ]
    }))
  },
  fetchProducts: async () => {
    try {
      const response = await fetch("/api/products/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({})

      }); // Fetch from backend
      const data = await response.json();
      set({ products: data }); // Store fetched products in Zustand
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
