import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Welcome--you're all set");
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("lance-net-user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="register">
      {loading && <Spinner />}
      {/* <div className="row justify-content-center align-items-center w-100 h-100"> */}
      <div className="row justify-content-center w-100">
        <div className="col-md-6 ml-2 mr-2">
          <div className="lottie">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1 className="tagline">$aveeNET</h1>
            <p className="subhead">Know Where It Goes.</p>
            <h2 className="subhead2 mt-4 mb-5">Create Your FREE Account</h2>
           
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>       
          
    
              <div className="d-flex justify-content-between align-items-center">
         
              <button className="secondary" type="submit">
                Submit
              </button>             
            </div>         
          </Form>
          <Link to="/login">Have an account? <strong>Sign in</strong></Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
