
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { Toaster } from 'react-hot-toast';
import Private from './Components/Routes/Private';
import Products from './pages/Admin/Products';
import Addproducts from './pages/Admin/Addproducts';
import Orders from './pages/Admin/Orders';
import Messages from './pages/Admin/Messages';
import Cart from './pages/Cart';
import Myorders from './pages/Myorders';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Private />}>
          <Route path='/dashboard/products' element={<Products />} />
          <Route path='/dashboard/addproduct' element={<Addproducts />} />
          <Route path='/dashboard/orders' element={<Orders />} />
          <Route path='/dashboard/messages' element={<Messages />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/myorders' element={<Myorders />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
