import '../App.css'
import Header from "../components/Header";
import GeneralInfo from "../components/GeneralInfo";
import Slider from '../components/Slider';
import { Calendar, Copa, RightArrow } from '../components/Icons';
import { Link } from 'react-router-dom';
import NextGames from '../components/NextGames';
import StandingsTable from '../components/StandingsTable';
import Footer from '../components/Footer';



export default function Home () {

  return(
    <div className="h-full">
      <Header>COPA DE FÚTBOL MÁS QUE AMIGOS</Header>
      <GeneralInfo />
      <Slider />
      <NextGames />
      <StandingsTable />
      <Footer />
    </div>

  )
}
