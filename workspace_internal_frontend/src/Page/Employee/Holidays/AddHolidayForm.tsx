import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import holidaysService from '../../../Services/holidays-service';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import FormikDatePicker from '../../../Shared/formik-fields/FormikDatePicker';
import { Holiday, HolidayFormValues } from '../../../Models/holidays/holidaysM';

interface Iprops {
  holidayRef: Holiday;
  setOpenDialog: (value: boolean) => void;
}

const AddHolidayForm = ({ holidayRef, setOpenDialog }: Iprops) => {

  const queryClient = useQueryClient();

  const createHolidayMutation = useMutation({
    mutationFn: holidaysService.createHoliday,
    onSuccess: (data) => {
      toast.success(data?.data?.status?.message);
      queryClient.invalidateQueries({ queryKey: ['getAllHolidayQueryKey'] });
      setOpenDialog(false);
      holidayRef = null;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  const updateHolidayMutation = useMutation({
    mutationFn: (values: HolidayFormValues) => holidaysService.updateHoliday(holidayRef.id, values),
    onSuccess: (data) => {
      toast.success(data?.data?.status?.message);
      queryClient.invalidateQueries({ queryKey: ['getAllHolidayQueryKey'] });
      setOpenDialog(false);
      holidayRef = null;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (values: HolidayFormValues) => {
    if (holidayRef?.id) {
      updateHolidayMutation.mutate(values);
    } else {
      createHolidayMutation.mutate(values);
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          title: holidayRef?.title || '',
          date: holidayRef?.date || '',
        } as HolidayFormValues}
        onSubmit={(values) => handleSubmit(values)}
        onReset={() => {
          console.log('reset');
        }}
      >
        {({ handleSubmit, values, setFieldValue, handleReset }) => {
          return (
            <Form onSubmit={handleSubmit} className='modal-form' >
              <div className="form direction-column">
                <div className="mb-2 content-box" >
                  <label htmlFor="title" className='form-label'>Holiday Title</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={values?.title}
                    component={FormikInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("title", e.target.value)}
                  />
                </div>
                <div className="form-group content-box" style={{ width: "100%" }}>
                  <label htmlFor="date" className='form-label'>Holiday Date</label>
                  <Field
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={values?.date}
                    component={FormikDatePicker}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("date", e.target.value)}
                  />
                </div>
              </div>
              <div className="submit-btn">
                <Button type="submit" className="btn btn-primary">
                  <span>
                    Submit
                  </span>
                </Button>
              </div>
            </Form>
          )
        }}

      </Formik>
    </div >
  )
}

export default AddHolidayForm