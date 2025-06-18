import { create } from "zustand";

interface Section {
  value: "1" | "2";
}

interface ProductUploadComponent {
  section: Section;
 componentOne:(()=>void);
 componentTwo:(()=>void);
}

export const UseProductUploadComponent = create<ProductUploadComponent>((set) => ({
  section:{value:"1"},

  componentOne: ()=> set({section:{value:"1"}}),

  componentTwo: ()=> set({section:{value:"2"}})
}));
