'use client';

import { ShortSlideFromBottomVariant } from '@/constants/animationConstants';
import api from '@/services/api';
import { Tooltip } from '@mui/material';
import { AxiosProgressEvent } from 'axios';
import { filesize } from 'filesize';
import { AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, ChevronDown, Link2, Upload } from 'lucide-react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { CardArchive } from './components/CardArchive';
import { DragAndDrop } from './components/DragAndDrop';
import { Modal } from './components/Modal';

export interface UploadedFile {
	file: File;
	id: string;
	name: string;
	readableSize: string;
	preview: string;
	progress: number;
	uploaded: boolean;
	error?: {
		failed: boolean;
		message?: string;
	};
	url: string | null;
}

export default function Home() {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

	const removeFile = useCallback(
		async (fileId: string) => {
			await api.delete(`posts/${fileId}`);
			const filteredUploadedFiles = uploadedFiles.filter((file) => file.id !== fileId);
			setUploadedFiles(filteredUploadedFiles);
		},
		[uploadedFiles],
	);

	const onDropFiles = (files: File[]) => {
		setShowModal(false);
		const newFiles: UploadedFile[] = files.map((file) => ({
			file,
			id: nanoid(),
			name: file.name,
			readableSize: filesize(file.size),
			preview: URL.createObjectURL(file),
			progress: 0,
			uploaded: false,
			error: {
				failed: false,
				message: '',
			},
			url: null,
		}));

		setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...newFiles]);

		Promise.all(newFiles.map(processUpload));
	};

	const processUpload = (file: UploadedFile) => {
		const data = new FormData();
		data.append('file', file.file, file.name);

		api.post(`posts`, data, {
			onUploadProgress: (e: AxiosProgressEvent) => {
				if (e.total) {
					const progress = Math.round((e.loaded * 100) / e.total);
					updateFile(file.id, {
						...file,
						progress: progress,
					});
				}
			},
		})
			.then((res) => {
				return updateFile(file.id, {
					...file,
					uploaded: true,
					id: res.data._id,
					url: res.data.url,
				});
			})
			.catch((err) => {
				return updateFile(file.id, {
					...file,
					error: {
						failed: true,
						message: err.response.data.message,
					},
				});
			});
	};

	const updateFile = (id: string, newFile: UploadedFile) => {
		setUploadedFiles((prevUploadedFiles) => prevUploadedFiles.map((file) => (file.id === id ? { ...file, ...newFile } : file)));
	};

	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-700 p-4">
			<Card.Root className="h-full rounded-lg">
				<Card.Header Text="Meus uploads" />
				<Card.Content className=" my-2 h-full max-h-[25%] w-full overflow-auto rounded-lg ">
					{uploadedFiles.map((file: UploadedFile) => {
						return (
							<CardArchive.Root key={file.id}>
								<CardArchive.Image imageURL={file.preview} />
								<CardArchive.Content>
									<CardArchive.File file={file} removeFile={() => removeFile(file.id)} error={file.error} />
									<CardArchive.Icons className="mr-4 flex flex-1 items-center justify-end gap-4">
										{!file.uploaded && !file.error?.failed && (
											<CircularProgressbar
												styles={{ root: { width: 26 }, path: { stroke: '#7159c1' } }}
												value={file.progress}
												maxValue={100}
												minValue={0}
											/>
										)}
										{file.url && (
											<Link href={file.url} target="_blank">
												<CardArchive.Icon icon={Link2} size={26} color="gray"></CardArchive.Icon>
											</Link>
										)}
										{file.uploaded && (
											<Tooltip title="Sucesso" arrow placement="top">
												<CardArchive.Icon icon={CheckCircle2} size={26} color="green" />
											</Tooltip>
										)}
										{!file.uploaded && file.error?.failed && <CardArchive.Icon icon={AlertCircle} size={26} color="red" />}
									</CardArchive.Icons>
								</CardArchive.Content>
							</CardArchive.Root>
						);
					})}
				</Card.Content>
				<Button.Root
					onClick={toggleModal}
					onDragEnter={() => setShowModal(true)}
					className="group absolute bottom-5 right-5 rounded-full bg-slate-700 p-4 hover:-translate-y-2 hover:bg-slate-600 "
				>
					<Button.Icon icon={Upload} color="white " />
				</Button.Root>
				<AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
					{showModal && (
						<Modal.Root
							variants={ShortSlideFromBottomVariant}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="xsm:right-5 bottom-24 h-auto min-w-[30%] gap-2 rounded-lg bg-slate-700 p-2"
						>
							<Modal.Content className=" h-full w-full  ">
								<Modal.Actions className="justify-end text-white">
									<Button.Root onClick={toggleModal} className="group rounded-full p-1 hover:bg-slate-600">
										<Button.Icon icon={ChevronDown} />
									</Button.Root>
								</Modal.Actions>
								<DragAndDrop maxSize={4 * 1024 * 1024} mainType="Imagens" onDropFiles={onDropFiles} maxFiles={10} />
							</Modal.Content>
						</Modal.Root>
					)}
				</AnimatePresence>
			</Card.Root>
		</main>
	);
}
