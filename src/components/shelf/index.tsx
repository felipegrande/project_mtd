import { useEffect, useState } from 'react';
import Card from '../card';
import './styles.scss'


const Shelf = () => {

  const [product, setProduct] = useState([])


  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setProduct(data)

      })
      .catch(error => {
        console.error('Erro ao carregar o JSON:', error);
      });
  }, [])

  return (
    <section className="container__shelf">
      <h1 className='container__shelf_title'>Desserts</h1>
      <div className="container__shelf_content">
        {

          product && product.map((item, index) => (
            <Card data={item} key={index} />
          ))
        }

      </div>


    </section>
  )
}
export default Shelf;