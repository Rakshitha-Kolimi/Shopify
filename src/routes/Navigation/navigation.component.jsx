import {Fragment,useContext} from 'react'
import {Outlet} from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.util';
import { UserContext } from '../../context/user.context';
import {ReactComponent as CrwnLogo} from '/home/kolimi/shopify/src/Assets/crown.svg';
import { LogoContainer, NavigationContainer, NavLinks } from './navigation.styles';
import { CartIcon } from '../../components/cart-icon/cart-icon.component';
import { CartDropdown } from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';
import { NavLink } from 'react-router-dom';
const Navigation =  ()=>{
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
  }

  export default Navigation;