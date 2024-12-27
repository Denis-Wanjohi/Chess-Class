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
