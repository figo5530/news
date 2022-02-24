import React, { useEffect, useRef } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select, message, notification } from 'antd'
import { useState } from 'react'
import style from './News.module.css'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import NewsEditor from '../../../components/news-manage/NewsEditor'

export default function NewsUpdate() {
    let navigate = useNavigate()
    const { Option } = Select
    const { Step } = Steps
    const [currentStep, setCurrentStep] = useState(0)
    const [categoryList, setCategoryList] = useState([])
    const [formInfo, setFormInfo] = useState({})
    const [content, setContent] = useState("")


    const handleNext = () => {
        if (currentStep === 0) {
            NewsForm.current.validateFields().then(res => {
                setFormInfo(res)
                setCurrentStep(currentStep + 1)
            }).catch(error => {
                console.log(error)
            })
        } else {
            if (content === "" || content.trim() === "<p></p>") {
                message.error("Write something please")
            } else {
                setCurrentStep(currentStep + 1)
            }
        }
    }

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1)
    }

    useEffect(() => {
        axios.get("http://localhost:5000/categories").then(res => {
            setCategoryList(res.data)
        })
    }, [])

    let location = useLocation()

    useEffect(() => {
        axios.get(`http://localhost:5000/news/${location.pathname.split("/")[4]}?_expand=category&_expand=role`).then(res => {
            let {title, categoryId, content} = res.data
            NewsForm.current.setFieldsValue({
                title,
                categoryId
            })
            setContent(content)            
        })
    }, [location.pathname])

    const NewsForm = useRef(null)

    const handleSave = (auditState) => {
        axios.patch(`http://localhost:5000/news/${location.pathname.split("/")[4]}`, {
            ...formInfo,
            "content": content,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publisheTime": 0
        }).then(res => {
            auditState === 0 ? navigate('/news-manage/news/draft') : navigate('/audit-manage/audit/list')
            notification.info({
                message: "Notification",
                description: `Now you can check your press in ${auditState === 0 ? 'Draft' : 'Audit list'}`,
                placement: "bottomRight"
            })
        })
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Update"
                onBack={() => window.history.back()}
            />

            <Steps current={currentStep}>
                <Step title="Info" description="Title and Category" />
                <Step title="Content" description="Content of the press" />
                <Step title="Submit" description="Draft or Audit" />
            </Steps>,

            <div style={{ marginTop: "50px" }}>
                <div className={currentStep === 0 ? '' : style.active}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        labelAlign="left"
                        ref={NewsForm}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the category!',
                                },
                            ]}
                        >
                            <Select>
                                {
                                    categoryList.map(item => {
                                        return <Option key={item.id} value={item.id}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </div>
                <div className={currentStep === 1 ? '' : style.active}>
                    <NewsEditor getContent={(value) => {
                        // console.log(value)
                        setContent(value)
                    }} content={content}/>
                </div>
                <div className={currentStep === 2 ? '' : style.active}></div>
            </div>

            <div style={{ marginTop: '50px' }}>
                {
                    currentStep === 2 && <span>
                        <Button type='primary' onClick={() => handleSave(0)}>Save in Draft</Button>
                        <Button danger onClick={() => handleSave(1)}>Submit</Button>
                    </span>
                }
                {
                    currentStep < 2 && <Button type='primary' onClick={handleNext}>Next</Button>
                }
                {
                    currentStep > 0 && <Button onClick={handlePrevious}>Previous</Button>
                }
            </div>
        </div>
    )
}

