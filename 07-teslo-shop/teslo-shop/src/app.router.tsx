/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { ShopLayout } from './shop/latouts/ShopLayout';

import { LoginPage } from './auth/pages/login/LoginPage';
import { RegisterPage } from './auth/pages/register/RegisterPage';
import { DashboardPage } from './admin/pages/dashboard/DashboardPage';
import { AdminProductPage } from './admin/pages/product/AdminProductPage';
import { AdminProductsPage } from './admin/pages/products/AdminProductsPage';
import { HomePage } from './shop/pages/home/HomePage';
import { GenderPage } from './shop/pages/gender/GenderPage';
import { ProductPage } from './shop/pages/product/ProductPage';

// Para la carga con lazy, los compornentes deben tener el export layout
const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));

export const appRouter = createBrowserRouter([
  // Main Routes
  {
    path: '/',
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'product/:idSlug',
        element: <ProductPage />,
      },
      {
        path: 'gender/:gender',
        element: <GenderPage />,
      },
    ],
  },
  // Auth Routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/auth/login' />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  // Admin Routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'products',
        element: <AdminProductsPage />,
      },
      {
        path: 'product/:id',
        element: <AdminProductPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);
