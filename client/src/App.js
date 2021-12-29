import { React, PureComponent  } from 'react';

import Header from './component/header/Header'
import Content from './component/page-contents/Content';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CardOverlay from './component/card-overlay/CardOverlay';
import PDP from './component/pdp/PDP';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: "$",
      categoryType: "all",
      openClose: false,
      productDetails: null
    }
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.openCloseCard = this.openCloseCard.bind(this);
    this.productDetails = this.productDetails.bind(this);
    this.setProductDetail = this.setProductDetail.bind(this);
  }
  changeCurrency(currency) {
    this.setState({currentCurrency: currency})
  }
  changeCategory(cat) {
    this.setState({categoryType: cat})
  }
  openCloseCard(bool) {
    this.setState({openClose: !bool})
  }
  productDetails(details) {
    this.setState({productDetails: details})
  }
  setProductDetail() {
    this.setState({productDetails: null})
  }
  render() { 
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header
          onChangeCurrency = {this.changeCurrency}
          onChangeCategory = {this.changeCategory}
          openClose = {this.openCloseCard}
          setProductDetail = {this.setProductDetail}
          />
           {this.state.openClose === true ? <CardOverlay /> : ''}
          {
            this.state.productDetails != null ? <PDP productId = {this.state.productDetails}  /> :

          <Content
          currency = {this.state.currentCurrency}
          category = {this.state.categoryType}
          productDetails = {this.productDetails}
          />
          } 
        </div>
      </ApolloProvider>

    );
  }
}

export default App;
