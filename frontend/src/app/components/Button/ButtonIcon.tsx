import { ElementType, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends HTMLAttributes<HTMLOrSVGImageElement> {
	icon: ElementType;
	size?: number;
}

export default function ButtonRoot({ icon: Icon, className, size, ...rest }: ButtonProps) {
	return <Icon className={twMerge(``, className)} {...rest} size={size} />;
}
