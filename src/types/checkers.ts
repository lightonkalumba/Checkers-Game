export type PieceType = 'regular' | 'king';
export type PlayerColor = 'red' | 'black';
export type GameMode = 'computer' | 'two-player';

export interface Piece {
  color: PlayerColor;
  type: PieceType;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
  captured?: Position[];
}

export interface GameState {
  board: (Piece | null)[][];
  currentPlayer: PlayerColor;
  selectedPiece: Position | null;
  validMoves: Position[];
  gameMode: GameMode;
  winner: PlayerColor | null;
  mustCapture: boolean;
}
