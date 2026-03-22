import './worklog.css';

const WorkLogDetail = ({ row }) => {
  return (
    <div style={{ padding: '20px', borderRadius: '10px', minWidth:"600px" }}>
      {
        row?.workDetails?.map((log, index) => (
          <div key={index} style={{ marginBottom: '20px', backgroundColor: '#ffdf', padding: '10px', borderRadius: '5px' }}>
            <h2 style={{ fontSize: '20px', color: '#333' }}>{log.projectName} - {log.workHour}</h2>
            <div className="work-detail-lists" dangerouslySetInnerHTML={{ __html: log.workDescription }} />
          </div>
        ))
      }
    </div>
  )
}

export default WorkLogDetail