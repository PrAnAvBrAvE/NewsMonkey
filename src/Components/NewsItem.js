import React from "react";

const NewsItem = (props) => {

    let { title, description, newsUrl, author, date, source } = props; // imageurl
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex', justifyContent:'end', position:'absolute', right:'0'}}> 
              <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          {/* <img src={!imageurl?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg":imageurl} className="card-img-top" alt="..."/> */}
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;