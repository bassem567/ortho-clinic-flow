
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Login";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <Login />;
};

export default Index;
