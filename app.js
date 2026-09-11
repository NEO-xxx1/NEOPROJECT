// Data storage
let games = JSON.parse(localStorage.getItem('games')) || [];
let programs = JSON.parse(localStorage.getItem('programs')) || [];

// Gaming tips database
const gamingTips = [
    "Experimente jogar um gênero que você nunca tentou antes!",
    "Faça pausas de 5-10 minutos a cada hora de jogo para descansar os olhos.",
    "Ajuste as configurações gráficas para equilibrar performance e qualidade visual.",
    "Explore completamente cada área antes de avançar na história principal.",
    "Tente completar todos os side quests antes do jogo final.",
    "Jogue com amigos online para uma experiência multiplayer divertida.",
    "Descubra todos os easter eggs escondidos no seu jogo favorito.",
    "Personalize suas configurações de controle para maior conforto.",
    "Assista a cutscenes sem pular para aproveitar toda a narrativa.",
    "Tente modos de dificuldade diferentes para novos desafios."
];

// Gaming curiosities database
const curiosities = [
    "O primeiro videogame foi criado em 1958 e se chamava 'Tennis for Two'.",
    "Super Mario Bros. foi o primeiro jogo a ter um chefe final.",
    "O personagem Sonic foi originalmente planejado para ser um coelho.",
    "Minecraft foi desenvolvido por apenas uma pessoa: Markus Persson.",
    "O jogo mais vendido de todos os tempos é Minecraft, com mais de 238 milhões de cópias.",
    "Pac-Man foi inspirado em uma pizza faltando uma fatia.",
    "O termo 'boss fight' veio do jogo Dragon Buster em 1984.",
    "Tetris foi o primeiro jogo a ser jogado no espaço (em 1993).",
    "A Nintendo foi fundada em 1889, inicialmente como fabricante de cartas de baralho.",
    "O PlayStation original quase foi uma parceria entre Nintendo e Sony."
];

// Gaming news database (simulated)
const gamingNews = [
    {
        title: "Novo DLC anunciado para RPG popular",
        summary: "Desenvolvedora revela expansão com 20+ horas de conteúdo adicional."
    },
    {
        title: "Torneio de eSports bate recorde de audiência",
        summary: "Final atraiu mais de 5 milhões de espectadores simultâneos."
    },
    {
        title: "Remake de clássico ganha data de lançamento",
        summary: "Jogo dos anos 90 receberá gráficos modernizados e nova trilha sonora."
    },
    {
        title: "Nova console é anunciada para próximo ano",
        summary: "Promessa de performance 4x superior à geração atual."
    },
    {
        title: "Indie game surpreende e ganha prêmio",
        summary: "Pequeno estúdio vence categoria de melhor narrativa."
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    renderPrograms();
    generateTip();
    generateCuriosity();
    renderNews();
});

// Render games grid
function renderGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    
    if (games.length === 0) {
        gamesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.5);">Nenhum jogo adicionado ainda. Clique em "Adicionar Jogo" para começar!</p>';
        return;
    }
    
    games.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = (e) => {
            if (!e.target.classList.contains('card-delete')) {
                launchGame(game.path);
            }
        };
        
        const imageDisplay = game.image 
            ? `<img src="${game.image}" alt="${game.name}" class="card-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
            : `<div class="card-image"><i class="fas fa-gamepad"></i></div>`;
        
        card.innerHTML = `
            ${imageDisplay}
            <div class="card-content">
                <h3 class="card-title">${game.name}</h3>
                <span class="card-genre">${game.genre}</span>
            </div>
            <button class="card-delete" onclick="deleteGame(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        gamesGrid.appendChild(card);
    });
}

// Render programs grid
function renderPrograms() {
    const programsGrid = document.getElementById('programsGrid');
    programsGrid.innerHTML = '';
    
    if (programs.length === 0) {
        programsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.5);">Nenhum programa adicionado ainda. Clique em "Adicionar Programa" para começar!</p>';
        return;
    }
    
    programs.forEach((program, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = (e) => {
            if (!e.target.classList.contains('card-delete')) {
                launchProgram(program.path);
            }
        };
        
        const imageDisplay = program.image 
            ? `<img src="${program.image}" alt="${program.name}" class="card-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
            : `<div class="card-image"><i class="fas fa-desktop"></i></div>`;
        
        card.innerHTML = `
            ${imageDisplay}
            <div class="card-content">
                <h3 class="card-title">${program.name}</h3>
                <span class="card-genre">${program.category}</span>
            </div>
            <button class="card-delete" onclick="deleteProgram(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        programsGrid.appendChild(card);
    });
}

// Render news
function renderNews() {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    
    gamingNews.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h4>${news.title}</h4>
            <p>${news.summary}</p>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Generate random tip
function generateTip() {
    const tipContent = document.getElementById('tipContent');
    const randomTip = gamingTips[Math.floor(Math.random() * gamingTips.length)];
    tipContent.innerHTML = `<p>${randomTip}</p>`;
}

// Generate random curiosity
function generateCuriosity() {
    const curiosityContent = document.getElementById('curiosityContent');
    const randomCuriosity = curiosities[Math.floor(Math.random() * curiosities.length)];
    curiosityContent.innerHTML = `<p>${randomCuriosity}</p>`;
}

// Launch game (simulation - in real scenario would use file protocol or backend)
function launchGame(path) {
    alert(`Iniciando jogo...\n\nCaminho: ${path}\n\nNota: Em um ambiente real, isso abriria o executável do jogo.`);
    // In a real desktop application, you would use:
    // window.location.href = `file:///${path}`;
    // Or use Electron/Node.js to execute the file
}

// Launch program (simulation)
function launchProgram(path) {
    alert(`Iniciando programa...\n\nCaminho: ${path}\n\nNota: Em um ambiente real, isso abriria o executável do programa.`);
    // In a real desktop application, you would use:
    // window.location.href = `file:///${path}`;
    // Or use Electron/Node.js to execute the file
}

// Delete game
function deleteGame(index) {
    if (confirm('Tem certeza que deseja remover este jogo?')) {
        games.splice(index, 1);
        localStorage.setItem('games', JSON.stringify(games));
        renderGames();
    }
}

// Delete program
function deleteProgram(index) {
    if (confirm('Tem certeza que deseja remover este programa?')) {
        programs.splice(index, 1);
        localStorage.setItem('programs', JSON.stringify(programs));
        renderPrograms();
    }
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Add game form submission
document.getElementById('gameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newGame = {
        name: document.getElementById('gameName').value,
        path: document.getElementById('gamePath').value,
        image: document.getElementById('gameImage').value || null,
        genre: document.getElementById('gameGenre').value
    };
    
    games.push(newGame);
    localStorage.setItem('games', JSON.stringify(games));
    
    renderGames();
    closeModal('gameModal');
    this.reset();
});

// Add program form submission
document.getElementById('programForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newProgram = {
        name: document.getElementById('programName').value,
        path: document.getElementById('programPath').value,
        image: document.getElementById('programImage').value || null,
        category: document.getElementById('programCategory').value
    };
    
    programs.push(newProgram);
    localStorage.setItem('programs', JSON.stringify(programs));
    
    renderPrograms();
    closeModal('programModal');
    this.reset();
});

// Auto-refresh tip and curiosity every 30 seconds
setInterval(() => {
    generateTip();
}, 30000);

setInterval(() => {
    generateCuriosity();
}, 30000);
