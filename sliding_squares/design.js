
function add_stars() {
    // skip some frames
    if (Math.random() > 0.2) {
        return;
    }

    let star_count = 5;
    const canvas = document.getElementById("canvas-refreshing");
    var ctx = canvas.getContext("2d");
    while (star_count-- > 0) {
        const right = Math.random() * canvas.width;
        const down = Math.random() * canvas.height;
        const size = Math.random() > 0.5 ? 2 : 1;
        ctx.beginPath(); //Start path
        ctx.fillStyle = randBoolean() ? "snow" : "#2ae4fc";
        ctx.arc(right, down, size, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        ctx.fill();
        ctx.closePath();
    }
}

function randBoolean() {
    return Math.random() > 0.5;
}    

function clear_canvas() {
    const canvas = document.getElementById("canvas-refreshing");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw_square(right, down, square_size, color) {
    const canvas = document.getElementById("canvas-refreshing");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(right, down, square_size, square_size);
    ctx.stroke();
    ctx.closePath();
}

let startTime = null;
let vertical = true;

function step(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    
    clear_canvas();
    add_stars();
    
    const num_squares = parseInt(document.getElementById("num-squares").value);
    const timeAnimateOneSide = parseFloat(document.getElementById("animation-speed").value); 
    const progress = (timestamp - startTime) / timeAnimateOneSide;
    const main_square_len = document.getElementById("canvas-refreshing").width;
    const square_side_len = main_square_len / num_squares;
   
    for (let id = 0; id < num_squares; id++) {
        const start = { right: id * square_side_len, down: id * square_side_len };
        const end = { right: id * square_side_len, down: main_square_len - square_side_len - id * square_side_len };
        let now = { right: start.right, down: (end.down - start.down) * progress + start.down };
        
        if (!vertical) {
            now = { down: now.right, right: main_square_len - now.down - square_side_len };
        }

        const color = document.getElementById("color-input").value;
        draw_square(now.right, now.down, square_side_len, color);
    }
    
    if (progress > 1) {
        startTime = timestamp;
        vertical = !vertical
    }
    window.requestAnimationFrame(step);
}

window.onload = function () {
    window.requestAnimationFrame(step);
}

