import React, { Component } from 'react';
import "./header.css";
import logo from './../../image/logo.png';
import search from './../../image/search.png';
import Movies from './../Movies/index';
import Series from './../Series/index';
import YearPicker from "react-year-picker";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const api_key="21d48dd94eb2105951a273ec15768f0a";
const url = "https://api.themoviedb.org/3/"


class Header extends Component {

  constructor(props) {
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
    const api_token="https://api.themoviedb.org/3/authentication/token/new?api_key=21d48dd94eb2105951a273ec15768f0a"
    const api_auth="https://api.themoviedb.org/3/authentication/session/new?api_key=21d48dd94eb2105951a273ec15768f0a"
    const api_rated = `${url}movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
    const api_series_rated =`${url}tv/top_rated?api_key=${api_key}&language=en-US&page=1`;
    const api_gen_mv = `${url}genre/movie/list?api_key=${api_key}&language=en-US&page=1`;
    const api_gen_sr =`${url}genre/tv/list?api_key=${api_key}&language=en-US&page=1`;

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
            this.setState({dataListSeries: newdata.results});
            this.findGenres(this.state.dataListSeries, this.state.genreMovies);
            
          })



  }
  findVideos(movies,series){
      let pos_video = []
      let pos_serie =[]
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


  handleChange(date) {
    console.log(date);
  }
  selectChange(event){

    console.log(event.target.value);
  }

  searchChange(event){
    const api_search = `${url}search/movie?api_key=${api_key}&language=en-US&query=${event.target.value}&page=1&include_adult=false`;
    const api_series_search = `${url}search/tv?api_key=${api_key}&language=en-US&query=${event.target.value}&page=1`;
      if (event.target.value!=='') {
        fetch(api_search,{
              method: 'GET',
              headers:
              {
                  'Accept': 'application/json',
              },
          }).then(data=> data.json())
          .then(newdata=>{
            console.log(newdata.results);
          this.setState({dataList: newdata.results});})

          fetch(api_series_search,{
                method: 'GET',
                headers:
                {
                    'Accept': 'application/json',
                },
            }).then(data=> data.json())
            .then(newdata=>{
              console.log(newdata.results);
            this.setState({dataListSeries: newdata.results});})



      }

  }
  render() {


    return (
      <Router>
        <div>

          <div className="header">
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>
            <div className="tab-side tab-item-right">

                <div>
                  <div className="tab-item">
                    <p> <Link to> Favorites </Link></p>
                  </div>
                  <div className="tab-item">
                    <p> <Link to="/series"> Series </Link></p>
                  </div>
                  <div className="tab-item ">
                    <p> <Link to ="/"> Movies </Link></p>
                  </div>
                </div>
            </div>

          </div>
          <div className="search">
            <img className='input-logo' alt="logo" src={search}/>
            <input placeholder='Search for a movie, series and videos' className='input-search' onChange={this.searchChange}></input>
          </div>
          <div>
            <p className="announce"> Find latest movies and tv shows</p>
          </div>
          <div className="filter">
            <div className="filter-select">
              <label>Year</label>
              <br/>
              <YearPicker onChange={this.handleChange} />
            </div>
            <div className="filter-select">
              <label>Genres</label>
              <br/>
              <select onChange={this.selectChange}>

                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option selected value="comedy">Comedy</option>
                <option value="animation">Animation</option>
                <option value="crime">Crime</option>
              </select>
            </div>
          </div>
            <Route exact path='/' render={(props) => (
              <Movies {...props} data={this.state.dataList} video={this.state.video} />
            )}/>

            <Route  path='/series' render={(props) => (
              <Series {...props} data1={this.state.dataListSeries} video={this.state.video} />
            )}/>


        </div>

      </Router>
    );
  }
}

export default Header;
