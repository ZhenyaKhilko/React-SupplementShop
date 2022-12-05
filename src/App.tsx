import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { MainLayout } from './layouts/MainLayout';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './components/NotFound'),
);
const FullSupplement = React.lazy(
  () => import(/* webpackChunkName: "FullSupplement" */ './pages/FullSupplement'),
);

export const App = () => {
  return (
    <Routes>
      <Route path="/React-SupplementShop/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/React-SupplementShop/cart"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="/React-SupplementShop/supplement/:id"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <FullSupplement />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
