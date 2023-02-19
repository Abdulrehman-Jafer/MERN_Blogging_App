import { useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthContext } from "./Context/AuthContext";
import Explore from "./pages/Explore";
import Create_Blog from "./pages/Create_Blog";
import MyToast from "./Globals/MyToast";
import { useLocation } from "react-router-dom";


const App = () => {
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);
  const { userInfo } = logIn;
  const { userId } = userInfo

  const {pathname} = useLocation()
  useEffect(()=>{
    window.scroll(0,0)
  },[pathname])
  
  useEffect(() => {
    if (userId) {
      navigate("/profile")
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={userId ? <ProfilePage /> : <h1>Unauthorized User</h1>} />
        <Route path="/explore" element={userId ? <Explore /> : <h1>Unauthorized User</h1>} />
        <Route path="/create" element={userId ? <Create_Blog userInfo={userInfo} /> : <h1>Unauthorized User</h1>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <MyToast />
    </>
  );
};

export default App;
