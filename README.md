# 🧠 Promotion Rule Engine

A flexible and extensible Node.js-based rule engine to evaluate player eligibility for promotions or offers in a gaming environment using YAML-based rules.

---

## 📦 Features

- ✅ Hot-reloadable rule definitions from `rules.yaml`
- ✅ Dynamic player input evaluation via POST request
- ✅ Modular design with separate validators and rule loader
- ✅ In-memory caching and basic performance metrics
- ✅ Easy rule editing via YAML

---
### Screenshot


## 📁 Project Structure
```bash
├── backend/
│ ├── server.js # Entry point
│ ├── ruleEngine.js # Core rule evaluation logic
│ ├── ruleLoader.js # Loads and parses rules from YAML
│ ├── validators.js # Validation utilities
│ ├── rules/
│ │ └── rules.yaml # YAML file defining promotion rules
│ └── reflection.md # Developer reflection and thought process
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm

### Installation

```bash
cd backend
npm install
```
### 🔧 Running the Server
```bash
nodemon server.js
# or
node server.js
```
### 📬 API Endpoints
POST /evaluate
Evaluate a player's data against the defined rules.

Request Body:
```bash
{
  "player_id": "user123",
  "total_spent": 500,
  "login_days": 12,
  "region": "NA"
}
```
Response:
json
```bash
{
  "player_id": "user123",
  "eligible_promotions": ["big_spender", "loyal_user"]
}
```
POST /reload-rules
Reloads the rules from the YAML file without restarting the server.
```bash
curl -X POST http://localhost:3000/reload-rules
```
GET /metrics
Returns evaluation statistics (number of requests, hits, misses, average latency).
```bash
curl http://localhost:3000/metrics
```
📘 Rule Format (rules/rules.yaml)
```bash
big_spender:
  conditions:
    - field: total_spent
      operator: ">="
      value: 500

loyal_user:
  conditions:
    - field: login_days
      operator: ">="
      value: 10
```
You can easily add more rules or complex conditions.

### 📄 Developer Notes
- ***Rules are cached in memory for performance.***
- ***Adding a new operator or validation field is easy — extend validators.js.***
- ***Rule loader parses YAML to JS objects for evaluation.***

### 🧪 Example
```bash
curl -X POST http://localhost:3000/evaluate \
  -H "Content-Type: application/json" \
  -d '{"player_id":"vikash","total_spent":600,"login_days":14}'
```
### 🧠 Reflection
See reflection.md for a detailed developer journal of the architecture and challenges.

### 🛠️ Future Improvements
- ***Add unit tests (Jest/Mocha)***
- ***Support nested and compound conditions (AND/OR)***
- ***Add UI for managing rules visually***
---
### ✍️ Author
Vikash Gupta
7th Semester, IIITN



