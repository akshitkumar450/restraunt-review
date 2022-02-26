import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/";
import { toast } from "react-toastify";
import { userService } from "../services/UserServices";
import { signUpAction } from "../redux/actions/userActions";

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("please fill all details");
      return;
    }
    const signUpUser = async () => {
      const user = await userService.signUpUser(name, email, password);
      console.log(user.data);
      if (user.data) {
        dispatch(signUpAction(user.data));
        // console.log(email, password, name);
        toast.success("signed up");
        setEmail("");
        setPassword("");
        setName("");
        history.push("/");
      }
    };
    signUpUser();
  };

  return (
    <div className="h-full w-1/3 mx-auto mt-20">
      <form className="grid gap-y-5">
        <div>
          <TextField
            id="name"
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="email"
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={signUp} variant="contained" fullWidth>
          SignUp
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
