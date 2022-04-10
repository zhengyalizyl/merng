import './App.css';
import { BrowserRouter,Route,Routes,Navigate  } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Container>
    <MenuBar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/posts/:postId" element={<SinglePost/>}/>
      <Route  path="/login" element={
        <AuthRoute>
          <Login/>
          </AuthRoute>}>
      </Route >
      <Route  path="/register" element={
        <AuthRoute>
          <Register/>
          </AuthRoute>}>
      </Route >
    </Routes>
    </Container>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
