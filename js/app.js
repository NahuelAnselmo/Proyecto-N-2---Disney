document.addEventListener('DOMContentLoaded', () => {
    const movies = [
        {
            id: 1,
            title: 'Flamin Hot: El sabor que cambió la historia',
            description: '“Flamin Hot: El sabor que cambió la historia” es la motivadora historia de Richard Montañez, el conserje de Frito Lay quien encausó su herencia mexicana americana para transformar los icónicos Cheetos Flamin’ Hot en una botana que revolucionaría la industria de los alimentos y se convertirian en un fenómeno de la cultura pop mundial.',
            category: 'Comedia-Drama',
            image: 'assets/img/flaminghot.png',
            video: 'https://www.youtube.com/embed/aMjZF6efJMo'
        },
        {
            id: 2,
            title: 'The Acolyte',
            description: 'The Acolyte es un thriller de misterio que nos llevará a una galaxia de oscuros secretos y poderes emergentes del lado oscuro durante los últimos días de la Alta República. La serie sigue a un maestro Jedi que investiga una serie de crímenes que lo llevan a conflicto con un antiguo aprendiz de Padawan y revelan fuerzas siniestras.',
            category: 'Ciencia Ficcion',
            image: 'assets/img/acolyte.png',
            video: 'https://www.youtube.com/embed/SaRizZyJ1vQ'
        }
    ];

    const moviesList = document.getElementById('movies-list');

    if (moviesList) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'col-md-4';
            movieCard.innerHTML = `
                <div class="card">
                <div class="container-fluid">
                    <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.description}</p>
                        <a href="detail.html?id=${movie.id}" class="btn btn-primary">Ver detalles</a>
                    </div>
                </div>
            `;
            moviesList.appendChild(movieCard);
        });
    }

    const movieDetailContainer = document.getElementById('movie-detail');
    if (movieDetailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('id');
        const movie = movies.find(m => m.id == movieId);

        if (movie) {
            movieDetailContainer.innerHTML = `
                <h2>${movie.title}</h2>
                <img src="${movie.image}" class="img-fluid" alt="${movie.title}">
                <p>${movie.description}</p>
                <p><strong>Categoría:</strong> ${movie.category}</p>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="${movie.video}" allowfullscreen></iframe>
                </div>
                <a href="404.html" class="btn btn-danger mt-3">Reproducir</a>
            `;
        } else {
            movieDetailContainer.innerHTML = '<p>Película o serie no encontrada.</p>';
        }
    }
});
