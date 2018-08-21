import React, { Component } from 'react';
import MovieList from "./MovieList";
import './movies.css';



class Movies extends Component {

  constructor(props){
    super(props);

  }



  render() {
      const movies = this.props.data;
      const video = this.props.video;


    return (
      <div>
      {
        movies.map((item, index)=>{
          return <MovieList id_video={video[index]} info={item} key={movies[index].id}/>
        })
      }
      </div>
    );
  }
}

export default Movies;
