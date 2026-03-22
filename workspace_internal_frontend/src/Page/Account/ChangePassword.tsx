import { Button } from '@mui/material'
import { Field, Form, Formik } from 'formik';
import FormikInput from '../../Shared/formik-fields/FormikInput';
import { useMutation } from '@tanstack/react-query';
import accountService from '../../Services/account-service';
import { IResetPasswordModel } from '../../Models/account/accountM';
import { toast } from 'react-toastify';
import "../Employee/AllEmployees/allemployee.css"
import { ResetPasswordValidationSchema } from '../../Validations/accountV';
// import "../allemployee.css"
import "../Employee/PersonalDetails/personaldetail.css"

interface IFormProps {
  dialogBoxClose: () => void;
}

const ChangePassword: React.FC<IFormProps> = ({ dialogBoxClose }) => {

  const resetPasswordMutation = useMutation({
    mutationFn: accountService.resetPassword,
    onSuccess: (response) => {
      toast.success(response?.data?.status?.message);
      dialogBoxClose()
    },
  });

  const handleSubmit = (values: IResetPasswordModel) => {
    resetPasswordMutation.mutate(values);
  };

  return (
    <section className="add-employee-form" >
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={ResetPasswordValidationSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="all-employee-form-container">
              <div className="mb-2">
                <div className="personal-detail-form-content">
                  <label htmlFor="currentPassword" className='form-label'>Current Password</label>
                  <Field
                    type="text"
                    name="currentPassword"
                    id="Current Password"
                    value={values.currentPassword}
                    className="form-control"
                    component={FormikInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("currentPassword", e.target.value)}

                  />
                  <label htmlFor="password" className='form-label'>Password</label>
                  <Field
                    type="text"
                    name="password"
                    id="New Password"
                    value={values.password}
                    className="form-control"
                    component={FormikInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("password", e.target.value)}

                  />
                  <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
                  <Field
                    type="text"
                    name="confirmPassword"
                    id="Confirm Password"
                    value={values.confirmPassword}
                    className="form-control"
                    component={FormikInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("confirmPassword", e.target.value)}

                  />
                </div>
                <div className="submit-btn ">
                  <Button type="submit" className="btn btn-primary">
                    <span>
                      Submit
                    </span>
                  </Button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </section>
  )
}

export default ChangePassword