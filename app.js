// PortalPlay - Unblocked Games Hub Core Engine (Vanilla JS)

const DEFAULT_GAMES = [
  {
    id: "snake",
    title: "Snake Classic",
    category: "Arcade",
    description: "Navigate the glowing neon serpent, devour glowing food apples, and avoid colliding with the perimeter or your own tail.",
    rating: 4.9,
    plays: "54.2K",
    controls: "Arrow Keys / WASD to steer, Space to pause, R to restart",
    tags: ["Arcade", "Retro", "Classic"],
    thumbnail: "./thumbnails/thumb_retro_snake_1790431336564.jpg",
    iframeUrl: "./games/snake.html",
    iframeCode: '<iframe src="./games/snake.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Snake Classic"></iframe>',
    featured: true
  },
  {
    id: "block-blast",
    title: "Block Blast (Tetris)",
    category: "Puzzle",
    description: "Strategically position cascading polyomino blocks to form and vaporize complete horizontal rows before the matrix fills.",
    rating: 4.8,
    plays: "88.1K",
    controls: "←/→ Move, ↑ Rotate, ↓ Soft drop, Space Hard drop",
    tags: ["Puzzle", "Logic", "Strategy"],
    thumbnail: "./thumbnails/thumb_block_puzzle_1790431346375.jpg",
    iframeUrl: "./games/tetris.html",
    iframeCode: '<iframe src="./games/tetris.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Block Blast"></iframe>',
    featured: true
  },
  {
    id: "space-asteroids",
    title: "Space Asteroids",
    category: "Action",
    description: "Pilot a vector spaceship in deep zero-gravity space, pulverizing drifting meteors and alien fragments with laser cannons.",
    rating: 4.7,
    plays: "41.6K",
    controls: "←/→ Turn, ↑ Thrust, Space Fire laser cannons",
    tags: ["Action", "Sci-Fi", "Shooter"],
    thumbnail: "./thumbnails/thumb_space_asteroids_1790431357268.jpg",
    iframeUrl: "./games/asteroids.html",
    iframeCode: '<iframe src="./games/asteroids.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Space Asteroids"></iframe>',
    featured: true
  },
  {
    id: "brick-breaker",
    title: "Brick Breaker DX",
    category: "Arcade",
    description: "Deflect the high-speed kinetic sphere with your magnetic paddle to shatter rainbow crystalline rows and clear stages.",
    rating: 4.8,
    plays: "32.4K",
    controls: "Mouse Move or ←/→ to steer paddle, Space to release ball",
    tags: ["Arcade", "Skill", "Breakout"],
    thumbnail: "./thumbnails/thumb_brick_breaker_1790431366791.jpg",
    iframeUrl: "./games/breakout.html",
    iframeCode: '<iframe src="./games/breakout.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Brick Breaker DX"></iframe>',
    featured: true
  },
  {
    id: "2048",
    title: "2048 Numeric Matrix",
    category: "Puzzle",
    description: "Swipe and slide numbered tiles across the 4x4 grid. When two identical numbers meet, they merge into their sum. Reach 2048!",
    rating: 4.9,
    plays: "67.9K",
    controls: "Arrow Keys or WASD to slide all tiles across grid",
    tags: ["Puzzle", "Math", "Casual"],
    thumbnail: "./thumbnails/thumb_block_puzzle_1790431346375.jpg",
    iframeUrl: "./games/2048.html",
    iframeCode: '<iframe src="./games/2048.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="2048 Numeric Matrix"></iframe>',
    featured: false
  },
  {
    id: "pong",
    title: "Arcade Pong Classic",
    category: "Retro",
    description: "The quintessential two-paddle electronic sports simulation. Test your reflexes against our precision adaptive bot.",
    rating: 4.6,
    plays: "29.7K",
    controls: "W / S or Up / Down or Mouse vertical movement",
    tags: ["Retro", "Sports", "2-Player"],
    thumbnail: "./thumbnails/hero_arcade_showcase_1790431326240.jpg",
    iframeUrl: "./games/pong.html",
    iframeCode: '<iframe src="./games/pong.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Arcade Pong Classic"></iframe>',
    featured: false
  },
  {
    id: "flappy-glide",
    title: "Flappy Glide",
    category: "Action",
    description: "Tap or press space to flap wings and navigate through narrow gaps between electrified green pylons without crashing.",
    rating: 4.7,
    plays: "49.3K",
    controls: "Spacebar or Mouse Click to flap and elevate",
    tags: ["Action", "Endless", "Arcade"],
    thumbnail: "./thumbnails/thumb_retro_snake_1790431336564.jpg",
    iframeUrl: "./games/flappy.html",
    iframeCode: '<iframe src="./games/flappy.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Flappy Glide"></iframe>',
    featured: false
  },
  {
    id: "minesweeper",
    title: "Retro Minesweeper",
    category: "Classic",
    description: "Deduce hidden naval explosive mines using numbered perimeter radar hints. Flag danger zones and clear the entire grid safely.",
    rating: 4.8,
    plays: "38.5K",
    controls: "Left click to uncover cell, Right click to plant red flag",
    tags: ["Classic", "Puzzle", "Logic"],
    thumbnail: "./thumbnails/hero_arcade_showcase_1790431326240.jpg",
    iframeUrl: "./games/minesweeper.html",
    iframeCode: '<iframe src="./games/minesweeper.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Retro Minesweeper"></iframe>',
    featured: false
  }
];

