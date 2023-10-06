import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Card from "../components/Card";

const LikePage = () => {
  const [listData, setListData] = useState([]);

  // Recupérer les éléments du localStorage
  useEffect(() => {
    // On récupère les IDs de films stockés dans le localStorage
    let moviesId = JSON.parse(window.localStorage.keyLocalStorage || "[]");

    // On crée un tableau pour stocker les données des films
    let movieData = [];

    // On parcourt les IDs de films et on effectue une requête API pour chaque ID
    const fetchData = async () => {
      for (let i of moviesId) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${i}?api_key=bb72fc0b37e06f289cec812d99c5fb8c`
          );
          movieData.push(response.data);
        } catch (error) {
          console.error(
            `Erreur lors de la récupération des données pour le film avec l'ID ${i}:`,
            error
          );
        }
      }

      // Une fois toutes les données récupérées, on met à jour l'état
      setListData(movieData);
    };

    // Appel de la fonction fetchData pour récupérer les données
    fetchData();
  }, []);

  const removeFromFavorites = (movieId) => {
    // Mettez à jour la liste des favoris sans le film supprimé
    const updatedList = listData.filter((movie) => movie.id !== movieId);
    setListData(updatedList);
    
    // Mettez également à jour le localStorage ici si nécessaire
  };

  return (
    <div>
      <Header />
      <h2>
        Coup de coeur <span>💖</span>
      </h2>
      <div className="form-result">
        {listData.length > 0 ? (
          listData.map((movie) => (
            <Card movie={movie} isFavoritePage={true} key={movie.id} removeFromFavorites={removeFromFavorites}/>
          ))
        ) : (
          <h2> Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default LikePage;
