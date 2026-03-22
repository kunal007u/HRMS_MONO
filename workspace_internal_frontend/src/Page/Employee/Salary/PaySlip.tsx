import { Button } from '@mui/material';
import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import pragetx from '../../../Assets/Images/pragetx.png';
import { Modules } from '../../../Shared/enums/modules';
import { getModulePermission } from '../../../utils/commanFunctions';
import "../../HR/Salary/salary.css";

const dummayData = [
  {
    paySlipId: '#49029',
    salaryMonth: 'Feb 2019',
    employeeName: 'John Doe',
    occupation: 'Software Engineer',
    employeeId: 'FT-0009',
    joiningDate: '01/01/2019',

    earnings: [
      {
        basicSalary: 10000,
        travelAllowance: 10000,
        medicalAllowance: 10000,
        houseRentAllowance: 10000,
        totalEarning: 10000,
      }
    ],

    deductions: [
      {
        providentFund: 10000,
        tax: 10000,
        otherDeductions: 10000,
        totalDeduction: 10000,
      }
    ],

  }
]

const PaySlip = () => {
  const [permission, setPermission] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async function () {
      const permission = await getModulePermission(Modules.PaySlip);
      setPermission(permission);
    })();
  }, [])
  // const { data: employeeDetail } = useQuery(['employeeDetail'], async () => {
  //   if (id) {
  //     const res = await personalDetailService.getPersonalDetailById(id);
  //     return res?.data?.data as AllEmployeeDetails;
  //   } else {
  //     const res = await personalDetailService.getAllPersonalDetail();
  //     return res?.data?.data as AllEmployeeDetails;
  //   }
  // });

  return (
    <section className="pay-slip ">
      <div className="all-employee-container">
        <div className="add-employee-btn d-flex justify-end gap-1" >
          <Button className="btn btn-primary" onClick={()=> navigate(-1)}>
            <span>Back</span>
          </Button>
          <Button className="btn btn-primary">
            <span> <FaDownload style={{ marginRight: "5px" }} />CSV </span>
          </Button>
          <Button className="btn btn-secondary">
            <span> <FaDownload style={{ marginRight: "5px" }} />PDF</span>
          </Button>
        </div>
      </div>
      <div className="white-box pay-slip-container mt-1">
        <div className="main-title d-flex justify-center">
          <h2>
            PAYSLIP FOR THE MONTH OF FEB 2019
          </h2>
        </div>
        {
          dummayData.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <div className="first-half d-flex justify-between pay-slip-content">
                  <div className="left-side d-flex direction-column gap-1">
                    <div>
                      <div className="logo">
                        <img src={pragetx} alt="" />
                      </div>
                      <span style={{ lineHeight: 1.4 }}>
                        D-509 & D-510, Swati Clover,<br />
                        Shilaj Circle,SP Ring Road, Thaltej,<br />
                        Ahmedabad - 380054
                      </span>
                    </div>
                    <div>
                      <div className='employee-detail'>
                        <h3>{data?.employeeName}</h3>
                        <small>{data?.occupation}</small> <br />
                        <small>Employee ID: {data?.employeeId}</small> <br />
                        <small>Joining Date: {data?.joiningDate}</small>
                      </div>

                    </div>
                  </div>
                  <div className="right-side">
                    <h3>PAYSLIP {data?.paySlipId}</h3>
                    <h6>Salary Month:{data?.salaryMonth}</h6>
                  </div>
                </div>
                <div className="second-half mt-1">
                  <div className="left-side">
                    <div className="title mb-1">
                      <h4>Earnings</h4>
                    </div>
                    {
                      data?.earnings.map((earning, index) => {
                        return (

                          <table className="earning-table" key={index}>
                            <tbody className="table-body">
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Basic Salary</strong>
                                  <span>{earning?.basicSalary}</span>
                                </td>
                              </tr>
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Travel Allowance</strong>
                                  <span>{earning?.travelAllowance}</span>
                                </td>
                              </tr>
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Medical Allowance</strong>
                                  <span>{earning?.medicalAllowance}</span>
                                </td>
                              </tr>
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>House Rent Allowance</strong>
                                  <span>{earning?.houseRentAllowance}</span>
                                </td>
                              </tr>
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Total Earning</strong>
                                  <span>{earning?.totalEarning}</span>
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        )
                      })
                    }

                  </div>
                  <div className="right-side">
                    <div className="title mb-1">
                      <h4>Deductions</h4>
                    </div>
                    {
                      data?.deductions.map((deduction, index) => {
                        return (
                          <table className="deduction-table" key={index}>
                            <tbody className="table-body">
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Provident Fund</strong>
                                  <span>{deduction?.providentFund}</span>
                                </td>
                              </tr>
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Tax</strong>
                                  <span>{deduction?.tax}</span>
                                </td>
                              </tr>
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Other Deductions</strong>
                                  <span>{deduction?.otherDeductions}</span>
                                </td>
                              </tr>
                              <tr>
                                <td className='d-flex justify-between'>
                                  <strong>Total Deduction</strong>
                                  <span>{deduction?.totalDeduction}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )
                      })
                    }
                  </div>
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    </section>
  )
}

export default PaySlip