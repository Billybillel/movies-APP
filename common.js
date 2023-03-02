/*Logo */
let logo = document.querySelector('.logo')
logo.addEventListener('click',function(){
  window.location.href = 'index.html'
})

/* =========================================== loader ================================================= */

 let loader = document.querySelector('#loaders')
 window.addEventListener('load',function(){
   loader.style.display='none'
 })
 
/*============================================ Open Menu===============================================*/

let openMenu = document.querySelector('.open')
let openContainer = document.querySelector('.openContainer')
let closeOpenMenu = document.querySelector('.close-open-menu.toggle')

openMenu.addEventListener('click',function(){
    
    openContainer.classList.add('hide-open-menu')
    document.body.style.overflow ="hidden"
})
 
closeOpenMenu.addEventListener('click',function(){
    openContainer.classList.remove('hide-open-menu')
   document.body.style.overflow ="scroll"
})

/* Open menu for mobile users */
let humbergerMenu = document.querySelector('.open-humberger')
let humbergerOpen = document.querySelector('.icone-menu-open')
let humbergerClose = document.querySelector('.icone-menu-close')
humbergerOpen.addEventListener('click',function(){

  humbergerMenu.style.right = "0"
  humbergerOpen.classList.remove('activeHumberger')
  humbergerClose.classList.add('activeHumberger')
  document.body.style.overflow = "hidden";
})
humbergerClose.addEventListener('click',function(){
  humbergerMenu.style.right = "-50rem"
   humbergerOpen.classList.add('activeHumberger')
  humbergerClose.classList.remove('activeHumberger')
  document.body.style.overflow = "scroll";
})
/*=========================================== search barre ============================================ */

let search= document.querySelector('.search');
let icone = document.querySelector('.icone');
let clear = document.querySelector('.clear');
/* search bar animation (when the user click on the search button) */
   icone.addEventListener('click',function(){
    search.classList.toggle('activeSearch');
    clear.classList.toggle('hideSearch');
 })
 /* clear the text on input  */
 function ClearSearchInput(){
  document.querySelector('.search-api').value='';
};
clear.addEventListener('click',ClearSearchInput)

/* when the user focus in the input field */
 let inputFocus = document.querySelector('.searchbar-focus-overlay');
 let input = document.querySelector(".search-api");

 function searchFocus(){
   /* hide the scrollbar of the body */
  document.body.style.overflow = "hidden";
  /* display the overlay container (the container hidden in css)*/
  inputFocus.style.display="block"
  /* hide the search bar in the navigation bar (the previous search input used only for design) */
  search.style.opacity='0'
  /* the animation when the overlay container opened */
  const timeline = gsap.timeline({defaults:{duration:1}})
  timeline.from('.searchbar-text',{y:'-700%',ease: 'rough'})
  .from('.close-search-bar',{x:'-400%',ease:'slow'},0.3)
  .from('.searchbar-focused',{x:'300%',ease:'rough'},0.3)

/* when the user submit the search with keyboard (enter) */
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.querySelector('.search-section-container').innerHTML =""
    event.preventDefault();
    const movieName = input.value;
     searchMulti(movieName)  
     ClearSearchInput()
  }
});
 }
document.querySelector('#searchInput').addEventListener('focus',searchFocus)

 /* the search button for the mobile users */
document.querySelector('.search-humberger').addEventListener('click',searchFocus)

/* reset the overflow of the body to show the scrollbar
removing the overlay container and clear all items from it
 */
let closeSearchBar = document.querySelector('.close-search-bar.toggle');
 closeSearchBar.addEventListener('click',function(){
  document.body.style.overflow = "auto";
   inputFocus.style.display="none"
   search.style.opacity='1'
   document.querySelector('.search-section-container').innerHTML =""
 })

 /* This function store the ID of the movie of any card clicked on the session storage and redirect 
 the page to the single details page, the id stored will be used then in the redirected page
  */
