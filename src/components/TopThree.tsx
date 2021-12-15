import { useEffect, useState } from "react";
import DogPhoto from "./DogPhoto";

export default function TopThreeDogs(props: {
  numberOneDog: string;
  numberTwoDog: string;
  numberThreeDog: string;
}): JSX.Element {
  const [url1, setUrl1] = useState<string>("");
  const [url2, setUrl2] = useState<string>("");
  const [url3, setUrl3] = useState<string>("");

  async function fetchTopThreePhotos(breed: string, index: number) {
    const dogAPI = await fetch(
      `https://dog.ceo/api/breed/${breed.split("-").join("/")}/images/random`
    );
    const jsonBody: DogPhoto = await dogAPI.json();
    switch (index) {
      case 0:
        setUrl1(jsonBody.message);
        break;
      case 1:
        setUrl2(jsonBody.message);
        break;
      case 2:
        setUrl3(jsonBody.message);
        break;
    }
  }

  useEffect(() => {
    fetchTopThreePhotos(props.numberOneDog, 0);
    fetchTopThreePhotos(props.numberTwoDog, 1);
    fetchTopThreePhotos(props.numberThreeDog, 2);
  }, [props]);

  return (
    <>
      {" "}
      <table>
        <tbody>
          <tr>
            <img
              src={url1}
              alt="favourite dog breed"
              onClick={() => fetchTopThreePhotos(props.numberOneDog, 0)}
            />
          </tr>
          <tr>
            <img
              src={url2}
              alt="2nd favourite dog breed"
              onClick={() => fetchTopThreePhotos(props.numberTwoDog, 1)}
            />
          </tr>
          <tr>
            <img
              src={url3}
              alt="3rdfavourite dog breed"
              onClick={() => fetchTopThreePhotos(props.numberThreeDog, 2)}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
}
