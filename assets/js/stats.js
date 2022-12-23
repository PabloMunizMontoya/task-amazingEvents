//------------ get elements of html to js ------------------------

let tableUpcoming= document.getElementById("tableUpcoming") 
let tablePast= document.getElementById("tablePast") 
let tableHome= document.getElementById("tableHome")


//---------------------- fetch  ------------------------

let events;
fetch('https://amazing-events.onrender.com/api/events') 
.then( res => { return res.json() } ) 
.then( data => {
    events= data.events
    
    let upComing= events.filter(every => every.date >= data.currentDate) 
    
    renderTableUpcoming (upComing, tableUpcoming)

    let pastEvents= events.filter(every => every.date <= data.currentDate)
     
    renderTablePast (pastEvents, tablePast) 

    
    renderPercentage(events, pastEvents,tableHome) 

}) 



function filterAssistance (eventsPast) {
    let assistance= [...eventsPast] 
    console.log(assistance)
    let arrayAssistance= [] 
    assistance.forEach(propiedades => {
        let percentage= (((propiedades.assistance*100) / propiedades.capacity))
        if(percentage> 95) {
        return arrayAssistance.push (`${propiedades.name}, ${((percentage).toFixed(2))}%`)
        }
    })
    return (arrayAssistance) 
}



function filterMinerAssistance (eventsPast) {
    let minorAssistance= [...eventsPast]
    let arrayMinorAssistance= []
    minorAssistance.forEach(menor => {
        let percentage= (((menor.assistance*100) / menor.capacity))
        if(percentage < 70) {
        return arrayMinorAssistance.push (`${menor.name}, ${((percentage).toFixed(2))}%`) 
        }
    })
    return (arrayMinorAssistance)
}


function capacity(array) {
    let arrayWithOnlyCapacities = [...array.map((element) => element.capacity)];
    let maxCapacity = Math.max.apply(null, arrayWithOnlyCapacities);
    let  capacityTotal = array.filter(
        (element) => element.capacity == maxCapacity
    );
    return ( capacityTotal);
    ;
}


function renderPercentage (listaHome, eventsPast,containerHome) {

    let finalAssistance=  filterAssistance (eventsPast) 
    let finalMinerAssistance = filterMinerAssistance(eventsPast)
    let finalCapacity= capacity(listaHome)
    

    containerHome.innerHTML = `
        <tr>
            <td class= "style: text-center"> ${finalAssistance} </td> 
            <td class= "style: text-center"> ${finalMinerAssistance} </td>
            <td class= "style: text-center"> ${finalCapacity[0].name}, ${finalCapacity[0].capacity} people </td> 
        </tr>
    
`
}



//Table UPCOMING

function renderTableUpcoming (lista, container)  {
    container.innerHTML = "";
    let listado = "";
    lista.forEach((propiedades) => {
        listado += `
        <tr>
        <td class= "style: text-center"> ${propiedades.category}</td> 
        <td class= "style: text-center"> $ ${(propiedades.price * propiedades.estimate).toLocaleString()} </td>
        <td class= "style: text-center"> ${((propiedades.estimate * 100) / propiedades.capacity).toFixed(2)}%  </td> 
        </tr>
    
`; 
    });
    container.innerHTML = listado
} 



//TABLE PASTEVENTS

function renderTablePast (listaPast, containerPast)  {
    containerPast.innerHTML = "";
    let listadoPast = "";
    listaPast.forEach((propiedades) => {
        listadoPast += `
        <tr>
            <td class= "style: text-center"> ${propiedades.category} </td> 
            <td class= "style: text-center"> $ ${(propiedades.price *  propiedades.assistance).toLocaleString()} </td>
            <td class= "style: text-center"> ${((propiedades.assistance * 100) / propiedades.capacity).toFixed(2) }%</td>
        </tr>
    
`;
    });
    containerPast.innerHTML = listadoPast
}  