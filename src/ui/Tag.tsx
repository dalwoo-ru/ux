import type { ReactNode } from 'react';
import { cx } from './cx';
import s from './Tag.module.css';

/** Tag из baseui (filled): secondary / success. */
export function Tag({ tone = 'secondary', children }: { tone?: 'secondary' | 'success'; children: ReactNode }) {
  return <span className={cx(s.tag, s[tone])}>{children}</span>;
}
