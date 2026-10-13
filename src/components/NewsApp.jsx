import { useEffect, useState } from "react";
import Card from "./Card"
import '../styles/NewsApp.css'
import { MdCancel } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const API_KEY = "7f39e09a901648a99c56d7a15a9e4f88";

const NewsApp = () => {
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState([]);

    const [error, setError] = useState(false)             //! API EdgeCase 1st: Error handling
    const [loading, setLoading] = useState(false)         //! API EdgeCase 2nd: Loading handling
    newsData.length === 0                                 //! API EdgeCase 3rd: Empty Data handling                                           //in Empty data case can be any of them "" [] {} undefined null

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getAPIData = async (searchTerm) => {
        try {
            setLoading(true)
            const response = await fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${API_KEY}`)
            const data = await response.json();
            // console.log(data);
            console.log(data.articles);
            setLoading(false)


            //📗🔖Explicity handle HTTP errors and Explicity throw error to error{} block. LIKE 400, 401
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`)
            }
            setNewsData(data.articles); // once get data from API then Store it.

        } catch (error) {
            console.log("ERROR🔴:-", error);
            //    console.log("ERROR:-", error.name);
            //    console.log("ERROR:-", error.message);
            setError(true)
        }
    };

    // How get input from input element
    const handleSearchInput = (e) => {
        console.log(e.target.value); // real time input getting
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        getAPIData(search);

        setSearch("");

        setIsSidebarOpen(false);
    };


    // How get input from categories button 
    const handleSearchCategory = (e) => {
        const searchTerm = e.currentTarget.innerText;

        getAPIData(searchTerm);

        setIsSidebarOpen(false);
    }

    useEffect(() => {
        getAPIData("Hindustan Aeronautics Limited");
    }, [])

    // 📗🔖in Vanilla JavaScript 
    // window.addEventListener("load", ()=>{
    //     getData();
    // })

    const handleSidebar = () => {

        setIsSidebarOpen((prev) => {
            return !prev;
        });
    };

    return (
        <div>
            <header>
                <div className="brandLogo">
                    <h1 onClick={() => window.location.reload()} >News247</h1>
                    {/* L3📗🔖
                           <a href="/"> </a> tag note / we can still forward slash use when we dont have routes no problem. it means here just stay on current
                              OR   
                           window.location.reload()    
                      */}
                    {/* when we use window.location.reload() BOM method ? 
                        so when we want some button/Element is clicked then website is reload then we use it.  */}
                </div>

                <nav className={isSidebarOpen ? "sidebar-open" : "sidebar-close"}>
                    <ul className="navbar-categories">
                        <li onClick={handleSearchCategory} >Trending News</li>
                        <li onClick={handleSearchCategory} >Live News</li>
                    </ul>
                    {/* ================ Form gets submited in 2 ways ================ */}
                    {/* NOTE: in the End we run a function which send form's data to server/other file.  */}

                    {/* --------- 1. form is submitted via onClick={} eventListner  --------- */}

                    {/* <div className="navbar-search">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchInput}
                            placeholder="Search News"
                        />
                        <button
                            className="btn"
                            // onClick={() => getAPIData(search)} 
                            //  or
                            onClick={handleSearchSubmit}
                        >
                            Search
                        </button>
                    </div> */}

                    {/* --------- 2. form is submitted via onSubmit={} eventListner  --------- */}
                    {/*  ------------ or ------------  */}
                    <form onSubmit={handleSearchSubmit} className="navbar-search">
                        <input
                            type="text"
                            placeholder="Search News"
                            onChange={handleSearchInput}
                            value={search} //📗🔖 so that input element can be empty by Levrage its value={} attribute
                        />

                        <button type="submit" className="btn">
                            Search
                        </button>
                    </form>
                </nav>

                {/* <div className="header-menu-and-close-Icons-container">
                    {isSidebarOpen ||
                        <GiHamburgerMenu
                            className="menu-btn"
                            onClick={handleSidebar}
                        />
                    }
                    {isSidebarOpen && (
                        <MdCancel
                            className="close-btn"
                            onClick={handleSidebar}
                        />
                    )}
                </div> */}
                {/* --------------- or --------------- */}
                <div className="header-menu-and-close-Icons-container">
                    {!isSidebarOpen && (
                        <GiHamburgerMenu
                            className="menu-btn"
                            onClick={handleSidebar}
                        />
                    )}
                    {isSidebarOpen && (
                        <MdCancel
                            className="close-btn"
                            onClick={handleSidebar}
                        />
                    )}
                </div>
                {/* --------------- or ---------------*/}
                {/* {isSidebarOpen ? (
                    <MdCancel
                        className="close-btn"
                        onClick={handleSidebar}
                    />
                ) : (
                    <GiHamburgerMenuF
                        className="menu-btn"
                        onClick={handleSidebar}
                    />
                )} */}
            </header>

            <section>
                <p className="top-tagline">
                    Stay Update with News247
                </p>
            </section>

            <section className="categories-btn-container">
                <button
                    className="btn"
                    onClick={handleSearchCategory}
                >
                    Sports
                </button>
                <button
                    className="btn"
                    onClick={handleSearchCategory}
                >
                    Politics
                </button>
                <button
                    className="btn"
                    onClick={handleSearchCategory}
                >
                    Entertainment
                </button>
                <button
                    className="btn"
                    onClick={handleSearchCategory}
                >
                    Health
                </button>
                <button
                    className="btn"
                    onClick={handleSearchCategory}
                >
                    EdTech
                </button>
            </section>

            <section className="card-container">
                <Card newsData={newsData} error={error} loading={loading} />
            </section>
        </div>
    )
}

export default NewsApp