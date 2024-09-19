// const form = document.querySelector('form');
// const gallery = document.querySelector('.image-container');
// const detailsContainer = document.querySelector('.details-container');
// const detailsContent = document.querySelector('.details-content');
// const closeDetailsButton = document.querySelector('.close-details');
// const watchlistButton = document.querySelector('.watchlist-button');
// const watchlistContainer = document.querySelector('#watchlist-container');
// const watchlistItems = document.querySelector('.watchlist-items');
// const closeWatchlistButton = document.querySelector('.close-watchlist');
// const notificationContainer = document.querySelector('.notification'); 

// let watchlist = [];

// document.addEventListener('DOMContentLoaded', () => {
//     omdbApi('movie');
// });

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let query = form.querySelector('input').value.trim();
//     form.querySelector('input').value = '';

//     if (query === '') {
//         query = 'nothing';
//     }
//     omdbApi(query);
// });

// async function omdbApi(query) {
//     try {
//         const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=d71901de`);
//         if (!res.ok) throw new Error('Network response was not ok');
//         const data = await res.json();

//         if (data.Response === "False") {
//             gallery.innerHTML = `<p>${data.Error}</p>`;
//         } else {
//             makeImages(data.Search);
//         }
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//         gallery.innerHTML = '<p>Sorry, something went wrong.</p>';
//     }
// }

// function makeImages(movies) {
//     gallery.innerHTML = '';
//     movies.forEach(movie => {
//         if (movie.Poster !== 'N/A') {
//             const container = document.createElement('div');
//             container.classList.add('image-item');

//             const img = document.createElement('img');
//             img.src = movie.Poster;
//             img.alt = movie.Title;

//             const title = document.createElement('h3');
//             title.textContent = movie.Title;

//             const detailsButton = document.createElement('button');
//             detailsButton.textContent = 'View Details';
//             detailsButton.dataset.id = movie.imdbID;

//             const addToWatchlistButton = document.createElement('button');
//             addToWatchlistButton.textContent = 'Add to Watchlist';
//             addToWatchlistButton.classList.add('add-to-watchlist');
//             addToWatchlistButton.addEventListener('click', () => addToWatchlist(movie));

//             container.append(img, title, detailsButton, addToWatchlistButton);
//             gallery.appendChild(container);

//             detailsButton.addEventListener('click', () => {
//                 getDetails(movie.imdbID);
//             });
//         }
//     });
// }

// async function getDetails(id) {
//     try {
//         const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=d71901de`);
//         const movie = await res.json();
//         detailsContainer.classList.remove('hidden');
//         detailsContent.innerHTML = `
//             <img src="${movie.Poster}" alt="${movie.Title}">
//             <p><strong>Title:</strong> ${movie.Title}</p>
//             <p><strong>Genre:</strong> ${movie.Genre}</p>
//             <p><strong>Plot:</strong> ${movie.Plot}</p>
//             <p><strong>Director:</strong> ${movie.Director}</p>
//             <p><strong>Actors:</strong> ${movie.Actors}</p>
//         `;
//     } catch (error) {
//         console.error('Error fetching movie details:', error);
//     }
// }

// closeDetailsButton.addEventListener('click', () => {
//     detailsContainer.classList.add('hidden');
// });

// watchlistButton.addEventListener('click', () => {
//     watchlistContainer.classList.remove('hidden');
//     displayWatchlist();
// });

// closeWatchlistButton.addEventListener('click', () => {
//     watchlistContainer.classList.add('hidden');
// });

// function addToWatchlist(movie) {
//     watchlist.push(movie);
//     displayWatchlist();
//     showNotification(`${movie.Title} added to Watchlist`); 
// }

// function displayWatchlist() {
//     watchlistItems.innerHTML = '';
//     watchlist.forEach(movie => {
//         const item = document.createElement('div');
//         item.classList.add('watchlist-item');

//         const img = document.createElement('img');
//         img.src = movie.Poster;
//         img.alt = movie.Title;

//         const title = document.createElement('p');
//         title.textContent = movie.Title;

//         const removeButton = document.createElement('button');
//         removeButton.textContent = 'Remove';
//         removeButton.classList.add('remove-from-watchlist');
//         removeButton.addEventListener('click', () => {
//             removeFromWatchlist(movie);
//         });

