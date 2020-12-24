import { loginUser, loadUsers } from "../actions/userActions";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import { API_ROOT } from "../constants/index";
import store from "./store";

function changeURL() {
  var theURL = window.location.pathname;
  // eslint-disable-next-line no-restricted-globals
  return history.pushState({}, "", "dashboard#test4");
  //theURL.replace("/#modal2", "/dashboard");
  //Set URL
}

export function loginUserFetch(userInfo) {
  return (dispatch) =>
    fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status == "error") {
          //alert(data.message);
          M.toast({ html: data.message });
        } else {
          let user_json = JSON.parse(data.user);
          localStorage.setItem("token", data.jwt);
          store.dispatch(loginUser(user_json));
          M.toast({ html: "loged in" });
        }
      });
}

export function createUser(userinfo, image) {
  return (dispatch) =>
    fetch(`${API_ROOT}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("token", data.jwt);
          store.dispatch(loginUser(data.user));
          const userFR = data.user.id;
          var body = new FormData();
          body.append("picture[attachment]", image);
          body.append("picture[user_id]", data.user.id);
          fetch(`${API_ROOT}/pictures.json`, {
            method: "post",
            body: body,
          });
        }
      });
}

export function fetchLoggedInUser() {
  return (dispatch) => {
    const token = localStorage.token;
    if (token) {
      return fetch(`${API_ROOT}/auto-login`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.status == "error") {
            alert(data.status == "error");
            localStorage.removeItem("token");
          } else {
            store.dispatch(loginUser(data));
          }
        });
    }
  };
}


