import axios from "axios";
import { useEffect, useState } from "react"

export default function App() {

  type Players = {
    player_id: "string",
    full_name: "string",
    age: "string",
    college: "string",
    position: "string"
  }

  const [players, setPlayers] = useState<Players[]>([]);
  const [searchPlayers, setSearchPlayers] = useState("");

  useEffect(() => {
    try {
      async function fetchApi() {
        const req = await axios.get("https://api.sleeper.app/v1/players/nfl")
        const reqArray = Object.values(req.data) as Players[]
        const fifteenPlayers = reqArray.slice(0, 15)
        setPlayers(fifteenPlayers)
      }

      fetchApi();
    } catch (error) {
      console.error("error to fetch the Api")
    }
  }, [])

  const filteredPlayers = players.filter((e) => `${e.full_name}`.toLowerCase().includes(searchPlayers.toLowerCase()))

  return (
    <>
      <input
        type="text"
        placeholder="enter a player.."
        value={searchPlayers}
        onChange={(event) => setSearchPlayers(event.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Players</th>
            <th>Age</th>
            <th>Position</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((e) => (
            <tr key={e.player_id}>
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