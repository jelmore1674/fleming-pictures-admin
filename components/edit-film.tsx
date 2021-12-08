import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { EditFilmContext } from '../context/edit-film.context';
import { Film } from '../pages/dashboard/films';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface Props {
	film: Film;
	openId: number;
}

export default function EditModal({ film, openId }: Props) {
	const { openEditModal, setOpenEditModal }: any =
		React.useContext(EditFilmContext);
	const [show, setShow] = React.useState(false);
	const handleClose = () => setOpenEditModal(false);

	return (
		<div>
			<Modal
				open={openId === film.id ? openEditModal : false}
				onClose={handleClose}
				disableScrollLock={true}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}></Box>
			</Modal>
		</div>
	);
}
