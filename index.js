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
    const neighbors = [
        [row - 1, column],
        [row, column + 1],
        [row + 1, column],
        [row, column - 1]
    ];
};

stepThroughCell(startRow, startColumn);
console.log(grid);