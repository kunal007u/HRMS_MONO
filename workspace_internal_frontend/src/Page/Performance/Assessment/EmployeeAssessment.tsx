import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { IRoleRoutePermissionModel } from '../../../Models/role'
import { Modules } from '../../../Shared/enums/modules'
import SkillsReview from '../Reviews/SkillsReview'


const EmployeeAssessment = () => {
    const { id } = useParams()
    const { data } = useQuery({
        queryKey: ['employeeAssessment'],
        queryFn: () => {
            // return fetch('http://localhost:3000/employeeAssessment').then(res => res.json())
        }
    })
    
    return (
        <div className=''>
            <SkillsReview data={data} />
        </div>
    )
}

export default EmployeeAssessment