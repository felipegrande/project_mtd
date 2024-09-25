import './styles.scss'

import { useCart } from '../../context/CartContext'
import { useState } from 'react';
import Modalfinalization from '../modal-finalization';

const Cart = () => {

    const { cartItems, removeItemFromCart } = useCart();
    const [modalOpen, setModalOpen] = useState(false)

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


    const isFinalizePurchase = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
    };


    const total = cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    return (
        <section className="container__cart">
            <h2 className="container__cart_title" >Your Cart ({totalQuantity})</h2>
            {
                cartItems.length === 0 ? (
                    <div className="container__cart_empty" >
                        <img src="./assets/images/illustration-empty-cart.svg" alt="icone carrinho vazio" />
                        <p>Yout added items will appear here</p>
                    </div>

                ) : (
                    <>
                        {
                            cartItems.map((product, index) => (
                                <div className="container__cart_content" key={index}>
                                    <div className="container__cart_content_itens" >
                                        <h2 className="container__cart_content_name">{product.name}</h2>
                                        <div className="container__cart_content_values">
                                            <p className="container__cart_content_quantity">{product.quantity}x</p>
                                            <p className="container__cart_content_price">@${product.price.toFixed(2)}</p>
                                            <p className="container__cart_content_quantity_price">${(product.quantity * product.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="container__cart_delete" onClick={() => removeItemFromCart(product.name)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" /></svg>
                                    </div>

                                </div>

                            ))
                        }
                        <div className='container__modal_box_total' >
                            <p className='container__modal_box_total_text'>Order total</p>
                            <p className='container__modal_box_total_totalprice'>${total.toFixed(2)}</p>
                        </div>
                        <div className="container__cart_carbon" > <img src="./assets/images/icon-carbon-neutral.svg" width={15} alt="icone carrinho vazio" />  this is a <span> carbon-neutral</span>  delivery </div>
                        <button className="container__cart_buybutton" onClick={isFinalizePurchase}  >Confirm Order</button>
                    </>
                )
            }
            {
                modalOpen && (
                    <Modalfinalization closeModal={closeModal} />
                )

            }

        </section>
    )
}
export default Cart;
