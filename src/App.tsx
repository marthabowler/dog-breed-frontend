import FetchPhotos from "./components/FetchPhotos";
import Leaderboard from "./components/Leaderboard";

function App(): JSX.Element {
  return (
    <>
      <header>
        <h1 className="text-center">Hecking App of Dank Doggos</h1>
      </header>
      <div className="container">
        <FetchPhotos />
        <Leaderboard />
      </div>
    </>
  );
}

export default App;
