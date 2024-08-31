import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="card-contain">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="paragraph">
            Millions of people are searching for
            jobs,salary,information,company,reviews.Find the job that fits your
            abilities and potential.
          </p>
          <Link to="/jobs" className="list-item">
            <li>
              <button className="button" type="button" onClick={this.clicktogo}>
                Find Jobs
              </button>
            </li>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
