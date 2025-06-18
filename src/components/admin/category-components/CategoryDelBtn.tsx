import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useCategoryStore } from "@/store/CategoryStore";
import { MdDeleteOutline } from "react-icons/md"
import { toast } from "sonner";

interface category{
    id : string;
    name: string;
}
  
  export default function CategoryDelBtn({category}:{category:category}) {

    const removeCategory = useCategoryStore((state)=>state.removeCategory);

    const DelBtnHandle = async ()=>{
        try {
            const res = await fetch("/api/category/delete",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:category.id})
            })

            const data = await res.json();

            if(res.ok){
                removeCategory(category.id);
                toast(data.message);
            }
        } catch (error) {
            
        }
    }
        
    
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button className="hover:text-red-600">
                    <MdDeleteOutline size={20} />
                  </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={DelBtnHandle}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  