import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAction } from "./redux/actions/userActions";
import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loginAction(user));
    }
  }, [dispatch]);

  return (
    <div>
      <Routes />
      <ToastContainer autoClose={500} />
    </div>
  );
}

export default App;
