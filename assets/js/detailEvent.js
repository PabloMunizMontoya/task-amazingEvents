/* let queryString = location.search
let params = new URLSearchParams(queryString)
let id = params.get('id')  */

let events = data.events;
let idR = new URLSearchParams(location.search).get('id')
console.log(idR)
let containerCardDetail = document.getElementById('cardDetail')


const  profile = events.find(item => item._id == idR)
console.log(profile)

containerCardDetail.innerHTML =` <div class="container-imgn-card-detail">
<div id="contenedordeimagen">   
<img src="${profile.image}" class="card-img-top  p-1 shadow p-3 mb-5 bg-white rounded"alt="image of activities">
</div> 
</div>
<div  class="container-imgn-card-detail ">
 <div class=" container-txtcard d-flex flex-column justify-content-start justify-content-center p-5">
     <h3 class="h1-card-detail fs-2 d-flex flex-column ">${profile.name} </h3>
     <p class="p-card-detail fs-7"> ${profile.description}  </p>
     <p class="p-card-detail fs-7"> ${ 'Date: '+ profile.date} </p>
     <p class="p-card-detail fs-7"> ${profile.place} </p>
     <p class="p-card-detail fs-7"> ${ 'capacity: '+ profile.capacity} </p>
     <p class="p-card-detail fs-7"> ${ 'assistance: '+ profile.assistance} </p>
 </div>  
</div>`