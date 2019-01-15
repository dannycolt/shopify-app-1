import React, { Component } from 'react';
import { Page, AppProvider } from '@shopify/polaris';

class AppPos extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  render() {
    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page title="App on POS">
        	<h1>Hello POS World!</h1>
        </Page>
      </AppProvider>
    );
  }

}

export default AppPos;
