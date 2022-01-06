import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
// import Navbar from './components/incl/navbar';
import Users from './components/users/Users';
import Dashboard from './components/dashboard/Dashboard';
import api from './api/api';
import AddUser from './components/users/AddUser';
import UserDetails from './components/users/UserDetails';
import Customers from './components/customers/Customers';
import CustomerDetails from './components/customers/CustomerDetails';
import AddCustomer from './components/customers/AddCustomer';
import Units from './components/units/Units';
import AddUnit from './components/units/AddUnit';
import UnitDetails from './components/units/UnitDetails';
import Categories from './components/categories/Categories';
import AddCategory from './components/categories/AddCategory';
import CategoryDetails from './components/categories/CategoryDetails';
import Branches from './components/branches/Branches';
import AddBranch from './components/branches/AddBranch';
import BranchDetails from './components/branches/BranchDetails';
import SideBar from './components/incl/SideBar';
import TopBar from './components/incl/TopBar';
import Products from './components/products/Products';
import AddProduct from './components/products/AddProduct';
import ProductDetails from './components/products/ProductDetails';

import Brands from './components/brands/Brands';
import AddBrand from './components/brands/AddBrand';
import BrandDetails from './components/branches/BranchDetails';

function App() {



  // console.log(users)
  return (

    <div id="bg-default">

      <TopBar />
      <Router>


        <SideBar />
        <div className='main-content ss ' id='panel'>


          <Routes>

            <Route path='/' element={<Dashboard />} />

            {/* users */}
            <Route path='/users' element={<Users />} />
            <Route path='/users/AddUser' element={<AddUser />} />
            <Route path='/users/editUser/:id' element={<UserDetails />} />

            {/* customers */}
            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/AddCustomer' element={<AddCustomer />} />
            <Route path='/customers/editCustomer/:id' element={<CustomerDetails />} />

            {/* units */}
            <Route path='/units' element={<Units />} />
            <Route path='/units/AddUnit' element={<AddUnit />} />
            <Route path='/units/editUnit/:id' element={<UnitDetails />} />

            {/* categories */}
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/AddCategory' element={<AddCategory />} />
            <Route path='/categories/editCategory/:id' element={<CategoryDetails />} />

            {/* branches */}
            <Route path='/branches' element={<Branches />} />
            <Route path='/branches/AddBranch' element={<AddBranch />} />
            <Route path='/branches/editBranch/:id' element={<BranchDetails />} />

            {/* products */}
            <Route path='/products' element={<Products />} />
            <Route path='/products/AddProduct' element={<AddProduct />} />
            <Route path='/products/editProduct/:id' element={<ProductDetails />} />

            {/* product brands */}
            <Route path='/products/product_brands' element={<Brands />} />
            <Route path='/products/product_brands/AddProductBrand' element={<AddBrand />} />
            <Route path='/products/product_brands/editProductBrand/:id' element={<BrandDetails />} />


          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
