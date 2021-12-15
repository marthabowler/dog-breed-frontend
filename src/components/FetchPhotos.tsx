import { useEffect, useState } from "react";
import useSound from "use-sound";
// declare module "*.mp3";
import dogHowl from "./dogHowl.mp3";
// import dogHowl from "./Dog Howling At Moon-SoundBible.com-1369876823.mp3"
// import src_sounds_A4 from "./src_sounds_A4.wav";

import DogPhoto from "./DogPhoto";
import { getBreed } from "../utils/getBreed";
import axios from "axios";

const apiBaseURL = process.env.REACT_APP_API_BASE;

export default function FetchPhotos(): JSX.Element {
  const [dogURL1, setDogURL1] = useState<string>("");
  const [dogURL2, setDogURL2] = useState<string>("");
  const [play] = useSound(dogHowl);

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
    play();
    await axios.put(`${apiBaseURL}vote/${breed}`);
  };

  return (
    <div className="row fetch-photos">
      <h3>Vote for your favourite of the two breeds:</h3>
      <div className="col">
        <img
          src={dogURL1}
          alt={"#"}
          onClick={() => handleVoteAndChangeDog(breed1)}
        />
      </div>{" "}
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
