import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './modules/Home';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Product from './modules/Product';
import Products from './modules/Products';

import Cart from './modules/Cart'

import CategoryProducts from './modules/CategoryProducts';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/products' element={<Products />} />
        <Route path='*' element={<div>404 Page</div>} />

        <Route path="/cart" element={<Cart/>} />

        <Route path='categories/:name' element={<CategoryProducts />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
