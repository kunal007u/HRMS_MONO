import React from 'react'
import "./officeassetes.css"
import DialogForm from '../../../../Shared/components/DialogForm'
import AddOfficeAssetsForm from './AddOfficeAssetsForm'
import CustomShortingMuiTable from '../../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import { Field, Formik } from 'formik'
import { Form } from 'react-router-dom'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'
import { Button } from '@mui/material'
import { getModulePermission } from '../../../../utils/commanFunctions'
import { Modules } from '../../../../Shared/enums/modules'
import { FaPlus } from 'react-icons/fa'

const dummyData = [
  {
    id: 1,
    assetName: 'Hp Probook 450 G8',
    assetType: 'Laptop',
    cost: '100000$',
    assetDescription: 'loreum ipsum n  djskjdskj dskj',
    assetBrand: 'Hp',
    warrantyStartDate: '22Nov 2021',
    warrantyEndDate: '22Nov 2022',
    category: 'Computer',
    quantity: 1,
    dateOfPurchase: '22Nov 2021'

  },
  {
    id: 2,
    assetName: 'Dell XPS 13',
    assetType: 'Laptop',
    cost: '120000$',
    assetDescription: 'loreum ipsum n  djskjdskj dskj',
    assetBrand: 'Dell',
    warrantyStartDate: '01Dec 2021',
    warrantyEndDate: '01Dec 2023',
    category: 'Computer',
    quantity: 1,
    dateOfPurchase: '01Dec 2021'

  },
  {
    id: 3,
    assetName: 'Apple iPhone 13',
    assetType: 'Mobile',
    cost: '80000$',
    assetDescription: 'loreum ipsum n  djskjdskj dskj',
    assetBrand: 'Apple',
    warrantyStartDate: '15Nov 2021',
    warrantyEndDate: '15Nov 2023',
    category: 'Mobile',
    quantity: 1,
    dateOfPurchase: '15Nov 2021'
  },
  {
    id: 4,
    assetName: 'Samsung Galaxy S21',
    assetType: 'Mobile',
    cost: '70000$',
    assetDescription: 'loreum ipsum n  djskjdskj dskj',
    assetBrand: 'Samsung',
    warrantyStartDate: '10Dec 2021',
    warrantyEndDate: '10Dec 2022',
    category: 'Mobile',
    quantity: 1,
    dateOfPurchase: '10Dec 2021'
  },
  // Add more dummy data as needed
];
const OfficeAssetes = () => {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [permission, setPermission] = React.useState(null);

  React.useEffect(() => {
    (async function () {
      const permission = await getModulePermission(Modules.OfficeAssetes);
      setPermission(permission);
    })();
  }, [])
  const columns = [
    { id: "index", label: "S.No", className: "text-center" },
    { id: "assetName", label: "Name", },
    { id: "cost", label: "Cost", className: "text-center" },
    { id: "quantity", label: "Quantity", className: "text-center" },
    { id: "assetDescription", label: "Description", className: "text-center" },
    { id: "assetBrand", label: "Brand", className: "text-center" },
    { id: "dateOfPurchase", label: "Date of Purchase", className: "text-center", sortable: true },
    { id: "warrantyStartDate", label: "Warranty(SD)", className: "text-center" },
    { id: "warrantyEndDate", label: "Warranty(ED)", className: "text-center" },
    { id: "category", label: "Category", className: "text-center" },
    { id: "actions", label: "Action", className: "text-center" }
  ];

  const mapResponseToColumns = dummyData.map((item, index) => {
    return {
      index: index + 1,
      ...item
    };
  });

  const handleEdit = (row: any) => {
    console.log("edit", row);
  }
  const handleDelete = (row: any) => {
    console.log("delete", row);
  }

  return (
    <section className="office-assets">
      <div className="add-office-asset-btn d-flex justify-end">
        <Button className="btn" onClick={() => setOpenDialog(true)}>
          <span> Add Office Asset <FaPlus /></span>
        </Button>
      </div>

      <div className="white-box mt-1">
        <Formik
          initialValues={{
            name: '',
            type: '',
            startDate: '',
            endDate: '',
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <div className="filter-form d-flex gap-1 form mb-1" style={{ flexWrap: "nowrap" }}>
                  <div className="form-group">
                    <Field
                      placeholder="Name"
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={values?.name}
                      component={FormikInput}
                      onChange={(e: any) => {
                        setFieldValue("name", e.target.value)
                      }}
                    />
                  </div>
                  <div className="form-group ">
                    <Field
                      placeholder="Type"
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={values?.type}
                      options={[
                        { value: 1, title: "Computer" },
                        { value: 2, title: "Mobile" },
                        { value: 4, title: "Other" },
                      ]}
                      component={FormikSelect}
                      onChange={(e: any) => {
                        setFieldValue("type", e.target.value)
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      placeholder="Start Date"
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      value={values?.startDate}
                      component={FormikInput}
                      onChange={(e: any) => {
                        setFieldValue("startDate", e.target.value)
                      }
                      }
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      placeholder="End Date"
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      value={values?.endDate}
                      component={FormikInput}
                      onChange={(e: any) => {
                        setFieldValue("endDate", e.target.value)
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Button type="submit" className="btn btn-primary">
                      <span>Clear</span>
                    </Button>
                  </div>
                </div>
              </Form>

            )
          }}
        </Formik>
        <CustomShortingMuiTable columns={columns} rows={mapResponseToColumns} onEdit={handleEdit} onDelete={handleDelete} isEditAction={true} isDeleteAction={true} />
      </div>
      <DialogForm
        scroll="body"
        maxWidth="md"
        title="Add Office Asset"
        className='dialog-form'
        openDialog={openDialog}
        handleDialogClose={() => setOpenDialog(false)}
        bodyContent={<AddOfficeAssetsForm />}
      />
    </section>
  )
}

export default OfficeAssetes