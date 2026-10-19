let scores = [85, 72, 91, 64, 78];

let total = 0;
let average = 0;
let highest = scores[0];
let lowest = scores[0];
let passed = 0;
let failed = 0;

console.log("Student Scores:");

for (let i = 0; i < scores.length; i++) {
    console.log(scores[i]);
}

    console.log("");

for (let i = 0; i < scores.length; i++) {
    let score = scores[i];
    let grade = "";
    let Student_status = "";

    // Determining the grade based on the score
    if (score >= 90) {
        grade = "Excellent";
    } else if (score >= 80) {
        grade = "Very Good";
    } else if (score >= 75) {
        grade = "Good";
    } else {
        grade = "Failed";
    }
    
    // Identifying if passed or failed
    if (scores >= 75) {
        Student_status = "Passed";
        passed++;
    } else {
        Student_status = "Failed";
        failed++;
    }

    console.log("Student" + " " + (i + 1) + ":" + " " + score + " - " + grade + " - " + Student_status);

    //TOTAL
    total=total + score;

    //HIGHEST
    if (score > highest) {
        highest = score;
    }

    //LOWEST
    if (score < lowest) {
        lowest = score;
    }
}

console.log("");
console.log("Total Score:" + " " + total);
console.log("Average Score:" + " " + total / scores.length);
console.log("Highest Score:" + " " + highest);
console.log("Lowest Score:" + " " + lowest);
console.log("Passed" + " " + passed);
console.log("Failed" + " " + failed);