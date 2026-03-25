let nums = [2, 4, 6, 8, 10, 12];

let maior = nums[0]

for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maior) {
        maior = nums[i];
    }
}
console.log(maior)