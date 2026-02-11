const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
const button = document.getElementById("valentinesButton");
const gifContainer = document.getElementById("gifContainer");
const valentineGif = document.getElementById("valentineGif");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let frame = 0;
let opacity = 0;
let stage = 0;
let isFinished = false;

// ОЧЕНЬ МЕДЛЕННО (800 кадров — это около 13 секунд на фразу)
const speedFactor = 800; 

// Твоя гифка с Tenor
const myGifUrl = "https://media.tenor.com/9Y-eDAjvU1sAAAAi/love-you.gif";

for (let i = 0; i < 400; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        blink: Math.random()
    });
}

const phrases = [
    "Каждый день я не могу поверить, как же мне повезло",
    "Встретить такую яркую звезду из тысячи звезд",
    "Которая светит настолько ярко, что моя жизнь становится невероятной",
    "Я безумно благодарна тебе за все, что ты сделал",
    "Ты стал для меня больше чем кто-либо, ты стал для меня домом",
    "Я люблю тебя безумно, моя луна, больше чем звезд в галактике",
    "Ты — всё, о чём я когда-либо мечтала..."
];

button.addEventListener("click", () => {
    isFinished = true;
    button.style.display = "none";
    valentineGif.src = myGifUrl;
    gifContainer.style.display = "block";
});

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем мерцающие звезды
    ctx.fillStyle = "white";
    stars.forEach(s => {
        let b = Math.abs(Math.sin(frame * 0.02 + s.blink * 10));
        ctx.globalAlpha = b;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (!isFinished) {
        let fontSize = Math.min(26, canvas.width / 15);
        ctx.font = `${fontSize}px 'Dancing Script', cursive`;
        ctx.textAlign = "center";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "pink";
        ctx.fillStyle = `rgba(255, 182, 193, ${opacity})`;

        if (stage < phrases.length) {
            ctx.fillText(phrases[stage], canvas.width / 2, canvas.height / 2);
            
            if (frame % speedFactor < speedFactor / 2) {
                opacity = Math.min(1, opacity + 0.007);
            } else {
                opacity = Math.max(0, opacity - 0.007);
            }

            if (frame > 0 && frame % speedFactor === 0) {
                stage++;
                opacity = 0;
            }
        } else {
            // ФИНАЛЬНЫЙ ЭКРАН (остается на месте)
            ctx.fillStyle = "rgba(255, 182, 193, 1)";
            ctx.fillText("И я не могу дождаться того часа, когда мы будем вместе", canvas.width / 2, canvas.height / 2 - 30);
            
            ctx.font = `${fontSize * 1.1}px 'Dancing Script', cursive`;
            ctx.fillText("С днем Святого Валентина, mi amor! ❤️", canvas.width / 2, canvas.height / 2 + 40);
            
            button.style.display = "block";
        }
    }

    frame++;
    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

draw();
