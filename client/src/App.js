import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Landing from './components/Landing/Landing.jsx'
import CreatePokemon from './components/CeatePokemon/CreatePokemon.jsx'
import Detail from './components/CardDetail/CardDetail.jsx'
import Error404 from './components/Error404/Error404.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>} />
        
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path='/create' element={<CreatePokemon/>}/> 

        <Route path='/error404' element={<Error404/>} />
        <Route path='*' element={<Error404/>} />
      </Routes>
    </div>
  );
}

export default App;
