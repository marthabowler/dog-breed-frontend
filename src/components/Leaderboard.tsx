import axios from "axios";
import { useEffect, useState } from "react";
import TopThreeDogs from "./TopThree";
import writeDogBreed from "../utils/writeDogName";

interface DogType {
  breed: string;
  votes: number;
}

const apiBaseURL = process.env.REACT_APP_API_BASE;

export default function Leaderboard(): JSX.Element {
  const [top10, setTop10] = useState<DogType[]>([]);

  useEffect(() => {
    getLeaderboard();
  }, []);

  async function getLeaderboard() {
    const data = await axios.get(`${apiBaseURL}leaderboard`);
    setTop10(data.data.data);
    console.log(data);
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col">
          <h1 className="mt-2">🎉 Top ten Doggos 🎉</h1>
        </div>
        <div className="col">
          <div className="buttonDiv">
            <button
              className="btn btn-warning w-75 mt-2"
              onClick={getLeaderboard}
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <table className="table table-primary table-striped h4">
              <thead>
                <tr>
                  <th>Breed</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {top10.map((element, id) => (
                  <tr key={id}>
                    <td>{writeDogBreed(element.breed)}</td>
                    <td>{element.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col topThree">
            <div className="col">
              <h1 className="text-center">Hall of fame</h1>
              <h6 className="text-center">Click on a picture to change it!</h6>
            </div>
            {top10.length === 10 && (
              <TopThreeDogs
                numberOneDog={top10[0].breed}
                numberTwoDog={top10[1].breed}
                numberThreeDog={top10[2].breed}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
