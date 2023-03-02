window.addEventListener('load',function(){

      let searchId = sessionStorage.getItem("searchId");
      getDetailsTv(searchId)
      movieVideo(searchId)
      creditsTv(searchId)
      imagesTv(searchId)
      recommendationsTv(searchId)
      keywordsTv(searchId)
      /* see all cast and crew */
      let allCast = document.querySelector('.see-all')
  allCast.addEventListener('click',function(){
     sessionStorage.setItem('media','tv')
     window.location.href = 'cast.html'
  })


})


/* this function create the hero section and the colomn 2 (more information section) */
async function getDetailsTv(searchId){
 const responses = await fetch(`https://api.themoviedb.org/3/tv/${searchId}?api_key=46c9a5c82d4727524491157fac5fc467`)
const data = await responses.json();
/* creating overview -- Network-- homepage */
 document.querySelector('.overview').innerHTML = `
                                                     <h3>Genral Overview :</h3>
                                                     <p>${data.overview}</p>
                                                     `

document.querySelector('.cast').innerHTML =`
<div class="network">
<h3>Networks :</h3>
<a href="">${data.networks[0].name}</a>
</div>
<div class="homepage">
<h3>Home Page :</h3>
<a href="">${data.homepage}</a>
</div>`

                                                   
                                                     
heroTv(data)
companiesHtml(data)
info_col2(data)
seasonInfo(data)
}
 async function movieVideo(movieId){
     const responses = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=46c9a5c82d4727524491157fac5fc467`);
     const data = await responses.json();
     let list = data.results
     list.map((item) => {
         
         if(item.site ==='YouTube') {

           document.querySelector('.slider2').innerHTML += `<div class="single-video-slide">
           <iframe class="lazyload" data-src="https://www.youtube.com/embed/${item.key}?showinfo=0&rel=0"
                   frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>`
         }
     })
     let lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazyload"
    })
      let slider2 = tns({
   "container": ".slider2",
   "slideBy":1,
   "items": 2,  
   nav :false,
    controlsContainer:".controls2",
    prevButton:'.previous2',
    nextButton: '.next2',
    "speed": 300,
   "swipeAngle": false
})




 }

/* this function create top cast crew secton and the producer div in the more information section */
async function creditsTv(searchId){
 const responses = await fetch(`https://api.themoviedb.org/3/tv/${searchId}/credits?api_key=46c9a5c82d4727524491157fac5fc467`)
const data = await responses.json();
let cast = data.cast;
let crew = data.crew;

/* call back the producer function (create the producer div ) 
 and the cast function(create the top cast/crew section)*/
producerHtml(crew)
castHTML(cast,crew)


}

/*function create images section */
async function imagesTv(searchId){
     const responses = await fetch(`https://api.themoviedb.org/3/tv/${searchId}/images?api_key=46c9a5c82d4727524491157fac5fc467`);
     const data = await responses.json();
     let list = data.backdrops
     list.map((item) => {
      document.querySelector('.image-content').innerHTML += `<img src="https://image.tmdb.org/t/p/original/${item.file_path}" alt="">`
     })
             let slider1 = tns({
   "container": ".image-content",
   "slideBy":1,
   "items": 4,
    gutter:'20',
    
    navPosition:'bottom',
    controlsContainer:".controls2",
    prevButton:'.previous2',
    nextButton: '.next2',
    nav : false,
  "autoplayButtonOutput" :false,
    "responsive":{
  "350":{
    "items":1
  },
  "550":{
    "items":2,
    gutter:'10'
  },
  "684":{
    "items":2,
    gutter:'20'
  },
   "1000":{
    "items":3,
    gutter:'20'
  }
},
   "swipeAngle": false
})

 }

async function keywordsTv(searchId){
 const responses = await fetch(`https://api.themoviedb.org/3/tv/${searchId}/keywords?api_key=46c9a5c82d4727524491157fac5fc467`)
const data = await responses.json();
let list = data.results
list.map((keyword) =>{
  document.querySelector('.keywords-container').innerHTML +=`
  <div class="keyword">
  <span>${keyword.name}</span>
  </div>`
})
}

