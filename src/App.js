import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import PostDetails from './pages/PostDetails/PostDetails'
import Navbar from './components/Navbar/Navbar';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {
  
    return (
      <div className="App">
        <Router>
        <Navbar/>
         <Routes>
           <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
           <Route exact path="/posts" element={<PrivateRoute><Home/></PrivateRoute>}/>
           <Route exact path="/posts/:id" element={<PrivateRoute><PostDetails/></PrivateRoute>}/>
           <Route exact path="/login" element={<Login/>}/>
         </Routes> 
     </Router>
     </div>
    )
} 
export default App;