//         item.append(img, title, removeButton);
//         watchlistItems.appendChild(item);
//     });
// }

// function removeFromWatchlist(movie) {
//     watchlist = watchlist.filter(m => m.imdbID !== movie.imdbID);
//     displayWatchlist();
// }

// function showNotification(message) {
//     const notification = document.createElement('div');
//     notification.classList.add('notification-message');
//     notification.textContent = message;

//     notificationContainer.appendChild(notification);

//     setTimeout(() => {
//         notification.remove();
//     }, 3000); 
// }


const form = document.querySelector('form');
const gallery = document.querySelector('.image-container');
const detailsContainer = document.querySelector('.details-container');
const detailsContent = document.querySelector('.details-content');
const closeDetailsButton = document.querySelector('.close-details');
const watchlistButton = document.querySelector('.watchlist-button');
const watchlistContainer = document.querySelector('#watchlist-container');
const watchlistItems = document.querySelector('.watchlist-items');
const closeWatchlistButton = document.querySelector('.close-watchlist');
const notificationContainer = document.querySelector('.notification');

let watchlist = [];

// Fetch default movie data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    omdbApi('movie');
});

// Handle form submission to search for movies
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = form.querySelector('input').value.trim();
    form.querySelector('input').value = '';

    if (query === '') {
        query = 'nothing';
    }
    omdbApi(query);
});

// Fetch movies from OMDB API
async function omdbApi(query) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=d71901de`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        if (data.Response === "False") {
            gallery.innerHTML = `<p>${data.Error}</p>`;
        } else {
            makeImages(data.Search);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        gallery.innerHTML = '<p>Sorry, something went wrong.</p>';
    }
}

// Create and display movie posters
function makeImages(movies) {
    gallery.innerHTML = '';
    movies.forEach(movie => {
        if (movie.Poster !== 'N/A') {
            const container = document.createElement('div');
            container.classList.add('image-item');

            const img = document.createElement('img');
            img.src = movie.Poster;
            img.alt = movie.Title;

            const title = document.createElement('h3');
            title.textContent = movie.Title;

            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'View Details';
            detailsButton.dataset.id = movie.imdbID;

            const addToWatchlistButton = document.createElement('button');
            addToWatchlistButton.textContent = 'Add to Watchlist';
            addToWatchlistButton.classList.add('add-to-watchlist');
            addToWatchlistButton.addEventListener('click', () => addToWatchlist(movie));

            container.append(img, title, detailsButton, addToWatchlistButton);
            gallery.appendChild(container);

            detailsButton.addEventListener('click', () => {
                getDetails(movie.imdbID);
            });
        }
    });
}

// Fetch and display movie details
async function getDetails(id) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=d71901de`);
        const movie = await res.json();
        detailsContainer.classList.remove('hidden');
        detailsContent.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Title:</strong> ${movie.Title}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
        `;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Close movie details view
closeDetailsButton.addEventListener('click', () => {
    detailsContainer.classList.add('hidden');
});

// Open watchlist and display items
watchlistButton.addEventListener('click', () => {
    watchlistContainer.classList.remove('hidden');
    displayWatchlist();
});

// Close watchlist view
closeWatchlistButton.addEventListener('click', () => {
    watchlistContainer.classList.add('hidden');
});

// Add movie to watchlist
function addToWatchlist(movie) {
    if (!watchlist.find(m => m.imdbID === movie.imdbID)) {
        watchlist.push(movie);
        displayWatchlist();
        showNotification(`${movie.Title} added to Watchlist`);
    }
}

// Display watchlist items
function displayWatchlist() {
    watchlistItems.innerHTML = '';
    watchlist.forEach(movie => {
        const item = document.createElement('div');
        item.classList.add('watchlist-item');

        const img = document.createElement('img');
        img.src = movie.Poster;
        img.alt = movie.Title;

        const title = document.createElement('p');
        title.textContent = movie.Title;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-from-watchlist');
        removeButton.addEventListener('click', () => {
            removeFromWatchlist(movie);
        });

        item.append(img, title, removeButton);
        watchlistItems.appendChild(item);
    });
}

// Remove movie from watchlist
function removeFromWatchlist(movie) {
    watchlist = watchlist.filter(m => m.imdbID !== movie.imdbID);
    displayWatchlist();
}

// Show notification for added items
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification-message');
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
