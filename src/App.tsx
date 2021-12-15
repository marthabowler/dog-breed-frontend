import FetchPhotos from "./components/FetchPhotos";
import Leaderboard from "./components/Leaderboard";

function App(): JSX.Element {
  return (
    <>
      <div className="container">
        <FetchPhotos />
        <Leaderboard />
      </div>
    </>
  );
}

export default App;
