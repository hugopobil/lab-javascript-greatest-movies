// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies, so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map((movie) => movie.director)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const director = 'Steven Spielberg'
    const genre = 'Drama'
    return moviesArray.filter((movie) => movie.director === director
        && movie.genre.includes(genre)).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    let total = 0
    let count = moviesArray.length

    if (count === 0) {return 0}

    for (let movie of moviesArray) {
        if (movie.score > 0) {
          total += movie.score
        }
    }
    return ((parseFloat((total / count).toFixed(2))))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let count = moviesArray.length
  if (count === 0) {return 0}

  const newArray = moviesArray.filter((movie) => movie.genre.includes("Drama"))
  return scoresAverage(newArray)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const newArray = moviesArray.sort(function (a, b) {return a.year - b.year})
  return JSON.parse(JSON.stringify(newArray))
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let titles = []
  for (let movie of moviesArray) {
    titles.push(movie.title)
  }
  return titles.sort().slice(0, 20)

  // alternativa de filtrar por año
  // ordenar los que el count sea > 1 para un año en concreto
  // generar un nuevo array de resultados ordenador por año

}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((movie) => {

    if (movie.duration.split(" ").length > 1) {
      return {
        title: movie.title,
        year: movie.year,
        director: movie.director,
        duration: Number(movie.duration.split(" ")[0].match(/\d+/g)) * 60
            + Number(movie.duration.split(" ")[1].match(/\d+/g)),
        genre: movie.genre,
        score: movie.score
      }
    } else {
      return {
        title: movie.title,
        year: movie.year,
        director: movie.director,
        duration: Number(movie.duration.split(" ")[0].match(/\d+/g)) * 60,
        genre: movie.genre,
        score: movie.score
      }
    }
  })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {return null}

  const years = []
  for (let movie of moviesArray) {years.push(String(movie.year))}

  const years_clean = years.filter((valor, indice, array) =>
      array.indexOf(valor) === indice)

  const results = {}
  for (let year of years_clean) {
    results[year] = scoresAverage(moviesArray.filter((movie) => movie.year === Number(year)))
  }

  let valorMaximo = -Infinity;
  let claveMaxima = null;

  for (const clave in results) {
    if (results.hasOwnProperty(clave)) {
      const valor = results[clave];
      if (typeof valor === 'number' && valor > valorMaximo) {
        valorMaximo = valor;
        claveMaxima = clave;
      }
    }
  }

  return `The best year was ${claveMaxima} with an average score of ${valorMaximo}`
}
