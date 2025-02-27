import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';

function App() {

  return (
    <div className='from-slate-100 to-slate-200 bg-gradient-to-l absolute w-full'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App
