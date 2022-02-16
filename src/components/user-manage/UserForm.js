import React from 'react'
import { Form, Input, Select } from 'antd'


export default function UserForm(props) {
    const { Option } = Select
    return (
        <div>
            <Form
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input the username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input the password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="reigon"
                    label="Reigon"
                    rules={[{ required: true, message: 'Please select the reigon!' }]}
                >
                    <Select>
                        {props.regionList.map(item => <Option value={item.value} key={item.id}>{item.title}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="roleId"
                    label="Role"
                    rules={[{ required: true, message: 'Please select the role!' }]}
                >
                    <Select>
                        {props.roleList.map(item => <Option value={item.id} key={item.id}>{item.roleName}</Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
}
