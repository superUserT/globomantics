import { useEffect, useState, useMemo } from 'react'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import SearchResultsRow from '../search-results/search-results-row';
import HouseFilter from './house-filter';

function App() {
  //declaring an array containing state value and setting of thart state
const [allHouses, setAllHouses] = useState([]);

  //A hook used to fetch data from the houses.json on the first render 
  useEffect(() => {
    const fetchHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses(); 
  }, []); 

  //using a cache store the initial state of the fucntion then
  //show featured hosue functionality, create an index of houses using house length then usign the math floor, random library
  //to select a random index which is tied to a house.
 const featuredHouse = useMemo(() => {
  if (allHouses.length) {
    const randomIndex = Math.floor(Math.random() * allHouses.length);
    return allHouses[randomIndex];
  }
  }, [allHouses]);

  
 

  

  return (
    <Router>
    <div className='container'>
      <Header subtitle="Providing Affordable housing in South Africa" />
      <HouseFilter allHouses={allHouses} />
      <Switch>
        <Route path="/searchresults/:country">
          <SearchResultsRow allHouses={allHouses} />
        </Route>
        <Route path="/">
          <FeaturedHouse house={featuredHouse}></FeaturedHouse>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
