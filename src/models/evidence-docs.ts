import { v4 as uuidv4 } from 'uuid';
import { EvidenceDoc, CreateEvidenceDocRequest, UpdateEvidenceDocRequest } from '../types';
import * as evidenceDocsDb from '../db/evidence-docs';

export function getAll(): EvidenceDoc[] {
  return evidenceDocsDb.getAllEvidenceDocs();
}

export function getById(id: string): EvidenceDoc | null {
  return evidenceDocsDb.getEvidenceDocById(id);
}

export function create(request: CreateEvidenceDocRequest): EvidenceDoc {
  const now = new Date().toISOString();
  const doc: EvidenceDoc = {
    id: uuidv4(),
    title: request.title,
    description: request.description,
    sections: request.sections,
    patientId: request.patientId,
    createdAt: now,
    updatedAt: now,
    createdBy: request.createdBy,
    status: request.status || 'draft',
  };
  
  evidenceDocsDb.insertEvidenceDoc(doc);
  return doc;
}

export function update(id: string, request: UpdateEvidenceDocRequest): EvidenceDoc | null {
  return evidenceDocsDb.updateEvidenceDoc(id, {
    title: request.title,
    description: request.description,
    sections: request.sections,
    status: request.status,
  });
}

export function remove(id: string): EvidenceDoc | null {
  return evidenceDocsDb.deleteEvidenceDoc(id);
}

