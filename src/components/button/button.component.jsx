import '/home/kolimi/shopify/src/components/sign-up/button.styles.scss';
const Button=({children,buttonType,...otherProps}) =>{
    const Button_Type_classes={
        google: 'google-sign-in',
        inverted: 'inverted',

    }
return(
    <button className={`button-container ${Button_Type_classes[buttonType]}`} {...otherProps} >
    {children}
    </button>
)
}
export default Button;