import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends HTMLAttributes<HTMLHeadElement> {
	text: string;
}

export default function ButtonRoot({ text, className, ...rest }: ButtonProps) {
	return (
		<h1 className={twMerge(``, className)} {...rest}>
			{text}
		</h1>
	);
}
