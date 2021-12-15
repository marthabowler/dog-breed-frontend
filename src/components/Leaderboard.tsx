import axios from "axios";
import { useEffect, useState } from "react";
import TopThreeDogs from "./TopThree";

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

  async function getLeaderboard() {
    const data = await axios.get(`${apiBaseURL}leaderboard`);
    setTop10(data.data.data);
    console.log(data);
  }

  return (
    <div className="row mt-5">
      <div className="col">
        <h1>🎉 Top 10 Doggos 🎉</h1>
        <button
          className="mt-2 btn btn-outline-warning"
          onClick={getLeaderboard}
        >
          Refresh
        </button>

        <table className="table table-bordered h4 mt-5">
          <thead>
            <tr>
              <th>Breed</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {top10.map((element, id) => (
              <tr key={id}>
                <td>{element.breed}</td>
                <td>{element.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col topThree">
        {top10.length === 10 && (
          <TopThreeDogs
            numberOneDog={top10[0].breed}
            numberTwoDog={top10[1].breed}
            numberThreeDog={top10[2].breed}
          />
        )}
      </div>
    </div>
  );
}
