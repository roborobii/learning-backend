var scores = [90,98,100];
var scores2 = [40,65,77,82,80,54,73,63,95,49];

function average(scores_list) {
    let sum = 0;
    for (let i = 0; i < scores_list.length; i++) {
        sum += scores_list[i];
    }
    return Math.round(sum/scores_list.length);
}

console.log(average(scores2));