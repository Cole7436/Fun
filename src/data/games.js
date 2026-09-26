import heroArcadeImg from '../assets/images/hero_arcade_showcase_1790431326240.jpg';
import thumbSnakeImg from '../assets/images/thumb_retro_snake_1790431336564.jpg';
import thumbBlockImg from '../assets/images/thumb_block_puzzle_1790431346375.jpg';
import thumbAsteroidsImg from '../assets/images/thumb_space_asteroids_1790431357268.jpg';
import thumbBrickImg from '../assets/images/thumb_brick_breaker_1790431366791.jpg';

export const INITIAL_GAMES = [
  {
    id: "snake",
    title: "Snake Classic",
    category: "Arcade",
    description: "Navigate the glowing neon serpent, devour glowing food apples, and avoid colliding with the perimeter or your own tail.",
    rating: 4.9,
    plays: "54.2K",
    controls: "Arrow Keys / WASD to steer, Space to pause, R to restart",
    tags: ["Arcade", "Retro", "Classic"],
    thumbnail: thumbSnakeImg,
    iframeUrl: "./games/snake.html",
    iframeCode: `<iframe src="./games/snake.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Snake Classic"></iframe>`,
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
    thumbnail: thumbBlockImg,
    iframeUrl: "./games/tetris.html",
    iframeCode: `<iframe src="./games/tetris.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Block Blast"></iframe>`,
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
    thumbnail: thumbAsteroidsImg,
    iframeUrl: "./games/asteroids.html",
    iframeCode: `<iframe src="./games/asteroids.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Space Asteroids"></iframe>`,
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
    thumbnail: thumbBrickImg,
    iframeUrl: "./games/breakout.html",
    iframeCode: `<iframe src="./games/breakout.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Brick Breaker DX"></iframe>`,
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
    thumbnail: thumbBlockImg,
    iframeUrl: "./games/2048.html",
    iframeCode: `<iframe src="./games/2048.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="2048 Numeric Matrix"></iframe>`,
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
    thumbnail: heroArcadeImg,
    iframeUrl: "./games/pong.html",
    iframeCode: `<iframe src="./games/pong.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Arcade Pong Classic"></iframe>`,
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
    thumbnail: thumbSnakeImg,
    iframeUrl: "./games/flappy.html",
    iframeCode: `<iframe src="./games/flappy.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Flappy Glide"></iframe>`,
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
    thumbnail: heroArcadeImg,
    iframeUrl: "./games/minesweeper.html",
    iframeCode: `<iframe src="./games/minesweeper.html" width="100%" height="600" allow="fullscreen; autoplay" style="border:0; border-radius:12px;" title="Retro Minesweeper"></iframe>`,
    featured: false
  }
];

export const CATEGORIES = ['All', 'Arcade', 'Puzzle', 'Action', 'Classic', 'Retro'];

export function loadAllGames() {
  try {
    const customJson = localStorage.getItem('portalplay_custom_games');
    const customGames = customJson ? JSON.parse(customJson) : [];
    return [...INITIAL_GAMES, ...customGames];
  } catch (err) {
    console.error('Failed to load custom games from localStorage', err);
    return INITIAL_GAMES;
  }
}

export function saveCustomGame(game) {
  const newGame = {
    ...game,
    id: `custom-${Date.now()}`,
    rating: 5.0,
    plays: "1",
    isCustom: true,
    addedAt: new Date().toISOString()
  };

  try {
    const customJson = localStorage.getItem('portalplay_custom_games');
    const current = customJson ? JSON.parse(customJson) : [];
    current.unshift(newGame);
    localStorage.setItem('portalplay_custom_games', JSON.stringify(current));
  } catch (err) {
    console.error('Failed to save custom game', err);
  }

  return newGame;
}

export function deleteCustomGame(id) {
  try {
    const customJson = localStorage.getItem('portalplay_custom_games');
    if (!customJson) return;
    const current = JSON.parse(customJson);
    const updated = current.filter(g => g.id !== id);
    localStorage.setItem('portalplay_custom_games', JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete custom game', err);
  }
}

export function getFavorites() {
  try {
    const favs = localStorage.getItem('portalplay_favorites');
    return favs ? JSON.parse(favs) : ['snake', 'block-blast'];
  } catch {
    return ['snake', 'block-blast'];
  }
}

export function toggleFavoriteId(id) {
  const current = getFavorites();
  const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
  try {
    localStorage.setItem('portalplay_favorites', JSON.stringify(next));
  } catch {}
  return next;
}
