/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let solution = [];

  for (let i = 0; i < n; i += 1) {
    solution[i] = [];
    for (let j = 0; j < n; j += 1) {
      let sqr = i === j ? 1 : 0;
      solution[i].push(sqr);
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;
  let possibleRowCols = _.range(0, n);
  let depth = n - 1;

  const searchArrangements = function(pRCs, currentDepth) {
    if (currentDepth === 0) {
      solutionCount += 1;
      return;
    }

    pRCs.forEach((col, idx, arr) => {
      let remainingPossibleRowCols = arr.slice(0, idx).concat(arr.slice(idx + 1));
      let nextDepth = currentDepth - 1;

      searchArrangements(remainingPossibleRowCols, nextDepth);
    });
  };

  searchArrangements(possibleRowCols, depth);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let solution = (new Board({'n': n})).rows();
  let foundSolution = false;
  let possibleRowCols = _.range(0, n);
  let board = new Board({'n': n});

  const search = function(pRCs, row, size) {
    if (foundSolution) {
      return;
    }

    if (row >= size) {
      foundSolution = true;
      solution = board.rows();
      return;
    }

    pRCs.forEach((col, idx, arr) => {
      if (foundSolution) {
        return;
      }

      board.togglePiece(row, col);

      let majorDiagIdx = board._getFirstRowColumnIndexForMajorDiagonalOn(row, col);
      let minorDiagIdx = board._getFirstRowColumnIndexForMinorDiagonalOn(row, col);

      if (row === 0 || (!board.hasMajorDiagonalConflictAt(majorDiagIdx) && !board.hasMinorDiagonalConflictAt(minorDiagIdx))) {
        let rPRCs = pRCs.slice(0, idx).concat(arr.slice(idx + 1));

        search(rPRCs, row + 1, size);
      }
      if (!foundSolution) {
        board.togglePiece(row, col);
      }
    });
  };

  if (n === 0) {
    foundSolution = true;
    solution = [];
  }
  if (n === 1) {
    foundSolution = true;
    solution = [[1]];
  }

  if (!foundSolution) {
    search(possibleRowCols, 0, n);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0;
  let possibleRowCols = _.range(0, n);
  let board = new Board({'n': n});

  const search = function(pRCs, row, size) {
    // mirror for even n and only check half board
    if (row >= size) {
      solutionCount += 1;
      return;
    }

    pRCs.forEach((col, idx, arr) => {
      board.togglePiece(row, col);

      let majorDiagIdx = board._getFirstRowColumnIndexForMajorDiagonalOn(row, col);
      let minorDiagIdx = board._getFirstRowColumnIndexForMinorDiagonalOn(row, col);

      if (row === 0 || (!board.hasMajorDiagonalConflictAt(majorDiagIdx) && !board.hasMinorDiagonalConflictAt(minorDiagIdx))) {
        let rPRCs = pRCs.slice(0, idx).concat(arr.slice(idx + 1));

        search(rPRCs, row + 1, size);
      }

      board.togglePiece(row, col);
    });
  };

  if (n === 0 || n === 1) {
    return 1;
  }

  search(possibleRowCols, 0, n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
