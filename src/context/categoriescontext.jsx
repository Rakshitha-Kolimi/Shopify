import { useState } from "react";
import { createContext } from "react";
import SHOP_DATA from '/home/kolimi/shopify/src/shop-data.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.util";
import { useEffect } from "react";
export const CategoriesContext = createContext({categoriesMap:{},});

export const CategoriesProvider = ({children})=>{
   const [categoriesMap,setCategoriesMap] = useState({});

   useEffect(()=>{
    const getCategoriesMap = async () =>
    {
        const categoryMap = await getCategoriesAndDocuments('categories')
        setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
   },[])
   useEffect(()=>{addCollectionAndDocuments('categories',SHOP_DATA)},[])
   const value = {categoriesMap};
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}
