import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Routes, useNavigate} from 'react-router-dom';
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
import BrandDetails from './components/brands/BrandDetails';
import Pos from './components/pos/Pos';
import Login from "./components/Login/Login";
import {UserSales} from "./components/reports/user/UserSales";
import {CategorySales} from "./components/reports/category/CategorySales";
import {BranchSales} from "./components/reports/branch/BranchSales";
import InvoiceDetails from "./components/reports/details/InvoiceDetails";
import Logout from "./components/Login/Logout";
import Settings from "./components/settings/Settings";

function App() {
    const navigate = useNavigate()
    const [img_url, setImgUrl] = useState('')
    const [username, setUsername] = useState('')

    const checkLoginStatus = () => {
        api.get('/auth/user'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('jwt_token')
                }
            }
        )
            .then(function (response) {
                // console.log(response)
                if (response.data.status !== 401) {
                    window.sessionStorage.setItem('status', true)
                    console.log('authorised')
                    setImgUrl(response.data.img_url)
                    setUsername(response.data.firstname + ' ' + response.data.lastname)
                } else {
                    console.log('unauthorised')
                    window.sessionStorage.setItem('status', false)
                }

            })
            .catch(function (error) {

                if (error.response.status === 401) {
                    //place your reentry code
                    console.log('Unauthorised')
                    sessionStorage.removeItem('status')
                    sessionStorage.removeItem('jwt_token')
                } else {
                    console.log('unknown error')
                    window.sessionStorage.setItem('status', false)
                }

            });
    }

    useEffect(() => {
        checkLoginStatus();
        if (sessionStorage.getItem('jwt_token') !== null) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [])

    if (sessionStorage.getItem("jwt_token") !== null) {
        return (
            <div id="bg-default">

                <TopBar img_url={img_url} username={username}/>

                <SideBar/>
                <div className='main-content ss ' id='panel'>


                    <Routes>

                        <Route path='/login'
                               element={<Login/>}/>
                        <Route path='/logout'
                               element={<Logout/>}/>

                        <Route path='/' element={<Dashboard/>}/>

                        {/* users */}
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/users/AddUser' element={<AddUser/>}/>
                        <Route path='/users/editUser/:id' element={<UserDetails/>}/>

                        {/* customers */}
                        <Route path='/customers' element={<Customers/>}/>
                        <Route path='/customers/AddCustomer' element={<AddCustomer/>}/>
                        <Route path='/customers/editCustomer/:id' element={<CustomerDetails/>}/>

                        {/* units */}
                        <Route path='/units' element={<Units/>}/>
                        <Route path='/units/AddUnit' element={<AddUnit/>}/>
                        <Route path='/units/editUnit/:id' element={<UnitDetails/>}/>

                        {/* categories */}
                        <Route path='/categories' element={<Categories/>}/>
                        <Route path='/categories/AddCategory' element={<AddCategory/>}/>
                        <Route path='/categories/editCategory/:id' element={<CategoryDetails/>}/>

                        {/* branches */}
                        <Route path='/branches' element={<Branches/>}/>
                        <Route path='/branches/AddBranch' element={<AddBranch/>}/>
                        <Route path='/branches/editBranch/:id' element={<BranchDetails/>}/>

                        {/* products */}
                        <Route path='/products' element={<Products/>}/>
                        <Route path='/products/AddProduct' element={<AddProduct/>}/>
                        <Route path='/products/editProduct/:id' element={<ProductDetails/>}/>

                        {/* product brands */}
                        <Route path='/products/product_brands' element={<Brands/>}/>
                        <Route path='/products/product_brands/AddProductBrand' element={<AddBrand/>}/>
                        <Route path='/products/product_brands/editProductBrand/:id' element={<BrandDetails/>}/>

                        {/* Point of Sale */}
                        <Route path='/pos' element={<Pos/>}/>

                        {/*  reports route  */}
                        <Route path='/reports/user' element={<UserSales/>}/>
                        <Route path='/reports/branch' element={<BranchSales/>}/>
                        <Route path='/reports/category' element={<CategorySales/>}/>
                        <Route path='/reports/user/view_invoice/:id' element={<InvoiceDetails/>}/>

                        {/*    settings*/}
                        <Route  path='/settings' element={<Settings img_url={img_url} username={username} />}/>


                    </Routes>
                </div>
            </div>
        );
    }

    return (
        <Login/>
    )


}

export default App;
