import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export default function CardFooter({ children, className, ...rest }: CardFooterProps) {
	return (
		<div className={twMerge(` w-full`, className)} {...rest}>
			{children}
		</div>
	);
}
