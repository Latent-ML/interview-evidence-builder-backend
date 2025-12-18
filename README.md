# Evidence Builder Backend

A simple TypeScript Express backend for managing clinical evidence documents.

## Quick Start

```bash
# Install dependencies
npm install

# Seed the database with sample data
npm run seed

# Run in development mode (with hot reload)
npm run dev
```

The server will start at **http://localhost:3210**

Data is persisted in SQLite at `evidence-builder.db` in the project root.

## API Endpoints

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| GET    | `/health`            | Health check                   |
| GET    | `/notes`             | Get all clinical notes         |
| GET    | `/labs`              | Get all lab results            |
| GET    | `/prescriptions`     | Get all prescriptions          |
| GET    | `/evidence-docs`     | Get all evidence documents     |
| GET    | `/evidence-docs/:id` | Get a single evidence document |
| POST   | `/evidence-docs`     | Create a new evidence document |
| PUT    | `/evidence-docs/:id` | Update an evidence document    |
| DELETE | `/evidence-docs/:id` | Delete an evidence document    |

## Example Requests

### Get all notes

```bash
curl http://localhost:3210/notes
```

### Get all labs

```bash
curl http://localhost:3210/labs
```

### Get all prescriptions

```bash
curl http://localhost:3210/prescriptions
```

### Create an evidence document

```bash
curl -X POST http://localhost:3210/evidence-docs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Evidence Document",
    "description": "A summary document",
    "patientId": "patient-001",
    "createdBy": "user-001",
    "sections": [
      { "type": "header", "level": 1, "text": "Document Title" },
      { "type": "paragraph", "text": "Introduction paragraph with **markdown** support." },
      { "type": "divider" },
      { "type": "note", "noteId": "note-1" },
      { "type": "lab", "labId": "lab-1" },
      { "type": "prescription", "prescriptionId": "rx-1" }
    ]
  }'
```

### Update an evidence document

```bash
curl -X PUT http://localhost:3210/evidence-docs/doc-1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "status": "final"
  }'
```

### Delete an evidence document

```bash
curl -X DELETE http://localhost:3210/evidence-docs/doc-1
```

## Data Schemas

### Note

- `id`: Unique identifier
- `author`: Object with `name`, `role`, optional `npi`
- `type`: One of `progress_note`, `consultation`, `discharge_summary`, `history_and_physical`, `procedure_note`, `other`
- `title`: Note title
- `content`: Markdown content
- `createdAt`, `updatedAt`: ISO 8601 timestamps
- `patientId`: Patient identifier
- `encounterId`: Optional encounter identifier

### Lab

- `id`: Unique identifier
- `type`: Lab test name (e.g., "Hemoglobin A1c")
- `code`: Optional LOINC code
- `value`: Result value (string or number)
- `unit`: Unit of measurement
- `referenceRange`: Optional object with `low` and `high`
- `date`: ISO 8601 timestamp
- `status`: One of `preliminary`, `final`, `corrected`
- `patientId`: Patient identifier

### Prescription

- `id`: Unique identifier
- `prescriber`: Object with `name`, optional `npi`, `deaNumber`
- `medication`: Object with `name`, `strength`, `form`, `rxcui`
- `dosingInstructions`: Free text instructions
- `quantity`, `quantityUnit`: Amount prescribed
- `daysSupply`: Number of days
- `startDate`, `endDate`: ISO 8601 dates
- `diagnoses`: Array of `{ code, description }`
- `status`: One of `active`, `completed`, `discontinued`, `on_hold`
- `patientId`: Patient identifier
- `writtenDate`: ISO 8601 timestamp

### Evidence Document

- `id`: Unique identifier
- `title`: Document title
- `description`: Optional description
- `sections`: Ordered array of section objects (see below)
- `patientId`: Patient identifier
- `createdAt`, `updatedAt`: ISO 8601 timestamps
- `createdBy`: User identifier
- `status`: One of `draft`, `final`, `archived`

### Evidence Section Types

| Type           | Fields                                      |
| -------------- | ------------------------------------------- |
| `header`       | `level` (1-6), `text`                       |
| `paragraph`    | `text` (supports markdown)                  |
| `divider`      | (no additional fields)                      |
| `note`         | `noteId`, optional `title` override         |
| `lab`          | `labId`, optional `title` override          |
| `prescription` | `prescriptionId`, optional `title` override |

## Scripts

```bash
npm run dev    # Development with hot reload
npm run seed   # Seed database with sample data
npm run build  # Build for production
npm start      # Run production build
```

## Project Structure

```
src/
├── index.ts              # Express app entry point
├── seed.ts               # Database seeding script
├── types/                # TypeScript type definitions
│   ├── index.ts
│   ├── note.ts
│   ├── lab.ts
│   ├── prescription.ts
│   └── evidence-doc.ts
├── db/                   # Database layer (SQLite)
│   ├── index.ts
│   ├── connection.ts
│   ├── notes.ts
│   ├── labs.ts
│   ├── prescriptions.ts
│   └── evidence-docs.ts
├── models/               # Business logic layer
│   ├── index.ts
│   ├── notes.ts
│   ├── labs.ts
│   ├── prescriptions.ts
│   └── evidence-docs.ts
└── controllers/          # API route handlers
    ├── index.ts
    ├── notes.ts
    ├── labs.ts
    ├── prescriptions.ts
    └── evidence-docs.ts
```
