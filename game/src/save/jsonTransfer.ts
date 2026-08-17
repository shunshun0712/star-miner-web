import { parseSaveJson, serializeState } from '../core/save';
import type { GameState } from '../core/types';

export function downloadSaveFile(state: GameState): void {
  const blob = new Blob([serializeState(state)], { type: 'application/json' });
  downloadBlob(blob, `星际矿站存档_${new Date().toISOString().slice(0, 10)}.json`);
}

export function downloadCsvFile(name: string, csv: string): void {
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), name);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importSaveFile(file: File) {
  let text: string;
  try {
    text = await file.text();
  } catch {
    return { ok: false as const, error: '读取文件失败' };
  }
  return parseSaveJson(text);
}
