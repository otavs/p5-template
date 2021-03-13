var nPoints = 3

function draw_() {
    background('#fffdc7')
    translate(width * 0.5, height * 0.5)
    rotate(frameCount / 50)
    polygon(0, 0, 125)
}

function polygon(x, y, radius) {
    const angle = TWO_PI / nPoints
    beginShape()
    fill('#c7eaff')
    for(let a = 0; a < TWO_PI; a += angle) {
        const sx = x + cos(a) * radius
        const sy = y + sin(a) * radius
        vertex(sx, sy)
    }
    endShape(CLOSE)
}
