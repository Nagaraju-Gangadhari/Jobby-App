import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
  noproducts: 'NOPRODUCTS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const locationList = [
  {
    id: 'HYDERABAD',
    label: 'Hyderabad',
  },
  {
    id: 'BANGALORE',
    label: 'Bangalore',
  },
  {
    id: 'CHENNAI',
    label: 'Chennai',
  },
  {
    id: 'DELHI',
    label: 'Delhi',
  },
  {
    id: 'MUMBAI',
    label: 'Mumbai',
  },
]
class Jobs extends Component {
  state = {
    searchInput: '',
    isLoading: apiStatusList.initial,
    isprofileLoading: apiStatusList.initial,
    jobsListitems: [],
    profileList: {},
    employmentType: '',
    packageSal: '',
    locationid: '',
  }

  componentDidMount() {
    this.getjobslist()
    this.getProfileslist()
  }

  getProfileslist = async () => {
    this.setState({isprofileLoading: apiStatusList.inprogress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: updatedProfile,
        isprofileLoading: apiStatusList.success,
      })
    } else {
      this.setState({isprofileLoading: apiStatusList.failure})
    }
  }

  getjobslist = async () => {
    this.setState({isLoading: apiStatusList.inprogress})
    const {employmentType, searchInput, packageSal, locationid} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${packageSal}&search=${searchInput}&location=${locationid}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      if (data.jobs.length < 1) {
        this.setState({isLoading: apiStatusList.noproducts})
      }
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsListitems: updatedData,
        isLoading: apiStatusList.success,
      })
    } else {
      this.setState({isLoading: apiStatusList.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobItems = () => {
    const {jobsListitems} = this.state
    return (
      <ul className="list-container">
        {jobsListitems.map(eachone => (
          <JobItem jobsitem={eachone} key={eachone.id} />
        ))}
      </ul>
    )
  }

  onChangeEmploymentType = event => {
    this.setState({employmentType: event.target.value}, this.getjobslist)
  }

  onChangePackage = event => {
    this.setState({packageSal: event.target.value}, this.getjobslist)
  }

  onChangePackageLoc = event => {
    this.setState({locationid: event.target.value}, this.getjobslist)
  }

  onSubmissionSearchForm = event => {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({searchInput: event.target.value}, this.getjobslist)
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="contain">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1>Oops! Something Went Wrong</h1>

      <p className="para1">
        We cannot seem to find the page you are looking for
      </p>

      <button type="button" className="button" onClick={this.getjobslist}>
        Retry
      </button>
    </div>
  )

  renderNoProductsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure"
      />
      <div>
        <h1>No Jobs Found</h1>
        <p className="para1">We could not find any jobs.Try other filters.</p>
      </div>
    </div>
  )

  renderprofileFailure = () => (
    <div>
      <button className="button" type="button" onClick={this.getProfileslist}>
        Retry
      </button>
    </div>
  )

  renderAllCards = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiStatusList.inprogress:
        return this.renderLoaderView()
      case apiStatusList.success:
        return this.renderJobItems()
      case apiStatusList.failure:
        return this.renderFailureView()
      case apiStatusList.noproducts:
        return this.renderNoProductsView()
      default:
        return null
    }
  }

  renderProfileCard = () => {
    const {isprofileLoading} = this.state
    switch (isprofileLoading) {
      case apiStatusList.inprogress:
        return this.renderLoaderView()
      case apiStatusList.success:
        return this.renderProfileCard()
      case apiStatusList.failure:
        return this.renderprofileFailure()
      default:
        return null
    }
  }

  renderProfileCard = () => {
    const {profileList} = this.state
    const {profileImageUrl, shortBio, name} = profileList
    return (
      <div className="card">
        <img src={profileImageUrl} className="avatar" alt="profile" />
        <div>
          <h1 className="head">{name}</h1>
          <p className="para">{shortBio}</p>
        </div>
      </div>
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="contain">
        <Header />
        <div className="appcontainer">
          <div className="first-card">
            <>{this.renderProfileCard()}</>
            <hr className="separator" />
            <div>
              <form className="type" onChange={this.onChangeEmploymentType}>
                <h1 className="typeHeading">Type of Employment</h1>
                <ul className="list-container">
                  {employmentTypesList.map(each => (
                    <li key={each.employmentTypeId}>
                      <div>
                        <input
                          type="checkbox"
                          id="checkbox1"
                          value={each.employmentTypeId}
                        />
                        <label htmlFor="checkbox1" className="label">
                          {each.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </form>
            </div>
            <hr className="separator" />
            <div>
              <h1 className="typeHeading">Salary Range</h1>
              <form className="type" onChange={this.onChangePackage}>
                <ul className="list-container">
                  {salaryRangesList.map(each => (
                    <li key={each.salaryRangeId}>
                      <div>
                        <input
                          type="radio"
                          id={each.salaryRangeId}
                          name="salary"
                          value={each.salaryRangeId}
                        />
                        <label htmlFor={each.salaryRangeId} className="label">
                          {each.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </form>
            </div>
            <div>
              <h1 className="typeHeading">Location</h1>
              <form className="type" onChange={this.onChangePackageLoc}>
                <ul className="list-container">
                  {locationList.map(each => (
                    <li key={each.id}>
                      <div>
                        <input
                          type="radio"
                          id={each.id}
                          name="salary"
                          value={each.id}
                        />
                        <label htmlFor={each.id} className="label">
                          {each.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </form>
            </div>
          </div>
          <div className="second-card">
            <form onChange={this.onSubmissionSearchForm}>
              <div>
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  value={searchInput}
                  id="searchinput"
                />
                <label htmlFor="searchInput">
                  <button type="button" data-testid="searchButton">
                    <BsSearch className="search-icon" />*
                  </button>
                </label>
              </div>
            </form>
            <>{this.renderAllCards()}</>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
