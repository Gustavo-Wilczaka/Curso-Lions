let nums = [2, 4, 6, 8, 10, 12];

let menor = nums[5]

for (let i = 0; i < nums.length; i++) {
    if (nums[i] < menor) {
        menor = nums[i];
    }
}
console.log(menor)