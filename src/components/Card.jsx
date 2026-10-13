import React from 'react'
import '../styles/Card.css'
import Loading from './MiniComponents/Spinner';


// You can use a local asset or a clean fallback placeholder URL
// const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=No+Image+Available';

const Card = (props) => {
  const { newsData, error, loading } = props;
  console.log("newsData", newsData);
  console.log("errrrr", error);


  const FALLBACK_IMG = "https://placeholdd.cooo/600x400?text=No+Image+Available";
  const handleImageError = (e) => {
    // e.target.onerror = null; // Prevent infinite loop if fallback itself fails
    e.target.src = FALLBACK_IMG;
  };

  return (
    <>
      {
        error ? (
          <h1 className="error-message">Error: Something went wrong.</h1>
        ) :
          loading ? (
            // <h1 className="loading-message">Loading...</h1>
            <Loading />
          ) :
            newsData.length === 0 ? (
              <h1 className="empty-message">There is not such Info.</h1>
            ) : (
              newsData.map((news, index)=>{
                 // L3📗🔖 Media(Image/Video/pdf) EdgeCase Handling
                //  1st EdgeCase: Empty source Handling  -  "" undefined null 0
                //  2nd EdgeCase: source previously exist but not now Handling -   410 htttp error or broken url or 404.


                if (!news.urlToImage) { //1st EdgeCase: Empty source Handling  -  "" undefined null 0    if value is empty Now empty means 3 ways of empty. urlToImage:""  urlToImage:null  urlToImage:undefined  means False so now it become !false and now this become true now compiler go inside when url is not. BASICALLY ! operator solve no url problem. this ! operator is called Logical's NOT operator. NOT operator
                  return null;
                } else {
                  return (
                    <div className='card' key={index}>
                      <div className='card-img'>
                        <img
                          // src={news.urlToImage || FALLBACK_IMAGE}
                          src={news.urlToImage}
                          onError={ handleImageError } //2nd EdgeCase: source previously exist but not now Handling -  410 htttp error.
                          alt="News Image" 
                        />
                      </div>
                      <div className="card-content">
                        <a href={news.url} target="_blank" className='card-title-url'>
                          <p className='card-content-title'>{news.title}</p>
                        </a>
                        <p className='card-content-desc'>{news.description}</p>
                        <button
                          className='btn card-btn-fit'
                          onClick={() => window.open(news.url)}
                        >
                          Read More
                        </button>     
                        {/*  L2📗🔖
                    <a href="url"> </a> tag 
                       OR   
                    window.opne(url)    
                 */}
                        {/* when we use window.open() DOM method ? 
                so when we want some button is clicked then go to particular route, website, url then we use it.  */}
                      </div>
                    </div>
                  )
                }
              })
            )

      }
    </>
  )
}

export default Card;