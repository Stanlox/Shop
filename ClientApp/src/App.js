import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Laptop } from './components/Products/Laptop';
import { Phone } from './components/Products/Phone';
import { Projector } from './components/Products/Projector';
import { Tablet } from './components/Products/Tablet';
import { Available } from './components/Products/Available';

import './custom.css'
import { Products } from './components/Products/All';
import { Contacts } from './components/Contacts'; 
import { Update } from './components/Admin/Update';
import  AllProducts  from './components/Admin/AllProducts';
import { Delele } from './components/Admin/Delete';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
       <Layout>         
          <Route path='/Products' component={Products} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/Laptops' component={Laptop} />
          <Route path='/Phones' component={Phone} />
          <Route path='/Projectors' component={Projector} />
          <Route path='/Tablets' component={Tablet} />
          <Route path='/Available' component={Available} />
          <Route path='/Update/:id' component={Update} />
          <Route path='/Delete/:id' component={Delele} />
          <Route path='/AllProducts' component={AllProducts} />
           <Route exact path='/' component={Home} />
       </Layout>
    );
  }
}
