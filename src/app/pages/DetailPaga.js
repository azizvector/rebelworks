import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash"
import SVG from "react-inlinesvg";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import * as actions from "../../redux/movies/moviesActions";

// icon
import IconPlay from "../../_assets/icons/play.svg";
import IconDots from "../../_assets/icons/dots.svg";
import IconArrowRight from "../../_assets/icons/arrowRight.svg"

const riting = {
  size: 17,
  activeColor: "white",
  isHalf: true,
  edit: false,
};

export function DetailPage({
  history,
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { genres, movieDetails, entitiesSimilar } = useSelector(
    (state) => ({
      genres: state.genres.entities,
      movieDetails: state.movies.movieDetails,
      entitiesSimilar: state.movies.entitiesSimilar,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchMoviesSimilar(id));
    dispatch(actions.fetchMovie(id));
  }, [id, dispatch]);

  return (
    <>
      <div className="container-fluid mb-19" style={{ marginTop: "140px" }}>
        {
          !isEmpty(movieDetails) && (
            <div className="d-flex flex-row mx-4">
              <div className="d-flex flex-column">
                <div className="card card-detail">
                  <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} className="card-image" alt="cover" />
                  <div className="card-body">
                    <div className="d-flex flex-wrap">
                      {!isEmpty(movieDetails.genres) && (
                        movieDetails.genres.map((item, idx) => (
                          <span key={idx} className="card-tag mb-3 me-2">{item.name}</span>
                        )))}
                    </div>
                    <div className="d-flex flex-row flex-wrap align-items-center">
                      <ReactStars {...riting} value={movieDetails.vote_average / 2} />
                      <SVG className="ms-2" src={IconDots} ></SVG>
                      <h5 className="fw-normal text-grey mb-0 ms-2">Release Year : {moment(movieDetails.release_date).format("YYYY")}</h5>
                      <p></p>
                    </div>
                    <div className="card-title mt-3">{movieDetails.title}</div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column ms-9">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-9">
                    <h1 className="fw-bolder mb-7">Synopsis</h1>
                    <h5 className="desc-text fw-normal text-grey mb-0">{movieDetails.overview}</h5>
                  </div>
                  <div className="d-flex flex-column white-space-nowrap mt-7">
                    <h5 className="mb-3">Cast</h5>
                    <h5 className="fw-bolder mb-3">Gal Gadot</h5>
                    <h5 className="fw-bolder mb-3">Kristen Wiig</h5>
                    <h5 className="fw-bolder mb-3">Chris Pine</h5>
                    <h5 className="fw-bolder mb-3">Pedro Pascal</h5>
                    <h5 className="text-yellow">more</h5>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <h2 className="fw-bolder my-7">Episodes</h2>
                  <div className="d-flex border-bottom-grey pb-7">
                    <div className="img-play">
                      <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`} alt="eps" className="eps" />
                      <SVG className="play" src={IconPlay} ></SVG>
                    </div>
                    <div className="d-flex flex-column flex-fill ms-5">
                      <div className="d-flex flex-stack">
                        <h3 className="fw-bolder mb-0">{movieDetails.original_title}</h3>
                        <h5 className="fw-normal text-grey mb-0">{movieDetails.runtime} minutes</h5>
                      </div>
                      <h5 className="fw-normal text-grey mt-4 mb-0">{movieDetails.tagline}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div className="container-fluid">
        <div className="d-flex flex-stack mx-4">
          <h1 className="fw-bolder mb-0">You Might Also Like This!</h1>
          <div className="d-flex align-items-center py-1">
            <h5 className="fw-bolder text-yellow mb-0 me-5">See All</h5>
            <SVG src={IconArrowRight} ></SVG>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex scroll-custom">
        {
          !isEmpty(entitiesSimilar) && (
            entitiesSimilar.map((item, idx) => {
              const genresfiltered = genres.filter((genre) => item.genre_ids.indexOf(genre.id) !== -1);
              return (
                <div className="card mx-4 mt-8 mb-10" key={idx} onClick={() => history.push(`/movies/${item.id}`)}>
                  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="card-image" alt="cover" />
                  <div className="card-body">
                    <div className="d-flex flex-wrap">
                      {!isEmpty(genresfiltered) && (genresfiltered.map((genre, idx) => (
                        <span key={idx} className="card-tag mb-3 me-2">{genre.name}</span>
                      )))}
                    </div>
                    <ReactStars {...riting} value={item.vote_average / 2} />
                    <div className="card-title mt-3">{item.title}</div>
                    <div className="card-label">
                      <span className="me-4">Watch now</span>
                      <SVG src={IconArrowRight} ></SVG>
                    </div>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </>
  )
}
