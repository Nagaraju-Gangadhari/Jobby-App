import {FaStar} from 'react-icons/fa'
import './index.css'

const SimilarItems = props => {
  const {listitem} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = listitem
  return (
    <li key={id}>
      <div className="similar-card">
        <div>
          <img
            src={companyLogoUrl}
            className="logo"
            alt="similar job company logo"
          />
          <div>
            <h1 className="heading">{title}</h1>
            <div className="rating-icon">
              <FaStar />
              <p className="para1">{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="heading">Description</h1>
          <p className="para1">{jobDescription}</p>
        </div>
        <div>
          <p>{location}</p>
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarItems
