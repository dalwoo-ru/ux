// Отложенное сохранение теста при уходе со страницы: список тестов дожидается его завершения.
let pending: Promise<unknown> = Promise.resolve();
export const trackSave = (p: Promise<unknown>) => { pending = p.catch(() => undefined); return p; };
export const waitForSaves = () => pending;
