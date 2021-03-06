import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);

    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });

      message(data.message);
    } catch (e) {
      //  Handled by the http hook
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });

      auth.login(data.token, data.userID);
    } catch (e) {
      //  Handled by the http hook
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3 auth-main">
        <h1 className="purple-text text-lighten-4">Linkio</h1>
        <div className="card purple lighten-5 auth-card">
          <div className="card-content black-text">
            <span className="card-title">Authentication</span>
            <div>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  placeholder="Enter your Email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn deep-purple lighten-1"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Log in
            </button>
            <button
              className="btn black-text purple lighten-4"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
