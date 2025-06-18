"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useCategoryStore } from "@/store/CategoryStore";
import CategoryDelBtn from "./CategoryDelBtn";
import CategoryEditBtn from "./CategoryEditBtn";

const RemoveCategory = () => {
  const categories = useCategoryStore((state) => state.categories);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Categories</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> List of Categories</DialogTitle>
          <DialogDescription>
            Make changes to categories here.
          </DialogDescription>
        </DialogHeader>
        {categories.length === 0 ? (
          <p>No categories available!</p>
        ) : (
          categories.map((category, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between border-gray-200 border-[1px] p-1 rounded-lg"
              >
                <p>{category.name}</p>
                <div className="flex space-x-4 ">
                  <CategoryEditBtn category={category} />
                  <CategoryDelBtn  category={category}/>
                </div>
              </div>
            );
          })
        )}
        <DialogFooter>
            <DialogClose asChild>
            <Button>Done</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveCategory;
