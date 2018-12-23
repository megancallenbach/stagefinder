import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import signOut from '../actions/users/signOut'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import getCurrentUser from '../actions/users/get'
import '../styles/Navbar.css'
import SearchBar from './SearchBar'


class Navbar extends PureComponent {

  componentWillMount(){
    if(this.props.currentUser) this.props.getCurrentUser(this.props.currentUser._id)
  }

  goToProfile(){
    const { currentUser, push } = this.props

    if(!currentUser.artistProfileId && !currentUser.venueProfileId) push("/create-profile")
    if(currentUser.artistProfileId) push(`/artists/${currentUser.artistProfileId}/edit`)
    if(currentUser.venueProfileId) push(`/venues/${currentUser.venueProfileId}/edit`)
  }

  goToCreateEvent(){
    const{ currentUser, push } = this.props

    if (currentUser.venueProfileId) push(`/create-event`)
  }

  signOutUser(){
    this.props.signOut()
  }

  sessionButtons(){
    const { currentUser } = this.props

    if (currentUser) return(
      <ul className="navbar-list right">
        <li className="nav-item">
          <span className="nav-link" onClick={this.signOutUser.bind(this)}>
            log out
          </span>
        </li>
        {currentUser.venueProfileId ? (<li className="nav-item">
          <span className="nav-link" onClick={this.goToCreateEvent.bind(this)}>
            create an event
          </span>
        </li>) : null}
        <li className="nav-item">
          <span className="nav-link" onClick={this.goToProfile.bind(this)}>
            my profile
          </span>
        </li>
      </ul>
    )

    else return(
      <ul className="navbar-list right">
        <li className="nav-item">
          { (this.props.searchBar === true) ?  this.showSearchBar() : null }
        </li>
        <li className="nav-item">
          <Link to={'/sign-in'} className="nav-link"> log in </Link>
        </li>
        <li className="nav-item">
          <Link to={'/sign-up'} className="nav-link"> join! </Link>
        </li>
      </ul>
    )
  }

  showSearchBar() {
    return (
      <div className="searchbar">
        <SearchBar id="nav-searchbar" />
      </div>
    )
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="nav">
        {/*<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>*/}
        <div className="navbar-links">
          <Link to={'/'} className="brand"> StageFinder </Link>
          <ul className="navbar-list left">
            <li className="nav-item">
              <Link to={'/events'} className="nav-link">all events</Link>
            </li>
            <li className="nav-item">
              <Link to={'/venues'} className="nav-link">all venues</Link>
            </li>
            <li className="nav-item">
              <Link to={'/artists'} className="nav-link">all artists</Link>
            </li>
          </ul>
          { (this.props.searchBar && currentUser && currentUser.venueProfileId) ?  this.showSearchBar() : null }
          { this.sessionButtons() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })


export default connect(mapStateToProps, { signOut, push, getCurrentUser })(Navbar)
