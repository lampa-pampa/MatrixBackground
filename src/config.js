const config = {
    stylesheet_path: "src/matrix_background.css",
    background_node_extra_classes: "", // separate with spaces
    animation: {
        char_list: `10`, // chars in stream
        randomize_chars: true, // should chars in stream be randomized
        columns: 20, // grid width
        rows: 30, // grid height
        font_size: 24, // in px
        char_duration: 2000, // in ms
        tick_delay: 100, // in ms
        min_stream_delay: 10, // in ticks
        random_stream_delay_range: 10, // in ticks
    },
}

export default config