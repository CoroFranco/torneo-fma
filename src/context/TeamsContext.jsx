import { createContext, useEffect, useState } from "react";

export const TeamsContext = createContext();

export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const savePlayer = async (player) => {
    setIsLoading(true);
    try {
      const playerToSave = {
        nombre: player.nombre,
        posicion: player.posicion,
        edad: Number(player.edad),
        dorsal: Number(player.dorsal),
        idEquipo: Number(player.idEquipo)
      };
      const playerResponse = await fetch('http://localhost:8080/api/jugadores',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerToSave)
    })
    if (!playerResponse.ok) {
      throw new Error(`Error al guardar el jugador: ${playerResponse.status} - ${playerResponse.statusText}`);
    }


    
    await getTeams();
    return playerResponse.json()
    } catch (err) {
      console.error("Error guardando datos:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener todos los equipos
  const getTeams = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/equipos");
      const teamsF = await response.json();
      setTeams(teamsF);
    } catch (error) {
      console.error("Error al obtener equipos:", error);
    }
  };

  // Efecto para cargar los equipos al iniciar
  useEffect(() => {
    getTeams();
  }, []);

  // Función para guardar un nuevo equipo
  const saveTeam = async (teamData) => {
    setIsLoading(true);
    try {
      // 1. Primero guardamos el equipo
      const teamToSave = {
        nombre: teamData.nombre,
        directorTecnico: teamData.directorTecnico,
        imagenUrl: teamData.imagenUrl,
        titulos: Number(teamData.titulos)
      };
      
      const teamResponse = await fetch('http://localhost:8080/api/equipos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamToSave),
      });
      
      if (!teamResponse.ok) {
        throw new Error(`Error al guardar equipo: ${teamResponse.status} - ${teamResponse.statusText}`);
      }
      
      const savedTeam = await teamResponse.json();
      const teamId = savedTeam.id; // Asumiendo que la API devuelve el ID del equipo creado
      console.log(savedTeam)
      // 2. Luego guardamos los jugadores uno por uno
      if (teamData.jugadores && teamData.jugadores.length > 0) {
        for (let player of teamData.jugadores) {
          const playerToSave = {
            nombre: player.nombre,
            posicion: player.posicion,
            edad: Number(player.edad),
            dorsal: Number(player.dorsal),
            idEquipo: Number(teamId)
          };
          console.log(playerToSave)
          
          const playerResponse = await fetch('http://localhost:8080/api/jugadores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerToSave),
          });
          
          if (!playerResponse.ok) {
            throw new Error(`Error al guardar jugador ${player.nombre}: ${playerResponse.status}`);
          }
        }
      }
      
      // 3. Refrescar la lista de equipos
      await getTeams();
      
      return savedTeam;
    } catch (err) {
      console.error("Error guardando datos:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar un equipo
  const deleteTeam = async (teamId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/equipos/${teamId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error al eliminar equipo: ${response.status}`);
      }
      
      // Actualizar la lista de equipos
      setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
      
      return true;
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TeamsContext.Provider value={{ 
      teams, 
      setTeams, 
      isLoading, 
      getTeams, 
      saveTeam,
      deleteTeam,
      savePlayer 
    }}>
      {children}
    </TeamsContext.Provider>
  );
}