function movieCardSelector(){
 document.querySelectorAll('.trending-card').forEach((movieCard)=>{

     movieCard.addEventListener('click', function(event){
      let {x,y} = event
      let { top, left } = movieCard.getBoundingClientRect();
      let clickX = x - left;
      let clickY = y - top;
    /* if the area clicked is top left the event will not be excuted 
    (to reserve this area to the watchlist icone event )*/
    if(clickX<50 && clickY<50 ){
      event.preventDefault()
    }
    else{

           let media_type_choosed = this.getAttribute('data-media-type')
         
           sessionStorage.setItem("searchId", this.getAttribute('data-movie-id'));
           sessionStorage.setItem("mediaType", this.getAttribute('data-media-type'));
           
           if(media_type_choosed === 'movie'){
              window.location.href = 'signlemovie.html'
              
           }
           else if(media_type_choosed === 'tv'){
              window.location.href = 'signletv.html'
             
           }
           else if(media_type_choosed === 'person'){
             window.location.href = 'singleperson.html'
            
           }
    }
     })
  })
/* the hero movies selector */
         document.querySelectorAll('.trailer-card').forEach((trailerCard)=>{
            trailerCard.addEventListener('click', function(){
            sessionStorage.setItem("searchId", this.getAttribute('data-movie-id'));
            window.location.href = 'signlemovie.html'

         })
          })
}
/* this function store the id of any person clicked ond redirect the page */
function personSelector(){
  /* Acotors */
  document.querySelectorAll('.cast-crew-img-name').forEach((actor)=>{
    actor.addEventListener('click',function(){
      sessionStorage.setItem("personId", this.getAttribute('data-person-id'));
      window.location.href = 'singleperson.html'
    })

  })
  /* Crew */
  document.querySelectorAll('.crew-img-name').forEach((crew =>{
    crew.addEventListener('click',function(){
       sessionStorage.setItem("personId", this.getAttribute('data-person-id'));
      window.location.href = 'singleperson.html'
    })
  }))
  /* All cast page  */
  document.querySelectorAll('.castCrew-image').forEach((person) =>{
     person.addEventListener('click',function(){
       sessionStorage.setItem("personId", this.getAttribute('data-person-id'));
      window.location.href = 'singleperson.html'
    })
  })
}
                      
     
 /*======= the movies search function ====== */
function searchMovies(item){
    let search_container =document.querySelector('.search-section-container');
    let title;
    let date_release;
    let info = {
             'id':`${item.id}`,
             'media':`${item.media_type}`,
            'title':`${item.title}`,
             'dateRelease':`${item.release_date}`,
             'img':`${item.poster_path}`,
             'vote':`${parseFloat(item.vote_average).toFixed(1)}`,
             overview : `${item.overview}`
         }
        
         if(info.media === 'movie'){
          title = `${info.title}`
          date_release = info.dateRelease
         }
         else if(info.media === 'tv'){
           title = `${item.name}`
           date_release = item.first_air_date
         }
         else if(info.media === 'person'){
          /* if the value researched is a person */
          search_container.innerHTML+=`
           <div class="search-items trending-card" data-movie-id="${info.id}" data-media-type="${info.media}">
               <img src="https://image.tmdb.org/t/p/original/${item.profile_path}" alt="">
              <div class="trending-footer">
                <strong>${item.name}</strong>
                <span>${item.known_for_department}</span>
              </div>
                 </div>`

         }
/* creating the movie card  */
         search_container.innerHTML+=`
           <div class="search-items trending-card" data-movie-id="${info.id}" data-media-type="${info.media}">
               <img src="https://image.tmdb.org/t/p/original/${info.img}" alt="">
               <div class="watch-list-icone" data-movie-id="${info.id}" data-media-type="${info.media}" data-title="${title}" data-image="${info.img}" data-vote="${info.vote}" data-overview="${info.overview}"data-release="${date_release}">
                  <img src="./images/watch-list-unscreen.gif" alt="">
               </div>
               <span>${title}</span>
              <div class="releaseDate-vote-item trending-footer">
                  <div class="vote-container">
                      <i class="fa-solid fa-star"style='color:yellow'></i>
                     <span>${info.vote}</span>
                    
                  </div>
                 <span>${date_release}</span>
              </div>
                 </div>
             `
  watchList()
            }

