// Game Hub - Windows 8 Style Application

// Data storage
let games = JSON.parse(localStorage.getItem('games')) || [];
let programs = JSON.parse(localStorage.getItem('programs')) || [];

// Tips and Curiosities data
const tips = [
    "Experimente jogar um RPG de mundo aberto como The Witcher 3 ou Skyrim para uma experiência imersiva.",
    "Que tal revisitar um clássico dos anos 90? Super Metroid e Chrono Trigger são atemporais.",
    "Jogue um jogo indie hoje! Hollow Knight e Celeste são obras-primas do gênero.",
    "Desafie-se com um soulslike. Dark Souls ou Bloodborne testarão suas habilidades.",
    "Experimente um jogo de estratégia como Civilization VI ou XCOM 2.",
    "Jogue algo cooperativo com amigos! Among Us ou Overcooked são ótimas opções.",
    "Mergulhe em uma história emocionante com The Last of Us ou God of War.",
    "Tente um jogo de terror psicológico como Silent Hill 2 ou Resident Evil 7.",
    "Explore um sandbox criativo como Minecraft ou Terraria.",
    "Jogue um battle royale como Apex Legends ou Fortnite para ação competitiva."
];

const curiosities = [
    "O jogo mais vendido de todos os tempos é Minecraft, com mais de 300 milhões de cópias.",
    "O primeiro jogo eletrônico foi criado em 1958 e se chamava 'Tennis for Two'.",
    "A Nintendo foi fundada em 1889, inicialmente fabricando cartas de baralho.",
    "Pac-Man foi inspirado em uma pizza faltando uma fatia.",
    "O personagem Mario apareceu pela primeira vez em Donkey Kong (1981), não em Super Mario Bros.",
    "The Legend of Zelda: Breath of the Wild tem mais de 120 santuários para explorar.",
    "GTA V custou aproximadamente 265 milhões de dólares para ser desenvolvido.",
    "O recorde mundial de maior maratona de videogame é de mais de 138 horas consecutivas.",
    "Space Invaders causou escassez de moedas de 100 yens no Japão nos anos 80.",
    "A indústria de jogos gera mais receita que Hollywood e Bollywood combinadas."
];

const newsData = [
    { title: "Novo DLC anunciado para jogo popular", source: "GameSpot" },
    { title: "Console de próxima geração revela especificações", source: "IGN" },
    { title: "Estúdio independente ganha prêmio de inovação", source: "PC Gamer" },
    { title: "Torneio de e-sports bate recorde de audiência", source: "Kotaku" },
    { title: "Remake de clássico recebe data de lançamento", source: "GameInformer" }
];

// Current tip and curiosity indices
let currentTipIndex = Math.floor(Math.random() * tips.length);
let currentCuriosityIndex = Math.floor(Math.random() * curiosities.length);

// DOM Elements
const gameModal = document.getElementById('gameModal');
const programModal = document.getElementById('programModal');
const addGameBtn = document.getElementById('addGameBtn');
const addProgramBtn = document.getElementById('addProgramBtn');
const closeButtons = document.querySelectorAll('.close');
const gameForm = document.getElementById('gameForm');
const programForm = document.getElementById('programForm');
const gamesContainer = document.getElementById('gamesContainer');
const programsContainer = document.getElementById('programsContainer');
const newsContainer = document.getElementById('newsContainer');
const tipsContainer = document.getElementById('tipsContainer');
const curiositiesContainer = document.getElementById('curiositiesContainer');
const searchStatus = document.getElementById('searchStatus');

// Tile size selector buttons
document.querySelectorAll('.tile-size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const parent = this.parentElement;
        parent.querySelectorAll('.tile-size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const inputId = this.closest('.modal-content').querySelector('input[type="hidden"]').id;
        document.getElementById(inputId).value = this.dataset.size;
    });
});

// Modal controls
addGameBtn.addEventListener('click', () => {
    gameModal.style.display = 'block';
    resetForm(gameForm);
});

addProgramBtn.addEventListener('click', () => {
    programModal.style.display = 'block';
    resetForm(programForm);
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        gameModal.style.display = 'none';
        programModal.style.display = 'none';
        hideSearchStatus();
    });
});

window.addEventListener('click', (event) => {
    if (event.target === gameModal) {
        gameModal.style.display = 'none';
        hideSearchStatus();
    }
    if (event.target === programModal) {
        programModal.style.display = 'none';
    }
});

// Make delete functions global for onclick handlers
window.deleteGame = function(id) {
    games = games.filter(game => game.id !== id);
    saveGames();
    renderGames();
};

window.deleteProgram = function(id) {
    programs = programs.filter(program => program.id !== id);
    savePrograms();
    renderPrograms();
};

// Local functions (not used anymore but kept for reference) - REMOVED TO AVOID CONFLICTS
/*
function deleteGameLocal(id) {
    games = games.filter(game => game.id !== id);
    saveGames();
    renderGames();
}

function deleteProgramLocal(id) {
    programs = programs.filter(program => program.id !== id);
    savePrograms();
    renderPrograms();
}
*/

