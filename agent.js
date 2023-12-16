class Agent {
    constructor(environment) {
        this.environment = environment;
        this.position = this.findValidStartPosition();
        this.energy = 100; // Um valor inicial para a energia do agente
        this.path;
        this.pathIdx = 0; 
        this.hadRun = false
    }

    findValidStartPosition() {
        // Encontra uma posição de início válida que não seja um obstáculo
        let row, col;
        do {
            row = floor(random(this.environment.rows));
            col = floor(random(this.environment.cols));
        } while (this.environment.grid[row][col] === 0); // 0 representa um obstáculo
        return createVector(col, row);
    }

    move() {
        // Implemente a lógica de movimentação do agente
        // Por exemplo, um simples movimento em direção ao targetPosition
        if(this.path && this.pathIdx < this.path.length) {
            this.position = this.path[this.pathIdx++]
            this.hadRun = true;
        } else if(this.hadRun === true) {
            this.pathIdx = 0; 
            this.path = null
            return false 
        }
        //this.position.lerp(targetPosition, 0.05); // 0.05 é a taxa de interpolação
        // Reduzir energia com base no tipo de terreno
        let terrainType = this.environment.grid[this.position.y][this.position.x];
        this.adjustEnergyBasedOnTerrain(terrainType);
        return true
    }

    

    adjustEnergyBasedOnTerrain(terrainType) {
        // Ajusta a energia com base no tipo de terreno
        switch (terrainType) {
            case 1: this.energy -= 1; break; // Areia
            case 2: this.energy -= 5; break; // Atoleiro
            case 3: this.energy -= 10; break; // Água
            // Não subtrai energia para obstáculo (0), pois o agente não deve estar lá
        }
    }

    display() {
        // Desenha o agente no canvas
        fill(255, 0, 0); // Vermelho para o agente
        ellipse(this.position.x * cellSize + cellSize / 2, this.position.y * cellSize + cellSize / 2, cellSize * 0.8);
    }

}
