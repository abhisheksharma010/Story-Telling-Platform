import { Route, Routes } from 'react-router-dom';
import "./App.css"
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound'

import Policy from './pages/Policy'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './componenets/routes/AdminRoute';
import AdminDashboard from './pages/Author/AuthorDashboard';
import CreateProduct from './pages/Author/CreateStory';
import UpdateProduct from './pages/Author/UpdateProduct';

import Product from './pages/Author/Story';
import Search from './pages/Search';
import Purchase from './pages/Purchase';
import ProductCard from './componenets/ProductCard';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/c" element={<ProductCard />} />
        <Route path="/search" element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />


        <Route path='purchase/:slug' element={<Purchase />} />


        <Route path='/dashboard' element={<AdminRoute />}>

          <Route path='author' element={<AdminDashboard />} />


          <Route path='author/create-story' element={<CreateProduct />} />

          <Route path='author/story/:slug' element={<UpdateProduct />} />
          <Route path='author/story' element={<Product />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
