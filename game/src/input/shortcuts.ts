import type { EnergyStrategyId } from '../core/types';

export interface ShortcutHandlers {
  onStrategy: (id: EnergyStrategyId) => void;
  onUpgrade: () => void;
  onCloseModal: () => void;
  onOpenSave: () => void;
  onDebug: () => void;
}

export function registerShortcuts(handlers: ShortcutHandlers): void {
  document.addEventListener('keydown', (e) => {
    const target = e.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
    ) {
      return;
    }
    switch (e.key) {
      case '1':
        handlers.onStrategy('excavation');
        break;
      case '2':
        handlers.onStrategy('balanced');
        break;
      case '3':
        handlers.onStrategy('refinement');
        break;
      case 'u':
      case 'U':
        handlers.onUpgrade();
        break;
      case 'Escape':
        handlers.onCloseModal();
        break;
      case 'm':
      case 'M':
        handlers.onOpenSave();
        break;
      case '`':
      case '~':
        handlers.onDebug();
        break;
      default:
        break;
    }
  });
}

