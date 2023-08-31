import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardRootProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export default function CardRoot({ children, className, ...rest }: CardRootProps) {
	return (
		<div
			className={twMerge(
				`relative flex max-h-[550px] min-h-[550px] w-full flex-col items-center justify-between rounded-lg bg-slate-100 p-8`,
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	);
}
