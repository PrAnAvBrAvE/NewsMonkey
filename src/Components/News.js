import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.page}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let paersedData = await data.json();
    props.setProgress(70)
    setArticles(paersedData.articles)
    setTotalResults(paersedData.totalResults)
    setLoading(false)
    console.log(paersedData);
    props.setProgress(100)
  }

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  }, [])    

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey }&page=${page+1}&pageSize=${props.page}`;
    setPage(page+1)
    let data = await fetch(url);
    let paersedData = await data.json();
    setArticles(articles.concat(paersedData.articles))
    setTotalResults(paersedData.totalResults)
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px", marginTop:"90px" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          // loader={<Spinner/>}
        > 
        <div className="container">
          <div className="row">
            {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      // imageurl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }

News.defaultProps = {
  country: "in",
  page: 9,
  category: "eneral",
};


News.propTypes = {
  country: PropTypes.string,
  page: PropTypes.number,
  category: PropTypes.string,
};

export default News;