import { UploadedFile } from '@/app/page';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button';

export interface CardArchiveFileProps extends HTMLAttributes<HTMLDivElement> {
	file: UploadedFile;
	error?: {
		failed: boolean;
		message?: string;
	};
	removeFile(id: string): void;
}
export function CardArchiveFile({ file, className, removeFile, error, ...rest }: CardArchiveFileProps) {
	return (
		<div className={twMerge('flex max-w-[60%] flex-col justify-between font-semibold', className)} {...rest}>
			<p className="line-clamp-1">{file.name}</p>
			<span className="flex cursor-default gap-4 font-normal text-gray-600">
				{file.readableSize}

				{!file.uploaded && error?.failed ? (
					<Tooltip title={`${error.message}`} placement="bottom" arrow TransitionComponent={Zoom}>
						<span> - Não foi possível fazer o upload</span>
					</Tooltip>
				) : (
					' '
				)}
				{file.url && (
					<Button.Root onClick={() => removeFile(file.id)}>
						<Button.Text text="Excluir" className="text-red-400" />
					</Button.Root>
				)}
			</span>
		</div>
	);
}
