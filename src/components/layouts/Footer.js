import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer grey darken-2">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">
                This is a project for OpenClassrooms fullstack assignment 
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">© 2020 </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
