
function zip(a, b) {
    const res = [];
    for (var i = 0; i < a.length; i++) {
        res.push([a[i], b[i]]);
    }
    return res;
}

function clear_canvas() {
    const canvas = document.getElementById("canvas-refreshing");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.fillRect(0,0, canvas.width, canvas.height);
}

function draw_square(right, down, square_size) {
    const canvas = document.getElementById("canvas-refreshing");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(right, down, square_size, square_size);
    ctx.stroke();
    ctx.closePath();
}

function range(n) {
    return Array(n).fill().map((_, i) => i);
}

let startTime = null;

let vertical = true;

function step(timestamp) {
    clear_canvas();

    if (!startTime) startTime = timestamp;

    const timeAnimateOneSide = 2000; // 3 seconds

    const progress = (timestamp - startTime) / timeAnimateOneSide;

    const main_square_len = 800;

    const num_squares = 20;
    const square_side_len = main_square_len / num_squares;
   
    const ids = range(num_squares);

    // give coords of UL corner where UL is 0,0
    const startLocation = id => ({ right: id * square_side_len, down: id * square_side_len });
    const endLocation = id => ({ right: id * square_side_len, down: main_square_len - square_side_len - id * square_side_len });

    const startLocations = ids.map(startLocation);
    const endLocations = ids.map(endLocation);
    const startEnds = zip(startLocations, endLocations); 

    let locationAtTime = startEnds.map((startEnd) => {
        const start = startEnd[0];
        const end = startEnd[1];
        return { right: start.right, down: (end.down - start.down) * progress + start.down };
    });

    console.log(locationAtTime.length);

    if (!vertical) {
        locationAtTime = locationAtTime.map(square => ({ down: square.right, right: main_square_len - square.down - square_side_len }));
    }

    locationAtTime.forEach(square => draw_square(square.right, square.down, square_side_len));

    if (progress > 1) {
        startTime = timestamp;
        vertical = !vertical
    }
    window.requestAnimationFrame(step);
}

function startAnimation() {
    window.requestAnimationFrame(step);
}

// on load code  ////////////////////////////////////////////////
window.onload = function () {
    startAnimation();	
}

