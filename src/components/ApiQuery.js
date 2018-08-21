import React, { Component } from 'react';
import {api_key,
url,
api_token,
api_auth,
api_rated,
api_series_rated,
api_gen_mv,
api_gen_sr} from './const';


class Query extends Component {

  constructor(props){
    super(props);
    this.state = {
      value:'',
      token:[],
      dataList:[],
      dataListSeries:[],
      genreMovies:[],
      video:[],
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchChange = this.searchChange.bind(this);

    this.readData = this.readData.bind(this);
    this.readData();
  }
  readData(){


    fetch(api_token,{method: 'GET',
    headers:
    {
        'Accept': 'application/json',
    },
    }).then(data => data.json())
    .then(newdata=>{
      this.setState({token: newdata});
      console.log('token', this.state.token);
    })

    fetch(api_auth,{method: 'POST',
    headers:
    {
        'Accept': 'application/json',
    },
    }).then(data => data.json())
    .then(newdata=>{
      this.setState({auth: newdata});
      console.log('auth', this.state.auth);
    })

    fetch(api_gen_mv,{
          method: 'GET',
          headers:
          {
              'Accept': 'application/json',
          },
      }).then(data => data.json())
      .then(newdata=>{
        this.setState({genreMovies: newdata.genres});

      })


      fetch(api_rated,{
            method: 'GET',
            headers:
            {
                'Accept': 'application/json',
            },
        }).then(data=> data.json())
        .then(newdata=>{
          this.setState({dataList: newdata.results});

          this.findGenres(this.state.dataList, this.state.genreMovies);
          this.findVideos(this.state.dataList);
        })


        fetch(api_series_rated,{
              method: 'GET',
              headers:
              {
                  'Accept': 'application/json',
              },
          }).then(data=> data.json())
          .then(newdata=>{
            this.setState({dataListSerie: newdata.results});
            console.log('ser', this.state.dataListSeries);
          })



  }
  findVideos(movies){
      let pos_video = []
    for (var i = 0; i < movies.length; i++) {
      const api_video=`${url}movie/${movies[i].id}?api_key=${api_key}&&append_to_response=videos`;

        fetch(api_video,{method: 'GET',
        headers:
        {
            'Accept': 'application/json',
        },
        }).then(data => data.json())

        .then(newdata=>{

          pos_video.push(newdata.videos.results);
          console.log("nvpos",pos_video);
        })
    }
    this.setState({video:pos_video });


  }

  findGenres(movies, genres){
    for (var i = 0; i < movies.length; i++) {
      for (var j = 0; j < movies[i].genre_ids.length; j++) {
        for (var k = 0; k < genres.length; k++) {
          if (movies[i].genre_ids[j]===genres[k].id) {
              movies[i].genre_ids[j]=genres[k].name;
          }
        }
      }
    }
    console.log('peliculas',movies);

  }




  render() {

    return (
      <div className="post_content" >
         <Movies {...props} data={this.state.dataList} video={this.state.video}/>
         <Series {...props} data={this.state.dataListSeries}  />

      </div>
    );
  }
}

export default Query;
