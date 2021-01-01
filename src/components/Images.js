import React, { Component } from "react";
import axios from "axios";

export default class Images extends Component {
  state = {
    image: "",
  };
  render() {
    const uploadImages = () => {
      const formData = new FormData();
      formData.append("file", this.state.image);
      formData.append("upload_preset", "simple8Front");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dl4mlrpmw/image/upload",
          formData
        )
        .then((Response) => 
        // console.log(Response),
        console.log(Response.data.url)
        );
    };
    return (
      <div>
        <input
          type="file"
          onChange={(e) => {
            this.setState({
              image: e.target.files[0],
            });
          }}
        />

        <button onClick={uploadImages}>Upload image</button>
      </div>
    );
  }
}
