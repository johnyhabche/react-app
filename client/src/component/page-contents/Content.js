import { React, PureComponent  } from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './styles/Content.css';
import { responsePathAsArray } from 'graphql';
import PDP from '../pdp/PDP';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


const categories = client.query({
  query: gql`
  {
    category {
      name
      products {
        id
        name
        inStock
        brand
        description
        gallery
        category
        prices {
          amount
        }
      }
  
    }
  }
  `
})
class Content extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          product: [],
        }
      }
      componentDidMount() {
        categories
        .then(res => this.setState({product: res.data.category.products}))
        // .then(res => console.log(res.data.category.products))

      } 
      sendProductDetails(details) {
        this.props.productDetails(details)
      }
      
    render() {
        const product = this.state.product.map((t,i) => (
          <div
          key={i}
          >
            {                this.props.category === t.category ?
            <div onClick={ () => this.sendProductDetails(t)} className={t.inStock ? 'product' : 'product-not-instock'}>
              <div className={t.inStock ? '' : 'overlay'}></div>

              <img alt={t.id} src={t.gallery[0]} />
              <p className='product-title'>{t.name}</p>
              <div className='price-currency-con'>
                <p className='product-price'>{this.props.currency}</p>
                <p className='product-price'>{t.prices[0].amount}</p>
              </div>
            </div>
               : this.props.category === "all" ?
               <div onClick={ () => this.sendProductDetails(t)} className={t.inStock ? 'product' : 'product-not-instock'}>
               <div className={t.inStock ? '' : 'overlay'}></div>
               <img alt={t.id} src={t.gallery[0]} />
               <p className='product-title'>{t.name}</p>
               <div className='price-currency-con'>
                 <p className='product-price'>{this.props.currency}</p>
                 <p className='product-price'>{t.prices[0].amount}</p>
               </div>
             </div>
                : ''}
          </div>  
        ))
      return (
        <div className='content'>
          <div className='title-container'>
            <h1>{this.props.category}</h1>
          </div>
            <div className='product-container'>
                {product}
            
            </div>
        </div>
      ) 
    }
  }

  export default Content;