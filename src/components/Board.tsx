import { Piece, Position } from '../types/checkers';
import { Crown } from 'lucide-react';

interface BoardProps {
  board: (Piece | null)[][];
  selectedPiece: Position | null;
  validMoves: Position[];
  onSquareClick: (row: number, col: number) => void;
}

export function Board({ board, selectedPiece, validMoves, onSquareClick }: BoardProps) {
  const isValidMove = (row: number, col: number): boolean => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  const isSelected = (row: number, col: number): boolean => {
    return selectedPiece !== null && selectedPiece.row === row && selectedPiece.col === col;
  };

  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-amber-900 shadow-2xl">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          const isHighlighted = isValidMove(rowIndex, colIndex);
          const selected = isSelected(rowIndex, colIndex);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onSquareClick(rowIndex, colIndex)}
              className={`
                w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer
                transition-all duration-200 relative
                ${isDark ? 'bg-amber-800' : 'bg-amber-100'}
                ${selected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
                ${isHighlighted ? 'ring-4 ring-green-400 ring-inset' : ''}
                hover:brightness-110
              `}
            >
              {isHighlighted && (
                <div className="absolute w-4 h-4 bg-green-400 rounded-full opacity-60 animate-pulse" />
              )}
              {piece && (
                <div
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                    shadow-lg transform transition-transform hover:scale-110
                    ${piece.color === 'red'
                      ? 'bg-gradient-to-br from-red-500 to-red-700 border-4 border-red-900'
                      : 'bg-gradient-to-br from-gray-800 to-gray-950 border-4 border-gray-950'
                    }
                    ${selected ? 'scale-110' : ''}
                  `}
                >
                  {piece.type === 'king' && (
                    <Crown
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${
                        piece.color === 'red' ? 'text-yellow-300' : 'text-yellow-400'
                      }`}
                      fill="currentColor"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
