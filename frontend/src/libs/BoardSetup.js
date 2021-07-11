import babyWords from '../assets/babyWords.json'

// Fisher Yates Shuffle
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
 }
 
export function shuffleCards(items) {
    const array = createCardArray(items);
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        swap(array, currentIndex, randomIndex)
    }

    // Add "free space" for middle card (12th index)
    array.splice(12, 0, {type: 'free'});
    return array;
}

function createCardArray(items) {
    let optionsArray = []
    for (let i of items) {
        let id =  Math.random().toString(36).slice(-10)
        let card = {id: id, item: i, open: true, type: 'card'}
        optionsArray.push(card)
    }
    return optionsArray
}

export const cardOptions = babyWords;