async function searchMulti(movieName){
  const responses = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=46c9a5c82d4727524491157fac5fc467&include_adult=false&query=${movieName}`)
  const data = await responses.json()
  const list = data.results
  if (list.length>0){

    list.map((item) => {
      if(item!='null'){

        searchMovies(item)
      }
    })
  }
  else{
    document.querySelector('.search-section-container').innerHTML ="No movie or TV show found.."
  }
  movieCardSelector()
}


/* if the image received from the api is null */
function imgError(img){
  let img_not_found ;
  if (img !=='null'){
    img_not_found = `<img src="https://image.tmdb.org/t/p/original/${img}" alt="">`
  }
  else{
    img_not_found =`<img src="./img/no-profile-img.gif" alt="">`
  }
  return img_not_found;
}
let watchListContainer = document.querySelector('.my-slider5');
/* the function verify if the watchlist is empty to create elt for empty watchlist */
function isEmptyWatchlist(){
let watchListEmpty = document.querySelector('.watchList-subcontainer')
   if (watchListContainer.childElementCount ===0){
   watchListEmpty.style.display = 'flex'
  
   }
   else{
    watchListEmpty.style.display = 'none'
   }

   /* watch list controls */
     if(watchListContainer.childElementCount>4){
    document.querySelector('.controls7').style.display = 'block'
   }
   else{
    document.querySelector('.controls7').style.display = 'none'
   }

}


function watchList(){
   
  let watchListIcone = document.querySelectorAll('.watch-list-icone')
  /* collect the object from the local storage */
  let watchListObject = JSON.parse(localStorage.getItem('watchListObject')) || [];
  watchListIcone.forEach((singleMovie) =>{
    singleMovie.addEventListener('click',function(){
      /* add the atribute stored in the watchlist-icone to the watchlist object */
       watchListObject.push({
        id:this.getAttribute('data-movie-id'),
        mediaType:this.getAttribute('data-media-type'),
        title :this.getAttribute('data-title'),
        img  :this.getAttribute('data-image'),
        vote :this.getAttribute('data-vote'),
        date : this.getAttribute('data-release'),
        overview :this.getAttribute('data-overview')
      })
      /* converting the object to string and store it in the local storage */
      let myWatchListString = JSON.stringify(watchListObject);
      localStorage.setItem('watchListObject',myWatchListString) 
      /* removing the click event for the movie already added */
      singleMovie.removeEventListener('click',() =>{})
      this.style.pointerEvents = 'none';
      this.style.opacity = '0.4'
    })
  })
  
}
function myWatchListSlider(){
/* collect the string stored in the local storage and convert it into object */
   let watchListOject = localStorage.getItem('watchListObject')
     let myWatchList = JSON.parse(watchListOject)
  if(myWatchList.length>0) {

  myWatchList.map((movie)=>{
    /* create the wacthlist section in the index page */
    document.querySelector('.my-slider5').innerHTML += `
    
                <div class="trendingSeries-card trending-card" data-movie-id="${movie.id}" data-media-type="${movie.mediaType}">
                    <img src="https://image.tmdb.org/t/p/original/${movie.img}" alt="">
                    <div class="remove-watchList" data-movie-id ="${movie.id}">
                    <img src="./img/208-2084423_cancel-button-clipart-svg-close-button-gif.png">
                    </div>
                    <h3>${movie.title}</h3>
                    <div class="trendingSeries-footer trending-footer">
                    <div class="vote-container">
                    <i class="fa-solid fa-star"style='color:yellow'></i>
                    <span>${movie.vote}</span>
                    </div>
                        <span>${movie.date}</span>
                    </div>
                </div>`
  })
   }

   /* remove item from watchlist */
    let removeIcone = document.querySelectorAll('.remove-watchList')    
   removeIcone.forEach((movie) =>{
    movie.addEventListener('click',function(){
      let elementId = this.getAttribute('data-movie-id')
      deleteWatchList(elementId,myWatchList)
    
    })
   })

   if (watchListContainer.childElementCount>1){

     let slider5 = tns({
                   'container': '.my-slider5',
                   "slideBy":1,
                   "items": 4,
                   gutter:'20',
                   'nav':false,
                   controlsContainer:".controls7",
                    prevButton:'.previous7',
                    nextButton: '.next7',
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
}
                 })
   }
 
}
/* the delete watchlist function */
function deleteWatchList(elementId,myWatchList){
  /* searching for the movie id in the watchlist obj stored in the storage and using splice to delete
  */
  let indexEl =  myWatchList.findIndex((item) => item.id === elementId)
  myWatchList.splice(indexEl,1)
  /* updating the watchlist obj in the storage */
  localStorage.setItem('watchListObject', JSON.stringify(myWatchList));
  

}

/** if the user click on the watchlist icone in the navigation link (redirect the page) */
function watchlistPage(){

  window.location.href = 'watchlist.html'
}
document.querySelector('.watchList-icone').addEventListener('click',watchlistPage)
document.querySelector('.Watch-list-humberger').addEventListener('click',watchlistPage)


/* ================= trailer videos ==========*/



function openTrailer(){
  let overlay = document.querySelector('.trailer-overlay-container')
  let openButton = document.querySelector('.play-btn')
  let watchTrailer = document.querySelector('.banner-footer-col2')
  function trailer(){
    
    overlay.classList.remove('hide-trailer')
  }
  watchTrailer.addEventListener('click',trailer)
  openButton.addEventListener('click',trailer)

} 
function closeTrailer(){
  let overlay = document.querySelector('.trailer-overlay-container')
  let closeTrailer = document.querySelector('.close-trailer')
closeTrailer.addEventListener('click',function(){
  overlay.classList.add('hide-trailer')
})
}