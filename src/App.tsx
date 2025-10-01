import { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import { GameState, GameMode, Position } from './types/checkers';
import {
  initializeBoard,
  getValidMoves,
  makeMove,
  hasMoreCaptures,
  checkWinner,
  getAllCaptureMoves,
} from './utils/gameLogic';
import { getComputerMove } from './utils/computerAI';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    currentPlayer: 'red',
    selectedPiece: null,
    validMoves: [],
    gameMode: 'two-player',
    winner: null,
    mustCapture: false,
  });

  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [pendingCapture, setPendingCapture] = useState<Position | null>(null);

  useEffect(() => {
    const captures = getAllCaptureMoves(gameState.board, gameState.currentPlayer);
    setGameState(prev => ({ ...prev, mustCapture: captures.length > 0 }));
  }, [gameState.board, gameState.currentPlayer]);

  useEffect(() => {
    if (
      gameState.gameMode === 'computer' &&
      gameState.currentPlayer === 'black' &&
      !gameState.winner &&
      !isComputerThinking
    ) {
      setIsComputerThinking(true);
      setTimeout(() => {
        const move = getComputerMove(gameState.board);
        if (move) {
          executeMove(move.from, move.to);
        }
        setIsComputerThinking(false);
      }, 500);
    }
  }, [gameState.currentPlayer, gameState.gameMode, gameState.winner, isComputerThinking]);

  const executeMove = (from: Position, to: Position) => {
    const { newBoard, captured } = makeMove(gameState.board, from, to);

    if (captured.length > 0 && hasMoreCaptures(newBoard, to)) {
      setPendingCapture(to);
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        selectedPiece: to,
        validMoves: getValidMoves(newBoard, to, true).captures.map(c => c.to),
        mustCapture: true,
      }));
    } else {
      setPendingCapture(null);
      const winner = checkWinner(newBoard);
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'red' ? 'black' : 'red',
        selectedPiece: null,
        validMoves: [],
        winner,
      }));
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameState.winner) return;
    if (isComputerThinking) return;
    if (gameState.gameMode === 'computer' && gameState.currentPlayer === 'black') return;

    const clickedPiece = gameState.board[row][col];
    const isValidMoveTarget = gameState.validMoves.some(
      move => move.row === row && move.col === col
    );

    if (pendingCapture) {
      if (isValidMoveTarget) {
        executeMove(pendingCapture, { row, col });
      }
      return;
    }

    if (isValidMoveTarget && gameState.selectedPiece) {
      executeMove(gameState.selectedPiece, { row, col });
    } else if (clickedPiece && clickedPiece.color === gameState.currentPlayer) {
      const { moves, captures } = getValidMoves(
        gameState.board,
        { row, col },
        gameState.mustCapture
      );

      const validMovePositions = gameState.mustCapture
        ? captures.map(c => c.to)
        : [...moves, ...captures.map(c => c.to)];

      setGameState(prev => ({
        ...prev,
        selectedPiece: { row, col },
        validMoves: validMovePositions,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedPiece: null,
        validMoves: [],
      }));
    }
  };

  const handleReset = () => {
    setGameState({
      board: initializeBoard(),
      currentPlayer: 'red',
      selectedPiece: null,
      validMoves: [],
      gameMode: gameState.gameMode,
      winner: null,
      mustCapture: false,
    });
    setPendingCapture(null);
    setIsComputerThinking(false);
  };

  const handleModeChange = (mode: GameMode) => {
    setGameState({
      board: initializeBoard(),
      currentPlayer: 'red',
      selectedPiece: null,
      validMoves: [],
      gameMode: mode,
      winner: null,
      mustCapture: false,
    });
    setPendingCapture(null);
    setIsComputerThinking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Checkers
          </h1>
          <p className="text-blue-200 text-lg">
            Classic strategy game
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-shrink-0">
            <Board
              board={gameState.board}
              selectedPiece={gameState.selectedPiece}
              validMoves={gameState.validMoves}
              onSquareClick={handleSquareClick}
            />
            {isComputerThinking && (
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-semibold animate-pulse">
                  Computer is thinking...
                </p>
              </div>
            )}
          </div>

          <div className="w-full lg:w-96">
            <GameInfo
              currentPlayer={gameState.currentPlayer}
              gameMode={gameState.gameMode}
              winner={gameState.winner}
              onReset={handleReset}
              onModeChange={handleModeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
