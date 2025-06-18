"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  import { Button } from "@/components/ui/button";
import TextArea from "./TextArea";
import { useProductStore } from "@/store/ProductStore";


const TextEditor = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {

  const addProduct = useProductStore((state)=>state.addProduct);
 
  const validation = ()=>{
    if(value.length>200){
      return false
    }else{
      return true
    }
  }

  console.log(validation())
   

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-full">
        <input 
            type='text'
            placeholder='Write product description here...'
            required
            className='border-gray-200 border-[1px] rounded-lg p-1 px-2 w-full'
            />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" flex items-center flex-col w-full">
          <DrawerHeader>
            <DrawerTitle>Product Description</DrawerTitle>
          </DrawerHeader>
          <TextArea initialText="About the product" onChange={onChange} />
          <DrawerFooter>
            <p className="text-xs text-green-700 text-center">Description should be more than 200 words</p>
          <DrawerClose asChild>
          <Button
          onClick={()=>addProduct({description:value})}
          disabled={validation()}
          >Done</Button>
          </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TextEditor;

