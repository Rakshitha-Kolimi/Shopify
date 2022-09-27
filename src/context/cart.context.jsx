import { useState } from "react";
import { createContext } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
export const CartContext = createContext({isCartOpen:false,
setIsCartOpen:()=>{}, cartItems:[],
addItemToCart: ()=>{},
removeItemFromCart: ()=>{},
clearItemFromCart: ()=>{}
}
);
export const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
   );

  if (existingCartItem.quantity===1) {
    return cartItems.filter((cartItem) =>
      cartItem.id !== cartItemToRemove.id
    );
  }
  return cartItems.map((cartItem) =>
  cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  //return [...cartItems, { ...productToAdd, quantity: 1 }];
)}

export const clearCartItem = (cartItems,itemToRemove)=>{
const existingCartItem = cartItems.find(
  (cartItem) => cartItem.id === itemToRemove.id
 );
 if (existingCartItem.quantity===1) {
  return cartItems.filter((cartItem) =>
    cartItem.id !== itemToRemove.id
  );
}
}

export const CartProvider = ({children}) => {
      const [isCartOpen,setIsCartOpen]=useState(false);
      const[cartItems,setCartItems] = useState([]);

      const addItemToCart = (productToAdd) => {
       setCartItems(addCartItem(cartItems,productToAdd))
      }
      const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove))
       }
       const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems,cartItemToRemove))
       }
      const value = {isCartOpen,setIsCartOpen,addItemToCart,removeItemFromCart,clearItemFromCart,cartItems};
    return (
        <CartContext.Provider value={value}>
          {children}
        </CartContext.Provider>
    )
}