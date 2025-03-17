import { createContext, useEffect, useState } from "react";

export const TeamsContext = createContext()

export function TeamProvider ({children}) {
    const [teams, setTeams] = useState([])
    useEffect(() => {
      const getTeams = async () => {
        const response = await fetch("http://localhost:8080/api/equipos");
        const teamsF = await response.json();
    
        console.log("Datos recibidos en el frontend:", teamsF);
    
        setTeams(teamsF);
      };
      getTeams();
    }, []);
    return (
      <TeamsContext value={{teams}}>
        {children}
      </TeamsContext>
    )
}
