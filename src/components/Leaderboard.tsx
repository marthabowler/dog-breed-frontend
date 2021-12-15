import axios from "axios";
import { useEffect, useState } from "react";

interface DogType {
  breed: string;
  votes: number;
}

const apiBaseURL = process.env.REACT_APP_API_BASE;

export default function Leaderboard(): JSX.Element {
  const [top10, setTop10] = useState<DogType[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await axios.get(`${apiBaseURL}leaderboard`);
      setTop10(data.data.data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="row">
      <h2>Top 10 Doggos</h2>
      <table>
        <tr>
          <th>Breed</th>
          <th>Votes</th>
        </tr>
        {top10.map((element, id) => (
          <tr key={id}>
            <td>{element.breed}</td>
            <td>{element.votes}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
