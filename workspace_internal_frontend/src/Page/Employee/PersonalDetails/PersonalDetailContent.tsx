import { IAllemployeeData } from '../../../Models/employee/employeeM';
import BankDetailBox3 from './BankDetailBox3';
import EmrgencyContactBox2 from './EmergencyContactBox2';
import ExperienceInformationsBox4 from './ExperienceInformationsBox4';
import PersonalInformationBox1 from './PersonalInformationBox1';
import './personaldetail.css';

interface PersonalDetailContentProps {
  employeeDetail: IAllemployeeData;
}
const PersonalDetailContent = ({ employeeDetail }: PersonalDetailContentProps) => {
  
  return (
    <div className="profile">
      <div className="profile-container">
        <PersonalInformationBox1 employee={employeeDetail?.employee} />
        <EmrgencyContactBox2 emergencyContacts={employeeDetail?.emergencyContacts} />
      </div>
      <div className='profile-container'>
        <BankDetailBox3 bankDetails={employeeDetail?.bankDetails} />
        <ExperienceInformationsBox4 employeeDetail={employeeDetail} />
      </div>
    </div>

  )
}

export default PersonalDetailContent;