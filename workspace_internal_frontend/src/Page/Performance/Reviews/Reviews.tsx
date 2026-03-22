import { Button, Step, StepLabel, Stepper } from '@mui/material'
import { Field, Formik } from 'formik'
import React from 'react'
import { Form } from 'react-router-dom'
import QuestionAccordion from '../../../Shared/components/QuestionAccordion'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'
import SkillsReview from './SkillsReview'
import "./reviews.css"

const questions = [
    {
        number: 1,
        text: "What accomplishments/ achievements of this quarter are you most proud of?",
        field: "question1"
    },
    {
        number: 2,
        text: "Challenges faced by you in the last quarter",
        field: "question2"
    },
    {
        number: 3,
        text: "In which area(s) would you like to improve? OR Development areas to focus on in the next quarter",
        field: "question3"
    },
    {
        number: 4,
        text: "Which goals did you meet? Which goals fell short? Why? How will you do those differently in the future?",
        field: "question4"
    },
    {
        number: 5,
        text: "What help/ support do you need from your senior or the company?",
        field: "question5"
    },
    {
        number: 6,
        text: "What Technical skills do you know currently? What new skills you are planning to learn in this quarter?",
        field: "question6"
    },
    {
        number: 7,
        text: "Strengths exhibited in the last quarter OR What are your key strengths? (areas of expertise, what do you enjoy most)",
        field: "question7"
    },
];

const Reviews = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Fill the form', 'List all skills'];

    return (
        <>
            <Stepper activeStep={activeStep} className='mb-1'>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === 0 ? (
                <Formik
                    initialValues={{
                        name: '',
                        reportToWhom: '',
                        designation: '',
                        projectsEngagedWith: '',
                        reviewPeriod: '',
                        reviewDate: '',
                        question1: '',
                        question2: '',
                        question3: '',
                        question4: '',
                        question5: '',
                        question6: '',
                        question7: '',
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({ handleSubmit, values, setFieldValue }) => {
                        return (
                            <div className='white-box mt-1'>
                                <div className="d-flex justify-between mb-1">
                                    <h1 className="page-title">Reviews</h1>

                                </div>
                                <Form>
                                    <div className="d-flex gap-1  review-form">
                                        <div className="name content-box">
                                            <Field
                                                placeholder="Name"
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={values?.name}
                                                component={FormikInput}
                                                onChange={(e: any) => {
                                                    setFieldValue("name", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="report-to-whom content-box">
                                            <Field
                                                placeholder="Report To Whom"
                                                type="text"
                                                className="form-control"
                                                id="reportToWhom"
                                                name="reportToWhom"
                                                value={values?.reportToWhom}
                                                component={FormikSelect}
                                                options={[
                                                    { value: 1, title: "john" },
                                                    { value: 2, title: "doe" },
                                                    { value: 3, title: "jane" },
                                                ]}

                                                onChange={(e: any) => {
                                                    setFieldValue("reportToWhom", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="designation content-box">
                                            <Field
                                                placeholder="Designation"
                                                type="text"
                                                className="form-control"
                                                id="designation"
                                                name="designation"
                                                value={values?.designation}
                                                component={FormikSelect}
                                                options={[
                                                    { value: 1, title: "Software Engineer" },
                                                    { value: 2, title: "Senior Software Engineer" },
                                                    { value: 3, title: "Team Lead" },
                                                ]}
                                                onChange={(e: any) => {
                                                    setFieldValue("designation", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="projects-engaged-with content-box">
                                            <Field
                                                placeholder="Projects Engaged With"
                                                type="text"
                                                className="form-control"
                                                id="projectsEngagedWith"
                                                name="projectsEngagedWith"
                                                value={values?.projectsEngagedWith}
                                                component={FormikInput}
                                                onChange={(e: any) => {
                                                    setFieldValue("projectsEngagedWith", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="review-period content-box">
                                            <Field
                                                placeholder="Review Period"
                                                type="text"
                                                className="form-control"
                                                id="reviewPeriod"
                                                name="reviewPeriod"
                                                value={values?.reviewPeriod}
                                                component={FormikInput}
                                                onChange={(e: any) => {
                                                    setFieldValue("reviewPeriod", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="review-date content-box">
                                            <Field
                                                placeholder="Review Date"
                                                type="date"
                                                className="form-control"
                                                id="reviewDate"
                                                name="reviewDate"
                                                value={values?.reviewDate}
                                                component={FormikInput}
                                                onChange={(e: any) => {
                                                    setFieldValue("reviewDate", e.target.value);
                                                }}
                                            />
                                        </div>

                                        {questions.map((question) => (
                                            <QuestionAccordion
                                                key={question.number}
                                                questionNumber={question.number}
                                                questionText={question.text}
                                                fieldName={question.field}
                                                fieldValue={values[question.field]}
                                                setFieldValue={setFieldValue}
                                            />
                                        ))}
                                    </div>

                                    <div className="d-flex justify-start mt-2">
                                        <Button className="btn" type='submit' variant="contained" color="primary" onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}>
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </div>

                        )
                    }}
                </Formik >
            ) : (
                <>
                    <SkillsReview />
                </>
            )}


        </>
    )
}

export default Reviews