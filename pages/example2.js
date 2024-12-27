if (piece == 'Pawn') {
    // Pawn Movement and Capture
    if (playersTurn.value == 'White') {
        if (selectedPiecePos.value[0] == 1 && rank - selectedPiecePos.value[0] <= 2 && file == selectedPiecePos.value[1]) {
            // Initial two-step move for White
            if (pieces.value[rank][file] == null) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        } else if (rank - selectedPiecePos.value[0] == 1 && file == selectedPiecePos.value[1]) {
            // Single step forward
            if (pieces.value[rank][file] == null) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        } else if (rank - selectedPiecePos.value[0] == 1 && Math.abs(file - selectedPiecePos.value[1]) == 1) {
            // Diagonal capture
            if (pieces.value[rank][file]?.includes('Black')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    } else if (playersTurn.value == 'Black') {
        if (selectedPiecePos.value[0] == 6 && selectedPiecePos.value[0] - rank <= 2 && file == selectedPiecePos.value[1]) {
            // Initial two-step move for Black
            if (pieces.value[rank][file] == null) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        } else if (selectedPiecePos.value[0] - rank == 1 && file == selectedPiecePos.value[1]) {
            // Single step forward
            if (pieces.value[rank][file] == null) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        } else if (selectedPiecePos.value[0] - rank == 1 && Math.abs(file - selectedPiecePos.value[1]) == 1) {
            // Diagonal capture
            if (pieces.value[rank][file]?.includes('White')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    }
} else if (piece == 'Rook') {
    // Rook Movement and Capture
    if (rank == selectedPiecePos.value[0] || file == selectedPiecePos.value[1]) {
        if (!isPathBlocked(selectedPiecePos.value, [rank, file])) {
            if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    }
} else if (piece == 'Knight') {
    // Knight Movement and Capture
    const validMoves = [
        [selectedPiecePos.value[0] + 2, selectedPiecePos.value[1] + 1],
        [selectedPiecePos.value[0] + 2, selectedPiecePos.value[1] - 1],
        [selectedPiecePos.value[0] - 2, selectedPiecePos.value[1] + 1],
        [selectedPiecePos.value[0] - 2, selectedPiecePos.value[1] - 1],
        [selectedPiecePos.value[0] + 1, selectedPiecePos.value[1] + 2],
        [selectedPiecePos.value[0] + 1, selectedPiecePos.value[1] - 2],
        [selectedPiecePos.value[0] - 1, selectedPiecePos.value[1] + 2],
        [selectedPiecePos.value[0] - 1, selectedPiecePos.value[1] - 2]
    ];
    if (validMoves.some(([r, f]) => r == rank && f == file)) {
        if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
            pieces.value[rank][file] = selectedPiece.value;
            pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
            changePlayer();
            return;
        }
    }
} else if (piece == 'Bishop') {
    // Bishop Movement and Capture
    if (Math.abs(rank - selectedPiecePos.value[0]) == Math.abs(file - selectedPiecePos.value[1])) {
        if (!isPathBlocked(selectedPiecePos.value, [rank, file])) {
            if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    }
} else if (piece == 'Queen') {
    // Queen Movement and Capture (combination of Rook and Bishop)
    if (
        rank == selectedPiecePos.value[0] ||
        file == selectedPiecePos.value[1] ||
        Math.abs(rank - selectedPiecePos.value[0]) == Math.abs(file - selectedPiecePos.value[1])
    ) {
        if (!isPathBlocked(selectedPiecePos.value, [rank, file])) {
            if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
                pieces.value[rank][file] = selectedPiece.value;
                pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
                changePlayer();
                return;
            }
        }
    }
} else if (piece == 'King') {
    // King Movement and Capture
    if (Math.abs(rank - selectedPiecePos.value[0]) <= 1 && Math.abs(file - selectedPiecePos.value[1]) <= 1) {
        if (pieces.value[rank][file] == null || pieces.value[rank][file]?.includes(playersTurn.value == 'White' ? 'Black' : 'White')) {
            pieces.value[rank][file] = selectedPiece.value;
            pieces.value[selectedPiecePos.value[0]][selectedPiecePos.value[1]] = null;
            changePlayer();
            return;
        }
    }
}

function isPathBlocked(start, end) {
    const [startRank, startFile] = start;
    const [endRank, endFile] = end;
    const rankStep = Math.sign(endRank - startRank);
    const fileStep = Math.sign(endFile - startFile);
    
    let currentRank = startRank + rankStep;
    let currentFile = startFile + fileStep;

    while (currentRank !== endRank || currentFile !== endFile) {
        if (pieces.value[currentRank][currentFile] != null) {
            return true;
        }
        currentRank += rankStep;
        currentFile += fileStep;
    }
    return false;
}
