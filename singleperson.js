  window.addEventListener('load',function(){

     let searchId = sessionStorage.getItem("personId");

      
      getDetailsPerson(searchId)
      moviecredit(searchId)
      
      
      

  })

  async function getDetailsPerson(searchId){
 const responses = await fetch(`https://api.themoviedb.org/3/person/${searchId}?api_key=46c9a5c82d4727524491157fac5fc467`)
const data = await responses.json();
personDetails(data)
let chevronDown = document.querySelector('.fa-chevron-down')
let chevronUp = document.querySelector('.fa-chevron-up')
let bioEl = document.querySelector('.person-biographie p')
let biographie =document.querySelector('.person-biographie')
if(bioEl.scrollHeight < biographie.clientHeight){
  chevronDown.style.display ='none';
  chevronUp.style.display ='none'
  biographie.classList.add('see-more');
}
else{
chevronDown.addEventListener('click',function(){
    let biographie =document.querySelector('.person-biographie ')
    biographie.classList.add('see-more');
    chevronDown.style.display ='none'
    chevronUp.style.display ='block'

})
chevronUp.addEventListener('click',function(){
    let biographie =document.querySelector('.person-biographie ')
    biographie.classList.remove('see-more');
    chevronUp.style.display ='none'
    chevronDown.style.display ='block'
})
}
}



async function moviecredit(searchId){
 const responses = await fetch(`https://api.themoviedb.org/3/person/${searchId}/combined_credits?api_key=46c9a5c82d4727524491157fac5fc467`)
const data = await responses.json();
personMoreMovies(data)

 movieCardSelector()   
  
 
}


function personDetails(obj){
  if(!obj.profile_path &&  !obj.biography){
     document.querySelector('.about-container').innerHTML = `
     <div class="about-img">
            <img src="./img/no-profile-img.gif" alt="">
        </div>
         <div class="about-content">
            <div class="person-name">
                <h1>${obj.name}</h1>
            </div>
            <div class="person-biographie">
                <h2>Biography :</h2>
                <p>No biography has been written for ${obj.name}. Your contribution is welcome !</p>
                <i class="fa-solid fa-chevron-down"></i>
                <i class="fa-solid fa-chevron-up"></i>
            </div>
            
        </div>
        `
  }
  else{

  
  document.querySelector('.about-container').innerHTML = `
  
  <div class="about-img">
            <img src="https://image.tmdb.org/t/p/original/${obj.profile_path}" alt="">
        </div>
        <div class="about-content">
            <div class="person-name">
                <h1>${obj.name}</h1>
            </div>
            <div class="person-biographie">
                <h2>Biography :</h2>
                <p>${obj.biography}</p>
                <i class="fa-solid fa-chevron-down"></i>
                <i class="fa-solid fa-chevron-up"></i>
            </div>
            
        </div>
         
  `
}
}

function personMoreMovies(data){
    
    let titleHtml = ""
    let acting = data.cast
    let staff = data.crew
    acting.map((movie) => {
        if(movie.media_type === 'movie'){
            titleHtml = `
        <span>${movie.title}</span>
        `

        }
        else if(movie.media_type === 'tv'){
            titleHtml = `
        <span>${movie.name}</span>
        `
        }
        document.querySelector('.known-for').innerHTML += `
        <div class="tagged-image trending-card" data-movie-id="${movie.id}" data-media-type="${movie.media_type}">
        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path }" alt="">
        <div class="tagged-title">
        ${titleHtml}
        </div>
            </div>`
    })
      let slider = tns({
   "container": ".known-for",
   "slideBy":1,
   "items": 5,
    navPosition:'bottom',
    nav :false,
    autoplay: true,
    controls:false,
    "autoplayButtonOutput" :false,
    "speed": 300,
  
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
    gutter:'20'
  },
   "1000":{
    "items":5,
    
  }
},
   "swipeAngle": false
})
   
}



