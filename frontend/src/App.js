import Layout from "./components/layout/Layout";
import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./components/profile/Profile";
import axios from "axios";


function App() {
  axios.defaults.withCredentials = true
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Layout>
  );
}

export default App;
