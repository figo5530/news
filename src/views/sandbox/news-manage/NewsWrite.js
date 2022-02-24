import React, { useEffect, useRef } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select } from 'antd'
import { useState } from 'react'
import style from './News.module.css'
import axios from 'axios'
import NewsEditor from '../../../components/news-manage/NewsEditor'

export default function NewsWrite() {

  const { Option } = Select
  const { Step } = Steps
  const [currentStep, setCurrentStep] = useState(0)
  const [categoryList, setCategoryList] = useState([])

  const handleNext = () => {
    if(currentStep === 0) {
      NewsForm.current.validateFields().then(res => {
        setCurrentStep(currentStep + 1)
      }).catch(error => {
        console.log(error)
      })
    }else {
      setCurrentStep(currentStep + 1)
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

  const NewsForm = useRef(null)

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Write"
        subTitle="This is a subtitle"
      />

      <Steps current={currentStep}>
        <Step title="Info" description="Title and Category" />
        <Step title="Content" description="Content of the press" />
        <Step title="Submit" description="Draft or Audit" />
      </Steps>,

      <div style={{ marginTop: "50px"}}>
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
            console.log(value)
          }}/>
        </div>
        <div className={currentStep === 2 ? '' : style.active}><input /></div>
      </div>

      <div style={{ marginTop: '50px' }}>
        {
          currentStep === 2 && <span>
            <Button type='primary'>Save in Draft</Button>
            <Button danger>Submit</Button>
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
