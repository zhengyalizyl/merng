import './App.css';
import { BrowserRouter,Route,Routes  } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
    <Container>
    <MenuBar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </Container>
    </BrowserRouter>
  );
}

export default App;