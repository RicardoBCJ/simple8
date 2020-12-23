import React, {
  Component,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { joinHelpRequest } from "../../actions/helpReqactions";
import axios from "axios";
import { marker } from "leaflet";
import L from "leaflet";
//import { useMap, useMapEvent, useMapEvents } from 'leaflet'
import { useMapEvents } from "react-leaflet";
import { API_ROOT, HEADERS } from "../../constants/index";

class MyMap extends Component {
 
  joiningHelpRequest(id, helpers, user) {
    return (dispatch) => {
      axios({
        method: "put",
        responseType: "json",
        url: `${API_ROOT}/help_requests/${id}`,
        data: {
          condition: "help needed",
          helpers: helpers + user + ",",
        },
      })
        .then((response) => {
          console.log(response.data);
          var dataId = response.data.id
          var dataHelpers = response.data.helpers
          var dataUser = response.data.user_id
          console.log(dataId)
          console.log(dataHelpers)
          console.log(dataUser)
          this.props.joiningHelpRequest(
            response.data.id,
            response.data.helpers,
            response.data.user_id
          );
          axios({
            method: "put",
            responseType: "json",
            url: `${API_ROOT}/conversations/${dataId}`,
            data: {
              "participants": dataUser + "," + dataHelpers,
            },
          })
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("called");
    };
  }

  render() {
    const UserId = this.props.userId;
    const position = [0, 0];

    const center = {
      lat: 51.505,
      lng: -0.09,
    };


    function LocationMarker() {
      const [position, setPosition] = useState(null);
      const map = useMapEvents({
        click() {
          map.locate();
        },
        locationfound(e) {
          setPosition(e.latlng);
          console.log(e.latlng);
          map.flyTo(e.latlng, 12);
        },
      });

      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      );
    }

    function GetIcon(_iconSize) {
      return L.icon({
        iconUrl: require('../../static/icons/material.png'),
        iconSize: [_iconSize]
      })
    }

    function GetIcon2(_iconSize) {
      return L.icon({
        iconUrl: require('../../static/icons/task.png'),
        iconSize: [_iconSize]
 
      })
    }

   

    const MarkersReq = Object.entries(this.props.helpReqs).map(([k, v]) => {
      const position2 = [v.latitude, v.longitude];

      const checkHelpers = (helpers, user) => {
        console.log("the current user is " + user)
        if (helpers != null) {
          let helpersList = helpers.split(",");
          if (
            helpersList.includes(user+ "") === true ||
            helpersList.length >= 6
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return true
        }
      };


      if (
        v.user_id != UserId &&
        UserId != null &&
        v.condition == "help needed" &&
        checkHelpers(v.helpers, UserId) == true &&
        //console.log("the current help id is "+ v.id+" and it checks as "+checkHelpers(v.helpers, UserId)) &&
        v.latitude != null &&
        v.longitude != null &&
        v.kind == "task"
      ) {
        return (
          <Marker position={position2} key={v.id} icon={GetIcon2(20)}>
            <Popup>
              <div>
                <p>{v.title}</p>
                <p>{v.kind}</p>
                <p>{v.description}</p>
                <p>{v.helpers}</p>

                <a
                  className="waves-effect waves-light btn orange white-text darken-2"
                  onClick={this.joiningHelpRequest(v.id, v.helpers, UserId)}
                >
                  help
                </a>
                {console.log(UserId)}
              </div>
            </Popup>
          </Marker>
        );
      } else if (
        v.user_id != UserId &&
        UserId != null &&
        v.condition == "help needed" &&
        checkHelpers(v.helpers, UserId) == true &&
        //console.log("the current help id is "+ v.id+" and it checks as "+checkHelpers(v.helpers, UserId)) &&
        v.latitude != null &&
        v.longitude != null &&
        v.kind == "material"
      ) {
        return (
          <Marker position={position2} key={v.id} icon={GetIcon(20)}>
            <Popup>
              <div>
                <p>{v.title}</p>
                <p>{v.kind}</p>
                <p>{v.description}</p>
                <p>{v.helpers}</p>

                <a
                  className="waves-effect waves-light btn orange white-text darken-2"
                  onClick={this.joiningHelpRequest(v.id, v.helpers, UserId)}
                >
                  help
                </a>
                {console.log(UserId)}
              </div>
            </Popup>
          </Marker>
        );
      }
    });
    return (
      <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {console.log(marker)}
        <LocationMarker />

        {MarkersReq}
        <p alt="icons from flat icon Icons made https://www.flaticon.com/authors/srip titleFlaticon www.flaticon.com"></p>
      </MapContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    helpReqs: state.helpRequests,
    userId: state.user.user.id,
  };
};





const mapDispatchToProps = (dispatch) => {
  return {
    joiningHelpRequest: (id, helpers, user) =>
      dispatch(joinHelpRequest(id, helpers, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMap);