/* this functon to create the similar movie section */
 async function recommendationsTv(searchId){
  
     const responses = await fetch(`https://api.themoviedb.org/3/tv/${searchId}/recommendations?api_key=46c9a5c82d4727524491157fac5fc467`);
     const data = await responses.json();
       const list =data.results;
     list.map((item) => {
        let info = {
          'id':`${item.id}`,
           'title':`${item.name}`,
           'media':`${item.media_type}`,
            'dateRelease':`${item.first_air_date}`,
            'img':`${item.poster_path}`,
            'vote':`${item.vote_average}`
        }
      
         document.querySelector('.my-slider').innerHTML+= ` 
          <div class="slide">
          <div class="similarMovies-card trending-card " data-movie-id="${info.id}" data-media-type="${info.media}">
               <img src="https://image.tmdb.org/t/p/original/${info.img}" alt="">
               <div class="watch-list-icone">
                  <img src="./images/watch-list-unscreen.gif" alt="">
               </div>
               <h3>${info.title}</h3>
              <div class="similarMovies-footer trending-footer">
                  <div class="vote-container">
                      <i class="fa-solid fa-star"style='color:yellow'></i>
                     <span>${parseFloat(info.vote).toFixed(1)}</span>
                  </div>
                  <span>${info.dateRelease}</span>
              </div>
              </div>
         </div>
         `
         })
         let slider = tns({
   "container": ".my-slider",
   "slideBy":1,
   "items": 4,
    gutter:'20',
    
    navPosition:'bottom',
    controlsContainer:".controls1",
    prevButton:'.previous1',
    nextButton: '.next1',
    "speed": 300,
    "autoplay": true,
  "autoplayHoverPause": true,
  "autoplayTimeout": 3500,
  "autoplayButtonOutput" :false,
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
 }

async function airing(){
 const responses = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=46c9a5c82d4727524491157fac5fc467`)
const data = await responses.json();
console.log(data)
}

/* this function is creating the hero section  */
function heroTv(data){
    
    let categoriesHTML =''
   
    for (let i = 0; i < data.genres.length; i++) {
  categoriesHTML += `<span>${data.genres[i].name}</span>`;
    if (i < data.genres.length - 1) {
    categoriesHTML += ", ";
  }
 
}
/* creating the hero section  */
document.querySelector('.banner-img').innerHTML = `<img src="https://image.tmdb.org/t/p/original/${data.backdrop_path}" alt="">`
  document.querySelector('.banner-col1').innerHTML = `<div class="banner-header">
                    <div class="banner-header-row1">
                        <h2>${data.name}<span>TV show</span></h2>
                    </div>
                    <div class="banner-header-row2">
                        <span class="hd-icone">Full HD</span>
                        <div class= "vote-container">
                        <i class="fa-solid fa-star"style='color:yellow'></i>
                       <span>${parseFloat(data.vote_average).toFixed(1)}</span>
                       </div>
                        <span class="date">${data.first_air_date.substring(0, 4)} - ${data.last_air_date.substring(0, 4)}</span>
                        <span class="length">${data.episode_run_time[0]} min</span>
                    </div>
                    <div class="banner-header-row3">
    
                        <span>English</span>
    
                    </div>
                </div>
                <div class="banner-footer">
                    <div class="banner-footer-col1">
                        <strong>Category</strong>
                        <div class="movie-category">
                            ${categoriesHTML}
                        </div>
                    </div>
                    <div class="banner-footer-col2">
                        <div class="watch-btn">Watch Trailer</div>
                    </div>
                    
                </div>`

openTrailer()
closeTrailer()
              }


/* function to create the top cast/crew section */
 function castHTML(cast,crew){

  cast.map((actor) => {
     info ={
      id : `${actor.id}`,
      character : `${actor.character}`,
      name : `${actor.name}`,
      profil_img : `${actor.profile_path}`
    }
    /* showing only acotrs with pictures */
    if(info.profil_img !== 'null'){

   /* creating the top  actor colomn (name pic and character name) */
    document.querySelector('.cast-crew-col1').innerHTML +=`
  <div class="cast-crew-img-name" data-person-id="${info.id}">
                    <div class="cast-crew-img">
                       <img src="https://image.tmdb.org/t/p/original/${info.profil_img }" alt="">
                    </div>
                    <div class="cast-crew-name">
                    <h3>${info.name}</h3>
                    <span>${info.character}</span>
                    </div>
                </div>`
                 }
                
  })
  crew.map((worker) => {
     info = {
         id : `${worker.id}`,
      job : `${worker.job}`,
      name : `${worker.name}`,
      profil_img : `${worker.profile_path}`
    }
    /* creating the top crew colomn  (pic and name and job) */
    document.querySelector('.cast-crew-col2').innerHTML +=`
  <div class="crew-img-name" data-person-id="${info.id}">
                    <div class="cast-crew-img">
                       ${imgError(info.profil_img)}
                    </div>
                    <div class="cast-crew-name">
                    <h3>${info.name}</h3>
                    <span>${info.job}</span>
                    </div>
                </div>`
     
                 
    
    
   
  })
  /* this loop to show only 9 person (6 actor and 3 crew staff) */
  let personContainer =  document.querySelectorAll('.cast-crew-img-name')
  for (let i = 0 ; i < personContainer.length;i++){
    if( i >=6){
      personContainer[i].style.display = 'none'
    }
  }
  let crewContainer = document.querySelectorAll('.crew-img-name')
  for (let i = 0 ; i < crewContainer.length;i++){
    if( i >=3){
      crewContainer[i].style.display = 'none'
    }
  }
  personSelector()
 }



/* function to create the colomn 2 (more information section) */
 function info_col2(data){
    document.querySelector('.col2-info-container').innerHTML = `
<div class="original-title">
                    <h3>Original Title</h3>
                    <span>${data.name}</span>

                </div>
                <div class="status">
                    <h3>Status</h3>
                    <span>${data.status}</span>

                </div>
                <div class="tagline">
                    <h3>Tagline</h3>
                    <span>${data.tagline}</span>

                </div>
                <div class="Season">
                    <h3>Number of seasons</h3>
                    <span>${data.number_of_seasons}</span>

                </div>
                <div class="Episodes">
                    <h3>Number of episodes</h3>
                    <span>${data.number_of_episodes}</span>

                </div>`
 }
/*function to create companies names */
 function companiesHtml(data){
    let companieHTML='';
    for(let i = 0; i<data.production_companies.length;i++){
    companieHTML += `
    
    
                      <a href="">${data.production_companies[i].name}</a>           
                                                                 `
 }
   document.querySelector('.companies').innerHTML += `<h3>Companies :</h3>
                                                              
                                                              <div class="companies-name">
                                                               ${companieHTML}
                                                               </div>   `
}

/*the function return the producer name*/
function producerHtml(crew){
    let producerHTML =''
    crew.map((worker) =>{
      
      
       if(worker.job === 'Producer'){
      producerHTML = `<a href="">${worker.name}</a>`

      
    }
   
    

    })
    document.querySelector('.cast').innerHTML +=`<div class="producer">
    <h3>Producer :</h3>
    ${producerHTML}`
   
}

function seasonInfo(data){
  let info = data.seasons
  info.map((season) => {
    document.querySelector('.seasons-card-container').innerHTML += `
          <div class="season-card">
                    <div class="card-img">
                        <img src="https://image.tmdb.org/t/p/original/${season.poster_path}" alt="">
                    </div>
                    <div class="card-content">
                        <div class="season-name">
                            <h2>${season.name}</h2>
                            <span>${season.air_date.substring(0,4)}</span>
                            <span>|</span>
                            <span>${season.episode_count} episodes</span>
                        </div>
                       
                        <div class="season-overview">
                            <p>${season.overview}</p>
                        </div>

                    </div>
                </div>`
  })
}