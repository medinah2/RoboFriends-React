import './App.css';
import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox'
import { render } from '@testing-library/react';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary';

function App() {
  // constructor(){
  //     super()
  //     this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [count, setCount] = useState(0);
  // componentDidMount(){
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(response => response.json())
  //   .then(users => this.setState({robots: users}));
  // }

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setRobots(users));
    console.log(count);
  }, [count]) // only run if count changes

  const onSearchChange = (event) =>{
    setSearchfield(event.target.value);
  }


    // const {robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    if(!robots.length){
      return <h1>Loading</h1>
    } else{
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <button onClick={()=>setCount(count+1)}>Click Me!</button>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
}

export default App;
