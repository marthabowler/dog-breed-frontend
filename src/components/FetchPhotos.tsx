import { useEffect, useState } from "react";
import DogPhoto from "./DogPhoto";
import { getBreed } from "../utils/getBreed";
import axios from "axios";

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
    async function setPhotos() {
      setDogURL1(await fetchRandomPhotos());
      setDogURL2(await fetchRandomPhotos());
    }
    setPhotos();
  }, []);

  const breed1 = getBreed(dogURL1);
  const breed2 = getBreed(dogURL2);

  const apiBaseURL = process.env.REACT_APP_API_BASE;

  const handleVoteAndChangeDog = async (breed: string) => {
    setPhotos();
    await axios.put(`${apiBaseURL}vote/${breed}`);
  };

  return (
    <>
      <button>
        <img
          src={dogURL1}
          alt={"#"}
          onClick={() => handleVoteAndChangeDog(breed1)}
        />
      </button>
      <button>
        <img
          src={dogURL2}
          alt={"#"}
          onClick={() => handleVoteAndChangeDog(breed2)}
        />
      </button>
    </>
  );
}
