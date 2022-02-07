'use strict';
const GHOST = '&#9781;';

var gGhosts = [];
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);
    //model
    board[ghost.location.i][ghost.location.j] = GHOST;

}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

// loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    };
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    // hitting a pacman?  call gameOver
    if (nextCellContent === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver();
            return;
        }
        killGhost(ghost);
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    ghost.location = nextLocation;
    ghost.currCellContent = nextCellContent;
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function killGhost(ghost) {
    gDeadGhosts.push(ghost);
    gGhosts.splice(gGhosts.indexOf(ghost), 1)
}

function reviveGhosts() {
    gGhosts.push(...gDeadGhosts);
    gDeadGhosts = [];
    
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}

function getGhost(ghostLocation) {
    for (var idx = 0; idx < gGhosts.length; idx++) {
        if (ghostLocation.i === gGhosts[idx].location.i &&
            ghostLocation.j === gGhosts[idx].location.j) {
            return gGhosts[idx];
        }
    }

}

function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? 'blue' : ghost.color;
    return `<span style="color: ${color}">${GHOST}</span>`;
}