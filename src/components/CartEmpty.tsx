import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty<div>😕</div>
      </h2>
      <p>
        You haven't bought anything yet.
        <br />
        To buy some supplements go to the main page.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link className="button button--black" to="/React-SupplementShop/">
        <span>Main page</span>
      </Link>
    </div>
  );
};
