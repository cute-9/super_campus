import React from "react";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const { Header } = Layout;

function TopHeader(props) {
  // const {username} = JSON.parse(localStorage.getItem("token"))

  const menu = (
    <Menu>
      <Menu.Item>超级管理员</Menu.Item>
      <Menu.Item
        danger
        onClick={() => {
          sessionStorage.removeItem("token");
          // console.log(props.history)
          props.history.replace("/login");
        }}
      >
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: "0 16px" }}>
      <div style={{ float: "right" }}>
        {/* <span>欢迎<span style={{color:"#e51a14"}}>{username}</span>回来</span> */}
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
export default withRouter(TopHeader);
