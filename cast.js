window.addEventListener('load',function(){
     let searchId = sessionStorage.getItem("searchId");
     let media = sessionStorage.getItem("media");

     allCast(media,searchId)
})
async function allCast(media,searchId){
     const responses =await  fetch(`https://api.themoviedb.org/3/${media}/${searchId}/credits?api_key=46c9a5c82d4727524491157fac5fc467`);
    const data = await responses.json();
    let cast = data.cast
    let crew = data.crew
    console.log(crew)
    allCastCrew(cast,crew)

}

function allCastCrew(cast,crew){
     cast.map((actor) =>{
          document.querySelector('.all-cast-container').innerHTML += 
          `<div class="castCrew-item">
          <div class="castCrew-image" data-person-id="${actor.id}">
           ${imgError(`${actor.profile_path}`)}
          </div>
          <div class="castCrew-name">
          <p>${actor.name}</p>
          <span>${actor.character}</span>
          </div>
          </div>
          `
    
     })
     crew.map((worker) =>{
         
          document.querySelector('.all-crew-container').innerHTML += 
          `<div class="castCrew-item">
          <div class="castCrew-image" data-person-id="${worker.id}">
          ${imgError(`${worker.profile_path}`)}
          </div>
          <div class="castCrew-name">
          <p>${worker.name}</p>
          <span>${worker.job}</span>
          </div>
          </div>
          `
     
     })
    personSelector()
}