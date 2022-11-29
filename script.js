let state = {};

document.addEventListener("DOMContentLoaded", function (event) {
    initializeState();
});

// returns an ordered array containing numbers from 1 to 18, each number appears twice
function getAllAvailableNumbers() {
    let array = [];
    for (let i = 1; i <= 18; i++) {
        array.push(i);
        array.push(i);
    }
    return array;
}

/**
 returns an unordered array of numbers from 1 to 18, each number appears twice
 all of the elements are accompanied by 'false' which indicates that they are not yet revealed
 */
function getRandomizedNumbers() {
    let availableNumbers = getAllAvailableNumbers();
    let array = [];
    for (let i = 0; i < 36; i++) {
        // pick random index from 0 to availableNumbers array length
        let randomIndex = Math.floor(Math.random() * availableNumbers.length);
        array[i] = {hiddenPicId: availableNumbers[randomIndex], isRevealed: false};
        // remove an element at randomIndex from the availableNumbers array
        availableNumbers.splice(randomIndex, 1);
    }
    return array;
}

function initializeState() {
    state = {
        numbers: getRandomizedNumbers(),
        firstSelected: {elementId: -1, hiddenPicId: -1},
        secondSelected: {elementId: -1, hiddenPicId: -1}
    }
}

function getHiddenPicIdBasedOnElementId(elementId) {
    return state.numbers[elementId].hiddenPicId;
}

function handleClick(element) {
    const elementId = element.id;
    const hiddenPicId = getHiddenPicIdBasedOnElementId(elementId);
    const isAlreadyRevealed = state.numbers[elementId].isRevealed;

    if (!isAlreadyRevealed) {
        if (checkIfFirstIsNotSelected() && checkIfSecondIsNotSelected()) {
            state.firstSelected = {elementId, hiddenPicId};
            show(element, state.firstSelected.hiddenPicId);
        } else if (!checkIfFirstIsNotSelected() && checkIfSecondIsNotSelected()) {
            state.secondSelected = {elementId, hiddenPicId};
            show(element, state.secondSelected.hiddenPicId);

            checkForMatch();
        }
    }
}

function checkIfFirstIsNotSelected() {
    return state.firstSelected.elementId === -1 && state.firstSelected.hiddenPicId === -1;
}

function checkIfSecondIsNotSelected() {
    return state.secondSelected.elementId === -1 && state.secondSelected.hiddenPicId === -1;
}

function checkForMatch() {
    if (state.firstSelected.hiddenPicId === state.secondSelected.hiddenPicId) {
        matchFound();
    } else {
        window.setTimeout(matchNotFound, 2000);
    }
}

function matchFound() {
    state.numbers[state.firstSelected.elementId].isRevealed = true;
    state.numbers[state.secondSelected.elementId].isRevealed = true;
    resetSelectedImages();
}

function matchNotFound() {
    hide(state.firstSelected.elementId);
    hide(state.secondSelected.elementId);
    resetSelectedImages();
}

function resetSelectedImages() {
    state.firstSelected = {elementId: -1, hiddenPicId: -1};
    state.secondSelected = {elementId: -1, hiddenPicId: -1};
}

function show(element, hiddenPicId) {
    element.className = "show";
    element.src = "./img/" + hiddenPicId + ".png";
}

function hide(id) {
    let element = document.getElementById(id);
    element.className = "hide";
    element.src = "./img/hide.png";
}