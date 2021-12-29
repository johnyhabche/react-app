import { React, PureComponent  } from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/PDP.css';


const client = new ApolloClient({
    uri:'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })

class PDP extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
    
        }
    }

    render() {

      return (
        <div className='pdp-container'>
            <div className='product-gallery'>
                <img src={this.props.productId.gallery[1]} />
                <img src={this.props.productId.gallery[2]} />
                <img src={this.props.productId.gallery[3]} />
            </div>
            <div className='product-image'>
                <img src={this.props.productId.gallery[0]} />
            </div>
            <div className='card-information'>
                <h1>{this.props.productId.name}</h1>
                <h2>{this.props.productId.brand}</h2>
                <h6>SIZE:</h6>
                <div className='sizes-container'>
                    <button>XS</button>
                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                </div>
                <h6>PRICE:</h6>
                <h6> $ {this.props.productId.prices[0].amount}</h6>
                <div className='add-to-card-container'>
                    <button className='add-to-card'>ADD TO CART</button>
                </div>
                <p>
                {(this.props.productId.description).replace(/<[^>]+>/g, '')}
                    {console.log(this.props.productId)}
                </p>
            </div>
        </div>
      ) 
    }
  }

  export default PDP;