const { Engine, Render, Runner, World, Bodies } = Matter;

const cells = 3;
const width = 600;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);


// Mur
const walls = [
    Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls);

// génération de labyrinthe

const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
};

const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
    // Si j'ai déjà parcouru la cellule ([row][column])
    if (grid[row][column]) {
        return;
    }

    // marquer cette cellule comme visité
    grid[row][column] = true;

    // recherch aléatoire des différents voisin
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
    ]);

    // Pour chaque voisin
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }

        if (grid[nextRow][nextColumn]) {
            continue;
        }

        if(direction === 'left'){
            verticals[row][column - 1] = true;
        } else if(direction === 'right') {
            verticals[row][column] =true;
        } else if (direction === 'up'){
            horizontals[row-1][column] = true;
        } else if(direction === 'down'){
            horizontals[row][column] = true;
        }
    }
};

stepThroughCell(startRow, startColumn);