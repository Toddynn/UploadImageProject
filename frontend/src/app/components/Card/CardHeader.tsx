import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardHeaderProps extends HTMLAttributes<HTMLParagraphElement> {
	Text: string;
}

export default function CardHeader({ Text, className, ...rest }: CardHeaderProps) {
	return (
		<p className={twMerge(`flex w-full text-lg font-bold`, className)} {...rest}>
			{Text}
		</p>
	);
}
