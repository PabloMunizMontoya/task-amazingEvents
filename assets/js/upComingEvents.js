// <div class="card container-card">
//      <img src="./assets/images/Cine7.jpg" class="card-img-top card-image p-1"
//       alt="image of family watching a movie at the cine">
//      <div class="card-body">
//          <h5 class="card-title text-center">Card title</h5>
//          <h6 class="text-center">Description</h6>
//          <div class="container-card-inf">
//              <p class="p-price">Price $0000</p>
//              <a href="#" class="btn btn-secondary btn-sm m-2
//               p-0 d-flex align-items-center">See more</a>
//          </div>
//      </div>
// </div>
let div = document.getElementById('cards');

let events = data.events
console.log(events)
div.innerHTML = ''

for (let element of events) {
    if (element.date >= "2022-01-22") {
        div.innerHTML += `<div class="card container-card">
          <img src="${element.image}" class="card-img-top card-image p-1"
          alt="image of activities">
          <div class="container-card-body card-body d-flex row align-items-center">
              <h5 class="card-title text-left ms-3 "><strong>${element.name}</strong></h5>
              <div>
                <h6 class="text-justify text-left ms-3 ">${element.description}</h6>
              </div>  
              <div class="container-card-inf">
                  <p class="p-price text-left ms-3">${element.price + ' USD'}</p>
                  <a href="#" class="btn btn-secondary btn-sm m-0
                   p-1 d-flex align-items-center me-0">See more</a>
              </div>
          </div>
     </div>`
    } else {
        div.innerHTML += ''
    }
    
}