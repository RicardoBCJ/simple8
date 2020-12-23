import React from 'react'
import { API_ROOT } from '../constants/index'

class Pictures extends React.Component {
    state = {
        pictures: [],
        number_columns: 4,
        loading: true,
        user: 1,
        picture: '',
      }
  
  
    render() {
      if (this.state.loading) return null
  
      return(
        <div className="pictures_container">
  
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <label htmlFor="file_upload">Upload Picture</label>
                  <input type="file" className="form-control-file" id="file_upload" onChange={this.handleFileInputChange} />
                  <button onClick={this.loadPicture}/>
                </div>
              </form>
            </div>
          </div>

          {this.pictureRows().map((pictureRow, rowIndex) =>
          <div key={`picture_row_${rowIndex}`} className="row">
            {pictureRow.map((picture, columnIndex) =>
              <div key={`picture_row_${rowIndex}_col_${columnIndex}`} className="col-sm-3">
                <img data-id={picture.id} src={`${picture.attachment_url}`} />
              </div>
            )}
          </div>
        )}
  
         
        </div>
      )
    }
  
    componentDidMount() {
      this.loadPictures()
    }
  
    loadPictures() {
      
      fetch(`${API_ROOT}/pictures.json`)
        .then((response) => response.json())
        .then((pictures) =>
          this.setState({
            pictures: pictures,
            loading: false
          })
        )
        console.log(this.state)
    }
  
    handleFileInputChange(event) {
      let body = new FormData()
      console.log(event.target.files[0])
      this.setState({ picture: event.target.files[0]})
      body.append('picture[attachment]', event.target.files[0] )
      body.append('picture[user_id]', this.state.user )
      fetch(
        `${API_ROOT}/pictures.json`,
        {
          method: 'post',
          body: body
        }
      )
      .then((response) => response.json(), 
      )
    }
  
    pictureRows() {
      let rows = []
      let row = []
      this.state.pictures.forEach((picture) => {
        row.push(picture)
        if (row.length === this.state.number_columns) {
          rows.push(row)
          row = []
        }
      })
      if (row.length > 0) {
        rows.push(row)
      }
      return rows
    }
 

    
  }
  
  export default Pictures