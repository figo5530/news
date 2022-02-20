import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Login() {

  let navigate = useNavigate()

  const onFinish = (values) => {
    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
      console.log(res.data)
      if(res.data.length) {
        localStorage.setItem("token", JSON.stringify(res.data[0]))
        message.success("Logging in...")
        navigate("/")
      }else {
        message.error("Invalid Username or Password")
      }
    })
  };

  return (
    <div style={{ background: 'linear-gradient(45deg, #0f3d75 30%, #021b39 90%)', height: "100%" }}>
    {/* <div style={{ background: 'linear-gradient(45deg, #34c6eb 30%, #346eeb 90%)', height: "100%" }}> */}

      <div className='formContainer'>
        <div className='loginTitle'>
          Global News Publication System
        </div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
