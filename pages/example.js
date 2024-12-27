// Represent the chessboard
const board = Array(8).fill(null).map(() => Array(8).fill(null));

// Define the pieces
const PIECES = {
  PAWN: 'pawn',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  ROOK: 'rook',
  QUEEN: 'queen',
  KING: 'king',
};

// Utility function to check if a position is within bounds
const isInBounds = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

// Pawn movement
const getPawnMoves = (x, y, color) => {
  const direction = color === 'white' ? -1 : 1; // Pawns move up for white, down for black
  const moves = [];

  // Forward movement
  if (isInBounds(x + direction, y) && !board[x + direction][y]) {
    moves.push([x + direction, y]);
  }

  // Capture moves
  for (let dy of [-1, 1]) {
    if (
      isInBounds(x + direction, y + dy) &&
      board[x + direction][y + dy]?.color !== color
    ) {
      moves.push([x + direction, y + dy]);
    }
  }
  return moves;
};

// Knight movement
const getKnightMoves = (x, y, color) => {
  const moves = [];
  const offsets = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2],
  ];
  for (const [dx, dy] of offsets) {
    const nx = x + dx, ny = y + dy;
    if (isInBounds(nx, ny) && board[nx][ny]?.color !== color) {
      moves.push([nx, ny]);
    }
  }
  return moves;
};

// Sliding pieces (Bishop, Rook, Queen)
const getSlidingMoves = (x, y, color, directions) => {
  const moves = [];
  for (const [dx, dy] of directions) {
    let nx = x + dx, ny = y + dy;
    while (isInBounds(nx, ny)) {
      if (board[nx][ny]) {
        if (board[nx][ny]?.color !== color) {
          moves.push([nx, ny]); // Capture
        }
        break; // Block further moves in this direction
      }
      moves.push([nx, ny]);
      nx += dx;
      ny += dy;
    }
  }
  return moves;
};

// Bishop movement
const getBishopMoves = (x, y, color) =>
  getSlidingMoves(x, y, color, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);

// Rook movement
const getRookMoves = (x, y, color) =>
  getSlidingMoves(x, y, color, [[1, 0], [-1, 0], [0, 1], [0, -1]]);

// Queen movement
const getQueenMoves = (x, y, color) =>
  getSlidingMoves(x, y, color, [
    [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1],
  ]);

// King movement
const getKingMoves = (x, y, color) => {
  const moves = [];
  const offsets = [
    [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];
  for (const [dx, dy] of offsets) {
    const nx = x + dx, ny = y + dy;
    if (isInBounds(nx, ny) && board[nx][ny]?.color !== color) {
      moves.push([nx, ny]);
    }
  }
  return moves;
};

// General function to get valid moves for a piece
const getMoves = (piece, x, y) => {
  const { type, color } = piece;
  switch (type) {
    case PIECES.PAWN:
      return getPawnMoves(x, y, color);
    case PIECES.KNIGHT:
      return getKnightMoves(x, y, color);
    case PIECES.BISHOP:
      return getBishopMoves(x, y, color);
    case PIECES.ROOK:
      return getRookMoves(x, y, color);
    case PIECES.QUEEN:
      return getQueenMoves(x, y, color);
    case PIECES.KING:
      return getKingMoves(x, y, color);
    default:
      return [];
  }
};

// Example usage
board[6][4] = { type: PIECES.PAWN, color: 'white' }; // Place a white pawn at (6, 4)
console.log(getMoves(board[6][4], 6, 4)); // Get moves for the white pawn
