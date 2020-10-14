import React from "react";
import { useDispatch } from "react-redux";
import { startEventDelete } from "../../actions/events";

export const DeleteEventFab = () => {
	const dispatch = useDispatch();

	const handleDeleteEvent = () => {
		dispatch(startEventDelete());
	};

	return (
		<div>
			<button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
				<i className="fas fa-trash">
					<span> Borrar Evento</span>
				</i>
			</button>
		</div>
	);
};
