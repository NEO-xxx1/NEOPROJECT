# Game Hub - Seu Centro de Jogos

Um hub moderno e personalizado para gerenciar seus jogos e programas, com notícias, dicas e curiosidades do mundo gamer.

## 🎮 Funcionalidades

### Gerenciamento de Jogos e Programas
- **Adicionar Jogos**: Cadastre seus jogos instalados com nome, caminho do executável, imagem e gênero
- **Adicionar Programas**: Adicione programas úteis como Discord, OBS, navegadores, etc.
- **Launch Rápido**: Clique em qualquer card para iniciar o jogo/programa
- **Excluir**: Remova jogos ou programas que não usa mais
- **Persistência**: Dados salvos automaticamente no localStorage do navegador

### Conteúdo Dinâmico
- **Dicas do Dia**: Sugestões do que jogar hoje, atualizadas automaticamente
- **Notícias Gamer**: Últimas novidades do mundo dos games
- **Curiosidades**: Fatos interessantes sobre a indústria de jogos

## 🚀 Como Usar

1. **Abrir o Hub**: Basta abrir o arquivo `index.html` em seu navegador
2. **Adicionar Jogos**: 
   - Clique em "Adicionar Jogo"
   - Preencha o nome, caminho do executável (ex: `C:\Games\Jogo\jogo.exe`)
   - Opcional: URL de uma imagem e selecione o gênero
3. **Adicionar Programas**:
   - Clique em "Adicionar Programa"
   - Preencha as informações similares aos jogos
4. **Iniciar**: Clique em qualquer card para abrir o jogo/programa

## 📁 Estrutura de Arquivos

```
/workspace
├── index.html      # Página principal
├── styles.css      # Estilização e design
├── app.js          # Lógica e funcionalidades
└── README.md       # Este arquivo
```

## 🎨 Design

- Interface moderna com tema escuro
- Gradientes e efeitos de glassmorphism
- Totalmente responsivo (funciona em desktop e mobile)
- Animações suaves e transições
- Ícones Font Awesome

## 💡 Recursos Especiais

- **Auto-refresh**: Dicas e curiosidades se renovam a cada 30 segundos
- **LocalStorage**: Seus jogos e programas permanecem salvos mesmo após fechar o navegador
- **Simulação de Launch**: Em um ambiente real (Electron/Node.js), os jogos seriam abertos diretamente

## 🔧 Personalização

Você pode facilmente personalizar:
- As cores no arquivo `styles.css`
- As dicas e curiosidades no arquivo `app.js`
- As notícias simuladas no array `gamingNews`

## 🌐 Navegadores Suportados

- Chrome/Edge (recomendado)
- Firefox
- Safari
- Opera

## 📝 Notas Importantes

**Limitação de Segurança**: Por rodar em navegador, a aplicação não pode executar arquivos diretamente do sistema. Em um cenário real, você precisaria:
- Usar Electron.js para criar um aplicativo desktop
- Ou usar Node.js com um backend para executar os arquivos
- Ou configurar protocolos customizados

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- Font Awesome (ícones)
- Google Fonts (Poppins)

## 📄 Licença

Projeto livre para uso e modificação.

---

**Divirta-se jogando! 🎮**
