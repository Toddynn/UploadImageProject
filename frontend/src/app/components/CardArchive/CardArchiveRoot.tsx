import { MotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface CardArchiveRootProps extends MotionProps {
	className?: string;
}
export function CardArchiveRoot({ children, className, ...rest }: CardArchiveRootProps) {
	return (
		<motion.div className={twMerge('flex h-full max-h-24 w-full items-center gap-2 rounded-lg  p-1', className)} {...rest}>
			{children}
		</motion.div>
	);
}
