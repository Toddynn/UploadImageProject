'use client';

import { filesize } from 'filesize';
import { UploadCloud } from 'lucide-react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

export interface DragAndDropProps {
	formatAccepted?: { [key: string]: string[] };
	maxFiles?: number;
	mainType: string;
	onDropFiles(files: File[]): void;
	maxSize: number;
}

export function DragAndDrop({ maxFiles, formatAccepted, mainType, onDropFiles, maxSize }: DragAndDropProps) {
	const acceptThis = formatAccepted ?? {
		'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
	};

	const dropzone = useDropzone({
		onDrop: onDropFiles,
		accept: acceptThis,
		maxSize: maxSize,
		maxFiles: maxFiles ?? 1,
	});

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
			<InputDragAndDrop mainType={mainType} dropzone={dropzone} />
			{maxFiles && <p className="text-sm font-normal text-white/80">{`Qtd máx: ${maxFiles} - Tam máx: ${filesize(maxSize)}`}</p>}
		</div>
	);
}

export interface InputDragAndDropProps {
	dropzone: DropzoneState;
	mainType: string;
}

export const InputDragAndDrop = ({ dropzone, ...props }: InputDragAndDropProps) => {
	const { getRootProps, getInputProps, isDragActive, isDragReject } = dropzone;

	const renderDragMessage = (isDragActive: Boolean, isDragReject: Boolean) => {
		if (!isDragReject && isDragActive) {
			return <p className="font-semibold">Solte aqui</p>;
		}
		if (!isDragReject) {
			return (
				<div className="flex flex-col items-center justify-center text-center text-sm">
					<p className="font-medium text-white/70">
						<span className="font-semibold text-white">Clique para enviar</span> ou arraste até aqui
					</p>
					<p className="text-placeholder font-normal">({props.mainType})</p>
				</div>
			);
		}
		if (isDragReject && isDragActive) {
			return (
				<p className="text-center font-medium">
					<span className="font-semibold">Alguns arquivos serão rejeitados</span>
				</p>
			);
		}
	};

	return (
		<div
			{...getRootProps()}
			className={twMerge(
				`mx-auto flex h-full min-h-[130px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-white text-white transition-all duration-150 hover:bg-slate-600`,
				!isDragReject && isDragActive && 'border-emerald-600 text-emerald-600',
				isDragReject && 'border-red-400 text-red-400',
			)}
		>
			<label onClick={(e) => e.preventDefault()} htmlFor="dropzone-file" className="cursor-pointer">
				<div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-[transparent] px-2 ">
					<UploadCloud className="animate-bounce" size={36} />
					{renderDragMessage(isDragActive, isDragReject)}
				</div>
			</label>
			<input {...getInputProps()} required id="dropzone-file" hidden />
		</div>
	);
};
