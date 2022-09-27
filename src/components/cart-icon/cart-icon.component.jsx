import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { ReactComponent as ShoppingIcon } from '/home/kolimi/shopify/src/Assets/shopping-bag.svg';
import  '/home/kolimi/shopify/src/components/cart-icon/cart-icon.styles.scss';
export const CartIcon = () =>{
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    const toggleIsCartOpen = () =>setIsCartOpen(!isCartOpen);
    const {cartItems} = useContext(CartContext);
    const itemCount = cartItems.reduce((a,curr)=>
        a + curr.quantity
    ,0)

return(

    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}
        </span>
    </div>
)
}