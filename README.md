# pro690final
This repository contains code for PRO690 Final Exam

# Code owners
- Joanna Banasik
- Ilya Redkin

# Prerequisites
- node.js 

# Local setup
```bash
npm install
npm start
```
Open localhost:3000 in the browser


# Docker setup
#### Dockerfile
1. Build container ``docker build -t memory-game .``

2. Run container ``docker run -dp 3000:3000 memory-game``

3. Open ``localhost:3000`` in the browser

#### docker-compose.yml
1. Run ``docker compose up``
2. Open ``localhost:3000`` in the browser