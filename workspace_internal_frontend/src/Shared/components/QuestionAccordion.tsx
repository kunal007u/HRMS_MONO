import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Field } from 'formik';
import { BiCheckCircle } from 'react-icons/bi';
import { MdExpandMore } from 'react-icons/md';
import FormikInput from '../formik-fields/FormikInput';
import { BsCheckCircleFill } from 'react-icons/bs';

interface QuestionAccordionProps {
    questionNumber: number;
    questionText: string;
    fieldName: string;
    fieldValue: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({ questionNumber, questionText, fieldName, fieldValue, setFieldValue }) => {
    return (
        <div className={`question${questionNumber} question`}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <div className='d-flex align-center justify-between' style={{ width: "100%" }}>

                        <Typography>{questionNumber} {questionText}</Typography>
                        {
                            fieldValue.length > 100 && <BsCheckCircleFill style={{ color: "green" }} />
                        }
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Field
                        placeholder={`Question ${questionNumber}`}
                        className="form-control"
                        id={`question${questionNumber}`}
                        name={fieldName}
                        multiline
                        rows={3}
                        maxLength={400}
                        value={fieldValue}
                        component={FormikInput}
                        onChange={(e: any) => {
                            setFieldValue(fieldName, e.target.value);
                        }}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default QuestionAccordion;