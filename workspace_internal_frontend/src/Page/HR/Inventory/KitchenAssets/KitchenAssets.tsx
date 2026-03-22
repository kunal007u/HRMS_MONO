import { Button } from '@mui/material'
import { Field, Formik } from 'formik'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form } from 'react-router-dom'
import CustomShortingMuiTable from '../../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../../Shared/components/DialogForm'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'
import AddKitchenAssetsForm from './AddKitchenAssetsForm'
import "./kitchenassets.css"

const dummyData = [
    {
        id: 1,
        assetName: 'Microwave Oven',
        assetType: 'Microwave',
        cost: '500$',
        assetDescription: 'loreum ipsum n  djskjdskj dskj',
        assetBrand: 'LG',
        warrantyStartDate: '01Jan 2022',
        warrantyEndDate: '01Jan 2024',
        quantity: 2,
        dateOfPurchase: '01Jan 2021'
    },
    {
        id: 2,
        assetName: 'Refrigerator',
        assetType: 'Refregerator',
        cost: '1000$',
        assetDescription: 'loreum ipsum n  djskjdskj dskj cdnjkvbfnvdcsdjvkbdnlsc vdbjklndscvd ',
        assetBrand: 'Samsung',
        warrantyStartDate: '15Feb 2022',
        warrantyEndDate: '15Feb 2024',
        quantity: 1,
        dateOfPurchase: '15Feb 2021'
    },
    {
        id: 3,
        assetName: 'Coffee Maker 4000Rx',
        assetType: 'Coffee Maker',
        cost: '200$',
        assetDescription: 'loreum ipsum n  djskjdskj dskj',
        assetBrand: 'Keurig',
        warrantyStartDate: '01Mar 2022',
        warrantyEndDate: '01Mar 2024',
        quantity: 1,
        dateOfPurchase: '01Mar 2021'
    },
    // Add more dummy data as needed
];
const KitchenAssets = () => {
    const [openDialog, setOpenDialog] = React.useState(false)

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center' },
        { id: "assetName", label: "Name", },
        { id: "quantity", label: "Quantity", className: "text-center" },
        { id: "cost", label: "Cost", className: "text-center", sortable: true },
        { id: "assetDescription", label: "Description", className: "text-center" },
        { id: "assetBrand", label: "Brand", className: "text-center" },
        { id: "dateOfPurchase", label: "Date of Purchase", className: "text-center", sortable: true },
        { id: "warrantyStartDate", label: "Warranty(SD)", className: "text-center" },
        { id: "warrantyEndDate", label: "Warranty(ED)", className: "text-center" },
        { id: "actions", label: "Action", className: "text-center" }
    ]

    const mapResponseToColumns = dummyData.map((item: any,index:number) => {
        return {
            ...item,
            index: index + 1,
            warrantyStartDate: new Date(item.warrantyStartDate).toLocaleDateString(),
            warrantyEndDate: new Date(item.warrantyEndDate).toLocaleDateString(),
        }
    })

    const handleEdit = (row: any) => {
        console.log("edit", row)
    }

    const handleDelete = (row: any) => {
        console.log("delete", row)
    }

    return (
        <section className="office-assets">
            <div className="add-kitchen-asset-btn d-flex justify-end">
                <Button className="btn" onClick={() => setOpenDialog(true)}>
                    <span><FaPlus style={{ marginRight: "5px" }} /> Add Kitchen Asset </span>
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
                                                { value: 1, title: "Microwave Oven" },
                                                { value: 2, title: "Refrigerator" },
                                                { value: 3, title: "Coffee Maker" },
                                                { value: 4, title: "Toaster" },
                                                { value: 5, title: "Blender" },
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
                                            }}
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
                                            <span>
                                                Clear
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Form>

                        )
                    }}
                </Formik>
                <CustomShortingMuiTable columns={columns} rows={mapResponseToColumns} isEditAccess={true} onEdit={handleEdit} onDelete={handleDelete} isEditAction={true} isDeleteAction={true} />
            </div>
            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Add Office Asset"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={<AddKitchenAssetsForm />}
            />
        </section>
    )
}

export default KitchenAssets