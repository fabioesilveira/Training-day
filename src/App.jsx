import axios from "axios";
import { useEffect, useState } from "react"

export default function App() {
  
  const [players, setPlayers] = useState([]);
  const [searchPlayer, setSearchPlayer] = useState("");

  useEffect(() => {
    async function fetchApi() {
      const req = await axios.get('https://api.sleeper.app/v1/players/nfl')
      const reqArray = Object.values(req.data)
      const fifteenPlayers = reqArray.slice(0, 15)
      setPlayers(fifteenPlayers)
    }
    fetchApi();
  }, [])

  const filteredPlayers = players.filter((e) => `${e.full_name}`.toLowerCase().includes(searchPlayer.toLowerCase()))
  
  return (
    <>
    <input 
      placeholder="enter a player"
      type="text"
      value={searchPlayer}
      onChange={(event) => setSearchPlayer(event.target.value)}
    />
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Age</th>
            <th>Position</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((e) => (
            <tr>
              <td>{e.full_name}</td>
              <td>{e.age}</td>
              <td>{e.position}</td>
              <td>{e.college}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}