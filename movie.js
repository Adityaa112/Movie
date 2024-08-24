const YOUTUBE_API_KEY = 'AIzaSyD0rpd_bKKVj70TB76ghnTwXi1pQ9tPPlU'; // Replace with your YouTube API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

async function fetchTrailer(movieTitle) {
    const query = encodeURIComponent(`${movieTitle} trailer`);
    const url = `${YOUTUBE_API_URL}?part=snippet&type=video&q=${query}&key=${YOUTUBE_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId; // Return the video ID of the first trailer found
    } else {
        return null; // No trailer found
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));

    if (movie) {
        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-poster').src = movie.poster_path;
        document.getElementById('movie-rating').textContent = `Rating: ${movie.vote_average}`;
        document.getElementById('movie-overview').textContent = movie.overview;

        // Fetch and display the trailer
        const trailerId = await fetchTrailer(movie.title);
        if (trailerId) {
            const trailerContainer = document.getElementById('trailer-container');
            trailerContainer.innerHTML = `
                <h2>Trailer</h2>
                <iframe width="560" height="315" 
                        src="https://www.youtube.com/embed/${trailerId}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            `;
        } else {
            console.log('No trailer found for this movie.');
        }
    } else {
        document.getElementById('movie-detail').innerHTML = '<p>No movie data found.</p>';
    }
});
