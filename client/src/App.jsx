import { createContext, useEffect, useState } from "react";
import Routing from "./Routing";
import axios from "./API/axios";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loading/Loader/Loader";
export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/user/checkUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      navigate("/login");
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  if (isLoading) {
    return <Loader />; // Show a loading message or spinner
  }

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routing />
    </AppState.Provider>
  );
}

export default App;
