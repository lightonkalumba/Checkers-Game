import { Piece, Position, Move } from '../types/checkers';
import { getValidMoves, makeMove, hasMoreCaptures, BOARD_SIZE } from './gameLogic';

interface ScoredMove {
  move: Move;
  score: number;
}

function evaluateBoard(board: (Piece | null)[][]): number {
  let score = 0;

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece) {
        const pieceValue = piece.type === 'king' ? 15 : 10;
        const positionBonus = piece.color === 'black' ? row : (BOARD_SIZE - 1 - row);

        if (piece.color === 'black') {
          score += pieceValue + positionBonus;
        } else {
          score -= pieceValue + positionBonus;
        }
      }
    }
  }

  return score;
}

function getAllPossibleMoves(board: (Piece | null)[][]): Move[] {
  const moves: Move[] = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece && piece.color === 'black') {
        const { moves: regularMoves, captures } = getValidMoves(
          board,
          { row, col },
          false
        );

        for (const move of regularMoves) {
          moves.push({
            from: { row, col },
            to: move,
          });
        }

        for (const capture of captures) {
          moves.push(capture);
        }
      }
    }
  }

  return moves;
}

function minimax(
  board: (Piece | null)[][],
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean
): number {
  if (depth === 0) {
    return evaluateBoard(board);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    const moves = getAllPossibleMoves(board);

    if (moves.length === 0) return -1000;

    for (const move of moves) {
      const { newBoard } = makeMove(board, move.from, move.to);
      const evaluation = minimax(newBoard, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }

    return maxEval;
  } else {
    let minEval = Infinity;
    const moves: Move[] = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = board[row][col];
        if (piece && piece.color === 'red') {
          const { moves: regularMoves, captures } = getValidMoves(
            board,
            { row, col },
            false
          );

          for (const move of regularMoves) {
            moves.push({
              from: { row, col },
              to: move,
            });
          }

          for (const capture of captures) {
            moves.push(capture);
          }
        }
      }
    }

    if (moves.length === 0) return 1000;

    for (const move of moves) {
      const { newBoard } = makeMove(board, move.from, move.to);
      const evaluation = minimax(newBoard, depth - 1, alpha, beta, true);
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }

    return minEval;
  }
}

export function getComputerMove(board: (Piece | null)[][]): Move | null {
  const moves = getAllPossibleMoves(board);

  if (moves.length === 0) return null;

  const captureMoves = moves.filter(move => move.captured && move.captured.length > 0);

  if (captureMoves.length > 0) {
    const scoredMoves: ScoredMove[] = captureMoves.map(move => {
      const { newBoard } = makeMove(board, move.from, move.to);
      const score = minimax(newBoard, 3, -Infinity, Infinity, false);
      return { move, score };
    });

    scoredMoves.sort((a, b) => b.score - a.score);
    return scoredMoves[0].move;
  }

  const scoredMoves: ScoredMove[] = moves.map(move => {
    const { newBoard } = makeMove(board, move.from, move.to);
    const score = minimax(newBoard, 3, -Infinity, Infinity, false);
    return { move, score };
  });

  scoredMoves.sort((a, b) => b.score - a.score);

  const topMoves = scoredMoves.filter(m => m.score === scoredMoves[0].score);
  return topMoves[Math.floor(Math.random() * topMoves.length)].move;
}