// App State
let games = [];
let activeCategory = 'All';
let searchQuery = '';
let sortBy = 'featured';
let favorites = ['snake', 'block-blast'];
let currentGame = null;
let isTheater = false;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const sortSelect = document.getElementById('sortSelect');
const categoriesBar = document.getElementById('categoriesBar');
const gamesGrid = document.getElementById('gamesGrid');
const emptyState = document.getElementById('emptyState');
const emptyMsg = document.getElementById('emptyMsg');
const resetFilterBtn = document.getElementById('resetFilterBtn');
const sectionTitle = document.getElementById('sectionTitle');
const gamesCountEl = document.getElementById('gamesCount');
const favCountNav = document.getElementById('favCountNav');
const heroSpotlight = document.getElementById('heroSpotlight');

// Player Modal Elements
const playerModal = document.getElementById('playerModal');
const playerDialog = document.getElementById('playerDialog');
const playerTitle = document.getElementById('playerTitle');
const playerCategory = document.getElementById('playerCategory');
const playerIframe = document.getElementById('playerIframe');
const playerControlsHint = document.getElementById('playerControlsHint');
const playerFavBtn = document.getElementById('playerFavBtn');
const playerReloadBtn = document.getElementById('playerReloadBtn');
const playerTheaterBtn = document.getElementById('playerTheaterBtn');
const playerFullscreenBtn = document.getElementById('playerFullscreenBtn');
const playerBlankBtn = document.getElementById('playerBlankBtn');
const playerCloseBtn = document.getElementById('playerCloseBtn');
const copyEmbedBtn = document.getElementById('copyEmbedBtn');
const shareLinkBtn = document.getElementById('shareLinkBtn');
const inspectJsonBtn = document.getElementById('inspectJsonBtn');
const jsonCodeViewer = document.getElementById('jsonCodeViewer');
const jsonPre = document.getElementById('jsonPre');

// Add Game Modal Elements
const addModal = document.getElementById('addModal');
const openAddModalBtns = document.querySelectorAll('.open-add-modal');
const closeAddModalBtn = document.getElementById('closeAddModalBtn');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const addGameForm = document.getElementById('addGameForm');
const addError = document.getElementById('addError');

// JSON Viewer Modal Elements
const jsonModal = document.getElementById('jsonModal');
const openJsonBtns = document.querySelectorAll('.open-json-modal');
const closeJsonModalBtn = document.getElementById('closeJsonModalBtn');
const jsonDatabasePre = document.getElementById('jsonDatabasePre');
const jsonTotalCount = document.getElementById('jsonTotalCount');
const copyFullJsonBtn = document.getElementById('copyFullJsonBtn');
const downloadJsonBtn = document.getElementById('downloadJsonBtn');
const jsonFileInput = document.getElementById('jsonFileInput');

// Initialize
async function init() {
  loadFavorites();
  await loadGames();
  setupEventListeners();
  render();
  checkDeepLink();
}

function loadFavorites() {
  try {
    const saved = localStorage.getItem('portalplay_favorites');
    if (saved) favorites = JSON.parse(saved);
  } catch(e) {}
  updateFavoritesCount();
}

function saveFavorites() {
  try {
    localStorage.setItem('portalplay_favorites', JSON.stringify(favorites));
  } catch(e) {}
  updateFavoritesCount();
}

function updateFavoritesCount() {
  if (favCountNav) {
    favCountNav.textContent = favorites.length > 0 ? `(${favorites.length})` : '';
  }
}

async function loadGames() {
  let baseGames = DEFAULT_GAMES;
  try {
    const res = await fetch('./games.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) baseGames = data;
    }
  } catch(e) {
    console.info('Using embedded fallback games catalog');
  }

  // Merge with custom games in localStorage
  let custom = [];
  try {
    const customStr = localStorage.getItem('portalplay_custom_games');
    if (customStr) custom = JSON.parse(customStr);
  } catch(e) {}

  games = [...baseGames, ...custom];
}

