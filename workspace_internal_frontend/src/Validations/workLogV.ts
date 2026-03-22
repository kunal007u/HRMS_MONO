import * as Yup from 'yup';

export const addWorkFormValidationSchema = Yup.object().shape({
    date: Yup.date()
      .required('Date is required'),
    workDetails: Yup.array()
      .of(
        Yup.object().shape({
          // workHour: Yup.string()
          //   .required('Work Hour is required'),
          //   // .test('is-valid-time', 'Work Hour must be less than or equal to 11:59', (value) => {
          //   //     if (!value) return false;
          //   //     const [hours, minutes] = value.split(':').map(Number);
          //   //     return hours < 12 && minutes < 60;
          //   //   }),
          workDescription: Yup.string()
            .required('Work Description is required').trim(),
          workTitle: Yup.string()
            .required('Work Title is required'),
        })
      )
      .required('At least one work detail is required')
      .min(1, 'At least one work detail is required'),
  });