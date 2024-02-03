import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getPopular } from "../redux/actions/movieAction";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";

const MainPage = () => {
  const state = useSelector((store) => store.genre);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopular());
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <Hero />
      {state.isLoading ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : state.isError ? (
        <p>Sorry, there is something wrong...</p>
      ) : (
        state.genres.map((genre) => <MovieList genre={genre} key={genre.id} />)
      )}
    </div>
  );
};

export default MainPage;
