import { loginUser, loadUsers } from "../actions/userActions";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import { API_ROOT } from "../constants/index";

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
        console.log(data);
        if (data.status == "error") {
          //alert(data.message);
          M.toast({ html: data.message });
        } else {
          let user_json = JSON.parse(data.user);
          localStorage.setItem("token", data.jwt);
          dispatch(loginUser(user_json));
          M.toast({ html: "loged in" });
          changeURL();
          console.log(changeURL());
        }
      });
}

export function createUser(userinfo, image) {
  console.log(image)
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
          dispatch(loginUser(data.user));
          console.log(data.user);
          console.log(data.user.id);
          const userFR = data.user.id;
          var body = new FormData();
          body.append("picture[attachment]", image);
          body.append("picture[user_id]", data.user.id);
          for (var pair of body.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }
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
            console.log(data);
            dispatch(loginUser(data));
          }
        });
    }
  };
}

export function loadUsersAxios() {
  return (dispatch) => {};
}

export function uploadPhoto(photo) {
  const formData = new FormData();
  formData.append("file", photo);

  // configure your fetch url appropriately
  fetch(`${API_ROOT}/images/${this.props.profile.id}`, {
    method: "PATCH",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      // do something with the returned data
      console.log(data);
    });
}
