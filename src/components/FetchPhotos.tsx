import { useEffect, useState } from "react";
import DogPhoto from "./DogPhoto";
import { getBreed } from "../utils/getBreed";
import axios from "axios";

const apiBaseURL = process.env.REACT_APP_API_BASE;

export default function FetchPhotos(): JSX.Element {
  const [dogURL1, setDogURL1] = useState<string>("");
  const [dogURL2, setDogURL2] = useState<string>("");

  async function fetchRandomPhotos() {
    const dogAPI = await fetch("https://dog.ceo/api/breeds/image/random");
    const jsonBody: DogPhoto = await dogAPI.json();
    return jsonBody.message;
  }

  async function setPhotos() {
    setDogURL1(await fetchRandomPhotos());
    setDogURL2(await fetchRandomPhotos());
  }

  useEffect(() => {
    async function loadData() {
      setDogURL1(await fetchRandomPhotos());
      setDogURL2(await fetchRandomPhotos());
      await axios.get(`${apiBaseURL}`);
    }

    loadData();
  }, []);

  const breed1 = getBreed(dogURL1);
  const breed2 = getBreed(dogURL2);

  const handleVoteAndChangeDog = async (breed: string) => {
    setPhotos();
    await axios.put(`${apiBaseURL}vote/${breed}`);
  };

  return (
    <div className="row fetch-photos">
      <div className="col">
        <img
          src={dogURL1}
          alt={"#"}
          onClick={() => handleVoteAndChangeDog(breed1)}
        />
      </div>
      <div className="col">
        <img
          src={dogURL2}
          alt={"#"}
          onClick={() => handleVoteAndChangeDog(breed2)}
        />
      </div>
    </div>
  );
}
