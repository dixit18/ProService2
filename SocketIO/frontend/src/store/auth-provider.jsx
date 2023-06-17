import { useReducer } from "react";
import AuthContext from "./auth-context";

const defaultAuthState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authReducer = (state, action) => {
  if (action.type === "SIGNUP") {
    return {
      user: action.userData,
    };
  }

  if (action.type === "LOGIN") {
    return {
      user: action.userData,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      user: null,
    };
  }

  return defaultAuthState;
};

const AuthProvider = (props) => {
  const [authState, dispathAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );

  const signupHandler = (userData) => {
    // let newUser;
    fetch("http://localhost:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("User signup successfull!");
          localStorage.setItem("user", JSON.stringify(data.data.user));
          dispathAuthAction({ type: "SIGNUP", userData: data.data.user });
        }
        if (data.status === "fail") {
          console.log("User signup failed!");
        }
      })
      .catch((error) => console.log(error.message));
  };

  const loginHandler = (userData) => {
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("User login successfull!");
          localStorage.setItem("user", JSON.stringify(data.data.user));
          dispathAuthAction({ type: "LOGIN", userData: data.data.user });
        }
        if (data.status === "fail") {
          console.log("User login failed!");
        }
      })
      .catch((error) => console.log(error.message));
  };

  const logoutHandler = async () => {
    const res = await fetch("http://localhost:8000/api/logout");
    const data = await res.json();
    if (data.status === "success") {
      localStorage.removeItem("user");
      dispathAuthAction({ type: "LOGOUT" });
    }
  };

  const authContext = {
    user: authState.user,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
