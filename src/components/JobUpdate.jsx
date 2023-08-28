import React from 'react'
import { Card } from 'antd'
import '../scss/JobUpdates.scss'

function JobUpdate() {
    const jobData = [
        {
            title: "Customer service representative and Field Executive",
            qualification: "Graduate, freshers or Undergraduates",
            gender: "Male / Female both",
            mustComplete: "12th Pass [Under graduate and graduate can apply]",
            location: "Rajkot and Morbi",
            salary: "16-20k CTC",
            workType: "Looking for Immediate Joiners. (Work From Office Only)",
            salaryDiscussion: "Salary Depends on the final round of Interview",
            mobile: "7011174719",
            email: "hr@fuertedevelopers.in"
        },
        {
            title: "Customer service representative and Field Executive",
            qualification: "Graduate, freshers or Undergraduates",
            gender: "Male / Female both",
            mustComplete: "12th Pass [Under graduate and graduate can apply]",
            location: "Rajkot and Morbi",
            salary: "16-20k CTC",
            workType: "Looking for Immediate Joiners. (Work From Office Only)",
            salaryDiscussion: "Salary Depends on the final round of Interview",
            mobile: "7011174719",
            email: "hr@fuertedevelopers.in"
        }
    ]
  return (
    <div className='jobUpdates'>
        <h3>Job Updates</h3>
        
       <div className="jobInfo">
            {jobData.map((data) => (
                <Card className="card">
                    <h5>{data.title}</h5>
                    <h6>Eligibility Criteria:</h6>
                    <p>We are hiring {data.qualification}</p>
                    <p>{data.gender} can apply for this job.</p>
                    <p>Candidates must be {data.mustComplete}</p>
                    <p>Job Location-{data.location}</p>
                    <h6>Other Details:</h6>
                    <p>Salary:{data.salary}</p>
                    <p>{data.workType}</p>
                    <p>{data.salaryDiscussion}</p>
                    <p>Interested candidates can share their Resume on this same whats app number.</p>
                    <p>i.e., {data.mobile} or at {data.email}</p>
                </Card>

            ))}
       </div>
        <div className="info">
            <span>For more details about the company,www.fuertedevelopers.in</span>
        </div>
     
        
    </div>
  )
}

export default JobUpdate
