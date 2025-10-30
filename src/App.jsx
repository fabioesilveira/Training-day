import axios from "axios"
import { useEffect, useState } from "react"

export default function App() {

  const [data, setData] = useState([]);
  const [searchPlayer, setSearchPlayer] = useState("");

  useEffect(() => {
    try {
      async function fetchApi() {
        const req = await axios.get('https://api.sleeper.app/v1/players/nfl')
        const reqArray = Object.values(req.data)
        const fifteenPlayers = reqArray.slice(0, 15)
        setData(fifteenPlayers)
      }
      fetchApi();
    } catch (error) {
      console.error("we could not fetch the data")
    }
  }, [])

  const filteredPlayers = data.filter((e) => `${e.full_name}`.toLowerCase().includes(searchPlayer.toLowerCase()))

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
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((e) => (
            <tr>
              <td>{e.full_name}</td>
              <td>{e.age}</td>
              <td>{e.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}