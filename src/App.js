import logo from './logo.svg';
import './App.css';
import Header from './Routing-PR/Admin-panel/Header';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Dashboard from './Routing-PR/Admin-panel/Dashboard';
import Users from './Routing-PR/Admin-panel/Users';
import Settings from './Routing-PR/Admin-panel/Settings';
import Layout from './Routing-PR/Admin-panel/Layout';
import AddUser from './Routing-PR/Admin-panel/AddUser';
import { useEffect, useState } from 'react';
import EditUser from './Routing-PR/Admin-panel/EditUser';
import Footer from './Routing-PR/Admin-panel/Footer';


function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || []
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])
  return (
    <BrowserRouter>
      <div className="d-flex vh-100 ">
        <Layout />
        <main className='w-100 dark-theme'>
          <div className="w-100">
            <Header />
          </div>
          <Routes >
            <Route path="/" element={<Dashboard />} ></Route>
            <Route path="/users" element={<Users user={user} setUser={setUser} />} ></Route>
            <Route path="/adduser" element={<AddUser user={user} setUser={setUser} />} ></Route>
            <Route path="/edituser/:id" element={<EditUser user={user} setUser={setUser} />} ></Route>
            <Route path="/settings" element={<Settings />} ></Route>
            <Route path='*' element={<h1 className='container'>404 Page Error...</h1>} />
          </Routes>
          <footer className=' position-fixed bottom-0 start-0 w-100  '>
            <Footer />
          </footer>
        </main>
      </div>
    </BrowserRouter>


  );
}

export default App;
