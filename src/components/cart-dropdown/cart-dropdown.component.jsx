import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import '/home/kolimi/shopify/src/components/cart-dropdown/cart-dropdown.styles.scss';

export const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

     const oncheckoutHandler = () =>{
        navigate('/checkout');
     }
return (
    <div className='cart-dropdown-container'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <Button type="submit" onClick={oncheckoutHandler}>CHECKOUT</Button>
  </div>
)

}