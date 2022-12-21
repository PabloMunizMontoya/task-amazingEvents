// --------------- getting html sections to js --------------

let eventStaticsContainer = document.getElementById("events-statics-table");
let upcomingContainer = document.getElementById('upcoming-container');
let pastContainer = document.getElementById('past-container');
//-------------------- fetch -----------------------------

let events;

fetch("https://amazing-events.onrender.com/api/events")
    .then((result) => result.json())
    .then((data) => {
        events = data.events;
        console.log(events);

        let arrayWithOnlyAssistanceEvents = [
            ...events.filter((element) => element.assistance),
        ];
        let arrayWithOnlyCapacities = [...events.map((element) => element.capacity)];

        renderHighPercentEvents(events, arrayWithOnlyAssistanceEvents, eventStaticsContainer)

        renderUpcoming (events, upcomingContainer)
        /* lowPercent( events ) */

        renderPast(events, pastContainer )
    });

//---------------- function for rendering stats ------------------


function renderHighPercentEvents(array, eventosPasados, container) {
    let resultadoFuncionPorcentajeAlto = highPercent(eventosPasados)
    let resultadoFuncionPorcentajeMayor = lowPercent(eventosPasados)
    let resultadoCapacidad = eventWithHighCapacity(array)
    container.innerHTML = `<tr >
    <td >${resultadoFuncionPorcentajeAlto}</td>
    <td >${resultadoFuncionPorcentajeMayor}</td>
    <td >${resultadoCapacidad[0].name}</td>
</tr>`
}

//---------------- function for obtain values ----------------

function highPercent(array) {
    /* console.log(arrayWithOnlyAssistanceEvents) */
    let arrayOfMaxAssistance = [];
    array.forEach((element) => {
        let percent = (element.assistance / element.capacity) * 100;
        /*  console.log(percent) */
        if (percent > 92) {
            return arrayOfMaxAssistance.push(
                `${element.name}, ${percent.toFixed(2)} %`
            );
        }
    });
    return arrayOfMaxAssistance;
    /* container.innerHTML = `<td>${arrayOfMaxAssistance}</td>`; */
}


function lowPercent(array) {
    
    
    let arrayOfMinAssistance = [];
    array.forEach((element) => {
        let percent = (element.assistance / element.capacity) * 100;
        /* console.log(percent) */
        if (percent < 70) {
            return arrayOfMinAssistance.push(
                `${element.name}, ${percent.toFixed(2)} %`
            );
        }
    });
    return arrayOfMinAssistance
    
}

function eventWithHighCapacity(array) {
    let arrayWithOnlyCapacities = [...array.map((element) => element.capacity)];
    let maxCapacity = Math.max.apply(null, arrayWithOnlyCapacities);
    console.log(maxCapacity);
    let maxCapacityEvent = array.filter(
        (element) => element.capacity == maxCapacity
    );
    console.log(maxCapacityEvent);
    return (maxCapacityEvent);
    ;
}

