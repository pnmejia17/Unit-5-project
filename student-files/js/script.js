// SELECTING HTML ELEMENTS
const url = 'https://randomuser.me/api/?results=12'
const gallery = document.getElementById('gallery')



// FETCH FUNCTIONS

fetch(url)
.then(response => response.json())
.then(data => generateUsers(data.results))



// HELPER FUNCTIONS

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

gallery.addEventListener('click', (e) => {
  const userModal = e.target.closest('.card')
  if (userModal) {
    const userName = userModal.querySelector('#name').textContent
    const user = users.find((user) => user.name.first + ' ' + user.name.last === userName)
    displayUserModal(user)}})

const displayUserModal = (user) => {
  const modalHTML = `            
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${user.picture.thumbnail}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.city} ${user.state}</p>
          <hr>
          <p class="modal-text">(555) 555-5555</p>
          <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
          <p class="modal-text">Birthday: 10/21/2015</p>
      </div>
  </div>`;
  body.insertAdjacentHTML("beforeend", modalHTML); 
}