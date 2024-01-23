
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
import { Header } from './Components';
import React, { useState, createContext, useEffect } from 'react';
import AboutUs from './Components/AboutUs';
import CreatePost from './Components/CreatePost.jsx';
import Post from './Pages/Post';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/Register';
import Login from './Pages/Login';
import UpdatePost from './Pages/UpdatePost';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import Axios from 'axios';
import { url } from './Services/index.js';
import MyBlogs from './Pages/MyBlogs.jsx';
// import Post from './Pages/Post';
export const AppContext = createContext();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = localStorage.getItem('userId');
  const password = localStorage.getItem('password');
  const token = localStorage.getItem('jwt');

  const checkLogin = () => {
    Axios.post(`${url}/auth/login`, { username: username, password: password })
      .then((response) => {
        console.log(response);
        if (response.data == "Credentials Invalid !!")
        {
          setIsLoggedIn(false);
        }
        else {  
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
  }

  useEffect(() => {
    if (username && password) {
      checkLogin();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className='w-screen overflow-auto'>
      <AppContext.Provider value={{isLoggedIn , setIsLoggedIn}}>
        <Router>
          <Header />
          <Routes>
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/" element={isLoggedIn ? <Home /> : <AboutUs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            
            
            <Route path='/blogs' element={isLoggedIn ? <Home /> : <Login/>} />
            <Route path='/blogs/:id' element={isLoggedIn ? <Post /> : <Login/>} />
            <Route path='/blogs/category/:category' element={isLoggedIn ? <Home /> : <Login/>} />
            <Route path='/create-post' element={isLoggedIn ? <CreatePost /> : <Login />} />
            <Route path='/update-post/:id' element={isLoggedIn ? <UpdatePost /> : <Login />} />


            <Route path='/profile/:id' element={isLoggedIn ? <Profile /> : <Login />} /> 
            <Route path='/update-profile' element={isLoggedIn ? <EditProfile /> : <Login />} />

            <Route path='/user/blogs' element={isLoggedIn ? <MyBlogs /> : <Login />} />

            <Route path='*' element={<PageNotFound/>} />
          </Routes>
        </Router>
      </AppContext.Provider>
      </div>
  );
}

export default App;
