# Quick Start Guide

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

### Development Mode (with auto-restart on changes)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## Configuration

To change the port, create a `.env` file in the root directory:

```bash
PORT=8080
```

Or set the environment variable directly:

```bash
PORT=8080 npm start
```

## Project Structure

```
ai-readiness/
├── server.js           # Express server
├── package.json        # Dependencies and scripts
└── public/             # Static frontend files
    ├── index.html      # Main page
    ├── css/            # Stylesheets
    ├── js/             # JavaScript files
    ├── assets/         # Images and icons
    └── docs/           # Documentation
```

## Testing

1. Start the server: `npm start`
2. Open browser at `http://localhost:3000`
3. Take the assessment
4. View your results
5. Check server console for logged assessment data

## API

The server logs all assessment submissions to the console. See [API.md](API.md) for details.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change the port:
```bash
PORT=4000 npm start
```

### Static Files Not Loading
Make sure all files are in the `public/` directory and the server is running.

### Node Version
Requires Node.js 18.0.0 or higher. Check your version:
```bash
node --version
```

### Server Console Not Showing Logs
Make sure you're running the server with `npm start` or `npm run dev` in the terminal to see console output.
