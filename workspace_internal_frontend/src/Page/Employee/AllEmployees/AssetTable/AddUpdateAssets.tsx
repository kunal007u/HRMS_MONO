import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import personalDetailService from '../../../../Services/personal-detail-service';
import FormikDatePicker from '../../../../Shared/formik-fields/FormikDatePicker';
import FormikInput from '../../../../Shared/formik-fields/FormikInput';
import { AssetsDetails } from '../../../../Models/employee/employeeM';
import { addAssetValidationSchema } from '../../../../Validations/employeeV';

interface IAddUpdateAssets {
  assetsDetails: AssetsDetails;
  setOpenDialog: (value: boolean) => void;
}
const AddUpdateAssets = ({ assetsDetails, setOpenDialog }: IAddUpdateAssets) => {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const AddUploadAssetsMutation = useMutation({
    mutationFn: (values: AssetsDetails) => assetsDetails?.assetsID ? personalDetailService.UpdateAssetsDetailsByID(values, id ? id : "", assetsDetails?.assetsID ?? '') : personalDetailService.AddAssetsDetailsByID(values, id ? id : ""),
    onSuccess: (res) => {
      if (res?.data?.status) {
        queryClient.invalidateQueries({ queryKey: ['employeeDetail'] });
        setOpenDialog(false);
        toast.success(res?.data?.status?.message);
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  })

  const handleSubmit = async (values) => {
    AddUploadAssetsMutation.mutate(values);
  };

  return (
    <section className="bank-detail-form">
      <Formik
        initialValues={{
          assetsName: assetsDetails?.assetsName ? assetsDetails?.assetsName : "",
          quantity: assetsDetails?.quantity ? assetsDetails?.quantity : "",
          description: assetsDetails?.description ? assetsDetails?.description : "",
          assignedDate: assetsDetails?.assignedDate ? assetsDetails?.assignedDate : "",
        }}
        onSubmit={handleSubmit}
        validationSchema={addAssetValidationSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <>
              <Form className="personal-detail-form-container">
                <div className="personal-detail-form-content">
                  <div className="bank-name content-box">
                    <label htmlFor="assetsName" className='form-label'>Asset name</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="assetsName"
                      name="assetsName"
                      value={values?.assetsName}
                      component={FormikInput}
                      onChange={(e) => setFieldValue("assetsName", e.target.value)}

                    />
                  </div>
                  <div className="bank-name content-box">
                    <label htmlFor="quantity" className='form-label'>Quantity</label>
                    <Field
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={values?.quantity}
                      component={FormikInput}
                      onChange={(e) => setFieldValue("quantity", e.target.value)}
                    />
                  </div>
                  <div className="account-number content-box">
                    <label htmlFor="assignedDate" className='form-label'>Assign Date</label>
                    <Field
                      type="date"
                      className="form-control"
                      id="assignedDate"
                      name="assignedDate"
                      value={values?.assignedDate}
                      component={FormikDatePicker}
                      onChange={(e) => setFieldValue("assignedDate", e.target.value)}
                    />
                    <div className="add-form-group" style={{ width: "99%" }}>
                      <label htmlFor="description" className='form-label'>Description</label>
                      <Field
                        className="form-control"
                        id="description"
                        rows={4}
                        name="description"
                        value={values?.description}
                        multiline
                        component={FormikInput}
                        onChange={(e) => {
                          setFieldValue("description", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <Button type="submit" className="btn btn-primary">
                    <span>Submit</span>
                  </Button>
                </div>
              </Form>
            </>
          )
        }}
      </Formik>
    </section>
  )
}

export default AddUpdateAssets