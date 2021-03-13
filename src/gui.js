function createGUI() {
    const gui = new dat.GUI()
    let folder = gui

    add(window, 'nPoints', 1, 10, 1).name('Points')

    setFolder('Stats')
    add(window, 'showStats').name('Show Stats').onChange(() => stats.domElement.style.display = showStats ? 'block' : 'none')

    setFolder('Recording')
    gui.recordingLabel = addPlainText('Status: Inactive')
    add(window, 'isRecording').name('Recording').onChange(() => {
        if(isRecording && gifJs.running) {
            isRecording = false
            return
        }
        if(isRecording) {
            gifJs = createGifJs()
            gui.abortRenderingController.__li.hidden = false
            gui.recordingLabel.setText('Status: Recording')
        }
        if(!isRecording) {
            gifJs.render()
        }
    }).listen()
    gui.abortRenderingController = add(window, 'abortRendering').name('Abort Rendering')
    gui.abortRenderingController.__li.hidden = true
    add(window, 'downloadScreenshot').name('Take Screenshot')

    gui.close()
    return gui

    function setFolder(name) {
        folder = (name !== undefined) ? gui.addFolder(name) : gui
        folder.close()
    }

    function add() { // obj, prop, [min], [max], [step]
        return folder.add(...arguments)
    }

    function addColor(obj, prop) {
        return folder.addColor(obj, prop)
    }

    function addPlainText(text) {
        const aux = {aux: ''}
        const controller = add(aux, 'aux')
        controller.domElement.remove()
        const span = controller.__li.getElementsByTagName('span')[0]
        span.innerHTML = text
        span.style.overflow = 'visible'
        span.style.whiteSpace = 'pre'
        controller.setText = text => span.innerHTML = text
        return controller
    }
}