function generateNextVRN() {
    let input = document.getElementById("regNumber").value.trim().toUpperCase();
    let resultElement = document.getElementById("result");
    let pattern = /^[A-Z]{3} \d{3}-EC$/;
    
    if (!pattern.test(input)) {
        resultElement.textContent = "Invalid format. Use AAA NNN-EC.";
        return;
    }
    
    let [letters, numbers] = input.split(" ");
    let num = parseInt(numbers.split("-")[0], 10);
    
    if (num < 999) {
        num++;
    } else {
        num = 0;
        letters = incrementLetters(letters);
        if (!letters) {
            resultElement.textContent = "Maximum registration reached.";
            return;
        }
    }
    
    resultElement.textContent = `${letters} ${num.toString().padStart(3, '0')}-EC`;
}

function incrementLetters(letters) {
    let chars = letters.split("");
    for (let i = 2; i >= 0; i--) {
        if (chars[i] !== 'Z') {
            chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
            return chars.join("");
        } else {
            chars[i] = 'B';
        }
    }
    return null;
}