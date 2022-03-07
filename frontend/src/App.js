import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAction } from "./redux/actions/userActions";
import Routes from "./Routes";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      if (user) {
        dispatch(loginAction(user));
      } else {
        throw new Error("Please login");
      }
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <Routes />
        </>
      )}

      <ToastContainer autoClose={500} />
    </div>
  );
}

export default App;
