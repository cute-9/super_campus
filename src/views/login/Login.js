import React from "react";
import { Form, Button, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";

import axios from "axios";
export default function Login(props) {
  // console.log(props);
  const onFinish = (values) => {
    // console.log(values);
    if (values.username === "") {
      message.error("请填写用户名");
    } else if (values.password === "") {
      message.error("请填写密码");
    } else {
      axios
        .post(`/api/admin/login`, {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 100) {
            message.error("用户名或密码不匹配");
          } else if (res.data.code === 200) {
            message.success("登陆成功");
            sessionStorage.setItem("token", res.data);
            props.history.push("/");
          }
        });
    }
  };
  return (
    <div
      style={{
        // background: "rgb(35, 39, 65)",
        height: "100%",
        overflow: "hidden",
      }}
      className="body"
    >
      <div className="logintitle">“新时代新风貌”校园歌曲征集传唱活动</div>
      <div className="formContainer">
        <div className="logintitle_form">超级管理员</div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            // rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            // rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              shape="round"
              htmlType="submit"
              className="login-form-button"
              danger
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
