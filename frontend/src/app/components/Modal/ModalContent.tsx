import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export default function ModalContent({ children, className, ...rest }: ModalContentProps) {
	return (
		<div className={twMerge('h-full w-full', className)} {...rest}>
			{children}
		</div>
	);
}
