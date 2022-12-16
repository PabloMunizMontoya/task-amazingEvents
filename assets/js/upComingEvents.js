let cardContainer = document.getElementById('cards');
let containerCheck = document.getElementById("checkbox");
let searchBar = document.getElementById('busqueda-js')

let events = data.events
let futureEvents = events.filter(p => p.date >= "2022-01-22" )

function renderFutureCards(array, container) {
  container.innerHTML = "";
  let emptyContainer = '';
  array.forEach((element) => {
    emptyContainer += 
    `<div class="card container-card">
      <img src="${element.image}" class="card-img-top card-image p-1"alt="image of activities">
        <div class="container-card-body card-body d-flex row align-items-center">
            <h5 class="card-title text-left ms-3 "><strong>${element.name}</strong></h5>
            <div>
              <h6 class="text-justify text-left ms-3 ">${element.description}</h6>
            </div>  
            <div class="container-card-inf">
              <p class="p-price text-left ms-3">${element.price + " USD"}</p>
              <a href="./detailevent.html?id=${element._id}" class="btn btn-secondary btn-sm m-0
              p-1 d-flex align-items-center me-0">See more</a>
            </div>
        </div>
    </div>`;
  });
  container.innerHTML = emptyContainer
};
renderFutureCards(futureEvents , cardContainer);


let arrayWithoutRepeatCategories = [... new Set( events.map( element =>  element.category  ) ) ] ;

function renderCategoriesOnCheckBoxes ( categories, container) {
  categories.forEach((element) => {
    container.innerHTML += ` <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="${element}"value="${element}">
  <label class="form-check-label" for="inlineCheckbox1">${element}</label>
  </div>`;
  });
}
renderCategoriesOnCheckBoxes(arrayWithoutRepeatCategories, containerCheck);
  
containerCheck.addEventListener("change", (e) => {
  let filterByTwo = corssFilters (futureEvents)
  renderFutureCards(filterByTwo, cardContainer);
});

searchBar.addEventListener("input", () => {
   let filterByTwo = corssFilters (futureEvents)
   renderFutureCards(filterByTwo, cardContainer);
  
})
function filter(event) {
  let checked = [
    ...document.querySelectorAll("input[type ='checkbox']:checked"),
  ].map((element) => element.value); 
  // array with values of checked sections
  let newArrayWithFilter = checked
    .map((value) =>
      event.filter((object) => {
        return object.category === value;
      })
    ).flat();
    
  // array of events that includes filtered checkboxes categories values
  if (checked.length == false ) {
    return futureEvents;
  } else {
    return newArrayWithFilter;
  }
}

function searchFilter(event, searchValue) {
  return event.filter (event => event.name.toLowerCase().includes (searchValue.toLowerCase() ) )
}

function corssFilters (event){
  let arrayOfDynamicCheckedObjects = filter(event)
  let arraySearchFilter = searchFilter(arrayOfDynamicCheckedObjects, searchBar.value)
  return arraySearchFilter
}
