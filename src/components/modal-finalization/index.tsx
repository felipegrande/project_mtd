import './styles.scss'
import { useCart } from '../../context/CartContext'

interface ModalInterceProps {
    closeModal: () => void;
}

const Modalfinalization = ({ closeModal }: ModalInterceProps) => {

    const { cartItems, clearCart } = useCart();


    const newOrder = () => {
        clearCart();
        closeModal();
    }

    const total = cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    return (
        <>
            {
                cartItems.length !== 0 && (
                    <div className='container__modal'>
                        <div className='container__modal_content'>
                            <img src="./assets/images/icon-order-confirmed.svg" alt="icone de confirmação" />
                            <h2 className='container__modal_title'>Order Confirmed</h2>
                            <p className='container__modal_subTitle'>We hope you enjoy yopur food!</p>
                            <div className='container__modal_box'>
                                {
                                    cartItems.map((product, index) => (
                                        <div key={index} className='container__modal_box_item'>
                                            <div className='container__modal_box_info'>
                                                <img src={product.thumbnail} width={50} height={50} alt="thumbnail do produto" />
                                                <div >
                                                    <p className='container__modal_box_name'>{product.name}</p>
                                                    <div className='container__modal_box_quantityValue'>
                                                        <p className='container__modal_box_quantityValue_quantity'>{product.quantity}x</p>
                                                        <p className='container__modal_box_quantityValue_price'>@${product.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='container__modal_box_priceFinal' >${(product.quantity * product.price).toFixed(2)}</div>
                                        </div>
                                    ))
                                }
                                <div className='container__modal_box_total' >
                                    <p className='container__modal_box_total_text'>Order total</p>
                                    <p className='container__modal_box_total_totalprice'>${total.toFixed(2)}</p>
                                </div>

                            </div>

                            <button className='container__modal_neworder' onClick={newOrder}>Start New Order </button>
                        </div>

                    </div>

                )
            }

        </>
    )
}
export default Modalfinalization;