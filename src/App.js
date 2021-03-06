import './App.css';
import NavBar from './components/NavBar';
import Camera from './components/Camera';
// import logo from './assets/sgLogo.png';
import MainPage from './components/MainPage'
import About from './components/About';
import { Link, BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import { Grommet, Image, Box } from 'grommet';



function App() {
  return (
  <Grommet background='#9FE2BF'>
      <Router>
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={MainPage} />

      </Switch>

    </Router>


  </Grommet>
  )

}

export default App;
