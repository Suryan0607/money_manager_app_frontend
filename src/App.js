import './App.css';
import { useState } from "react";
import { BrowserRouter,Routes,Route, } from "react-router-dom";
import Home from "./components/home"
import Signup from "./components/signup";
import Signin from "./components/signin";
import History from "./components/history";
import Dashboard from "./components/dashboard";
import UpdateForm from './components/updateuser';

function App() {
  const [user, setLoginUser] = useState({})
  
  return(

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin setLoginUser={setLoginUser} />} />

            {/* user route */}
            <Route exact path="/dashboard/:id/:name" element={<Dashboard User={user} />} />
            <Route exact path="/history/:id/:name" element={<History />} />
            <Route exact path="/update_user/:id/:name" element={<UpdateForm  />} />

          </Routes>
          </div>
    </BrowserRouter>
    
    
  );
}

export default App;
