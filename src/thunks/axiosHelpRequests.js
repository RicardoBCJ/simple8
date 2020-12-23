import { loadRequests } from "../actions/helpReqactions";
import { addHelpRequest } from "../actions/helpReqactions";
import { uppdateRequest } from "../actions/helpReqactions";
import axios from "axios";
import { API_ROOT, HEADERS } from '../constants/index';

export function getHelpRequests() {
  return (dispatch) => {
    axios.get(`${API_ROOT}/help_requests`).then((res) => {
      dispatch(loadRequests(res.data));
    });
  };
}

export function makeHelpRequest(helpReq) {
  return (dispatch) => {
    axios({
      method: "post",
      responseType: "json",
      url: `${API_ROOT}/help_requests`,
      data: {
        title: helpReq.title,
        date: helpReq.date,
        user_id: helpReq.user_id,
        kind: helpReq.kind,
        address: helpReq.address,
        helpers: helpReq.helpers,
        description: helpReq.description,
        condition: helpReq.condition,
      },
    })
      .then((response) => {
        console.log("dispatching to reducer")
        dispatch(addHelpRequest(response.data));
        console.log(response.data)
        console.log("created!")
        let data = {
          title: response.data.title,
          participants: response.data.user_id,
          help_request_id: response.data.id
        }
        fetch(`${API_ROOT}/conversations`, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify(data),
        });
      })
      
      .catch((error) => {
        console.log(error);
        console.log(helpReq);
      });
  };
}

export function updatingHelpRequest(id, status) {
  return (dispatch) => {
    axios({
      method: "put",
      responseType: "json",
      url: `${API_ROOT}/${id}`,
      data: {
        condition: status,
      },
    })
      .then((response) => {
        dispatch(uppdateRequest(response.data.id, response.data.condition));
      })
      .catch((error) => {
        console.log(error);
        console.log(status);
      });
  };
}
