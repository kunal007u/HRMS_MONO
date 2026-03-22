import { Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { Modules } from '../../../Shared/enums/modules';

const skills = [
    { name: 'technicalSkills', initialRating: null },
    { name: 'knowledge', initialRating: null },
    { name: 'initiativeOwnershipAndRiskTaking', initialRating: null },
    { name: 'productivityTheAbilityToDeliverResults', initialRating: null },
    { name: 'queryDefectsResolutions', initialRating: null },
    { name: 'tasksPlanningAndExecution', initialRating: null },
    { name: 'innovativeSolutionAndQuickTroubleshooting', initialRating: null },
    { name: 'qualityOfWork', initialRating: null },
    { name: 'canWorkInCriticalSituations', initialRating: null },
    { name: 'cooperationCollaboration', initialRating: null },
    { name: 'readinessToTakeOnOtherNewerResponsibilities', initialRating: null },
    { name: 'communicationSkillAndInterpersonalSkills', initialRating: null },
    { name: 'punctualityTimelinessMeetingDeadlinesManagingTime', initialRating: null },
    { name: 'readinessAndAbilityToLearn', initialRating: null },
];

interface Props {
    data?: any
}
const SkillsReview = ({ data }: Props) => {
    const [values, setValues] = React.useState({
        technicalSkills: null,
        knowledge: null,
        initiativeOwnershipAndRiskTaking: null,
        productivityTheAbilityToDeliverResults: null,
        queryDefectsResolutions: null,
        tasksPlanningAndExecution: null,
        innovativeSolutionAndQuickTroubleshooting: null,
        qualityOfWork: null,
        canWorkInCriticalSituations: null,
        cooperationCollaboration: null,

        readinessToTakeOnOtherNewerResponsibilities: null,
        communicationSkillAndInterpersonalSkills: null,
        punctualityTimelinessMeetingDeadlinesManagingTime: null,
        readinessAndAbilityToLearn: null,
    })

    return (
        <Formik
            initialValues={{
                technicalSkills: null,
                knowledge: null,
                initiativeOwnershipAndRiskTaking: null,
                productivityTheAbilityToDeliverResults: null,
                queryDefectsResolutions: null,
                tasksPlanningAndExecution: null,
                innovativeSolutionAndQuickTroubleshooting: null,
                qualityOfWork: null,
                canWorkInCriticalSituations: null,
                cooperationCollaboration: null,
                readinessToTakeOnOtherNewerResponsibilities: null,
                communicationSkillAndInterpersonalSkills: null,
                punctualityTimelinessMeetingDeadlinesManagingTime: null,
                readinessAndAbilityToLearn: null,
            }}
            onSubmit={(values) => {
                console.log(values)
            }}

        >
            {({ handleSubmit, values, setFieldValue }) => {
                return (

                    <TableContainer className='white-box'>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Skills and competencies</TableCell>
                                    <TableCell className='text-center'>Assessment and Comments by Self</TableCell>
                                    <TableCell>Scoring by self</TableCell>
                                    {
                                        !data &&
                                        <TableCell className='text-center'>Assessment and Comments by Manager</TableCell>
                                    }

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {skills.map((skill) => (
                                    <TableRow key={skill.name}>
                                        <TableCell>{skill.name}</TableCell>
                                        <TableCell className='text-center'>Good</TableCell>
                                        <TableCell >
                                            <Rating
                                                name={skill.name}
                                                value={values[skill.name]}
                                                onChange={(event, newValue) => {
                                                    setValues({
                                                        ...values,
                                                        [skill.name]: newValue
                                                    });
                                                    setFieldValue(skill.name, newValue);
                                                }}
                                            />
                                        </TableCell>
                                        {
                                            !data &&
                                            <TableCell className='text-center'>
                                                <Rating
                                                    name={skill.name}
                                                    value={values[skill.name]}
                                                    onChange={(event, newValue) => {
                                                        setValues({
                                                            ...values,
                                                            [skill.name]: newValue
                                                        });
                                                        setFieldValue(skill.name, newValue);
                                                    }}
                                                />
                                            </TableCell>
                                        }

                                    </TableRow>
                                ))}
                                {/* Repeat for other skills */}
                            </TableBody>
                        </Table>

                    </TableContainer>
                )
            }}
        </Formik>
    )
}



export default SkillsReview