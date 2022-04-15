import React, { forwardRef } from 'react'
import {Form,Input} from 'antd'
const UserForm = forwardRef((props,ref) => {


    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="shool_name"
                label="学校名称"
                rules={[{ required: true, message: '请输入需要添加的学校名称' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
})
export default UserForm