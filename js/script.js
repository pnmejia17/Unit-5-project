// SELECTING HTML ELEMENTS
const ranUserUrl = 'https://randomuser.me/api/?results=12'
const gallery = document.getElementById('gallery')
const body = document.querySelector('body')

let users = []

// FETCH FUNCTIONS

// async function uses query to get elements from API
// capped at 12 results each time
// stores results in array users
// calls helper func generateUsers to display users 

async function fetchData(url){
    const response = await fetch(ranUserUrl)
    const data = await response.json()
    users = data.results
    generateUsers(data.results)
}

fetchData()

// HELPER FUNCTIONS

// inserts HTML while mapping the
// variables of each individual as the content

function generateUsers(users){
    const html = users.map(user => `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>
    `).join('')
    gallery.innerHTML = html
}

// EVENT LISTENER 

// listens for the button click and 
// searches user array for the name
// of the individual clickled to display
// their info in the modal

gallery.addEventListener('click', (e) => {
  const userModal = e.target.closest('.card')
  if (userModal) {
    const userName = userModal.querySelector('#name').textContent
    const user = users.find((user) => user.name.first + ' ' + user.name.last === userName)
    displayUserModal(user)
}
})
const displayUserModal = (user) => {
    const dob = new Date(user.dob.date)
    const modalHTML = `            
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city} ${user.location.state}</p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${dob.getMonth()+1}/${dob.getDate()}/${dob.getFullYear()} </p>
        </div>
    </div>`;
    body.insertAdjacentHTML("beforeend", modalHTML); 
  }

// listens for click of x to close modal

body.addEventListener("click", (e) => {
    const modal = document.querySelector(".modal-container");
    const clickedButton = e.target.closest('.modal-close-btn')
    if (clickedButton) {
      modal.remove();
    }
  });