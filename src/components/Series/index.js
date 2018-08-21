import React, { Component } from 'react';
import SeriesList from './SeriesList'
import './series.css'




class Series extends Component {
  constructor(props){
    super(props);

  }
  render() {
    const series = this.props.data1;
    const video = this.props.video;
    return (
      <div>
      {
        series.map((item, index)=>{
          return <SeriesList info={item} id_video={video[index]} key={series[index].id}/>
        })
      }

      </div>
    );
  }
}

export default Series;
