import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardArchiveContentProps extends HTMLAttributes<HTMLDivElement> {}
export function CardArchiveContent({ children, className, ...rest }: CardArchiveContentProps) {
	return (
		<div className={twMerge('flex h-full flex-1 items-center justify-between', className)} {...rest}>
			{children}
		</div>
	);
}
