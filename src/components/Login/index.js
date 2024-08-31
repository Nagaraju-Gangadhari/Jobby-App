import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmissionFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onChangeuserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmission = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdata = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdata),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmissionFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="bgcontainer">
        <div className="app-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </div>
          <form onSubmit={this.onSubmission} className="form">
            <div className="card1">
              <label className="label" htmlFor="userInput">
                USERNAME
              </label>
              <input
                value={username}
                type="text"
                id="userInput"
                placeholder="Username"
                className="input"
                onChange={this.onChangeuserName}
              />
            </div>
            <div className="card1">
              <label className="label" htmlFor="userPassword">
                PASSWORD
              </label>
              <input
                value={password}
                type="password"
                id="userPassword"
                placeholder="Password"
                className="input"
                onChange={this.onChangePassword}
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
          </form>
          {showError && <p className="error">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}
export default Login
