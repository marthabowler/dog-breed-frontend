import { useEffect, useState } from "react";
import DogPhoto from "./DogPhoto";
import { getBreed } from "../utils/getBreed";

export default function FetchPhotos(): JSX.Element {
  const [dogURL1, setDogURL1] = useState<string>("");
  const [dogURL2, setDogURL2] = useState<string>("");

  async function fetchRandomPhotos() {
    const dogAPI = await fetch("https://dog.ceo/api/breeds/image/random");
    const jsonBody: DogPhoto = await dogAPI.json();
    return jsonBody.message;
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

  const handleVote = (breed: string) => {
    console.log(breed);
    // add fetch with PUT to add 1 to vote
  };

  return (
    <>
      <button>
        <img src={dogURL1} alt={"#"} onClick={() => handleVote(breed1)} />
      </button>
      <button>
        <img src={dogURL2} alt={"#"} onClick={() => handleVote(breed2)} />
      </button>
    </>
  );
}
