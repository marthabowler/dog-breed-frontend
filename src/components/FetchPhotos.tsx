import { useEffect, useState } from "react";
import useSound from "use-sound";
// import writeDogBreed from "../utils/writeDogName";
import dogHowl from "./dogHowl.mp3";

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
        <figure>
          <img
            src={dogURL1}
            alt={"#"}
            onClick={() => handleVoteAndChangeDog(breed1)}
          />
          <figcaption className="text-center">{breed1}</figcaption>
        </figure>
      </div>{" "}
      <div className="col">
        <figure>
          <img
            src={dogURL2}
            alt={"#"}
            onClick={() => handleVoteAndChangeDog(breed2)}
          />
          <figcaption className="text-center">{breed2}</figcaption>
        </figure>
      </div>
    </div>
  );
}
