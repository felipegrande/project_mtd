import { useEffect, useState } from 'react'
import './styles.scss'
import { useCart } from '../../context/CartContext'


interface IAddToCardProps {
    name: string;
    price: number;
    thumbnail: string;

}

const AddToCart: React.FC<IAddToCardProps> = ({ name, price, thumbnail }) => {

    const { cartItems, addItemToCart, updateCartItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    const itemIsCart = cartItems.find(cartItem => cartItem.name === name);


    const addItemToCartHandler = () => {
        const item = { name, quantity: 1, price, thumbnail };

        if (!!itemIsCart) {
            updateCartItem({ ...itemIsCart, quantity: itemIsCart.quantity + 1 });
        } else {
            addItemToCart(item);
        }
    };

    const increaseQuantity = () => {
        addItemToCartHandler();
    };

    const decreaseQuantity = () => {
        if (itemIsCart && itemIsCart?.quantity > 1) {
            updateCartItem({ ...itemIsCart, quantity: itemIsCart.quantity - 1 });
        } else if (itemIsCart?.quantity === 1) {
            updateCartItem({ ...itemIsCart, quantity: 0 });
        }
    };



    return (
        <div className="container__addtocart">
            <div className={`container__addtocart_content ${!!itemIsCart ? 'active' : ''}`} >
                {!!itemIsCart ? (
                    <div className="container__addtocart_content_quantityselector" >
                        <div className="container__addtocart_content_remove" onClick={decreaseQuantity}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z" /></svg>
                        </div>
                        <span className="container__addtocart_content_value">{itemIsCart?.quantity}</span>
                        <div className="container__addtocart_content_add" onClick={increaseQuantity}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg>
                        </div>

                    </div>
                ) : (
                    <div className="container__addtocart_content_box" onClick={addItemToCartHandler}>
                        <img src="./assets/images/icon-add-to-cart.svg" width={20} alt="icone cart" />
                        <p className="container__addtocart_content_text">Add to Cart</p>
                    </div>
                )}
            </div>
        </div>


    )
}
export default AddToCart;