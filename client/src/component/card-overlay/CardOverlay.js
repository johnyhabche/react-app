import { React, Component } from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './styles/CardOverlay.css';


const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

class CardOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOption: false

    }
  }
    render() {
      return (
          <div className='card-container'>
            <div className='cover-overlay'>
                <div>
                    <p>My Bag. <span>2 items</span></p>
                </div>
                <div className='card'>
                    <div className='card-description'>
                        <p>appolo wtefakasdasd</p>
                        <p>$50.00</p>
                        <div className='size-btn-container'>
                            <button className='card-btn size-btn'>S</button>
                            <button className='card-btn size-btn'>M</button>
                        </div>
                    </div>
                    <div className='plus-btn'>
                        <button className='card-btn'>+</button>
                        <span>1</span>
                        <button className='card-btn'>-</button>
                    </div>
                    <div className='card-photo'>
                        <img src='./profile.jpg' />
                    </div>
                </div>
             </div>
          </div>
      ) 
    }
  }

  export default CardOverlay;