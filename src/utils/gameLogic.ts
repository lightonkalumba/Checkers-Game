import { Piece, Position, Move, PlayerColor, GameState } from '../types/checkers';

export const BOARD_SIZE = 8;

export function initializeBoard(): (Piece | null)[][] {
  const board: (Piece | null)[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { color: 'black', type: 'regular' };
      }
    }
  }

  for (let row = 5; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { color: 'red', type: 'regular' };
      }
    }
  }

  return board;
}

export function isValidPosition(pos: Position): boolean {
  return pos.row >= 0 && pos.row < BOARD_SIZE && pos.col >= 0 && pos.col < BOARD_SIZE;
}

export function getValidMoves(
  board: (Piece | null)[][],
  position: Position,
  mustCapture: boolean
): { moves: Position[]; captures: Move[] } {
  const piece = board[position.row][position.col];
  if (!piece) return { moves: [], captures: [] };

  const captures: Move[] = [];
  const regularMoves: Position[] = [];

  const directions =
    piece.type === 'king'
      ? [
          { row: -1, col: -1 },
          { row: -1, col: 1 },
          { row: 1, col: -1 },
          { row: 1, col: 1 },
        ]
      : piece.color === 'red'
      ? [
          { row: -1, col: -1 },
          { row: -1, col: 1 },
        ]
      : [
          { row: 1, col: -1 },
          { row: 1, col: 1 },
        ];

  for (const dir of directions) {
    const newPos = {
      row: position.row + dir.row,
      col: position.col + dir.col,
    };

    if (isValidPosition(newPos) && !board[newPos.row][newPos.col]) {
      regularMoves.push(newPos);
    }

    const jumpPos = {
      row: position.row + dir.row * 2,
      col: position.col + dir.col * 2,
    };

    if (
      isValidPosition(newPos) &&
      isValidPosition(jumpPos) &&
      board[newPos.row][newPos.col] &&
      board[newPos.row][newPos.col]!.color !== piece.color &&
      !board[jumpPos.row][jumpPos.col]
    ) {
      captures.push({
        from: position,
        to: jumpPos,
        captured: [newPos],
      });
    }
  }

  if (mustCapture && captures.length > 0) {
    return { moves: [], captures };
  }

  return { moves: regularMoves, captures };
}

export function getAllCaptureMoves(
  board: (Piece | null)[][],
  color: PlayerColor
): Move[] {
  const allCaptures: Move[] = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const { captures } = getValidMoves(board, { row, col }, false);
        allCaptures.push(...captures);
      }
    }
  }

  return allCaptures;
}

export function makeMove(
  board: (Piece | null)[][],
  from: Position,
  to: Position
): { newBoard: (Piece | null)[][]; captured: Position[] } {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[from.row][from.col];

  if (!piece) return { newBoard, captured: [] };

  const captured: Position[] = [];
  const rowDiff = Math.abs(to.row - from.row);

  if (rowDiff === 2) {
    const capturedRow = (from.row + to.row) / 2;
    const capturedCol = (from.col + to.col) / 2;
    captured.push({ row: capturedRow, col: capturedCol });
    newBoard[capturedRow][capturedCol] = null;
  }

  newBoard[to.row][to.col] = piece;
  newBoard[from.row][from.col] = null;

  if (
    (piece.color === 'red' && to.row === 0) ||
    (piece.color === 'black' && to.row === BOARD_SIZE - 1)
  ) {
    newBoard[to.row][to.col] = { ...piece, type: 'king' };
  }

  return { newBoard, captured };
}

export function hasMoreCaptures(
  board: (Piece | null)[][],
  position: Position
): boolean {
  const { captures } = getValidMoves(board, position, false);
  return captures.length > 0;
}

export function checkWinner(board: (Piece | null)[][]): PlayerColor | null {
  let redCount = 0;
  let blackCount = 0;
  let redCanMove = false;
  let blackCanMove = false;

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece) {
        if (piece.color === 'red') {
          redCount++;
          const { moves, captures } = getValidMoves(board, { row, col }, false);
          if (moves.length > 0 || captures.length > 0) redCanMove = true;
        } else {
          blackCount++;
          const { moves, captures } = getValidMoves(board, { row, col }, false);
          if (moves.length > 0 || captures.length > 0) blackCanMove = true;
        }
      }
    }
  }

  if (redCount === 0 || !redCanMove) return 'black';
  if (blackCount === 0 || !blackCanMove) return 'red';
  return null;
}
