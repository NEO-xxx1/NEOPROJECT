# 🎮 Game Hub - Windows 8 Style

Um hub de atalhos de jogos e programas com interface estilo **Windows 8 Metro UI**, featuring scroll horizontal, busca automática de imagens e muito mais!

## ✨ Funcionalidades

### 🎯 Interface Windows 8 Metro
- **Tiles interativos** no estilo Metro UI
- **Scroll horizontal** para navegação fluida
- Design moderno com efeitos de vidro (glassmorphism)
- Totalmente responsivo

### 🔍 Busca Automática de Imagens
- **Integração com RAWG API** para buscar capas de jogos automaticamente
- **Fallback para Steam** quando disponível
- Placeholders coloridos por gênero se nenhuma imagem for encontrada
- Status em tempo real durante a busca

### 📂 Gerenciamento de Jogos e Programas
- Adicionar jogos com nome, caminho, gênero e tamanho do tile
- Adicionar programas com ícones Font Awesome personalizáveis
- Três tamanhos de tiles: Médio (150x150), Largo (310x150), Grande (310x310)
- Exclusão fácil com botão X no hover
- Persistência automática no localStorage

### 📰 Seções Especiais
- **Notícias Gamer**: Tiles com últimas notícias
- **O Que Jogar Hoje**: Dicas aleatórias que atualizam a cada 30 segundos
- **Curiosidades**: Fatos interessantes sobre o mundo dos games

## 🚀 Como Usar

1. **Abrir o Hub**: Basta abrir o arquivo `index.html` em seu navegador
2. **Adicionar Jogos**: 
   - Clique em "Adicionar Jogo"
   - Digite o nome do jogo (a imagem será buscada automaticamente!)
   - Preencha o caminho do executável
   - Selecione o gênero
   - Escolha o tamanho do tile
   - Salve
3. **Adicionar Programas**:
   - Clique em "Adicionar Programa"
   - Preencha nome e caminho
   - Opcional: escolha um ícone Font Awesome
4. **Navegar**: Use o scroll horizontal para explorar todas as seções

## 📁 Estrutura de Arquivos

```
/workspace
├── index.html      # Estrutura HTML principal
├── styles.css      # Estilos Windows 8 Metro UI
├── app.js          # Lógica da aplicação
└── README.md       # Este arquivo
```

## 🎨 Personalização

### Ícones para Programas
Use classes Font Awesome, exemplos:
- `fa-discord` - Discord
- `fa-chrome` - Google Chrome
- `fa-spotify` - Spotify
- `fa-steam` - Steam
- `fa-twitch` - Twitch
- `fa-firefox` - Firefox

### Cores do Tema
Edite as variáveis CSS em `styles.css`:
```css
:root {
    --primary-color: #0078d7;    /* Azul Metro */
    --secondary-color: #1db954;  /* Verde */
    --accent-color: #ff6b35;     /* Laranja */
}
```

## 🔧 APIs Utilizadas

- **RAWG API**: Busca de informações e imagens de jogos
- **Steam API**: Fallback para busca de jogos na Steam
- **Font Awesome**: Ícones para programas e interface

## ⚠️ Nota Importante

Por limitações de segurança dos navegadores, o launch de jogos/programas é simulado com um alerta. Para execução real de executáveis locais, seria necessário usar:
- **Electron.js** para empacotar como aplicativo desktop
- **Node.js** com permissões adequadas

## 🌟 Destaques

✅ Interface idêntica ao Menu Iniciar do Windows 8  
✅ Scroll horizontal suave entre seções  
✅ Busca automática de imagens de jogos  
✅ Tiles de múltiplos tamanhos  
✅ Atualização automática de dicas e curiosidades  
✅ Design totalmente responsivo  
✅ Sem necessidade de backend  

## 📱 Responsividade

O hub se adapta a diferentes tamanhos de tela:
- **Desktop**: Layout completo com todos os recursos
- **Tablet/Mobile**: Tiles menores e layout otimizado

Divirta-se! 🎮
