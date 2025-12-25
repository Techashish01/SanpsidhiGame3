let tog = 1;
let p1sum = 0;
let p2sum = 0;
let audio1 = new Audio("Rolling Dice.mp3");
let audio3 = new Audio("Win.mp3");


const moves = {
    1: 38, 4: 14, 9: 31,17: 7, 21: 42, 28: 84,
    51: 67,54: 34,62: 19,64: 60,72: 91,80: 99,
    87: 36,93: 73,95: 75,98: 79 
};

function play(player, psum, correction, num) {

    let sum;

    if (psum === 'p1sum') {
        p1sum += num;
        if (p1sum > 100) p1sum -= num;
        if (moves[p1sum]) p1sum = moves[p1sum];
       
        sum = p1sum;
    }
    
    if (psum === 'p2sum') {
        
        p2sum += num;
        if (p2sum > 100) p2sum -= num;
        if (moves[p2sum]) p2sum = moves[p2sum];
        sum = p2sum;
        
    }

    const piece = document.getElementById(`${player}`);
    piece.style.transition = "all 0.9s linear";


    if (sum === 100) {
        audio3.play();
        setTimeout(() => {
            alert(player === 'p1' ? "🥳🥳🥳Red Won !!" : "🥳🥳🥳Yellow Won !!");
            location.reload();
        }, 2000);
        return;
    }

    if (sum < 10) {
        
        piece.style.left = `${(sum - 1) * 62}px`;
        piece.style.top = `${-correction}px`;
    } else {
        let digits = Array.from(String(sum));
        let n1 = Number(digits[0]);
        let n2 = Number(digits[1]);

        if (n1 % 2 !== 0) {
            if (n2 === 0) {
                
                piece.style.left = `${9 * 62}px`;
                piece.style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                piece.style.left = `${(9 - (n2 - 1)) * 62}px`;
                piece.style.top = `${-n1 * 62 - correction}px`;
            }
        } else {
            if (n2 === 0) {
                
                piece.style.left = `0px`;
                piece.style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                piece.style.left = `${(n2 - 1) * 62}px`;
                piece.style.top = `${-n1 * 62 - correction}px`;
            }
        }
    }
}
document.getElementById("diceBtn").addEventListener("click", function () {
    audio1.play();

        let num = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = num;

    if (tog % 2 !== 0) {
        document.getElementById('tog').innerText = "Red's Turn : ";
        play('p1', 'p1sum', 0, num);
    } else {
        document.getElementById('tog').innerText = "Yellow's Turn : ";
        play('p2', 'p2sum', 55, num);
    }

    tog++;
});
