# 📘 Reflection and Rationale

---

## 📐 1. Design Choices

### a. Language & Framework
I chose **Node.js (Express)** for its fast setup, lightweight nature, and suitability for JSON-based microservices. It also allowed for quick development and easy YAML integration.

### b. Rule Loading via YAML
Rules are stored in a human-readable `rules.yaml` file, which is loaded using `js-yaml`. YAML allows stakeholders (non-devs) to understand or edit rules easily without touching code.

### c. Rule Evaluation Logic
- Rules are stored in memory as an array.
- A simple **first-match evaluation** approach is used (i.e., the first matching rule in the file is applied).
- This approach is fast and intuitive for small to medium rule sets.

### d. Modular Structure
Each concern was separated:
- `promotionEngine.js`: Rule matching logic
- `ruleLoader.js`: YAML parsing and rule loading
- `validators.js`: Validating incoming player payload
- `metrics.js`: Tracks evaluation count, hits, misses, latency
- `server.js`: API routing layer

This modular design supports **scalability** and **easy debugging**.

---

## ⚖️ 2. Trade-offs

### a. Simplicity vs. Performance
I chose **simple linear rule evaluation** over more optimized structures like decision trees or indexes. This makes the logic easier to reason about and debug, but may impact performance with very large rule sets.

### b. In-memory storage
Rules are loaded into memory for fast access. This works well here, but in a production scenario with dynamic rule editing, I'd consider a database-backed or cache-enabled solution.

### c. No rule priority system
I opted for **first-match wins** based on file order. In future iterations, we could add a `priority` field or a scoring system to handle multiple matching rules more flexibly.

---

## ❓ 3. Areas of Uncertainty

### a. Conflicting rules
The assignment mentioned “conflicting rules,” but didn't specify resolution logic. I assumed that the rules are ordered by priority in the YAML and selected the **first matching rule**. This could be replaced by a weighted random or max-priority strategy.

### b. Validation strictness
I enforced strict type checks for player payloads (e.g., level must be a number), but real systems may need more tolerance (e.g., auto-convert strings to numbers).

---

## 🤖 4. AI Assistance

### a. ChatGPT
I used **ChatGPT** for the following:
- Generating the initial folder and file structure
- Drafting reusable helper functions (`ruleLoader`, `metrics`)
- Creating basic test case templates and curl examples

All AI-generated code was **reviewed, modified, and extended manually**. The final logic, validations, and edge-case handling were implemented by me.

### b. GitHub Copilot
Used occasionally for auto-completing condition checks and common Express patterns.

---

## ✅ 5. Final Thoughts

This project reinforced the importance of:
- Clean modular code
- Clear rule separation
- Validation and metrics in microservices

In production, I’d add:
- Rule editing UI for admins
- Rule versioning
- Redis or DB-based rule cache
- A/B testing support and scheduling windows