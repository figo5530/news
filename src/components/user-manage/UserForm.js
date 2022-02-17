import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'


const UserForm = forwardRef((props, ref) => {
    const { Option } = Select
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setIsDisabled(props.isUpdateDisabled)
    },[props.isUpdateDisabled])

    return (
        <div>
            <Form
                layout="vertical"
                ref={ref}
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
                    name="region"
                    label="Region"
                    rules={isDisabled ? [] : [{ required: true, message: 'Please select the region!' }]}
                >
                    <Select disabled={isDisabled}>
                        {props.regionList.map(item => <Option value={item.value} key={item.id}>{item.title}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="roleId"
                    label="Role"
                    rules={[{ required: true, message: 'Please select the role!' }]}
                >
                    <Select onChange={(value) => {
                        if(value === 1) {
                            ref.current.setFieldsValue({
                                region:""
                            })
                            setIsDisabled(true)
                        }
                        else setIsDisabled(false)
                    }}>
                        {props.roleList.map(item => <Option value={item.id} key={item.id}>{item.roleName}</Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
})
export default UserForm