function renderUpcoming (array, container){
    let arrayWitUpcomingEvents = [
        ...array.filter((element) => element.estimate),
    ];
    console.log(arrayWitUpcomingEvents);
    let arrayOfEstimatedRevenues = []
    let arrayOfPercentsAttendances = [] 
    arrayWitUpcomingEvents.forEach((element) => {
        arrayOfEstimatedRevenues.push(element.estimate * element.price)
        console.log(arrayOfEstimatedRevenues)
        arrayOfPercentsAttendances.push((element.estimate / element.capacity * 100).toFixed(2)); 
        console.log(arrayOfPercentsAttendances)

    })


    container.innerHTML = `<tr class="events-satics-container">
    <td class="fs-3 p-2 fw-bold" colspan="3">Upcomig events statistics by category</td>
</tr>
<tr>
    <td class="fw-bold fs-5">Category</td>
    <td class="fw-bold fs-5">Estimated revenues</td>
    <td class="fw-bold fs-5">Percentage of attendance</td>
</tr>
<tr>
    <td>${arrayWitUpcomingEvents[0].category}</td>
    <td>${arrayOfEstimatedRevenues[0]} USD</td>
    <td>${arrayOfPercentsAttendances[0]} %</td>
</tr>
<tr>
    <td>${arrayWitUpcomingEvents[1].category}</td>
    <td>${arrayOfEstimatedRevenues[1]} USD</td>
    <td>${arrayOfPercentsAttendances[1]} %</td>
</tr>
<tr>
    <td>${arrayWitUpcomingEvents[2].category}</td>
    <td>${arrayOfEstimatedRevenues[2]} USD</td>
    <td>${arrayOfPercentsAttendances[2]} %</td>
</tr>
<tr>
    <td>${arrayWitUpcomingEvents[3].category}</td>
    <td>${arrayOfEstimatedRevenues[3]} USD</td>
    <td>${arrayOfPercentsAttendances[3]} %</td>
</tr>
<tr>
    <td>${arrayWitUpcomingEvents[4].category}</td>
    <td>${arrayOfEstimatedRevenues[4]} USD</td>
    <td>${arrayOfPercentsAttendances[4]} %</td>
</tr>
<tr>
    <td>${arrayWitUpcomingEvents[5].category}</td>
    <td>${arrayOfEstimatedRevenues[5]} USD</td>
    <td>${arrayOfPercentsAttendances[5]} %</td>
</tr>
<tr>
    <td>${arrayWitUpcomingEvents[6].category}</td>
    <td>${arrayOfEstimatedRevenues[6]} USD</td>
    <td>${arrayOfPercentsAttendances[6]} %</td>
</tr>`
}

function renderPast(array, container) {
    let arrayWitPastEvents = [...array.filter((element) => element.assistance)];
    console.log(arrayWitPastEvents);
    let arrayOfRevenues = [];
    let arrayOfPercentsAssistance = [];
    arrayWitPastEvents.forEach((element) => {
        arrayOfRevenues.push(element.assistance * element.price);
        console.log(arrayOfRevenues);
        arrayOfPercentsAssistance.push(
            ((element.assistance / element.capacity) * 100).toFixed(2)
        );
        console.log(arrayOfPercentsAssistance);
    });
    container.innerHTML = `<tr class="events-satics-container">
    <td class="fs-3 p-2 fw-bold" colspan="3">Upcomig events statistics by category</td>
</tr>
<tr>
    <td class="fw-bold fs-5">Category</td>
    <td class="fw-bold fs-5">Estimated revenues</td>
    <td class="fw-bold fs-5">Percentage of attendance</td>
</tr>
<tr>
    <td>${arrayWitPastEvents[0].category}</td>
    <td>${arrayOfRevenues[0]} USD</td>
    <td>${arrayOfPercentsAssistance[0]} %</td>
</tr>
<tr>
    <td>${arrayWitPastEvents[1].category}</td>
    <td>${arrayOfRevenues[1]} USD</td>
    <td>${arrayOfPercentsAssistance[1]} %</td>
</tr>
<tr>
    <td>${arrayWitPastEvents[2].category}</td>
    <td>${arrayOfRevenues[2]} USD</td>
    <td>${arrayOfPercentsAssistance[2]} %</td>
</tr>
<tr>
    <td>${arrayWitPastEvents[3].category}</td>
    <td>${arrayOfRevenues[3]} USD</td>
    <td>${arrayOfPercentsAssistance[3]} %</td>
</tr>
<tr>
    <td>${arrayWitPastEvents[4].category}</td>
    <td>${arrayOfRevenues[4]} USD</td>
    <td>${arrayOfPercentsAssistance[4]} %</td>
</tr>
<tr>
    <td>${arrayWitPastEvents[5].category}</td>
    <td>${arrayOfRevenues[5]} USD</td>
    <td>${arrayOfPercentsAssistance[5]} %</td>
</tr>
<tr>
    <td>${arrayWitPastEvents[6].category}</td>
    <td>${arrayOfRevenues[6]} USD</td>
    <td>${arrayOfPercentsAssistance[6]} %</td>
</tr>`
}