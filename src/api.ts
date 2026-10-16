import type { Answers, Block, Folder, ResponseRow, Test, TestSummary, User } from './types';

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

async function call<T>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let data: { error?: string } = {};
  try { data = await res.json(); } catch { /* пустой ответ */ }
  if (!res.ok) throw new ApiError(data.error || `Ошибка ${res.status}`, res.status);
  return data as T;
}

export const api = {
  me: () => call<{ user: User | null }>('GET', '/api/me'),
  register: (b: { email: string; password: string; name: string }) => call<{ user: User }>('POST', '/api/register', b),
  login: (b: { email: string; password: string }) => call<{ user: User }>('POST', '/api/login', b),
  logout: () => call<{ ok: true }>('POST', '/api/logout'),

  folders: () => call<{ folders: Folder[] }>('GET', '/api/folders'),
  createFolder: (name: string) => call<{ folder: Folder }>('POST', '/api/folders', { name }),
  renameFolder: (id: number, name: string) => call('PATCH', `/api/folders/${id}`, { name }),
  deleteFolder: (id: number) => call('DELETE', `/api/folders/${id}`),

  tests: () => call<{ tests: TestSummary[] }>('GET', '/api/tests'),
  createTest: (b: { title: string; folder_id: number | null }) => call<{ id: number }>('POST', '/api/tests', b),
  test: (id: number) => call<{ test: Test }>('GET', `/api/tests/${id}`),
  updateTest: (id: number, patch: { title?: string; blocks?: Block[]; published?: boolean; folder_id?: number | null }) => call('PUT', `/api/tests/${id}`, patch),
  duplicateTest: (id: number) => call<{ id: number }>('POST', `/api/tests/${id}/duplicate`),
  deleteTest: (id: number) => call('DELETE', `/api/tests/${id}`),
  results: (id: number) => call<{ test: Test; responses: ResponseRow[] }>('GET', `/api/tests/${id}/results`),
  deleteResponse: (testId: number, rid: number) => call('DELETE', `/api/tests/${testId}/responses/${rid}`),

  publicTest: (token: string, preview: boolean) => call<{ test: { title: string; blocks: Block[] } }>('GET', `/api/public/${token}${preview ? '?preview=1' : ''}`),
  startResponse: (token: string) => call<{ response_token: string }>('POST', `/api/public/${token}/responses`),
  saveResponse: (token: string, rtoken: string, answers: Answers, completed: boolean) =>
    call('PUT', `/api/public/${token}/responses/${rtoken}`, { answers, completed }),
};
