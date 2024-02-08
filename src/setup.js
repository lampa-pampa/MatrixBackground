import MatrixBackground from "./matrix_background.js"
import config from "./config.js"

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)

function handleDOMContentLoaded()
{
    document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded)
    
    linkStylesheet(config.stylesheet_path)    
    const background_node = createBackgroundNode()
    createBackground(background_node, config.background)
}

function createBackgroundNode()
{
    const node = document.createElement("div")
    node.className = "matrix-background"
    document.body.appendChild(node)
    return node
}

function linkStylesheet(stylesheet_path)
{
    const stylesheet = document.createElement("link")
    stylesheet.href = stylesheet_path
    stylesheet.type = "text/css"
    stylesheet.rel = "stylesheet"
    document.head.appendChild(stylesheet);
}

function createBackground(node, config)
{
    new MatrixBackground(
        node,
        config.char_list,
        config.columns,
        config.rows,
        config.font_size,
        config.char_delay,
        config.char_duration,
        config.stream_min_delay,
        config.stream_random_delay_range
    )
}