import React, { Component } from 'react';
import { MdFavorite } from "react-icons/md";
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import './movies.css';



class MovieList extends Component {

  constructor(props){
    super(props);
  }
  state = {
  open: false,
};

onOpenModal = () => {
  this.setState({ open: true });
};

onCloseModal = () => {
  this.setState({ open: false });
};



  render() {

    const { open } = this.state;
    const movie = this.props.info;

    const vid = this.props.id_video;
    let url_video;
    let got_video;

    if (vid) {

      if (vid.length>0) {
        got_video = vid;
        console.log("id_vide", got_video[0]);
        url_video=`https://www.youtube.com/embed/${got_video[0].key} `
      }else if (vid.length===0) {
        console.log("Tamaño",vid.length);
        got_video=[{
          key:'kf8XMtsufY'
        }]
        url_video=`https://www.youtube.com/embed/${got_video[0].key} `
      }

    } else {
      got_video=[{
        key:'kf8XMtsufY'
      }]
      console.log("ERROR", got_video);
    }

    return (
      <div className="post_content">
        <div>

          <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} className='img_poster' alt="poster"/>
        </div>
        <div className="post_info">

          <div className="info-box">
            <div className="info-item">
              <div className='title'>{movie.original_title}</div> <div>{movie.popularity}</div>
            </div>

            <div className="info-item">
              <p className='title subtitles'>{}</p><p  className='subtitles'>|</p> <p  className='subtitles'>{movie.release_date}</p> <p  className='subtitles'>|</p> <p className='subtitles'>{movie.genre_ids}</p>
            </div>

            <div className="info-item">
              <p className='overview'>{movie.overview}</p>
            </div>
            <div className='info-item'>
              <div className="button" onClick={this.onOpenModal}>
                 Watch trailer

                  <Modal open={open} onClose={this.onCloseModal} center>
                    <iframe width="560" height="315" src={url_video} frameBorder="0" allow="autoplay; encrypted-media" allowFullscreen></iframe>
                  </Modal>
              </div>
            <div>
              <div className="favorite">
                Add to favorites. <MdFavorite/>
              </div>
           </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
