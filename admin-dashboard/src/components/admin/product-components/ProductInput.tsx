"use client";
import React from "react";
import CategoryCard from "../category-components/CategoryCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ImageUploadBtn from "./ImageUploadBtn";
import TextEditor from "./TextEditor";

interface ProductInputProps {
    product: {
      name: string;
      category: string;
      description: string;
      crossedPrice: string;
      sellingPrice: string;
      costPrice: string;
      numOfProduct: string;
      regularSizes: string[];
      extraSizes: string[];
      image: string;
    };
    setProduct: React.Dispatch<
      React.SetStateAction<{
        name: string;
        category: string;
        description: string;
        crossedPrice: string;
        sellingPrice: string;
        costPrice: string;
        numOfProduct: string;
        regularSizes: string[];
        extraSizes: string[];
        image: string;
      }>
    >;
  }
  

const ProductInput: React.FC<ProductInputProps> = ({
   product, setProduct
}) => {

    const setDescription = (content: string) => {
        setProduct((prev) => ({ ...prev, description: content }));
      };
      const setName = (content: string) => {
        setProduct((prev) => ({ ...prev, name: content }));
      };
      const setCategory = (content: string) => {
        setProduct((prev) => ({ ...prev, category: content }));
      };
      const setCrossedPrice = (content: string) => {
        setProduct((prev) => ({ ...prev, crossedPrice: content }));
      };
      const setCostPrice = (content: string) => {
        setProduct((prev) => ({ ...prev, costPrice: content }));
      };
      const setSellingPrice = (content: string) => {
        setProduct((prev) => ({ ...prev, sellingPrice: content }));
      };
      const setNumOfProduct = (content: string) => {
        setProduct((prev) => ({ ...prev, numOfProduct: content }));
      };
      
  const regularsizes = ["S", "M", "L", "XL", "XXL"];

  const extrasizes = ["31", "32", "33", "34", "35"];

  const handleRegularSizeChange = (size: string, checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      regularSizes: checked 
        ? [...prev.regularSizes, size]
        : prev.regularSizes.filter((s) => s !== size)
    }));
  };

  const handleExtraSizeChange = (size: string, checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      extraSizes: checked
        ? [...prev.extraSizes, size]
        : prev.extraSizes.filter((s) => s !== size)
    }));
  };

  const handleImageSelect = (imageUrl: string) => {
    setProduct(prev => ({
      ...prev,
      imageUrl: imageUrl
    }));
  };

  return (
    <main className="flex flex-col space-y-4">
      <section className="flex flex-col space-y-4">
        <p>Product Information</p>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name of product"
            required
            value={product.name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-200 border-[1px] rounded-lg p-1 px-2 w-full"
          />
          <CategoryCard onCategorySelect={setCategory} />
          <TextEditor value={product.description} onChange={setDescription} />
        </div>
      </section>
      <section className="flex flex-col space-y-4">
        <p>Product Inventory and Pricing</p>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Crossed price"
            required
            value={product.crossedPrice}
            onChange={(e) => setCrossedPrice(e.target.value)}
            className="border-gray-200 border-[1px] rounded-lg p-1 px-2 w-full"
          />
          <input
            type="number"
            placeholder="Selling price"
            required
            value={product.sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="border-gray-200 border-[1px] rounded-lg p-1 px-2 w-full"
          />
          <input
            type="number"
            placeholder="Cost price"
            required
            value={product.costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            className="border-gray-200 border-[1px] rounded-lg p-1 px-2 w-full"
          />
          <input
            type="number"
            placeholder="No. of product"
            required
            value={product.numOfProduct}
            onChange={(e) => setNumOfProduct(e.target.value)}
            className="border-gray-200 border-[1px] rounded-lg p-1 px-2 w-full"
          />
        </div>
      </section>

      <section className="hidden">
        <div className="flex flex-col space-y-4">
          <p>Available sizes</p>
          <section className="flex flex-col space-y-3">
            <p className="text-sm font-semibold">Regular sizes</p>
            <div className="flex space-x-4">
              {regularsizes.map((size, index) => (
                <div key={index} className="flex space-x-1 items-center">
                  <Checkbox 
                    checked={product.regularSizes.includes(size)}
                    onCheckedChange={(checked) => 
                      handleRegularSizeChange(size, checked as boolean)
                    }
                  />
                  <Label>{size}</Label>
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-col space-y-3">
            <p className="text-sm font-semibold">Extra sizes</p>
            <div className="flex space-x-4">
              {extrasizes.map((size, index) => (
                <div key={index} className="flex space-x-1 items-center">
                  <Checkbox 
                    checked={product.extraSizes.includes(size)}
                    onCheckedChange={(checked) => 
                      handleExtraSizeChange(size, checked as boolean)
                    }
                  />
                  <Label>{size}</Label>
                </div>
              ))}
            </div>
          </section>
        </div>
        <p>Upload product images</p>
        <div>
          <ImageUploadBtn onImageSelect={handleImageSelect} />
        </div>
      </section>
    </main>
  );
};

export default ProductInput;
