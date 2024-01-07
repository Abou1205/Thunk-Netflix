import { useSelector } from "react-redux"
import { baseImgURL } from "../constant"
import Loading from "./Loading"


const Hero = () => {

    const state = useSelector((store) => store.movie)
    
    // create number between 0-20
    const i = Math.round(Math.random() * state.popularMovies.length)
    // acces the movie
    const randomMovie = state.popularMovies[i]


  return (
    <div className="hero row p-4">
        {/* loading state*/}
        {!randomMovie ? (
            <Loading /> 
        ) : (
            <>
                <div className="col-md-6 d-flex flex-column gap-3 align-items-center justify-content-center">
                    <h1>{randomMovie.title}</h1>
                    <p className="text-start">{randomMovie.overview}</p>
                    <p>
                        <span>IMDB:</span>
                        <span className="text-warning px-2">{randomMovie.vote_average.toFixed(2)}</span>
                    </p>

                    <div className="d-flex gap-3">
                        <button className="btn btn-danger">Filmi İzle</button>
                        <button className="btn btn-info">Listeye Ekle</button>
                    </div>
                </div>

                <div className="col-md-6">
                    <img src={baseImgURL + randomMovie.backdrop_path} className="img-fluid rounded shadow my-4" />
                </div>
            </>
        )}
    </div>
  )
}

export default Hero