import type { SVGProps } from 'react';
type BrandIconProps = SVGProps<SVGSVGElement> & {
    size?: number;
};
// Brand marks are maintained separately because Lucide v1 no longer includes them.
export function GithubIcon({ size = 20, ...props }: BrandIconProps) {
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .9A11.1 11.1 0 0 0 8.49 22.53c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.08-1.23-5.08-5.49 0-1.21.43-2.2 1.15-2.97-.11-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.13A10.6 10.6 0 0 1 12 6.52c.94 0 1.88.13 2.76.37 2.11-1.43 3.05-1.13 3.05-1.13.61 1.53.22 2.66.11 2.94.72.77 1.15 1.76 1.15 2.97 0 4.27-2.61 5.21-5.09 5.49.4.35.75 1.04.75 2.11v2.72c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>
    </svg>);
}
export function LinkedinIcon({ size = 20, ...props }: BrandIconProps) {
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.32 10.85h-2.95V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.53V9.2h2.84v1.3h.04c.4-.75 1.36-1.55 2.79-1.55 2.98 0 3.57 1.96 3.57 4.5v5.3Z"/>
    </svg>);
}

