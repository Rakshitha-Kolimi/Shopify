import { useNavigate } from "react-router-dom";

 const CategoryItem = ({category}) =>{
    const {title,imageUrl,route} = category;
    const Navigate = useNavigate();

    const onNavigateHandler=  () => Navigate(route);
    return(
        <div className="directory-container" onClick={onNavigateHandler}>
            <div className='background-image' style={{backgroundImage:`url(${imageUrl})`}}/>
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
          </div>
    )
 }

 export default CategoryItem;