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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
