  window.addEventListener('load',function(){

      let searchId = sessionStorage.getItem("searchId");
      
      moviesDetails(searchId)
      movieVideo(searchId)
      credits(searchId)
      recommendations(searchId)
      imageMovie(searchId)
      movieVideo(searchId)

           /* see all cast and crew */
      let allCast = document.querySelector('.see-all')
  allCast.addEventListener('click',function(){
     sessionStorage.setItem('media','movie')
     window.location.href = 'cast.html'
  })
      

  })

async function moviesDetails(searchId){
   const responses = await fetch(`https://api.themoviedb.org/3/movie/${searchId}?api_key=46c9a5c82d4727524491157fac5fc467`)
   const data = await responses.json()
   let companieHTML = '';
  let info = {
    title    : data.title,
    overview : data.overview,
    runtime  : data.runtime,
    img      : data.backdrop_path,
    budget   : data.budget,
    genres   : data.genres,
    link     : data.homepage,
    revenue  : data.revenue,
    status    : data.status,
    tagline  : data.tagline,
    companies: data.production_companies,
    countries: data.production_countries,
    date     : data.release_date,
    vote     : data.vote_average
  }
  
  
  
  for(let i = 0; i<info.companies.length;i++){
    companieHTML += `
    
    
                      <a href="">${info.companies[i].name}</a>
                    
                                                                 `

  }
  let categoriesHTML = "";

for (let i = 0; i < info.genres.length; i++) {
  categoriesHTML += `<span>${info.genres[i].name}</span>`;
    if (i < info.genres.length - 1) {
    categoriesHTML += ", ";
  }
 
}
  document.querySelector('.banner-img').innerHTML = `<img src="https://image.tmdb.org/t/p/original/${info.img}" alt="">`
  document.querySelector('.banner-col1').innerHTML = `<div class="banner-header">
                    <div class="banner-header-row1">
                        <h2>${info.title}</h2>
                    </div>
                    <div class="banner-header-row2">
                        <span class="hd-icone">Full HD</span>
                        <div class= "vote-container">
                        <i class="fa-solid fa-star"style='color:yellow'></i>
                       <span>${parseFloat(info.vote).toFixed(1)}</span>
                       </div>
                        <span class="date">${info.date}</span>
                        <span class="length">${info.runtime} min</span>
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

  document.querySelector('.overview').innerHTML = `
                                                     <h3>Overview :</h3>
                                                     <p>${info.overview}</p>
                                                     `
  
  
document.querySelector('.col2-info-container').innerHTML = `
<div class="original-title">
                    <h3>Original Title</h3>
                    <span>${info.title}</span>

                </div>
                <div class="status">
                    <h3>Status</h3>
                    <span>${info.status}</span>

                </div>
                <div class="tagline">
                    <h3>Tagline</h3>
                    <span>${info.tagline}</span>

                </div>
                <div class="budget">
                    <h3>budget</h3>
                    <span>${info.budget}$</span>

                </div>
                <div class="revenue">
                    <h3>revenue</h3>
                    <span>${info.revenue}$</span>

                </div>`

          document.querySelector('.companies').innerHTML += `<h3>Companies :</h3>
                                                              
                                                              <div class="companies-name">
                                                               ${companieHTML}
                                                               </div>   `
                                                                       
openTrailer()
closeTrailer()
  }


   async function movieVideo(movieId){
     const responses = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=46c9a5c82d4727524491157fac5fc467`);
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

   async function credits(movieId){
    const responses =await  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=46c9a5c82d4727524491157fac5fc467`);
    const data = await responses.json();
    let cast = data.cast;
    let crew = data.crew;
    let actorHTML = '';
    let directorHTML ='';
    let editorHTML =''
    castHTML(cast,crew)
    for (let i = 0 ; i < 3 ;i++){
      
      actorHTML += `<a href="">${cast[i].name}</a>`;

    }
 
    crew.map((person) => {
    if(person.job === 'Director'){
      directorHTML = `<a href="">${person.name}</a>`
    }
    if(person.job === 'Editor'){
      editorHTML += `<a href="">${person.name}</a>`

    }
  })
    document.querySelector('.cast').innerHTML = `
              <div class="actor">
                  <h3>Stars : </h3>
                   ${actorHTML}
                 </div>
                 <div class="director">
                     <h3>Director :</h3>
                     ${directorHTML}
                 </div>
                 <div class="editors">
                    <h3>Editors :</h3>
                    ${editorHTML}
                 </div>
                 <div class="all-crew">
                    <h3>All crew and cast</h3>
                    <span> > </span>
                 </div>`


      /* Animation */
  const anime = gsap.timeline({defaults:{duration:1}})
  anime.from('.cast',{x:'-100%',ease: 'slow'},.3)
  anime.from('.overview',{y:'-100%',ease: 'slow'},.3)
  anime.from('.col2-info-container',{x:'200%',ease: 'slow'},.3)

  personSelector()
 
  
 }

 
 async function recommendations(movieId){
  
     const responses = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=46c9a5c82d4727524491157fac5fc467`);
     const data = await responses.json();
       const list =data.results;
     list.map((item) => {
        let info = {
          'id':`${item.id}`,
           'title':`${item.title}`,
           'media':`${item.media_type}`,
            'dateRelease':`${item.release_date}`,
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
     
 
async function imageMovie(movieId){
     const responses = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=46c9a5c82d4727524491157fac5fc467`);
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
    "items":4,
    gutter:'20'
  }
},
   "swipeAngle": false
})

 }



 function castHTML(cast,crew){

  cast.map((actor) => {
     info ={
      id : `${actor.id}`,
      character : `${actor.character}`,
      name : `${actor.name}`,
      profil_img : `${actor.profile_path}`
    }
    if(info.profil_img !== 'null'){

   
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
 }