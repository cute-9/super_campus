import React from "react";
import { Layout, Menu } from "antd";
import "./index.css";
import { withRouter } from "react-router-dom";
import { UnorderedListOutlined } from "@ant-design/icons";
const { Sider } = Layout;

function SideMenu(props) {
  // console.log(props)
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
      style={{
        background: "#e51a14",
      }}
    >
      <div className="logo">校园歌曲征集传唱系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        selectedKeys={["1"]}
      >
        <Menu.Item
          key="1"
          icon={<UnorderedListOutlined style={{ color: "#e51a14" }} />}
        >
          权限列表
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default withRouter(SideMenu);
