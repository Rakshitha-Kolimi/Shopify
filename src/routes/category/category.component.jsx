import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categoriescontext";
import '/home/kolimi/shopify/src/routes/category/category.style.scss'
const Category = () => {
   const {category} = useParams();
   const {categoriesMap } = useContext(CategoriesContext);
   const [products,setProducts] = useState(categoriesMap[category]);
   useEffect(()=>{setProducts(categoriesMap[category])},[category,categoriesMap])

   return(
    <div>
    <h2 className="title">{category.toUpperCase()}</h2>
    <div className="category-container">
        {
           products&& products.map((product)=>
            <ProductCard key={product.id} product={product}/>)
        }
    </div>
    </div>
   )
}
export default Category;