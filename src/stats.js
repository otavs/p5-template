function createStats() {
    const stats = new Stats()
    stats.showPanel(0)
    stats.domElement.style.display = showStats ? 'block' : 'none'
    document.body.appendChild(stats.dom)
    return stats
}