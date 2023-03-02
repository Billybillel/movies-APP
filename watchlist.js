window.addEventListener('load',function(){
    
    /* getting the object from the local storage */
    let watchListOject = localStorage.getItem('watchListObject')
    let myWatchList = JSON.parse(watchListOject)
    console.log(myWatchList)
    let tvCounter = 0
    let movieCounter = 0
    let watchlistCard = document.querySelector('.watchlist-body')
    if(myWatchList.length>0){

    
    myWatchList.map((movie) =>{
        
        /* counter of number of movie and tv show on the watchlist */
        if(movie.mediaType === 'tv'){
            tvCounter +=1
        }
        else if(movie.mediaType ==='movie'){
            movieCounter +=1
        }
        watchlistCard.innerHTML+= `
        <div class="watchlist-item">
          <div class="item-image">
            <img src="https://image.tmdb.org/t/p/original/${movie.img}" alt="">
          </div>
          <div class="item-content">
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
             <div class="delete-watchlist" data-movie-id="${movie.id}">
          <div class="close-button"><i class="fa-solid fa-xmark"></i></div>
          <span>Delete</span>
          </div>
          </div>
        </div>
        `
    })
    }
    /* if the watchlist object is empty */
    else{

        watchlistCard.innerHTML = `<div class="watchlist-no-item">
           <div class="watchList-icone">
                <i class="fa-solid fa-plus"></i>
            </div>
            <h3>Your Watchlist Is Empty</h3>
            <p>Add movies and shows to your Watchlist to keep track of what you want to watch.</p>
            <div class="browse-more">
            <a href="">Browse Popular Movies</a>
            <a href="">Browse Popular TV Shows</a>
            </div>
            </div>
            `
    }
/* the movie and tv counter elt*/
     document.querySelector('.header-info').innerHTML =`<div class="tv-counter"><h3>TV Show</h3>
            <span>${tvCounter}</span>
            </div>
            <div class= "movie-counter"><h3>Movie</h3>
            <span>${movieCounter}</span>
            </div>
                    `

                    /* delete movies from watchlist */
 let deleteFromWatchList = document.querySelectorAll('.delete-watchlist')
 console.log(deleteFromWatchList)
        deleteFromWatchList.forEach((movie) => {
          movie.addEventListener('click',function(){
           let elementId = this.getAttribute('data-movie-id')
      deleteWatchList(elementId,myWatchList)
      location.reload()
            
          })
        })
})






