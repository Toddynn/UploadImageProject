import Image from 'next/image';

export interface CardArchiveImageProps {
	imageURL: string;
}
export function CardArchiveImage({ imageURL }: CardArchiveImageProps) {
	return (
		<Image
			src={imageURL}
			width={65}
			height={65}
			style={{ width: '65px', height: '65px', objectFit: 'contain' }}
			className="rounded-lg  object-contain"
			alt="preview"
		/>
	);
}