function render() {
  renderHero();
  renderGrid();
}

function renderHero() {
  if (!heroSpotlight) return;
  if (searchQuery || activeCategory !== 'All') {
    heroSpotlight.style.display = 'none';
    return;
  }
  heroSpotlight.style.display = 'block';

  const feat = games.find(g => g.featured) || games[0];
  if (!feat) return;

  const titleEl = heroSpotlight.querySelector('.hero-title');
  const descEl = heroSpotlight.querySelector('.hero-desc');
  const metaCat = heroSpotlight.querySelector('.meta-cat');
  const metaRating = heroSpotlight.querySelector('.meta-rating');
  const metaPlays = heroSpotlight.querySelector('.meta-plays');
  const launchBtn = heroSpotlight.querySelector('.btn-launch');

  if (titleEl) titleEl.textContent = feat.title;
  if (descEl) descEl.textContent = feat.description;
  if (metaCat) metaCat.textContent = feat.category;
  if (metaRating) metaRating.textContent = feat.rating;
  if (metaPlays) metaPlays.textContent = feat.plays + ' plays';

  if (launchBtn) {
    launchBtn.onclick = () => openGamePlayer(feat);
  }
}

function getFilteredGames() {
  return games.filter(g => {
    if (activeCategory === 'Favorites') {
      if (!favorites.includes(g.id)) return false;
    } else if (activeCategory !== 'All' && g.category !== activeCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const mTitle = g.title.toLowerCase().includes(q);
      const mDesc = g.description.toLowerCase().includes(q);
      const mCat = g.category.toLowerCase().includes(q);
      const mTag = g.tags && g.tags.some(t => t.toLowerCase().includes(q));
      if (!mTitle && !mDesc && !mCat && !mTag) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

function renderGrid() {
  const filtered = getFilteredGames();

  // Update Section Title & Counts
  if (sectionTitle) {
    if (activeCategory === 'Favorites') sectionTitle.textContent = 'Saved Favorite Games';
    else if (activeCategory === 'All') sectionTitle.textContent = 'All Available Games';
    else sectionTitle.textContent = `${activeCategory} Games`;
  }
  if (gamesCountEl) {
    gamesCountEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'game' : 'games'} ready to play`;
  }

  if (filtered.length === 0) {
    gamesGrid.innerHTML = '';
    gamesGrid.style.display = 'none';
    emptyState.style.display = 'flex';
    if (emptyMsg) {
      emptyMsg.textContent = activeCategory === 'Favorites'
        ? "You haven't bookmarked any games yet. Click the bookmark icon on any card to save it."
        : `We couldn't find any games matching "${searchQuery}".`;
    }
    return;
  }

  emptyState.style.display = 'none';
  gamesGrid.style.display = 'grid';
  gamesGrid.innerHTML = '';

  filtered.forEach(game => {
    const isFav = favorites.includes(game.id);
    const card = document.createElement('div');
    card.className = 'game-card';

    card.innerHTML = `
      <div class="card-thumb-wrap">
        <img src="${game.thumbnail}" alt="${game.title}" class="card-thumb" onerror="this.style.opacity='0.4';" />
        <div class="card-hover-play">
          <div class="play-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
        <div class="card-floating-actions">
          ${game.isCustom ? `
            <button type="button" class="card-action-btn delete-custom-btn" title="Delete custom game" data-id="${game.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          ` : ''}
          <button type="button" class="card-action-btn fav-toggle-btn ${isFav ? 'active-fav' : ''}" title="${isFav ? 'Remove favorite' : 'Bookmark'}" data-id="${game.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="meta-line">
          <span style="color:#10b981; font-weight:600;">${game.category}</span>
          <span class="meta-sep">·</span>
          <span style="display:flex; align-items:center; gap:2px; color:#f8fafc;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            ${game.rating}
          </span>
          <span class="meta-sep">·</span>
          <span style="font-family:monospace; font-size:11px;">${game.plays}</span>
        </div>
        <h3 class="card-title">${game.title}</h3>
        <p class="card-desc">${game.description}</p>
        <div class="card-footer">
          <span class="card-controls-hint">${game.controls ? game.controls.split(',')[0] : 'Play'}</span>
          <span class="card-play-link">Play →</span>
        </div>
      </div>
    `;

    // Click on Card or Thumb to open
    const thumbWrap = card.querySelector('.card-thumb-wrap');
    const cardTitle = card.querySelector('.card-title');
    const playLink = card.querySelector('.card-play-link');

    [thumbWrap, cardTitle, playLink].forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.card-floating-actions')) return;
        openGamePlayer(game);
      });
    });

    // Favorite Button
    const favBtn = card.querySelector('.fav-toggle-btn');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(game.id);
    });

    // Delete Custom Button
    const deleteBtn = card.querySelector('.delete-custom-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteCustomGame(game.id);
      });
    }

    gamesGrid.appendChild(card);
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  renderGrid();
  if (currentGame && currentGame.id === id) {
    updatePlayerFavBtn();
  }
}

function deleteCustomGame(id) {
  if (!confirm('Are you sure you want to remove this custom game?')) return;
  try {
    const customStr = localStorage.getItem('portalplay_custom_games');
    if (customStr) {
      const custom = JSON.parse(customStr);
      const filtered = custom.filter(g => g.id !== id);
      localStorage.setItem('portalplay_custom_games', JSON.stringify(filtered));
    }
  } catch(e) {}
  games = games.filter(g => g.id !== id);
  if (currentGame && currentGame.id === id) closeGamePlayer();
  render();
}

function openGamePlayer(game) {
  currentGame = game;
  isTheater = false;
  playerDialog.classList.remove('theater');
  playerTitle.textContent = game.title;
  playerCategory.textContent = `· ${game.category}`;
  playerControlsHint.textContent = game.controls || 'Keyboard / Mouse';
  playerIframe.src = game.iframeUrl;
  jsonPre.textContent = JSON.stringify(game, null, 2);
  jsonCodeViewer.style.display = 'none';

  updatePlayerFavBtn();
  playerModal.classList.remove('hidden');

  // Push state
  const url = new URL(window.location);
  url.searchParams.set('game', game.id);
  window.history.replaceState({}, '', url);
}

function closeGamePlayer() {
  playerModal.classList.add('hidden');
  playerIframe.src = 'about:blank';
  currentGame = null;

  const url = new URL(window.location);
  url.searchParams.delete('game');
  window.history.replaceState({}, '', url);
}

function updatePlayerFavBtn() {
  if (!currentGame) return;
  const isFav = favorites.includes(currentGame.id);
  playerFavBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? '#fbbf24' : 'none'}" stroke="${isFav ? '#fbbf24' : 'currentColor'}" stroke-width="2">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
    </svg>
  `;
}

function checkDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const gid = params.get('game');
  if (gid) {
    const found = games.find(g => g.id === gid);
    if (found) openGamePlayer(found);
  }
}

function setupEventListeners() {
  // Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    searchClear.style.display = searchQuery ? 'block' : 'none';
    render();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.style.display = 'none';
    render();
  });

  // Keyboard shortcut '/'
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && playerModal.classList.contains('hidden')) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape') {
      if (!playerModal.classList.contains('hidden')) closeGamePlayer();
      if (!addModal.classList.contains('hidden')) addModal.classList.add('hidden');
      if (!jsonModal.classList.contains('hidden')) jsonModal.classList.add('hidden');
    }
  });

  // Sort
  sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderGrid();
  });

  // Category Tabs
  categoriesBar.addEventListener('click', (e) => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active', 'active-favorites'));
    activeCategory = tab.dataset.category;
    if (activeCategory === 'Favorites') tab.classList.add('active-favorites');
    else tab.classList.add('active');
    render();
  });

  // Reset Filters
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      activeCategory = 'All';
      document.querySelectorAll('.cat-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.category === 'All');
        t.classList.remove('active-favorites');
      });
      render();
    });
  }

  // Player Actions
  playerCloseBtn.addEventListener('click', closeGamePlayer);
  playerFavBtn.addEventListener('click', () => {
    if (currentGame) toggleFavorite(currentGame.id);
  });
  playerReloadBtn.addEventListener('click', () => {
    if (currentGame) playerIframe.src = currentGame.iframeUrl;
  });
  playerTheaterBtn.addEventListener('click', () => {
    isTheater = !isTheater;
    playerDialog.classList.toggle('theater', isTheater);
  });
  playerFullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      playerDialog.requestFullscreen().catch(err => console.warn(err));
    } else {
      document.exitFullscreen().catch(err => console.warn(err));
    }
  });
  playerBlankBtn.addEventListener('click', () => {
    if (currentGame) window.open(currentGame.iframeUrl, '_blank');
  });

  copyEmbedBtn.addEventListener('click', () => {
    if (!currentGame) return;
    const code = currentGame.iframeCode || `<iframe src="${currentGame.iframeUrl}" width="100%" height="600" allow="fullscreen; autoplay"></iframe>`;
    navigator.clipboard.writeText(code);
    copyEmbedBtn.textContent = '✓ Copied Embed';
    setTimeout(() => { copyEmbedBtn.textContent = 'Copy Iframe'; }, 2000);
  });

  shareLinkBtn.addEventListener('click', () => {
    if (!currentGame) return;
    const url = new URL(window.location.href);
    url.searchParams.set('game', currentGame.id);
    navigator.clipboard.writeText(url.toString());
    shareLinkBtn.textContent = '✓ Link Copied';
    setTimeout(() => { shareLinkBtn.textContent = 'Share'; }, 2000);
  });

  inspectJsonBtn.addEventListener('click', () => {
    const isVisible = jsonCodeViewer.style.display === 'block';
    jsonCodeViewer.style.display = isVisible ? 'none' : 'block';
    inspectJsonBtn.textContent = isVisible ? 'Inspect JSON' : 'Hide JSON';
  });

  // Add Game Modal
  openAddModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      addGameForm.reset();
      addError.style.display = 'none';
      addModal.classList.remove('hidden');
    });
  });
  closeAddModalBtn.addEventListener('click', () => addModal.classList.add('hidden'));
  cancelAddBtn.addEventListener('click', () => addModal.classList.add('hidden'));

  // Thumbnail presets in Add Game Modal
  const presetThumbs = document.querySelectorAll('.thumb-preset-btn');
  const customThumbInput = document.getElementById('customThumbInput');
  let chosenThumb = './thumbnails/thumb_block_puzzle_1790431346375.jpg';

  presetThumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      presetThumbs.forEach(b => b.style.borderColor = '#1e293b');
      btn.style.borderColor = '#10b981';
      chosenThumb = btn.dataset.path;
      customThumbInput.value = '';
    });
  });

  addGameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('newTitle').value.trim();
    const cat = document.getElementById('newCategory').value;
    const controls = document.getElementById('newControls').value.trim();
    const iframeRaw = document.getElementById('newIframe').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    const customImg = customThumbInput.value.trim();

    if (!title) {
      showAddError('Please enter a game title.');
      return;
    }
    if (!iframeRaw) {
      showAddError('Please enter an iframe URL or embed code.');
      return;
    }

    let url = iframeRaw;
    let embed = iframeRaw;
    if (iframeRaw.includes('<iframe')) {
      const match = iframeRaw.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        url = match[1];
      } else {
        showAddError('Invalid <iframe> format. Could not locate a src attribute.');
        return;
      }
    } else {
      embed = `<iframe src="${url}" width="100%" height="600" allow="fullscreen; autoplay" style="border:0;" title="${title}"></iframe>`;
    }

    const newGame = {
      id: `custom-${Date.now()}`,
      title,
      category: cat,
      description: desc || 'Custom unblocked web game.',
      rating: 5.0,
      plays: '1',
      controls: controls || 'Mouse / Keyboard',
      tags: [cat, 'Custom'],
      thumbnail: customImg || chosenThumb,
      iframeUrl: url,
      iframeCode: embed,
      featured: false,
      isCustom: true,
      addedAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const customStr = localStorage.getItem('portalplay_custom_games');
      const current = customStr ? JSON.parse(customStr) : [];
      current.unshift(newGame);
      localStorage.setItem('portalplay_custom_games', JSON.stringify(current));
    } catch(err) {}

    games.unshift(newGame);
    addModal.classList.add('hidden');
    render();
    openGamePlayer(newGame);
  });

  function showAddError(msg) {
    addError.textContent = msg;
    addError.style.display = 'block';
  }

  // JSON Viewer Modal
  openJsonBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      jsonDatabasePre.textContent = JSON.stringify(games, null, 2);
      if (jsonTotalCount) jsonTotalCount.textContent = `(${games.length} games)`;
      jsonModal.classList.remove('hidden');
    });
  });
  closeJsonModalBtn.addEventListener('click', () => jsonModal.classList.add('hidden'));

  copyFullJsonBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(games, null, 2));
    copyFullJsonBtn.textContent = '✓ Copied';
    setTimeout(() => { copyFullJsonBtn.textContent = 'Copy JSON'; }, 2000);
  });

  downloadJsonBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  jsonFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          games = parsed;
          localStorage.setItem('portalplay_custom_games', JSON.stringify(parsed));
          render();
          jsonModal.classList.add('hidden');
        }
      } catch(err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  });
}

// Start
document.addEventListener('DOMContentLoaded', init);
