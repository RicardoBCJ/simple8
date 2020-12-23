import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLoggedInUser } from "../../thunks/fetchUser";
import { logOutUser } from "../../actions/userActions";
import M from "materialize-css/dist/js/materialize.min.js";
import LogInModal from "../LogInModal";
import RegisterModal from "../RegisterModal";

class Navbar extends Component {
  componentDidMount() {
    this.fetchEverything();
  }

  fetchEverything = () => {
    this.props.fetchLoggedInUser();
  };

  logOut = () => {
    localStorage.removeItem("token");
    this.props.logOutUser();
    //alert("Succefully log out!");
    M.toast({html: "Succesfully log out!"})
  };
  render() {
    return (
      <Fragment>
        <header>
          <nav>
            <div className="nav-wrapper teal">
              <div className="container">
                <Link to="/" className="brand-logo">
                  <i className="material-icons">accessibility</i>
                  <i className="material-icons">accessibility</i>
                  <i className="material-icons">accessibility</i>Help Link
                </Link>
                <a
                  href="#"
                  data-target="mobile-demo"
                  className="sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </a>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  {this.props.login ? (
                    <Fragment>
                      <li>
                        <span className="waves-effect waves-light btn orange darken-2">
                          Hi {this.props.name}
                        </span>
                      </li>
                      <li>
                        <a onClick={this.logOut}>Logout</a>
                      </li>
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <li className="modalsLI">
                        <LogInModal />
                      </li>
                      <li className="modalsLI">
                        <RegisterModal/>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
            <li> Hi {this.props.user}</li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {this.props.login ? (
              <Fragment>
                <li>
                  <span className="waves-effect waves-light btn orange darken-2">
                    Hi {this.props.name}
                  </span>
                </li>
                <li>
                  <a onClick={this.logOut}>Logout</a>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="modalsLI">
                <LogInModal />
                </li>
                <li className="modalsLI">
                <RegisterModal/>
                </li>
              </Fragment>
            )}
          </ul>
        </header>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.user.login,
    name: state.user.user.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoggedInUser: () => dispatch(fetchLoggedInUser()),
    logOutUser: () => dispatch(logOutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
