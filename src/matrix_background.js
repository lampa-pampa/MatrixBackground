class MatrixBackground
{
    constructor(
            grid_node,
            char_list,
            columns,
            rows,
            font_size,
            char_delay,
            char_duration,
            stream_min_delay,
            _stream_random_delay_range)
    {
        this.char_list = char_list
        this.grid = this._createGrid(grid_node, rows, columns, char_duration, font_size)
        this.rows = rows
        this.columns = columns
        this.char_delay = char_delay
        this._stream_random_delay_range = _stream_random_delay_range

        this._startAnimation()
        setInterval(() => this._startAnimation(), stream_min_delay)
    }

    _createGrid(grid_node, rows, columns, char_duration, font_size)
    {
        const grid = new Array()
        for(let column_index = 0; column_index < columns; ++column_index)
        {
            const grid_column = new Array()
            const column_node = document.createElement("div")
            column_node.className = "matrix-background-column"
            for(let cell_index = 0; cell_index < rows; ++cell_index)
            {
                const cell_node = document.createElement("div")
                cell_node.className = "matrix-background-cell"   
                cell_node.style.animationDuration = char_duration + "ms"
                cell_node.style.fontSize = font_size + "px"
                column_node.appendChild(cell_node)
                grid_column.push(cell_node)
            }
            grid_node.appendChild(column_node)
            grid.push(grid_column)
        }
        return grid
    }

    _startAnimation()
    {
        setTimeout(() => {
            for(let column_index = 0; column_index < this.columns; ++column_index)
                this._startStream(column_index)
        }, this._random(this._stream_random_delay_range))
    }

    _startStream(column_index)
    {
        setTimeout(() => {
            this._startStreamStep(column_index)
        }, this._random(this._stream_random_delay_range))
    }

    _startStreamStep(column_index)
    {
        let row_index = 0
        const interval = setInterval(() => {
            if(row_index >= this.rows)
            {
                clearInterval(interval)
                return
            }
            const cell = this.grid[column_index][row_index]
            const char = this._generateChar()
            this._animateChar(cell, char)
            ++row_index
        }, this.char_delay)
    }

    _animateChar(cell, char)
    {
        cell.textContent = char
        cell.style.animationName = ""
        cell.offsetWidth
        cell.style.animationName = "char-animation"
    }

    _generateChar()
    {
        return this.char_list[this._random(this.char_list.length)]
    }

    _random(range)
    {
        return Math.floor(Math.random() * range)
    }
}

export default MatrixBackground