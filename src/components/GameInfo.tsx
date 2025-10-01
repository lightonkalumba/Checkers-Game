import { PlayerColor, GameMode } from '../types/checkers';
import { Users, Cpu, RotateCcw, Trophy } from 'lucide-react';

interface GameInfoProps {
  currentPlayer: PlayerColor;
  gameMode: GameMode;
  winner: PlayerColor | null;
  onReset: () => void;
  onModeChange: (mode: GameMode) => void;
}

export function GameInfo({ currentPlayer, gameMode, winner, onReset, onModeChange }: GameInfoProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Status</h2>

        {winner ? (
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border-2 border-yellow-400">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-lg font-bold text-gray-800">Game Over!</p>
              <p className="text-gray-700">
                <span className={winner === 'red' ? 'text-red-600' : 'text-gray-900'}>
                  {winner === 'red' ? 'Red' : 'Black'}
                </span> wins!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div
              className={`w-8 h-8 rounded-full ${
                currentPlayer === 'red'
                  ? 'bg-gradient-to-br from-red-500 to-red-700'
                  : 'bg-gradient-to-br from-gray-800 to-gray-950'
              }`}
            />
            <div>
              <p className="text-sm text-gray-600">Current Turn</p>
              <p className="text-lg font-bold text-gray-800">
                {currentPlayer === 'red' ? 'Red' : 'Black'} Player
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Game Mode</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onModeChange('two-player')}
            className={`
              flex items-center justify-center gap-2 p-4 rounded-lg font-semibold
              transition-all duration-200 transform hover:scale-105
              ${
                gameMode === 'two-player'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <Users className="w-5 h-5" />
            2 Players
          </button>
          <button
            onClick={() => onModeChange('computer')}
            className={`
              flex items-center justify-center gap-2 p-4 rounded-lg font-semibold
              transition-all duration-200 transform hover:scale-105
              ${
                gameMode === 'computer'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <Cpu className="w-5 h-5" />
            vs Computer
          </button>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600
                   text-white font-bold py-4 px-6 rounded-xl shadow-lg
                   hover:from-green-600 hover:to-green-700 transition-all duration-200
                   transform hover:scale-105"
      >
        <RotateCcw className="w-5 h-5" />
        New Game
      </button>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">How to Play</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Click a piece to select it, then click a highlighted square to move</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Jump over opponent pieces to capture them</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Reach the opposite end to crown your piece as a king</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Kings can move backward and forward</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>You must capture if a capture move is available</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
