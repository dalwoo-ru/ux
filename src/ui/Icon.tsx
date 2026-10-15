import { icons, type IconName } from './icons.generated';

export type { IconName };

/** Иконка из набора baseui (line). Файл icons.generated.ts собирается скриптом `npm run icons`. */
export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={size} height={size} className={className} aria-hidden="true" style={{ flex: 'none' }}
      dangerouslySetInnerHTML={{ __html: icons[name] }} />
  );
}
