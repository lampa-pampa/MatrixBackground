import MatrixBackground from "./matrix_background.js"
import config from "./config.js"

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)
let _matrix_background = null

function handleDOMContentLoaded() {
    document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded)
    
    linkStylesheet(config.stylesheet_path)    
    const background_node = createBackgroundNode(config.background_node_extra_classes)
    createBackground(background_node, config.animation)
}

function createBackgroundNode(extra_classes) {
    const node = document.createElement("div")
    node.className = "matrix-background " + extra_classes
    document.body.appendChild(node)
    return node
}

function linkStylesheet(stylesheet_path) {
    const stylesheet = document.createElement("link")
    stylesheet.href = stylesheet_path
    stylesheet.type = "text/css"
    stylesheet.rel = "stylesheet"
    document.head.appendChild(stylesheet);
}

function createBackground(node, config) {
    _matrix_background = new MatrixBackground(
        node,
        config.char_list,
        config.randomize_chars,
        config.columns,
        config.rows,
        config.font_size,
        config.char_duration,
        config.tick_delay,
        config.min_stream_delay,
        config.random_stream_delay_range,
    )
}