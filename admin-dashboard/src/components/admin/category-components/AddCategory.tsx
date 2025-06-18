'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from '../../ui/button';
import { toast } from "sonner";
import { useCategoryStore } from '@/store/CategoryStore';



const AddCategory = () => {

    const [categoryValue, setCategoryValue] = useState("");
    const [isvalid, setIsvalid] = useState(true);

    const addCategory = useCategoryStore((state)=>state.addCategory);
    // const categories = useCategoryStore((state) => state.categories);

    const AddHandler = async ()=>{
        if(categoryValue === "" || categoryValue.length<2){
            setIsvalid(false);
            setCategoryValue(" ");
        }else{
            try {
                const res = await fetch("/api/category/add",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({name:categoryValue}),
                });
                const data = await res.json();
    
                if(res.ok){
                toast(data.message)
                addCategory({id:data.category.id,name:categoryValue})
                }
                setIsvalid(true)
                setCategoryValue(" ")
            } catch (error) {
                console.error("Error adding category",error)
            }
        }
    }
  return (
        <Dialog>
                <DialogTrigger asChild>
               <Button variant={"outline"} className="border-gray-200 border-[1px] flex rounded-lg px-2 p-1 items-center sm:space-x-4">
                {/* className="border-gray-200 border-[1px] flex rounded-lg px-2 p-1 items-center sm:space-x-4" */}
              <span className='hidden sm:flex'> Add Category</span>
               <IoIosAddCircle size={20} />
               </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">Add Category</DialogTitle>
                    <DialogDescription className="text-left">
                     Fill the input box with the name of category and click on add to create new category.
                    </DialogDescription>
                  </DialogHeader>
                  <input
                  className={isvalid?'border-gray-200 border-[1px] p-1 px-2 focus:outline-none rounded-lg':'border-red-600 border-[1px] p-1 px-2 focus:outline-none rounded-lg mt-1'}
                   type='text'
                   placeholder='e.g Women Formal...'
                   onChange={(e)=>setCategoryValue(e.target.value)}
                   value={categoryValue}
                   />
                   {
                    !isvalid&&<p className='text-red-600'>Category field value can not be less then 2 character!</p>
                   }
                  <DialogFooter className="flex items-center">
                    <Button onClick={AddHandler} >Add</Button>
                    <DialogClose asChild>
                    <Button variant={'outline'} >Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
  )
}

export default AddCategory