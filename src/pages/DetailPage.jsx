import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgURL, options } from "../constant";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';


const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  // get movie id from url
  const { id } = useParams();

  // get movie data from api
  useEffect(() => {
    axios
      .get(`/movie/${id}?append_to_response=credits,videos&language=en-US`, options)
      .then((res) => setMovie(res.data));
  }, []);



  return (
    <div className="row">
      {!movie ? (
        <div className="container d-flex justify-content-center align-items-center">
          <div className="spinner-border text-danger"></div>
        </div>
      ) : (
        <>
          {/* top */}
          <div className="col-12 banner">
            <img
              className="img img-fluid w-100 h-100"
              src={movie.backdrop_path ? baseImgURL + movie.backdrop_path : baseImgURL + movie.poster_path}
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

          <div className="container p-4 p-md-5">
            {/* left */}
            <div className="col-md-6 mt-4">
              {/* companies */}
              <h3>Yapımcı Şirketler</h3>

              <div className="d-flex flex-wrap gap-4">
                {movie.production_companies.map((i) => (
                  <div key={i.id} className="bg-white rounded p-2 d-flex align-items-center">
                    {i.logo_path ? (
                      <img
                        className="object-fit-contain"
                        width={100}
                        height={50}
                        src={baseImgURL + i.logo_path}
                      />
                    ) : (
                      <span className="company">{i.name}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* languages */}
              <h3 className="mt-4">Konuşulan Diller</h3>

              <div className="d-flex flex-wrap gap-4">
                {movie.spoken_languages.map((i) => (
                  <div key={i.id} className="bg-white rounded p-2 d-flex align-items-center">
                    <span className="company">{i.name}</span>
                  </div>
                ))}
              </div>

              {/* countries */}
              <h3 className="mt-4">Yapımcı Ülkeler</h3>

              <div className="d-flex flex-wrap gap-4">
                {movie.production_countries.map((i) => (
                  <div key={i.id} className="bg-white rounded p-2 d-flex align-items-center">
                    <span className="company">{i.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* right */}
            <div className="col-md-6 mt-4">
              <p className="lead">{movie.overview}</p>

              <p className="fs-5">
                <span>Budget: </span>
                <span className="text-success">{millify(movie.budget)} $</span>
              </p>

              <p className="fs-5">
                <span>Revenue: </span>
                <span className="text-success">{millify(movie.revenue)} $</span>
              </p>
            </div>

            {/* cast list */}
            <div className="col-12 my-3">
              <h2>Casts</h2>

              <Splide
                options={{
                  height: "200px",
                  gap: "10px",
                  pagination: false,
                  autoWidth: true,
                }}
              >
                {movie.credits.cast.map((i) => (
                  <SplideSlide key={i.id}>
                    <div  className="actor-card h-100">
                      <img
                        className="movie"
                        src={
                          i.profile_path
                            ? baseImgURL + i.profile_path
                            : "/default-actor.jpg"
                        }
                      />

                      <p>
                        <span>{i.character}</span>
                        <span>{i.name}</span>
                      </p>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>

            {/* videos */}
            <div className="my-5">
              <h1>Videos</h1>
              <Splide>
                {movie.videos.results.map((video) => (
                  <SplideSlide key={video.id}>
                    <iframe style={{
                      width: "100%",
                      height: "500px"
                    }}
                      src={`https://www.youtube.com/embed/${video.key}`}
                    ></iframe>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
