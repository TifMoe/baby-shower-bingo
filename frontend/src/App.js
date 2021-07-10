import Name from './components/Name'
import Board from './components/Board'
import { GameContextProvider } from "./components/GameContext";
import './App.css';

function App() {
  return (
    <GameContextProvider>
      <div className="App">
        <Name />
        <Board />
      </div>
    </GameContextProvider>
  );
}

export default App;
