import Stream from "./stream.js"

class MatrixBackground {
    constructor(
            grid_node,
            char_list,
            randomize_chars,
            columns,
            rows,
            font_size,
            char_duration,
            tick_delay,
            min_stream_delay,
            random_stream_delay_range) {
        this._char_list = char_list
        this._randomize_chars = randomize_chars
        this._grid = this._createGrid(grid_node, rows, columns, char_duration, font_size)
        this._tick_delay = tick_delay
        this._min_stream_delay = min_stream_delay
        this._random_stream_delay_range = random_stream_delay_range 
        this._stream_timers = this._createStreamTimers(columns)
        this._streams = new Array()

        setInterval(() => this._tick(), tick_delay)
    }

    _createStreamTimers(columns) {
        const timers = new Array()
        for(let i = 0; i < columns; ++i)
            timers.push(this._random(this._random_stream_delay_range))
        return timers
    }
    
    _tick() {
        this._timerTick()
        this._streamTick()
    }

    _timerTick() {
        for(const column_index in this._stream_timers) {
            if(this._stream_timers[column_index] > 0)
                --this._stream_timers[column_index]
            else
                this._createStreamAndResetTimer(column_index)
        }
    }

    _createStreamAndResetTimer(column_index) {
        this._streams.push(new Stream (
            column_index,
            this._random(this._char_list.length)
        ))
        this._stream_timers[column_index] = this._min_stream_delay + this._random(this._random_stream_delay_range)
    }

    _streamTick() {
        for(const i in this._streams) {
            this._displayStreamChar(this._streams[i])
            
            if(this._streams[i].row_index < this._grid.length - 1)
            {
                ++this._streams[i].row_index
                this._streams[i].char_index = this._generateNextCharIndex(this._streams[i].char_index)
            }
            else
            {
                this._streams.splice(i, 1)     
            }
        }
    }

    _generateNextCharIndex(index) {
        return (this._randomize_chars ? this._random(this._char_list.length) : (index + 1) % this._char_list.length)
    }

    _displayStreamChar(stream) {
        const cell = this._grid[stream.row_index][stream.column_index]
        const char = this._char_list[stream.char_index]
        this._animateChar(char, cell)
    }

    _animateChar(char, cell) {
        cell.textContent = char
        cell.style.animationName = ""
        cell.offsetWidth
        cell.style.animationName = "char-animation"
    }

    _createGrid(grid_node, rows, columns, char_duration, font_size) {
        const grid = new Array()
        for(let y = 0; y < rows; ++y)
        {
            const row = new Array()
            const row_node = this._createRowNode()

            for(let x = 0; x < columns; ++x) {
                const cell_node = this._createCellNode(char_duration, font_size)
                row_node.appendChild(cell_node)
                row.push(cell_node)
            }
            grid_node.appendChild(row_node)
            grid.push(row)
        }
        return grid
    }

    _createRowNode() {
        const row_node = document.createElement("div")
        row_node.className = "matrix-background-row"
        return row_node
    }

    _createCellNode(char_duration, font_size) {
        const node = document.createElement("div")
        node.className = "matrix-background-cell"   
        node.style.animationDuration = char_duration + "ms"
        node.style.fontSize = font_size + "px"
        return node
    }

    _random(range) {
        return Math.floor(Math.random() * range)
    }
}

export default MatrixBackground