// Auto-search game image when name changes
let searchTimeout;
const gameNameInput = document.getElementById('gameName');
gameNameInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    const gameName = this.value.trim();
    
    if (gameName.length < 3) {
        hideSearchStatus();
        return;
    }
    
    searchTimeout = setTimeout(() => {
        searchGameImage(gameName);
    }, 800);
});

// Search for game image using multiple sources
async function searchGameImage(gameName) {
    showSearchStatus('loading', `Buscando imagem para "${gameName}"...`);
    
    try {
        // Method 1: Use IGDB image via placeholder service
        const igdbQuery = encodeURIComponent(gameName);
        
        // Try to get from Steam Grid API (no key required for basic usage)
        const steamGridUrl = `https://www.steamgriddb.com/api/v2/search/10k/${igdbQuery}`;
        
        try {
            const response = await fetch(steamGridUrl);
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data.length > 0) {
                    const gameId = data.data[0].id;
                    const logoUrl = `https://www.steamgriddb.com/api/v2/logo/${gameId}`;
                    
                    const logoResponse = await fetch(logoUrl);
                    if (logoResponse.ok) {
                        const logoData = await logoResponse.json();
                        if (logoData.success && logoData.data.length > 0) {
                            const imageUrl = logoData.data[0].url;
                            showSearchStatus('success', `Imagem encontrada: ${gameName}`);
                            return imageUrl;
                        }
                    }
                }
            }
        } catch (e) {
            console.log('SteamGrid DB failed, trying fallback...');
        }
        
        // Method 2: Use RAWG API with demo key pattern or fallback
        // Since we can't use real API keys in client-side code safely, use a visual placeholder
        const genreColors = {
            'Ação': 'dc3545',
            'RPG': '6f42c1', 
            'Aventura': '28a745',
            'Estratégia': 'fd7e14',
            'Esporte': '007bff',
            'Corrida': 'ffc107',
            'Terror': '343a40',
            'Indie': '17a2b8'
        };
        
        // Generate a nice gradient placeholder with game name
        const canvas = document.createElement('canvas');
        canvas.width = 310;
        canvas.height = 310;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const hue = Math.floor(Math.random() * 360);
        const gradient = ctx.createLinearGradient(0, 0, 310, 310);
        gradient.addColorStop(0, `hsl(${hue}, 70%, 40%)`);
        gradient.addColorStop(1, `hsl(${(hue + 40) % 360}, 70%, 25%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 310, 310);
        
        // Add game name text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 28px Segoe UI, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Word wrap for long names
        const words = gameName.split(' ');
        let lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            if (ctx.measureText(currentLine + word).width < 280) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        });
        if (currentLine) lines.push(currentLine);
        
        const lineHeight = 35;
        const startY = (310 - (lines.length * lineHeight)) / 2 + 15;
        
        lines.forEach((line, i) => {
            ctx.fillText(line, 155, startY + (i * lineHeight));
        });
        
        // Convert to data URL
        const imageUrl = canvas.toDataURL('image/png');
        showSearchStatus('success', `Capa gerada para: ${gameName}`);
        return imageUrl;
        
    } catch (error) {
        console.error('Erro ao buscar/generar imagem:', error);
        showSearchStatus('error', 'Usando imagem padrão.');
        
        // Final fallback - solid color
        const canvas = document.createElement('canvas');
        canvas.width = 310;
        canvas.height = 310;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#6c757d';
        ctx.fillRect(0, 0, 310, 310);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(gameName, 155, 155);
        return canvas.toDataURL('image/png');
    }
}

function showSearchStatus(type, message) {
    searchStatus.textContent = message;
    searchStatus.className = 'search-status show ' + type;
}

function hideSearchStatus() {
    searchStatus.className = 'search-status';
}

// Form submissions
gameForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('gameName').value.trim();
    const path = document.getElementById('gamePath').value.trim();
    const genre = document.getElementById('gameGenre').value;
    const tileSize = document.getElementById('tileSize').value;
    
    // Search for image automatically
    let imageUrl = await searchGameImage(name);
    
    const game = {
        id: Date.now(),
        name,
        path,
        genre,
        image: imageUrl,
        tileSize
    };
    
    games.push(game);
    saveGames();
    renderGames();
    
    gameModal.style.display = 'none';
    resetForm(gameForm);
    hideSearchStatus();
});

programForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('programName').value.trim();
    const path = document.getElementById('programPath').value.trim();
    const icon = document.getElementById('programIcon').value.trim() || 'fa-desktop';
    const tileSize = document.getElementById('programTileSize').value;
    
    const program = {
        id: Date.now(),
        name,
        path,
        icon,
        tileSize
    };
    
    programs.push(program);
    savePrograms();
    renderPrograms();
    
    programModal.style.display = 'none';
    resetForm(programForm);
});

function resetForm(form) {
    form.reset();
    form.querySelectorAll('.tile-size-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === 'medium') {
            btn.classList.add('active');
        }
    });
    const hiddenInput = form.querySelector('input[type="hidden"]');
    if (hiddenInput) {
        hiddenInput.value = 'medium';
    }
    hideSearchStatus();
}

function saveGames() {
    localStorage.setItem('games', JSON.stringify(games));
}

function savePrograms() {
    localStorage.setItem('programs', JSON.stringify(programs));
}

// Delete functions are now exposed globally via window.deleteGame and window.deleteProgram above
// These local functions are kept for backwards compatibility but not used
/*
function deleteGame(id) {
    games = games.filter(game => game.id !== id);
    saveGames();
    renderGames();
}

function deleteProgram(id) {
    programs = programs.filter(program => program.id !== id);
    savePrograms();
    renderPrograms();
}
*/

function launchGame(path) {
    // In a real application, this would use Electron or Node.js to launch the game
    // For now, we'll show a message
    alert(`🎮 Lançando jogo:\n${path}\n\nNota: Em um ambiente real, isto abriria o executável diretamente.`);
}

function launchProgram(path) {
    alert(`🖥️ Abrindo programa:\n${path}\n\nNota: Em um ambiente real, isto abriria o executável diretamente.`);
}

// Render functions
function renderGames() {
    gamesContainer.innerHTML = '';
    
    if (games.length === 0) {
        gamesContainer.innerHTML = '<div class="empty-message">Nenhum jogo adicionado. Clique em "Adicionar Jogo" para começar!</div>';
        return;
    }
    
    games.forEach(game => {
        const tile = document.createElement('div');
        tile.className = `tile tile-${game.tileSize || 'medium'}`;
        
        tile.innerHTML = `
            <img src="${game.image}" alt="${game.name}" class="tile-image" onerror="this.src='https://via.placeholder.com/310x310/6c757d/ffffff?text=Game'">
            <button class="tile-delete" onclick="deleteGame(${game.id})">
                <i class="fas fa-times"></i>
            </button>
            <div class="tile-content">
                <div class="tile-title">${game.name}</div>
                <div class="tile-subtitle">${game.genre}</div>
            </div>
        `;
        
        tile.addEventListener('click', (e) => {
            if (!e.target.closest('.tile-delete')) {
                launchGame(game.path);
            }
        });
        
        gamesContainer.appendChild(tile);
    });
}

function renderPrograms() {
    programsContainer.innerHTML = '';
    
    if (programs.length === 0) {
        programsContainer.innerHTML = '<div class="empty-message">Nenhum programa adicionado.</div>';
        return;
    }
    
    programs.forEach(program => {
        const tile = document.createElement('div');
        tile.className = `tile tile-${program.tileSize || 'medium'}`;
        
        tile.innerHTML = `
            <i class="fas ${program.icon} tile-icon"></i>
            <button class="tile-delete" onclick="deleteProgram(${program.id})">
                <i class="fas fa-times"></i>
            </button>
            <div class="tile-content">
                <div class="tile-title">${program.name}</div>
            </div>
        `;
        
        tile.addEventListener('click', (e) => {
            if (!e.target.closest('.tile-delete')) {
                launchProgram(program.path);
            }
        });
        
        programsContainer.appendChild(tile);
    });
}

function renderNews() {
    newsContainer.innerHTML = '';
    
    newsData.forEach(news => {
        const tile = document.createElement('div');
        tile.className = 'tile tile-wide';
        
        tile.innerHTML = `
            <div class="news-tile-content">
                <div class="news-title">${news.title}</div>
                <div class="news-source">${news.source}</div>
            </div>
        `;
        
        newsContainer.appendChild(tile);
    });
}

function renderTips() {
    tipsContainer.innerHTML = '';
    
    const tile = document.createElement('div');
    tile.className = 'tile';
    
    tile.innerHTML = `
        <div class="tip-tile-content">
            <i class="fas fa-lightbulb tip-icon-large"></i>
            <p class="tip-text">${tips[currentTipIndex]}</p>
            <button class="btn-refresh" id="newTipBtn">
                <i class="fas fa-redo"></i> Nova Dica
            </button>
        </div>
    `;
    
    tipsContainer.appendChild(tile);
    
    document.getElementById('newTipBtn').addEventListener('click', () => {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        renderTips();
    });
}

function renderCuriosities() {
    curiositiesContainer.innerHTML = '';
    
    const tile = document.createElement('div');
    tile.className = 'tile';
    
    tile.innerHTML = `
        <div class="curiosity-tile-content">
            <i class="fas fa-brain curiosity-icon-large"></i>
            <p class="curiosity-text">${curiosities[currentCuriosityIndex]}</p>
            <button class="btn-refresh" id="newCuriosityBtn">
                <i class="fas fa-redo"></i> Nova Curiosidade
            </button>
        </div>
    `;
    
    curiositiesContainer.appendChild(tile);
    
    document.getElementById('newCuriosityBtn').addEventListener('click', () => {
        currentCuriosityIndex = (currentCuriosityIndex + 1) % curiosities.length;
        renderCuriosities();
    });
}

// Auto-refresh tips and curiosities every 30 seconds
setInterval(() => {
    currentTipIndex = Math.floor(Math.random() * tips.length);
    currentCuriosityIndex = Math.floor(Math.random() * curiosities.length);
    renderTips();
    renderCuriosities();
}, 30000);

// Initialize
renderGames();
renderPrograms();
renderNews();
renderTips();
renderCuriosities();
