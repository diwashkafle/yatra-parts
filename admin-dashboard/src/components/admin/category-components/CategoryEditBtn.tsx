import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiEdit } from "react-icons/bi";
import { useCategoryStore } from "@/store/CategoryStore";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

interface category{
    id : string;
    name: string;
}

const CategoryEditBtn = ({category}:{category:category}) => {

    const [updatedValue, SetUpdatedValue] = useState<string>(category.name);
    const updateCategory = useCategoryStore((state)=>state.updateCategory);

    const UpdateButtonHandler = async() =>
        {
            try {
                const res = await fetch("/api/category/update",{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({id:category.id,name:updatedValue})
                })

                const data = await res.json();
                if(res.ok){
                    updateCategory(category.id,updatedValue);
                    toast("Category updated successfully!")
                }
            } catch (error) {
                console.error("Error while updating category", error)
            }
        }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BiEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to Category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input 
            id="name" 
            type="text"
            value={updatedValue} 
            onChange={(e)=>SetUpdatedValue(e.target.value)}
            className="" />
          </div>
        <DialogFooter>
            <DialogClose asChild>
            <Button onClick={UpdateButtonHandler}>Save changes</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryEditBtn;
