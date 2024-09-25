import { useState } from 'react';
import Shelf from '../shelf';
import './styles.scss'
import Cart from '../cart';

const Home = () => {



    return (

        <main className="container">

            <div className="container__content" >

                <Shelf />
                <Cart />
            </div>

        </main>
    )
}
export default Home;