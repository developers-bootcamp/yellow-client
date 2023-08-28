import React, { useEffect, useState } from "react";
import { UseCrud } from "../redux/useCrud";
import { IProductCatagory } from "../types/IProductCategories";

const CatalogManager: React.FC = () => {
    const { getData, postData, putData } = UseCrud();
    const [categories, setCategories] = useState<IProductCatagory[]>([]);
    const [products, setProducts] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: "", desc: "" });
    const [updatedategory, setUpdatedCategory] = useState<IProductCatagory>();
    const [showForm, setShowForm] = useState(false);
    const [isNew, setIsNew] = useState(true);
    
    const getFunc = async (url: string) => {
        let result = await getData(url);
        if (url === "categories") setCategories(result);
        if (url === "products") setProducts(result);
      };
    
      useEffect(() => {
        getFunc("categories");
        getFunc("products");
      }, []);
    return (

        <p>catalog Manager here</p>

    );
};
export default CatalogManager;