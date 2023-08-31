import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export default function CardContent({ children, className, ...rest }: CardContentProps) {
	return (
		<div className={twMerge(`styledScroll flex h-full w-full flex-1 flex-col gap-2`, className)} {...rest}>
			{children}
		</div>
	);
}
