import { Link } from "react-router-dom";
import { Copa, RightArrow } from "./Icons";

const StandingsTable = () => {
  // Datos de ejemplo de los equipos
  const teams = [
    {
      position: 1,
      name: "Comark FC",
      played: 8,
      wins: 5,
      draws: 2,
      losses: 1,
      goalsFor: 18,
      goalsAgainst: 7,
      logo: "CM"
    },
    {
      position: 2,
      name: "Mackalister",
      played: 8,
      wins: 4,
      draws: 3,
      losses: 1,
      goalsFor: 15,
      goalsAgainst: 8,
      logo: "MK"
    },
    {
      position: 3,
      name: "Los del 8",
      played: 8,
      wins: 4,
      draws: 1,
      losses: 3,
      goalsFor: 12,
      goalsAgainst: 10,
      logo: "L8"
    },
    {
      position: 4,
      name: "MRL United",
      played: 8,
      wins: 3,
      draws: 2,
      losses: 3,
      goalsFor: 11,
      goalsAgainst: 12,
      logo: "MRL"
    },
    {
      position: 5,
      name: "Socios FC",
      played: 8,
      wins: 2,
      draws: 3,
      losses: 3,
      goalsFor: 9,
      goalsAgainst: 11,
      logo: "SFC"
    },
    {
      position: 6,
      name: "Real Amigos",
      played: 8,
      wins: 2,
      draws: 1,
      losses: 5,
      goalsFor: 8,
      goalsAgainst: 14,
      logo: "RA"
    }
  ];

  // Función para calcular puntos
  const calculatePoints = (wins, draws) => wins * 3 + draws;

  // Función para calcular la diferencia de goles
  const calculateGoalDifference = (goalsFor, goalsAgainst) => goalsFor - goalsAgainst;

  return (
    <section className="w-full max-w-7xl mx-auto p-4 m-4">
      <div className ='text-emerald-600 flex place-items-center w-full justify-between'>
        <div className='flex place-items-center gap-2 '>
        <Copa />
      <h2 className="text-black font-bold text-2xl" >Tabla de Posiciones</h2>
        </div>
        <div className='flex place-items-center gap-2'>
          <Link to='/'> Tabla completa </Link>
          <RightArrow/>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Encabezados de la tabla */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 w-16">Pos</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600">Equipo</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600 hidden sm:table-cell">PJ</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600">G</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600">E</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600">P</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600 hidden md:table-cell">GF</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600 hidden md:table-cell">GC</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600 hidden sm:table-cell">DG</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-slate-600">Pts</th>
              </tr>
            </thead>

            {/* Cuerpo de la tabla */}
            <tbody className="divide-y divide-slate-200">
              {teams.map((team, index) => {
                const points = calculatePoints(team.wins, team.draws);
                const goalDifference = calculateGoalDifference(team.goalsFor, team.goalsAgainst);
                
                return (
                  <tr 
                    key={team.name}
                    className={`
                      hover:bg-slate-50 transition-colors
                      ${index === 0 ? 'bg-emerald-50/50' : ''}
                      ${index === teams.length - 1 ? 'border-b-0' : ''}
                    `}
                  >
                    {/* Posición */}
                    <td className="py-3 px-4">
                      <span className={`
                        inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold
                        ${index === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}
                      `}>
                        {team.position}
                      </span>
                    </td>

                    {/* Equipo */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-slate-600">{team.logo}</span>
                        </div>
                        <span className={`font-medium ${index === 0 ? 'text-emerald-700' : 'text-slate-700'}`}>
                          {team.name}
                        </span>
                      </div>
                    </td>

                    {/* Partidos Jugados */}
                    <td className="py-3 px-4 text-center text-sm text-slate-600 hidden sm:table-cell">
                      {team.played}
                    </td>

                    {/* Victorias */}
                    <td className="py-3 px-4 text-center text-sm font-medium text-emerald-600">
                      {team.wins}
                    </td>

                    {/* Empates */}
                    <td className="py-3 px-4 text-center text-sm text-slate-600">
                      {team.draws}
                    </td>

                    {/* Derrotas */}
                    <td className="py-3 px-4 text-center text-sm text-red-500">
                      {team.losses}
                    </td>

                    {/* Goles a Favor */}
                    <td className="py-3 px-4 text-center text-sm text-slate-600 hidden md:table-cell">
                      {team.goalsFor}
                    </td>

                    {/* Goles en Contra */}
                    <td className="py-3 px-4 text-center text-sm text-slate-600 hidden md:table-cell">
                      {team.goalsAgainst}
                    </td>

                    {/* Diferencia de Goles */}
                    <td className="py-3 px-4 text-center text-sm font-medium hidden sm:table-cell">
                      <span className={goalDifference > 0 ? 'text-emerald-600' : 'text-red-500'}>
                        {goalDifference > 0 ? '+' : ''}{goalDifference}
                      </span>
                    </td>

                    {/* Puntos */}
                    <td className="py-3 px-4 text-center">
                      <span className={`font-bold ${index === 0 ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {points}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Leyenda */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
              <span>Clasificación</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>Promoción</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Descenso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandingsTable;
