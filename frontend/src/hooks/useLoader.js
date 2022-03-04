import { useEffect, useState } from "react";

function useLoader() {
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const interval = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);
  return loading;
}

export default useLoader;
