const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied) ');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const selectMovie = document.querySelector('#movie')
populateUI();
let ticketPrice = +selectMovie.value;

//save index nd price of movie
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Seats count
function selectedSeatsCount() {
    const selectedseatcount = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedseatcount].map(seat => {
        return [...seats].indexOf(seat)
    });
    localStorage.setItem('selectedseatcount', JSON.stringify(seatsIndex));
    const counttotal = selectedseatcount.length;
    count.innerText = counttotal;
    total.innerText = counttotal * ticketPrice;
}

//import data from local storage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedseatcount'));
    // console.log(selectedSeats)
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const getIndex = localStorage.getItem('selectedMovieIndex');
    if (getIndex !== null) {
        selectMovie.selectedIndex = getIndex;
    }
}

//pricing on options
selectMovie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    selectedSeatsCount();
});


//Even listener
container.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        selectedSeatsCount();
    }
});
//update price
selectedSeatsCount();

