import { useState, useEffect } from "react";
import { Tabs, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { User } from "../types";

const AuthPage = () => {
  const registerUser = useAuthStore((state) => state.registerUser);
  const loginUser = useAuthStore((state) => state.loginUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const handleLogin = () => {
    if (loginUser(loginEmail, loginPassword)) {
      navigate("/posts");
    } else {
      alert("Incorrect email or password!");
    }
  };

  const handleRegister = () => {
    if (registerPassword === registerConfirmPassword) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: registerName,
        email: registerEmail,
        role: "user",
        password: registerPassword,
      };
      registerUser(userData);
      setLoginEmail(registerEmail);
      setLoginPassword(registerPassword);
      alert("Registration successful! Please log in.");
    } else {
      alert("Passwords do not match!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/posts");
    }
  }, [isAuthenticated, navigate]);

  const items = [
    {
      key: "1",
      label: "Login",
      children: (
        <>
          <h1>Login Form</h1>
          <Input
            placeholder="Email Address"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            style={{ marginTop: "10px" }}
          />
          <Button
            type="primary"
            onClick={handleLogin}
            style={{ marginTop: "10px", width: "100%" }}
          >
            Login
          </Button>
        </>
      ),
    },
    {
      key: "2",
      label: "Sign Up",
      children: (
        <>
          <h1>Signup Form</h1>
          <Input
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
          />
          <Input
            placeholder="Email Address"
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            style={{ marginTop: "10px" }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            style={{ marginTop: "10px" }}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            style={{ marginTop: "10px" }}
          />
          <Button
            type="primary"
            onClick={handleRegister}
            style={{ marginTop: "10px", width: "100%" }}
          >
            Sign Up
          </Button>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export { AuthPage };
