import { useCart } from '../../context/CartContext';
import AddtoCart from '../add-to-card';
import './styles.scss'

interface ICardProps {
        data: any
}

const Card = (product: ICardProps) => {

        const { cartItems } = useCart();


        const { image, name, category, price } = product?.data
        const itemIsCart = cartItems.find(cartItem => cartItem.name === name);

        return (
                <div className="container">
                        <div className={`container_box  ${!!itemIsCart ? 'active' : ''}`}>
                                <picture className="container_box_image">
                                        <source media="(min-width: 769px)" srcSet={image?.tablet} />
                                        <source media="(min-width: 1025px)" srcSet={image?.desktop} />
                                        <img src={image?.mobile} alt="Imagem do produto" />
                                </picture>

                        </div>

                        <AddtoCart name={name} price={price} thumbnail={image?.thumbnail} />
                        <p className="container_category">{category}</p>
                        <p className="container_name">{name}</p>
                        <p className="container_value">${price.toFixed(2)}</p>

                </div>
        )
}
export default Card;