import React, { Component } from 'react';
import { EmptyState, AppProvider } from '@shopify/polaris';


class Welcome extends Component {

  render(){
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <EmptyState
            heading="App successfully installed"
            action={{content: 'Go to products',external:true, url: `${shopOrigin}/admin/products`}}
            secondaryAction={{content: 'Open manual',external:true, url: 'https://wikipedia.org'}}
            image="https://polaris.shopify.com/assets/50e6cae28cd76c4a6897afec444a62c3-group21@2x.png"
          >
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.</p>
          </EmptyState>
        </AppProvider>
    );
  }
}

export default Welcome;
