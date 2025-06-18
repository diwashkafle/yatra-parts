'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoIosAddCircle } from "react-icons/io"
import ProductInput from "./ProductInput"
import ProgressUI from "@/components/userfull/ProgressUI"
// import { UseProductUploadComponent } from "@/store/ProductUploadComponentStore"
import { useState } from "react"

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    crossedPrice: "",
    sellingPrice: "",
    costPrice: "",
    numOfProduct: "",
    regularSizes: [] as string[],
    extraSizes: [] as string[],
    image: "",
  });

  const isFirstStepValid = () => {
    // Check if name has at least 2 words
    const nameWords = product.name.trim().split(/\s+/);
    const isNameValid = nameWords.length >= 2;

    // Check if prices are valid numbers greater than 0
    const isCrossedPriceValid = parseFloat(product.crossedPrice) > 0;
    const isSellingPriceValid = parseFloat(product.sellingPrice) > 0;
    const isCostPriceValid = parseFloat(product.costPrice) > 0;

    return (
      isNameValid &&
      product.category.trim() !== "" &&
      product.description.trim() !== "" &&
      isCrossedPriceValid &&
      isSellingPriceValid &&
      isCostPriceValid
    );
  };

  const isSecondStepValid = () => {
    return (
      (product.regularSizes.length > 0 || product.extraSizes.length > 0) &&
      product.image !== ""
    );
  };

  

  

  const handleNext = () => {
    if (currentStep === 1 && isFirstStepValid()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (isSecondStepValid()) {
      // Handle final submission
      console.log("Form submitted:", product);
    }
  };

  const validationErrors = currentStep === 1 
    // ? getFirstStepErrors() 
    // : getSecondStepErrors();

  return (
    <div>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-gray-200 border-[1px] flex rounded-lg px-2 p-1 items-center sm:space-x-4">
            <span className='hidden sm:flex'>
                Add Product
            </span>
            <IoIosAddCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[560px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
           <ProgressUI/>
        </DialogHeader>
        <section>
          <ProductInput
            product={product}
            setProduct={setProduct}
          />

        </section>
        <DialogFooter>
          <Button 
          disabled={!isFirstStepValid()}
          className={!isFirstStepValid() ? "opacity-50 cursor-not-allowed" : ""}
          >Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddProduct