// import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Detail from './pages/pokemondetail';

function App() {
  return (
    <div>
      <div className="col-sm-9 col-md-7 col-lg-8 mx-auto">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/pokemondetail/:name' exact component={Detail} />
        </Switch>
      </div>
    </div>
  );
}

export default App;