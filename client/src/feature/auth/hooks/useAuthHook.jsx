import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useApi from "../api/authApi";
import { useContext } from "react";
import { MyStore } from "../../../app/context/MyContext";

export const useAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const api = useApi();

  const { setAccessToken, setUser, setLoading } = useContext(MyStore);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);

      setLoading(false);

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onLoginSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      setAccessToken(response.data.data.accessToken);
      setUser(response.data.data.user);
      setLoading(false);

      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");

      setAccessToken(null);
      setUser(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onRegisterSubmit,
    navigate,
    onLoginSubmit,
    logout,
  };
};
