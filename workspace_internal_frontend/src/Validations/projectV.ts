
import * as yup from 'yup';

export const addProjectSchema = yup.object().shape({
    projectName: yup.string().required('Project Name is required').trim(),
    startDate: yup.string().required('Start Date is required'),
    endDate: yup
    .string()
    .required('End Date is required')
    .test('is-greater', 'End date must be later than start date', function (value) {
      const { startDate } = this.parent;
      return new Date(startDate) <= new Date(value);
    }),
    projectManager: yup.string().required('Project Manager is required'),
    description: yup.string().required('Description is required').trim(),
})
