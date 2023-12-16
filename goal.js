class Goal {
    constructor(environment) {
        this.environment = environment;
        this.position = this.findValidPosition();
        this.color = color(255, 255, 255);//comida em branco
    }

    findValidPosition() {
        // Encontra uma posição válida para o objetivo que não seja um obstáculo
        let row, col;
        do {
            row = floor(random(this.environment.rows));
            col = floor(random(this.environment.cols));
        } while (this.environment.grid[row][col] === 0); // 0 representa um obstáculo

        return createVector(col, row);
    }

    display() {
        // Desenha o objetivo no ambiente
        fill(this.color);
        ellipse(this.position.x * cellSize + cellSize / 2, this.position.y * cellSize + cellSize / 2, cellSize * 0.8);
    }
}
