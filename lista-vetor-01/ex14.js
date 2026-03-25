let nums = [1, 2, 3, 4, 5, 6, 7, 8]
let x = 7;

let indice = -1;

for (let i = 0; i < nums.length; i++) {
    if (nums[i] === x) {
        indice = i
    }
}

console.log("a posição que o x aparece é:", indice)