import React from 'react';
import {client} from '../lib/client';
import { FooterBanner, HeroBanner, Product} from '../components';

const Home = ({products, bannerData}) =>{
    return (
    <>
      <HeroBanner heroBanner = {bannerData.length && bannerData[0]}/>
      <div>
        <h2 className = "products-heading">Best Selling Products</h2>
        <p>Speakers of any variations</p>
      </div>

      <div className='products-container'>
        {products?.map(
          (product)=> <Product key={product._id} product={product}/>
        )}
      </div>
      <FooterBanner footerbanner = { bannerData && bannerData[0]} />
    </>
  )
}
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products, 
      bannerData
    }
  }
}
export default Home