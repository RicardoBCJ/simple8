import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LogInModal";




let heroStyle = {
  backgroundColor: "teal",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "75vh",
  minHeight: "600px",
  position: "relative",
  backgroundImage:
    "url(" +
    "https://images.pexels.com/photos/265702/pexels-photo-265702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" +
    ")",
};

//let imgSt1 = {
//  backgroundImage:
//    "url(" +
//    "https://images.pexels.com/photos/734658/pexels-photo-734658.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" +
//    ")",
//};

//let imgSt2 = {
//  backgroundImage:
//    "url(" +
//    "https://images.pexels.com/photos/7075/people-office-group-team.jpg?auto=compress&cs=tinysrgb&h=750&w=1260" +
//    ")",
//};

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <div style={heroStyle}>
          <div className="showcase container">
            <div className="row">
              <div className="col s12 main-text white-text">
                <h5></h5>
                <h1>Help Link</h1>
                <p className="flow-text">
                  A place to find help and to help others
                </p>
                <br />
                <Link
                  to="/about"
                  className="waves-effect waves-light btn btn-large"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="main teal">
          <div className="container">
            <div className="front-idea">
              <div className="row">
                <div className="col s12 m10 cardB hoverable">
                  <h2 className="header white-text">Help others</h2>
                  <div className="card horizontal">
                    <div className="card-image">
                      <img src="https://images.pexels.com/photos/734658/pexels-photo-734658.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"></img>
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <p>
                          Help however you can near your area. See who is asking for help, volunteer, chat, and find a solution together
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m10 offset-m2 cardB hoverable">
                  <h2 className="header white-text">Request Help</h2>
                  <div className="card horizontal">
                    <div className="card-image">
                      <img src="https://images.pexels.com/photos/7075/people-office-group-team.jpg?auto=compress&cs=tinysrgb&h=750&w=1260"></img>
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <p>
                          Do you currently have a problem but dont see the solution? Ask for help, see who is available for helping near you
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cta">
              <div className="row white actBt valign-wrapper center-align">
                <div className="col s12 m6">
                  <LoginModal />
                </div>
                <div className="col s12 m6">
                  <RegisterModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
