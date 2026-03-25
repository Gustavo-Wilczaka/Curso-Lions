let nums = [1, 2, 3, 4, 5, 6, 7, 8];

let s=0;

for (let i = 0; i < nums.length; i++) {
if(nums[i]%2===0)
s=s+ nums[i];
}
console.log(s)
