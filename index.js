const pi = 22/7;

function calculateVolume(r, h){
    const eqOne = pi * Math.pow(r, 2) * h;
    const eqTwo = 1/3;
    const answer = Math.round(eqTwo * eqOne);
    return answer;
}
const radius = process.argv[2];
const height = process.argv[3];
const result = calculateVolume(radius, height);

console.log("The result is", result);
