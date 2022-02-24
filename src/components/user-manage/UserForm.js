import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'


const UserForm = forwardRef((props, ref) => {
    const { Option } = Select
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setIsDisabled(props.isUpdateDisabled)
    }, [props.isUpdateDisabled])

    const { roleId, region } = JSON.parse(localStorage.getItem("token"))

    const chechRegionDisabled = (item) => {
        if (props.isUpdate) {
            if (roleId === 1) {
                return false
            } else {
                return true
            }
        } else {
            if (roleId === 1) {
                return false
            } else {
                return item.value !== region
            }
        }
    }

    const checkRoleDisabled = item => {
        if (props.isUpdate) {
            if (roleId === 1) {
                return false
            } else {
                return true
            }
        } else {
            if (roleId === 1) {
                return false
            } else {
                return item.id !== 3
            }
        }
    }

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
                        {props.regionList.map(item => <Option value={item.value} key={item.id} disabled={chechRegionDisabled(item)}>{item.title}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="roleId"
                    label="Role"
                    rules={[{ required: true, message: 'Please select the role!' }]}
                >
                    <Select onChange={(value) => {
                        if (value === 1) {
                            ref.current.setFieldsValue({
                                region: ""
                            })
                            setIsDisabled(true)
                        }
                        else setIsDisabled(false)
                    }}>
                        {props.roleList.map(item => <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
})
export default UserForm