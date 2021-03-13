function createGifJs() {
    const gifJs = new GIF({
        workers: 2,
        quality: 10,
        debug: false,
        workerScript: 'lib/gif.worker.js',
        dither: false
    })

    gifJs.on('finished', (blob, data) => {
        gifJs.abort()
        gifJs.frames = []
        gui.recordingCheckBox.__li.hidden = false
        gui.abortRenderingController.__li.hidden = true
        gui.recordingLabel.setText(`Status: Rendering Finished`)
        // window.open(URL.createObjectURL(blob))
        const a = document.createElement('a')
        a.download = `${document.title}.gif`
        a.href = URL.createObjectURL(blob)
        a.click()
    })

    gifJs.on('progress', p => {
        const label = `Status: Rendering GIF... ${Math.round(p * 100)}%`
        gui.recordingLabel.setText(label)
    })

    return gifJs
}
