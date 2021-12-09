import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash"
import SVG from "react-inlinesvg";
import ReactStars from "react-rating-stars-component";
import InfiniteScroll from "react-infinite-scroll-component";
import * as actions from "../../redux/movies/moviesActions";

// image & icon
import ArrowRight from "../../_assets/icons/arrowRight.svg";
import Image1 from "../../_assets/images/card-img 1.png";
import Image2 from "../../_assets/images/card-img 2.png";
import Image3 from "../../_assets/images/card-img 3.png";

const riting = {
  size: 17,
  activeColor: "white",
  isHalf: true,
  edit: false,
};

const categories = [
  "New Release",
  "TV Show",
  "Popular"
]

export function HomePage({ history }) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();
  const { genres, entities } = useSelector(
    (state) => ({
      genres: state.genres.entities,
      entities: state.movies.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchMovies(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(entities)) {
      setMovies([...movies, entities])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities, dispatch]);

  const fetchMoreData = () => {
    if (page >= 3) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setPage(page + 1);
      dispatch(actions.fetchMovies(page + 1));
    }, 1500);
  };

  return (
    <>
      <div className="container-fluid p-0 mb-15">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Image2} className="carousel-image" alt="cover" />
              <div className="carousel-body container-fluid">
                <span className="carousel-tag mb-5 me-2">Fantasy</span>
                <ReactStars {...riting} value={8 / 2} />
                <div className="carousel-title mt-4">Wonder Woman 1984</div>
                <div className="carousel-label mt-5">A botched store robbery places Wonder Woman in a global battle against a powerful and mysterious ancient force that puts her powers in jeopardy.</div>
                <button className="mt-5">Watch now</button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Image1} className="carousel-image" alt="cover" />
              <div className="carousel-body container-fluid">
                <span className="carousel-tag mb-5 me-2">Science Fiction</span>
                <ReactStars {...riting} value={8 / 2} />
                <div className="carousel-title mt-4">Godzilla vs. Kong</div>
                <div className="carousel-label mt-5">In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.</div>
                <button className="mt-5">Watch now</button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Image3} className="carousel-image" alt="cover" />
              <div className="carousel-body container-fluid">
                <span className="carousel-tag mb-5 me-2">Fantasy</span>
                <ReactStars {...riting} value={8 / 2} />
                <div className="carousel-title mt-4">Zack Snyder's Justice League</div>
                <div className="carousel-label mt-5">Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.</div>
                <button className="mt-5">Watch now</button>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="d-flex flex-column align-items-center spinner">
            <div className="spinner-border spinner-custom" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="mt-4 mb-8">loading more movies for you...</h5>
          </div>
        }
      >
        {
          !isEmpty(movies) && (
            movies.map((category, idx) => (
              <div key={idx}>
                <div className="container-fluid">
                  <div className="d-flex flex-stack mx-4">
                    <h1 className="fw-bolder mb-0">{categories[idx]}</h1>
                    <div className="d-flex align-items-center py-1">
                      <h5 className="fw-bolder text-yellow mb-0 me-5">See All</h5>
                      <SVG src={ArrowRight} ></SVG>
                    </div>
                  </div>
                </div>
                <div className="container-fluid d-flex scroll-custom">
                  {
                    !isEmpty(category) && (
                      category.map((item, idx) => {
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
                                <SVG src={ArrowRight} ></SVG>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )
                  }
                </div>
              </div>
            ))
          )
        }
      </InfiniteScroll>
    </>
  )
}
