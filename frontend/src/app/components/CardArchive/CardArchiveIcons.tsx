import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardArchiveIconsProps extends HTMLAttributes<HTMLDivElement> {}

export function CardArchiveIcons({ children, className, ...rest }: CardArchiveIconsProps) {
	return (
		<div className={twMerge(`mr-4 flex flex-1 items-center justify-end gap-4`, className)} {...rest}>
			{children}
		</div>
	);
}
