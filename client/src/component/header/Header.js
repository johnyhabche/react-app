import { React, Component } from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './styles/Header.css';
import './styles/Actions.css';
import './styles/Logo.css';
import './styles/Navigation.css';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


const currency = client.query({
  query: gql`
  {
    currencies {
      label
      symbol
    }
    }
  `
})

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      selectedOption: "",
      openClose: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }
  componentDidMount() {
    currency
    .then(res => this.setState({currencies: res.data.currencies}))

  }
  //send category type to app.js 
  changeQuery(categoryType) {
    this.props.onChangeCategory(categoryType)
    this.props.setProductDetail()
  }
  //handel currency celected option and send it to app.js
  handleChange(e){
    this.props.onChangeCurrency(e.target.value)
    this.setState({selectedOption: e.target.value })
  }
  openCloseCard(bool){
    this.setState({openClose: !bool})
    this.props.openClose(!bool)
  }
    render() {
      const currencyData = this.state.currencies.map((t,i) => (

          <option 
            key={i}
            value={t.symbol}
            className='currency-option'
          >{t.symbol}  {t.label}</option >
  
      ))
      return (
        <div className='header'>
            <div className='navigation'>
              <li onClick={() => this.changeQuery("all")}>All</li>
              <li onClick={() => this.changeQuery("tech")}>Technologies</li>
              <li onClick={() => this.changeQuery("clothes")}>Clothes</li>
            </div>

            <div className='logo'>
                <img alt='logo' src='./a-logo.png' />
            </div>

            <div className='actions'>
            <select onChange={this.handleChange}>
              {currencyData}
            </select>
                <li onClick={() => this.openCloseCard(this.state.openClose)}><i className="fas fa-shopping-cart"></i></li>
            </div>

        </div>
      ) 
    }
  }

  export default Header;