# Score Tracking Platform

A full-stack web application for managing matches, tracking player scores, and maintaining score history through a clean and user-friendly interface.

**Live Demo:** https://score-tracking-platform.vercel.app/

## Features

- **Match Management** — Create matches with multiple players.
- **Score Tracking** — Add and update player scores in real time.
- **Score History** — View previous score entries for each player.
- **Score Correction** — Correct scoring mistakes using the available correction functionality.
- **Player Re-entry** — Allow eligible players to rejoin a match.
- **Persistent Storage** — Store match and player data using MongoDB.
- **Responsive Interface** — Access the application from desktop and mobile browsers.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Node.js | Backend runtime |
| Express.js | REST API and server-side routing |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| Axios | API communication |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## Project Structure

```text
score-tracking-platform/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── package.json
├── public/
├── src/
├── package.json
├── package-lock.json
└── README.md
```

*Note: The directory listing above illustrates the main project structure. Your actual folders and files may vary.*

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/varshithareddy30/score-tracking-platform.git
cd score-tracking-platform
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory and add your MongoDB Atlas connection string using the environment variable name expected by your backend code.

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Replace the placeholder with your own connection string. If your `server.js` uses a different variable name, use that exact name instead.

**Security:** Never commit your `.env` file, database credentials, or secret keys to GitHub.

### 5. Start the backend

From the `backend` directory, run:

```bash
npm start
```

### 6. Start the frontend

Open a second terminal in the project root and run:

```bash
npm start
```

Open the local frontend URL displayed in your terminal.

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

The deployed frontend communicates with the backend through its configured API URL.

## Future Enhancements

- Player performance statistics
- Match summaries and leaderboards
- Improved mobile experience
- Exportable match reports

## Author

**Varshitha Reddy**

GitHub: https://github.com/varshithareddy30

---

If you find this project useful, feel free to explore the repository and try the live demo.
