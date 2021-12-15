import FetchPhotos from "./components/FetchPhotos";
import Leaderboard from "./components/Leaderboard";

function App(): JSX.Element {
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-2">Hecking App of Dank Doggos</h1>
        <FetchPhotos />
        <Leaderboard />
      </div>
    </>
  );
}

export default App;
