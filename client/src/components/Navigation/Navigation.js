import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Navigation.css';

class Navigation extends Component {  

    signout = (e) => {
        //e.preventDefault();
        // remove token from localStorage
        localStorage.removeItem('token');
        // set isSignedIn to false
        this.props.onSetSigninUser(false);
        // redirect to signin page
        //this.props.history.push('/signin');
    }

    render() {
        // not logged in - Navigation
        let navigation = (
            <nav className={classes.Navigation + " navbar navbar-expand-md fixed-top"}>
                <NavLink to="/" className="navbar-brand">Stint</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className={"navbar-toggler-icon "+classes.toggleIcon}></span>
                </button>    
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/register" className="nav-link">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/signin" className="nav-link">Signin</NavLink>
                    </li>
                </ul>            
                </div>
          </nav>
        )
        // Logged in  & whichusermode is true
        if (this.props.user.isSignedIn && this.props.user.whichUserMode) {
            navigation = (
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <NavLink to="/" className="navbar-brand">Stint</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>    
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">                    
                        <li className="nav-item">
                            <NavLink className="nav-link" onClick={this.signout} to='/signin'>Signout</NavLink>
                        </li>
                    </ul>            
                    </div>
                </nav>
            )        
        }
        // Logged in Navigation - ADULT
        if (this.props.user.isSignedIn && !this.props.user.whichUserMode && this.props.user.userType==='adult') {
            navigation = (
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <NavLink to="/" className="navbar-brand">Stint</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>    
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to="/dashboard" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard/addChild" className="nav-link">Children</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard/choreChart" className="nav-link">ChoreCharts</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard/addChore" className="nav-link">ChoreList</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={this.signout} to="/signin">Signout</NavLink>
                            </li>
                        </ul>            
                    </div>
                </nav>
            )
        }
        // Logged in Navigation - CHILD
        if (this.props.user.isSignedIn && !this.props.user.whichUserMode && this.props.user.userType==='child') {
            navigation = (
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <NavLink to="/" className="navbar-brand">Stint</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>    
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to="/dashboard" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard/" className="nav-link">ChoreChart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={this.signout} to="/signin">Signout</NavLink>
                            </li>
                        </ul>            
                    </div>
                </nav>
            )
        }
        return (
            <div>
                {navigation}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {user: state.userRedux}
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSetSigninUser: (bool) => dispatch(actions.setSigninUser(bool))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));

