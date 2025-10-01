# Checkers Game

A beautiful, fully-featured checkers game built with React, TypeScript, and Tailwind CSS. Play against a friend or challenge the computer AI!

![Checkers Game](https://images.pexels.com/photos/2923034/pexels-photo-2923034.jpeg?auto=compress&cs=tinysrgb&w=800)

## Features

- **Two Game Modes**
  - **2 Players**: Play against a friend on the same device
  - **vs Computer**: Challenge an AI opponent with intelligent move selection

- **Complete Checkers Rules**
  - Mandatory captures when available
  - King pieces with enhanced movement
  - Multi-jump sequences
  - Automatic win detection

- **Beautiful UI**
  - Smooth animations and transitions
  - Responsive design for all screen sizes
  - Visual feedback for valid moves
  - Elegant piece highlighting

- **Smart Computer AI**
  - Uses minimax algorithm with alpha-beta pruning
  - Evaluates board positions strategically
  - Prioritizes captures and king positioning
  - Adjustable difficulty depth

## How to Play

1. **Starting the Game**
   - Choose your game mode: 2 Players or vs Computer
   - Red player always moves first

2. **Making Moves**
   - Click on a piece to select it
   - Valid moves will be highlighted in green
   - Click a highlighted square to move your piece
   - Regular pieces move diagonally forward
   - Kings can move both forward and backward

3. **Capturing**
   - Jump over opponent pieces to capture them
   - You must capture if a capture move is available
   - Multiple captures in sequence are allowed and required

4. **Winning**
   - Capture all opponent pieces, or
   - Block all opponent moves

5. **King Pieces**
   - Reach the opposite end of the board to crown your piece
   - Kings gain the ability to move backward
   - Kings are marked with a crown icon

## Installation

```bash
# Clone the repository
git clone https://github.com/lightonkalumba/checkers-game.git

# Navigate to project directory
cd checkers-game

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons

## Project Structure

```
src/
├── components/
│   ├── Board.tsx          # Game board component
│   └── GameInfo.tsx       # Game status and controls
├── types/
│   └── checkers.ts        # TypeScript type definitions
├── utils/
│   ├── gameLogic.ts       # Core game rules and logic
│   └── computerAI.ts      # AI opponent implementation
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## Game Logic Highlights

- **Board Initialization**: Sets up standard 8x8 checkers board with pieces in starting positions
- **Move Validation**: Ensures all moves follow official checkers rules
- **Capture Detection**: Automatically identifies and enforces mandatory captures
- **King Promotion**: Automatically crowns pieces reaching the opposite end
- **Win Condition**: Checks for victory after each move

## AI Implementation

The computer opponent uses a minimax algorithm with:
- **Depth-limited search**: Looks ahead 3 moves for optimal performance
- **Alpha-beta pruning**: Reduces computation time significantly
- **Position evaluation**: Considers piece count, king status, and board position
- **Smart move selection**: Prioritizes captures and strategic positioning

## Contributing

Feel free to fork this project and submit pull requests. All contributions are welcome!

## Author

**Lighton Kalumba**
- GitHub: [@lightonkalumba](https://github.com/lightonkalumba)

## License

MIT License - feel free to use this project for learning or portfolio purposes!

## Acknowledgments

- Built as a portfolio project to demonstrate modern web development skills
- Classic checkers rules based on international standards
- Inspired by timeless strategy games

---

Enjoy playing Checkers! May the best strategist win!
