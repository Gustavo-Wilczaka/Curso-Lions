let nums = [1, 2, 3, 4, 5, 6]

let cresente= "sim"

for (let i = 0; i < nums.length; i++) {
 if(nums[i]> nums[i]+1){
    cresente= "nao"
 }
}
console.log("a sequencia atual é crescente?" ,  cresente)