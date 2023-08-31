export const ShortSlideFromBottomVariant = {
	hidden: {
		y: '50px',
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: '200px',
		opacity: 0,
		transition: {
			duration: 0.6,
		},
	},
};
