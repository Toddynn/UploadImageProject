import { HTMLAttributes, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardArchiveIconProps extends HTMLAttributes<HTMLOrSVGImageElement> {
	icon: ElementType;
	size?: number;
}

export function CardArchiveIcon({ icon: Icon, className, size, ...rest }: CardArchiveIconProps) {
	return <Icon className={twMerge(``, className)} size={size} {...rest} />;
}
