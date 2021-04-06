var canvas, gui, stats, gifJs, showStats = false, isRecording = false, {Vector} = p5

function setup() {
    stats = createStats()
    gui = createGUI()
    gifJs = createGifJs()
    canvas = createCanvas(windowWidth, windowHeight)
    setup_()
}

function draw() {
    drawBegin()
    draw_()
    drawEnd()
}

function drawBegin() {
    stats.begin()
}

function drawEnd() {
    if(isRecording)
        gifJs.addFrame(canvas.elt, {delay: 1000/60, copy: true})
    stats.end()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function downloadScreenshot() {
    const a = document.createElement('a')
    a.download = `${document.title}.png`
    a.href = canvas.elt.toDataURL("image/png")
    a.click()
}

function abortRendering() {
    isRecording = false
    gifJs.abort()
    gifJs.frames = []
    gui.recordingCheckBox.__li.hidden = false
    gui.abortRenderingController.__li.hidden = true
    gui.recordingLabel.setText(`Status: Rendering Aborted`)
}

document.addEventListener('keydown', e => {
    if(e.altKey && e.keyCode == 83) {  // s
        if(isRecording && gifJs.running)
            return
        isRecording = !isRecording
        gui.onChangeIsRecording()
    }
})