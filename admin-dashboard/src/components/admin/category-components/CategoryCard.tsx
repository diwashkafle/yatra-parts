'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useEffect } from 'react'
import { useCategoryStore } from "@/store/CategoryStore";

interface CatetoryCardProps {
  onCategorySelect?: (category: string) => void;
}

const CategoryCard: React.FC<CatetoryCardProps> = () => {

  const categories = useCategoryStore((state)=>state.categories);
  const fetchCategories = useCategoryStore((state)=>state.fetchCategories)

  useEffect(()=>{
    fetchCategories();
  },[])
  
  return (
    <Select>
    <SelectTrigger className="w-[300px]">
      <SelectValue placeholder="Select a Category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Categories</SelectLabel>
       {
        categories.length === 0 ? 
        <p>No categories available!</p>:
        categories.map((category,index)=>{
          return (
            <SelectItem value={category.name} key={index} >{category.name}</SelectItem>
          )
        })
       }
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

export default CategoryCard


