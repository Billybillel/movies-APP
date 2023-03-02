

window.addEventListener('load',() =>{

   trendingMovies()  
   TvShowTrending()
   myWatchListSlider()
   isEmptyWatchlist()
   trendingPeople()
   upComing()
    boxOffice()

})
/* hero */
async function upComing(){
  const responses = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=46c9a5c82d4727524491157fac5fc467');
  const data = await responses.json()
  let container = document.querySelector(".trailer-card-container");
  let list = data.results
  list.map((item) => {
    let info = {
      title : `${item.title}`,
      date:`${item.release_date}`,
      bg:`${item.backdrop_path}`,
      id:`${item.id}`,
      poster: `${item.poster_path}`
    }
    /* the main image */
    document.querySelector('.hero-slider').innerHTML+=`<img src="https://image.tmdb.org/t/p/original/${info.bg}" alt="">`
    /* the poster image */
    document.querySelector('.img-poster-small').innerHTML+=`<img src="https://image.tmdb.org/t/p/original/${info.poster}" alt="">`
   /* the content second colomn */
    container.innerHTML += `
       <div class="trailer-card"  data-movie-id="${info.id}">
                <div class="trailer-card-image">
                    <img src="https://image.tmdb.org/t/p/original/${info.poster}" alt="">
                </div>
                <div class="trailer-card-text">
                <div class="play">
                    <div class="play-btn">
                        <a href="">
                            <i class="fas fa-play"></i>
                        </a>
                    
                    </div>
                
                    <span>Watch</span>
                </div>
                    <h3>${info.title}</h3>
                    <p>${info.date}</p>
                </div>
            </div>`
    
  })
/* removing the first card on colomn 2 and add it to the end of the list (for the up next features) */
  let firstCard = document.querySelector(".trailer-card:first-child");
   container.appendChild(firstCard.cloneNode(true));
   container.removeChild(firstCard);

 
    let slider4 = tns({
"container": ".hero-slider ",

"items": 1,
gutter:'20',
nav:false,
controlsContainer:".controls6",
prevButton:'.previous6',
nextButton: '.next6',
"speed": 300,
"swipeAngle": false
})


let slider5 = tns({
  'container': '.img-poster-small',
  "items": 1,
  nav:false,
  controlsContainer:".controls6",
  prevButton:'.previous6',
nextButton: '.next6',
"speed": 300,
"swipeAngle": false

})
let slider6 = tns({
  'container': '.trailer-card-container',
  "items": 3,
  "axis": "vertical",
  nav:false,
  controlsContainer:".controls6",
  prevButton:'.previous6',
nextButton: '.next6',
"speed": 300,
"swipeAngle": false

})
/* add the movieCardSelector function to select all movies elements and redirect the page
to the single details page if the user click on the movie (the function is in the common script) */
movieCardSelector()
}
/* movies trending */
async function trendingMovies(){
  /* fetching  the api link */
     const responses =await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=46c9a5c82d4727524491157fac5fc467`);
     /*  parsing the response body as JSON and returns a JavaScript object. */
     const data = await responses.json();
     const list =data.results;

     list.map((item) => {
        let info = {
          'id':`${item.id}`,
          'media':`${item.media_type}`,
           'title':`${item.title}`,
            'dateRelease':`${item.release_date}`,
            'img':`${item.poster_path}`,
            'vote':`${parseFloat(item.vote_average).toFixed(1)}`,
            overview : `${item.overview}`
        }
      /* create the slider container elt */
         document.querySelector('.my-slider1').innerHTML+= ` 
          <div class="slide">
          <div class="trendingMovies-card trending-card" data-movie-id="${info.id}" data-media-type="${info.media}">
               <img src="https://image.tmdb.org/t/p/original/${info.img}" alt="">
                <div class="watch-list-icone" data-movie-id="${info.id}" data-media-type="${info.media}" data-title="${info.title}" data-image="${info.img}" data-vote="${info.vote}" data-overview="${info.overview}" data-release="${info.dateRelease}">
                   <img src="./images/watch-list-unscreen.gif" alt="">
                </div>
               <h3>${info.title}</h3>
              <div class="trendingMovies-footer trending-footer">
                  <div class="vote-container">
                      <i class="fa-solid fa-star"style='color:yellow'></i>
                     <span>${info.vote}</span>
                  </div>
                  <span>${info.dateRelease}</span>
              </div>
              </div>
         </div>
         `
        
        
       
     })
/* the slider using tiny slider */
let slider = tns({
   "container": ".my-slider1",
   "slideBy":1,
   "items": 4,
    gutter:'20',
    controlsContainer:".controls1",
    prevButton:'.previous1',
    nextButton: '.next1',
    "speed": 300,
    nav :false,
    
    "responsive":{
  "350":{
    "items":1
  },
  "550":{
    "items":2,
    gutter:'30'
  },
 
   "1000":{
    "items":3,
    gutter:'20'
  },
  "1200":{
    'items':4,
    gutter :'20'
  }
},
   "swipeAngle": false
})

 movieCardSelector()  
 /* using this function to select all the watchlist icone if the user click on the watchlist icone 
 the movie will be added to My watch List section */
watchList()
 }



/*========== Tv show trending ======== */
async function TvShowTrending(){
    const responses  = await fetch ('https://api.themoviedb.org/3/trending/tv/week?api_key=46c9a5c82d4727524491157fac5fc467')
    const data = await responses.json()
    const list = data.results;
    list.map((item)=> {
        let info = {
            'id':`${item.id}`,
            'media':`${item.media_type}`,
            'title':`${item.name}`,
            'img':`${item.poster_path}`,
            'dateRelease':`${item.first_air_date}`,
            'vote':`${parseFloat(item.vote_average).toFixed(1)}`,
            overview : `${item.overview}`
        }
        document.querySelector('.my-slider2').innerHTML += `
          <div class="slide">

                <div class="trendingSeries-card trending-card" data-movie-id="${info.id}" data-media-type="${info.media}">
                    <img src="https://image.tmdb.org/t/p/original/${info.img}" alt="">
                    <div class="watch-list-icone" data-movie-id="${info.id}" data-media-type="${info.media}" data-title="${info.title}" data-image="${info.img}" data-vote="${info.vote}" data-overview="${info.overview}" data-release="${info.dateRelease}">
                         <img src="./images/watch-list-unscreen.gif" alt="">
                    </div>
                    <h3>${info.title}</h3>
                    <div class="trendingSeries-footer trending-footer">
                    <div class="vote-container">
                    <i class="fa-solid fa-star"style='color:yellow'></i>
                    <span>${info.vote}</span>
                    </div>
                        <span>${info.dateRelease}</span>
                    </div>
                </div>
            </div>
            `
       
    })

     let slider1 = tns({
   "container": ".my-slider2",
   "slideBy":1,
   "items": 4,
    gutter:'20',
    navPosition:'bottom',
    nav:false,
    controlsContainer:".controls2",
    prevButton:'.previous2',
    nextButton: '.next2',
    "speed": 300,
    "responsive":{
  "350":{
    "items":1
  },
  "550":{
    "items":2,
    gutter:'30'
  },
 
   "1000":{
    "items":3,
    gutter:'20'
  },
  "1200":{
    'items':4,
    gutter :'20'
  }
},
   "swipeAngle": false
})
movieCardSelector()
watchList()

 }



/* ============= peoples trending ===============*/
async function trendingPeople(){
  const responses = await fetch('https://api.themoviedb.org/3/person/popular?api_key=46c9a5c82d4727524491157fac5fc467')
  const data = await responses.json()
   const list = data.results;
    list.map((item)=> {
        let info = {
            'id':`${item.id}`,
            'name':`${item.name}`,
            'img':`${item.profile_path}`
           
        }
        document.querySelector('.my-slider4').innerHTML+= `
         <div class="slide">
               <div class="trendingPeoples-card cast-crew-img-name" data-person-id="${info.id}">
                  <img src="https://image.tmdb.org/t/p/original/${info.img}" alt="">
               </div>
               <span>${info.name}</span>
  
         </div>
        `
      })
       let slider3 = tns({
"container": ".my-slider4",
"slideBy":3,
"items": 4,
gutter:'20',
'nav':false,
controlsContainer:".controls4",
prevButton:'.previous4',
nextButton: '.next4',
"speed": 300,
"swipeAngle": false,
    "responsive":{
  "350":{
    "items":1
  },
  "550":{
    "items":2,
    gutter:'30'
  },
  "684":{
    "items":3,
    gutter:'10'
  },
    "1000":{
    "items":4,
    gutter:'30'
  }
}
})
/* select all the person card if the user click the page will be redirected to the single
person details */
     personSelector()       
}


/* =============== box office ================ */
async function boxOffice(){
     /* im using another api here (no box office features in themoviedb api) using same Methods as before */
     const responses= await fetch(`https://imdb-api.com/en/API/BoxOffice/k_01yh42rv`);
     const data = await responses.json();
     
     let list = data.items;
     list.map((movie) => {
      document.querySelector('.box-office-body').innerHTML += `  <tr>
                <td class="box-office-title">
                    <img src="${movie.image}" alt="">
                    ${movie.title}
                </td>
                <td>${movie.weekend}</td>
                <td>${movie.gross}</td>
                <td>${movie.weeks}</td>
            </tr>`
     })
}
