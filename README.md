# Qivanta 2.0 — Stage 3 Foundation

Intelligent Queue Management, Smart Entry and Crowd Flow Optimization.

## What's included
- `backend/`: Java 21 + Spring Boot REST API
- `frontend/`: React + Vite dashboard
- `docs/`: Stage 3 architecture and next implementation milestones

This is the first runnable foundation, not the complete Qivanta product. QR ticket issuance, PostgreSQL persistence, authentication and ESP32 communication are the next milestones.

## Run the backend
Prerequisites: Java 21 and Maven 3.9+.

```bash
cd backend
mvn spring-boot:run
```

API: http://localhost:8080/api/health  
Gate list: http://localhost:8080/api/gates  
Recommendation: `POST http://localhost:8080/api/gates/recommend`

Example request:
```json
{"visitorCount": 1}
```

## Run the frontend
Prerequisites: Node.js LTS and npm.

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

The frontend expects the backend at `http://localhost:8080`. Start both applications.

## Current gate recommendation logic
The demo API selects the eligible gate with the lowest occupancy percentage, excluding gates marked CLOSED or FULL. It is a deterministic rule-based baseline, not AI.

## Safety
Use hardware only with a supervised miniature model gate. Do not connect this prototype to a real public-venue barrier.
