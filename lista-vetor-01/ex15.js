let nums = [1, 2, 3, 4, 5, 6]

let cresente = true;

for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
        cresente = false;
    }
}
if (cresente) {
    console.log("a sequencia atual é crescente")
} else {
    console.log("a sequencia atual é decrescente")
}

