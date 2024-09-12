import React from 'react'

export const TVCard = ({tv}) => {
  return (
    <div className="result-card">
        <div className="poster-wrapper">
            {tv.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                alt={`${tv.title} Poster`}
                />
            ) :(
                <div className="filler-poster"></div>
            )}
        </div>

        <div className="info">
            <div className="header">
                <h3 className="title">{tv.name}</h3>
                <h4 className="overview">
                    {tv.overview ? tv.overview.substring(0, 180) + "..." : "-"}
                </h4>
            </div>

            <div className="controls">
                <button className="btn">Add to Watchlist</button>
                <button className="btn">Add to Watched</button>
            </div>
        </div>
    </div>
  )
}
