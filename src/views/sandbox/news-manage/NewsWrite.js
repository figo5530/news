import React from 'react'
import { Button, PageHeader, Steps } from 'antd'
import { useState } from 'react'

export default function NewsWrite() {

  const { Step } = Steps
  const [currentStep, setCurrentStep] = useState(2)
  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }
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

      <div style={{marginTop: '50px'}}>
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
