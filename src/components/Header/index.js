import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const clicktoLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="navbar">
        <div>
          <ul className="list-container1">
            <li>
              <Link to="/" className="link-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  className="logo1"
                  alt="website logo"
                />
              </Link>
            </li>
            <Link to="/" className="link-item">
              <li className="list-item">
                <p className="nav-item">Home</p>
              </li>
            </Link>
            <Link to="/jobs" className="link-item">
              <li className="list-item">
                <p className="nav-item">Jobs</p>
              </li>
            </Link>
            <li>
              <Link to="/login" className="link-item">
                <button
                  className="button"
                  type="button"
                  onClick={clicktoLogout}
                >
                  Logout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export default withRouter(Header)
