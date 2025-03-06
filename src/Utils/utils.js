

export function getWhitePiece(value){
    switch (value) {
        case "p":
            return 'pawnWhite'
            break;
        case "q":
            return 'queenWhite';
            break;
        case "k":
            return 'kingWhite';
            break;
        case "n":
            return 'knightWhite';
            break;
        case "r":
            return 'rookWhite';
            break;
        case "b":
            return 'bishopWhite';
        default:
            break;
    }
}

export function getBlackPiece(value) {
    switch (value) {
        case "p":
            return 'pawnBlack';
        case "q":
            return 'queenBlack';
        case "k":
            return 'kingBlack';
        case "n":
            return 'knightBlack';
        case "r":
            return 'rookBlack';
        case "b":
            return 'bishopBlack';
        default:
            break;
    }
}