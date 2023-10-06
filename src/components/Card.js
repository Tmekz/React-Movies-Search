import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ movie, isFavoritePage }) => {
  const [message, setMessage] = useState("Ajouter aux coups de coeur");
  const [genreList, setGenreList] = useState([]);

  // fonction pour formater la date au bon format
  const dateFormater = (date) => {
    //partout ou tu vois un "-" tu casses/divises
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  // fonction pour ajouter au local storage
  const addToLocalStorage = () => {
    // On récupère les données du localStorage et les transforme en tableau (si elles existent)
    let storedData = JSON.parse(window.localStorage.keyLocalStorage || "[]");

    // Si l'ID du film n'est pas déjà dans le tableau, on l'ajoute
    if (!storedData.includes(movie.id)) {
      storedData.push(movie.id);

      // On met à jour le localStorage avec le tableau mis à jour
      window.localStorage.keyLocalStorage = JSON.stringify(storedData);

      setMessage("Ajouté à la liste !💖");
    }
  };

  // fonction pour supprimer du local storage
  const deleteStorage = () => {
    // On récupère les IDs de films stockés dans le localStorage
    let storedData = JSON.parse(window.localStorage.keyLocalStorage || "[]");

    // On filtre les IDs pour retirer celui du film en cours
    let newData = storedData.filter((id) => id !== movie.id);

    // On met à jour le localStorage avec le nouveau tableau d'IDs
    window.localStorage.keyLocalStorage = JSON.stringify(newData);
  };

  // Fonction pour fetcher en ligne les genres au lieu du local
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=bb72fc0b37e06f289cec812d99c5fb8c&language=fr-FR"
      )
      .then((res) => setGenreList(res.data.genres));
  });

  // fonction qui va rechercher si les ID des genres correspondent aux genres fetchés sur TMDB dans leur tableau séparé et  si oui affiche le nom du genre
  const getGenreNames = (genreIds) => {
    if (genreIds && genreList.length > 0) {
      const genreNames = genreIds.map((eachGenre) => {
        const genreObj = genreList.find((genre) => genre.id === eachGenre);
        return genreObj ? genreObj.name : "";
      });
      return genreNames.join(" ");
    } else {
      return ""; // Retourne une chaîne vide si les données ne sont pas disponibles
    }
  };

  useEffect(() => {
    // On récupère les données du localStorage et les transforme en tableau (si elles existent)
    let storedData = JSON.parse(window.localStorage.keyLocalStorage || "[]");

    // On vérifie si l'ID de la carte est présent dans le localStorage
    const isCardInLocalStorage = storedData.includes(movie.id);

    // Si l'ID est présent, mettez à jour le message
    if (isCardInLocalStorage) {
      setMessage("Ajouté à la liste !💖");
    } else {
      setMessage("Ajouter aux coups de coeur");
    }
  }, [movie.id]);

  // OPTION: Fonction pour fetcher les GENRES en local via genreDB.json
  //  const [genreList, setGenreList] = useState([]);
  //   // importe DATA du fichier .json avec liste des genres
  //   useEffect(() => {
  //     setGenreList(genreData);
  //   }, []);
  //   //fonction pour récupérer les genres dans dans genreDB.json
  //   const getGenreNames = (lulu) => {
  //     const genreElements = lulu.map((kaka) => {
  //       if (genreList.length > 0) {
  //         const genreObj = genreList.find((genre) => genre.id === kaka);
  //         return genreObj ? <li key={genreObj.id}>{genreObj.name}</li> : null;
  //       } else {
  //         return null;
  //       }
  //     });
  //     return genreElements;
  //   };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt={`Affiche ${movie.title}`}
      />
      <h2>{movie.title}</h2>
      {movie.release_date ? (
        <h5>Sortie le : {dateFormater(movie.release_date)}</h5>
      ) : null}
      <h4>
        {movie.vote_average.toFixed(1)}/10<span>⭐</span>
      </h4>
      <ul>{getGenreNames(movie.genre_ids)}</ul>
      {movie.overview ? <h3>Synopsis</h3> : ""}
      <p>{movie.overview}</p>

      {isFavoritePage ? (
        <div
          className="btn"
          onClick={() => {
            deleteStorage();
            window.location.reload();
          }}
        >
          Supprimer de la liste
        </div>
      ) : (
        <div className="btn" onClick={() => addToLocalStorage()}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Card;
