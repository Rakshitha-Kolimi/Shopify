import { CartContext } from "../../context/cart.context";
import { useContext } from "react";
import '/home/kolimi/shopify/src/routes/checkout/checkout.styles.scss';
import { CheckoutItems } from "../../components/checkout-items/checkout-items.component";

export const Checkout = () =>
{
    const {cartItems} = useContext(CartContext);
    const total = cartItems.reduce((a,curr)=>
     a+(curr.quantity * curr.price)
    ,0)
   return ( 
    <div className='checkout-container'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    { cartItems.map((cartItem)=>
        {
    return (<div>
        <CheckoutItems key={cartItem.id} cartItem={cartItem}/>
        </div>
    )})}
    <span className="total">Total: {total}</span>
    </div>)
}