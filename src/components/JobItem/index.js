import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoBag} from 'react-icons/io5'
import './index.css'

const JobItem = props => {
  const {jobsitem} = props
  const {
    id,
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = jobsitem
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <div className="card-item">
        <div className="top">
          <img
            src={companyLogoUrl}
            className="companylogo"
            alt="company logo"
          />
          <div>
            <h1 className="job-head">{title}</h1>
            <div className="rating-icon">
              <FaStar />
              <p className="para1">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="two-icons">
            <div className="location-icon">
              <IoLocationSharp />
              <p className="location">{location}</p>
            </div>
            <div className="location-icon">
              <IoBag />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="location">{packagePerAnnum}</p>
          </div>
        </div>
        <br className="separator" />
        <div className="last">
          <h1 className="desc-head">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}
export default JobItem
