import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Modal, Switch, Form, Input, message } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  RetweetOutlined,
  // SearchOutlined,
  // search,
} from "@ant-design/icons";
import UserForm from "../../../components/user-manage/UserForm";
import "./UseList.css";
const { confirm } = Modal;
const { Search } = Input;

export default function UserList() {
  const [dataSource, setdataSource] = useState([]);
  const [isAddVisible, setisAddVisible] = useState(false);
  const [isUpdateVisible, setisUpdateVisible] = useState(false);
  const [current, setcurrent] = useState(null);
  // const [rstate, setRstate] = useState(true);
  // const [isUpdateDisabled, setisUpdateDisabled] = useState(false);
  const addForm = useRef(null);
  const updateForm = useRef(null);

  useEffect(() => {
    axios.post("/api/adminjk/look").then((res) => {
      const list = res.data.data;
      setdataSource(list);
    });
  }, []);
  const columns = [
    {
      title: "用户名",
      dataIndex: "shool_name",
    },
    {
      title: "用户状态",
      dataIndex: "state",
      render: (state, item) => {
        // state控制开关状态
        return (
          <Switch checked={state} onChange={() => handleChange(item)}></Switch>
        );
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showConfirm(item)}
              className="button"
            />

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleUpdate(item)}
              className="button"
            />
            <Button
              type="primary"
              shape="circle"
              icon={<RetweetOutlined />}
              onClick={() => resetForm(item)}
              className="button"
            />
          </div>
        );
      },
    },
  ];

  const handleUpdate = (item) => {
    setTimeout(() => {
      setisUpdateVisible(true);
      updateForm.current.setFieldsValue(item);
    }, 0);

    setcurrent(item);
  };

  const handleChange = (item) => {
    //更新页面
    item.state = !item.state;
    // console.log(item)
    setdataSource([...dataSource]);
    axios.post(`/api/adminjk/state`, {
      id: item.id,
    });
  };
  const resetForm = (item) => {
    confirm({
      title: "是否重置密码?(重置密码为:123456)",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        //   console.log('OK');
        resetMethod(item);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };
  const resetMethod = (item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步

    setdataSource([...dataSource]);

    axios
      .post(`/api/adminjk/again`, {
        shool_name: item.shool_name,
      })
      .then((res) => {
        if (res.data.code === 200) {
          message.success("重置密码成功");
        }
      });
  };
  const showConfirm = (item) => {
    confirm({
      title: "你确定要删除?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        //   console.log('OK');
        deleteMethod(item);
      },
      onCancel() {
        //   console.log('Cancel');
      },
    });
  };
  //删除
  const deleteMethod = (item) => {
    // console.log(item)
    // 当前页面同步状态 + 后端同步
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios
      .post(`/api/adminjk/delete`, {
        id: item.id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          message.success("删除成功");
        }
      });
  };

  const addFormOK = () => {
    addForm.current
      .validateFields()
      .then((value) => {
        // console.log(value);
        setisAddVisible(false);
        //重置表单
        addForm.current.resetFields();
        //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
        axios
          .post(`/api/adminjk/registered`, {
            ...value,
            password: 123456,
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.code === 200) {
              message.success("添加成功");
              axios.post("/api/adminjk/look").then((res) => {
                const list = res.data.data;
                setdataSource(list);
              });
            } else if (res.data.code === 101) {
              message.error("用户已存在");
            } else {
              message.error("添加失败");
            }
            // setdataSource([...dataSource]);
          });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const updateFormOK = () => {
    updateForm.current.validateFields().then((value) => {
      // console.log(value)
      setisUpdateVisible(false);
      setdataSource(
        dataSource.map((item) => {
          if (item.id === current.id) {
            return { ...item, value };
          }
          return item;
        })
      );
      // setisUpdateDisabled(!isUpdateDisabled);

      axios
        .post(`/api/adminjk/change`, {
          ...value,
          id: current.id,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 200) {
            message.success("更新成功");
            axios.post("/api/adminjk/look").then((res) => {
              const list = res.data.data;
              setdataSource(list);
            });
          } else if (res.data.code === 101) {
            // console.log(res.data.code);
            message.error("用户已存在");
          } else {
            message.error("更新失败");
          }
          // setdataSource([...dataSource]);
        });
    });
  };
  const onSearch = (value, event) => {
    axios
      .post(`/api/adminjk/find`, {
        shool_name: value,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.code === 200) {
          // console.log(res.data.data)
          const list = res.data.data;
          setdataSource(list);
        }
      });
  };
  return (
    <div>
      <Form layout="inline">
        <Button
          type="primary"
          onClick={() => {
            setisAddVisible(true);
          }}
          className="add_button"
        >
          添加用户
        </Button>
        <Form.Item>
          <Search
            placeholder="请输入用户名查询"
            onSearch={onSearch}
            enterButton
          />
        </Form.Item>
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 8,
        }}
        rowKey={(item) => item.id}
      />

      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setisAddVisible(false);
        }}
        onOk={() => addFormOK()}
      >
        <UserForm ref={addForm}></UserForm>
        <div className="mima">默认密码为:123456</div>
      </Modal>

      <Modal
        visible={isUpdateVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setisUpdateVisible(false);
        }}
        onOk={() => updateFormOK()}
      >
        <UserForm ref={updateForm}></UserForm>
      </Modal>
    </div>
  );
}
