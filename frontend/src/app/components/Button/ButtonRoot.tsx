import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export type CombinedButtonProps = ButtonProps & MotionProps;

export default function ButtonRoot({ children, className, ...rest }: CombinedButtonProps) {
	return (
		<motion.button className={twMerge(`group flex items-center justify-center gap-2 transition-all duration-100`, className)} {...rest}>
			{children}
		</motion.button>
	);
}
