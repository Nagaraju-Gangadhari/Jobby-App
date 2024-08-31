import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoBag} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarItems from '../SimilarItems'
import './index.css'

const apiStatusList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  initial: 'INITIAL',
}
class JobItemDetails extends Component {
  state = {
    productItem: [],
    similarData: [],
    isLoading: apiStatusList.initial,
    skillsList: [],
    lifeAtCompany: [],
  }

  componentDidMount() {
    this.getProductItem()
  }

  getProductItem = async () => {
    this.setState({isLoading: apiStatusList.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const updateSimilarData = data.similar_jobs.map(eachone => ({
        id: eachone.id,
        companyLogoUrl: eachone.company_logo_url,
        employmentType: eachone.employment_type,
        jobDescription: eachone.job_description,
        location: eachone.location,
        rating: eachone.rating,
        title: eachone.title,
      }))
      const updatedSkillList = data.job_details.skills.map(eachone => ({
        name: eachone.name,
        imageUrl: eachone.image_url,
      }))
      const updatedLifeAtComp = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      console.log(data.similar_jobs)
      this.setState({
        productItem: updatedData,
        similarData: updateSimilarData,
        skillsList: updatedSkillList,
        lifeAtCompany: updatedLifeAtComp,
        isLoading: apiStatusList.success,
      })
    } else {
      this.setState({isLoading: apiStatusList.failure})
    }
  }

  renderDatapage = () => {
    const {productItem, skillsList, lifeAtCompany, similarData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = productItem
    return (
      <div className="card-item">
        <div className="top">
          <img
            src={companyLogoUrl}
            className="companylogo"
            alt="job details company logo"
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
        <hr className="separator" />
        <div className="last">
          <div>
            <h1 className="heading">Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit
            </a>
          </div>
          <p className="description">{jobDescription}</p>
        </div>
        <div className="bottom">
          <h1 className="desc-head">Skills</h1>
          <ul className="list-container-skills">
            {skillsList.map(item => (
              <li key={item.name}>
                <div className="list-skill-item">
                  <img src={item.imageUrl} className="logo" alt={item.name} />
                  <p className="para1">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom-desc">
          <div className="forwidth">
            <h1 className="head">Life at Company</h1>
            <p className="para1">{lifeAtCompany.description}</p>
          </div>
          <div className="forwidth2">
            <img
              src={lifeAtCompany.imageUrl}
              className="desc-image"
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-jobs">
          <h1 className="head">Similar Jobs</h1>
          <ul className="list-container1">
            {similarData.map(eachone => (
              <SimilarItems listitem={eachone} key={eachone.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  clicktoretry = () => {
    this.getProductItem()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="button" type="button" onClick={this.clicktoretry}>
        Retry
      </button>
    </div>
  )

  renderAlldata = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiStatusList.inprogress:
        return this.renderLoaderView()
      case apiStatusList.success:
        return this.renderDatapage()
      case apiStatusList.failure:
        return this.renderFailureview()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container2">
        <Header />
        {this.renderAlldata()}
      </div>
    )
  }
}
export default JobItemDetails
