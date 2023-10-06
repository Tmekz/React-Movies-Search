import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  //boite qui va recevoir les data du fetch
  const [moviesData, setMoviesData] = useState([]);

  //boite qui va recevoir le filtre top > flop ou inverse
  const [sort, setSort] = useState(null);

  //boite qui va adapté l'url en fonction du fetch initial je souhaite afficher les "films populaires" puis lors de recherche avec input texte nouveau fetch car different url
  const [searchUrl, setSearchUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=bb72fc0b37e06f289cec812d99c5fb8c"
  );

  useEffect(() => {
    axios.get(searchUrl).then((res) => setMoviesData(res.data.results));
  }, [searchUrl]);

  //Permet au click du bouton "rechercher" de lancer le fetch avec axios en fonction de ce qui est tappé dans l'input
  const handleSearchClick = (e) => {
    e.preventDefault();
    const inputText = document.getElementById("search-input");
    const inputValue = inputText.value;

    if (inputValue === "") {
      setSearchUrl(
        "https://api.themoviedb.org/3/movie/popular?api_key=bb72fc0b37e06f289cec812d99c5fb8c"
      );
    } else {
      setSearchUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=bb72fc0b37e06f289cec812d99c5fb8c&query=${inputValue}&language=fr-FR`
      );
    }
  };

  return (
    <div className="form-component">
      <div className="form-main">
        <form>
          <input
            type="text"
            id="search-input"
            placeholder="Entrez le titre d'un film"
            //si l'on veut lancer rechercher à chaque nouvelle lettre écrite
            // onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" onClick={handleSearchClick} />
        </form>
        <div className="input-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSort("goodToBad")}
          >
            Top <span>&uarr;</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSort("badToGood")}
          >
            Flop <span>&darr;</span>
          </div>
        </div>
      </div>
      <div className="form-result">
        {moviesData.length === 0 ? (
          <p id="notFound">Aucun résultat trouvé</p>
        ) : (
          moviesData
            .slice(0, 12)
            .sort((a, b) => {
              if (sort === "goodToBad") {
                return b.vote_average - a.vote_average;
              } else if (sort === "badToGood") {
                return a.vote_average - b.vote_average;
              } else {
                return b.vote_average - a.vote_average;
              }
            })

            .map((film) => (
              //en orange donc "movie" est le paramètre à rappeler dans l'enfant pour acceder aux données du fetch + isFavoritePage est la pour conditionner l'affichage en fonction de la page home ou coup de coup pour le bouton 
              <Card movie={film} isFavoritePage={false} key={film.id} />
            ))
        )}
      </div>
    </div>
  );
};

export default Form;
