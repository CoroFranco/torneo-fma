import './App.css'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import Home from './pages/Home';
import { TeamProvider } from './context/TeamsContext';
import Teams from './pages/Teams';
import TeamDetails from './pages/TeamDetails';


const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/teams', element: <Teams />},
    { path: '/team/:teamId', element: <TeamDetails /> },
  ])

  return routes
}
function App() {

  return (
    <TeamProvider>
    <div className='from-slate-100 to-slate-200 bg-gradient-to-l absolute w-full'>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </div>
    </TeamProvider>
  );
}

export default App
