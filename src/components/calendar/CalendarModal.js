import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
	eventClearActiveEvent,
	eventStartAddNew,
	eventStartUpdate,
} from "../../actions/events";
import { useEffect } from "react";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = now.clone().add(1, "hours");

const initEvent = {
	title: "",
	notes: "",
	start: now.toDate(),
	end: nowPlus.toDate(),
};

export const CalendarModal = () => {
	const { modalOpen } = useSelector((state) => state.ui);
	const { activeEvent } = useSelector((state) => state.calendar);
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(uiCloseModal());
		dispatch(eventClearActiveEvent());
		setFormValues(initEvent);
	};

	const [formValues, setFormValues] = useState(initEvent);

	const { title, notes, start, end } = formValues;

	const [titleValid, setTitleValid] = useState(true);

	useEffect(() => {
		if (activeEvent) {
			setFormValues(activeEvent);
		} else {
			setFormValues(initEvent);
		}
	}, [activeEvent, setFormValues]);

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const [dateStart, setDateStart] = useState(now.toDate());

	const handleStartDateChange = (e) => {
		setDateStart(e);
		setFormValues({
			...formValues,
			start: e,
		});
	};

	const [dateEnd, setDateEnd] = useState(nowPlus.toDate());

	const handleEndDateChange = (e) => {
		setDateEnd(e);
		setFormValues({
			...formValues,
			end: e,
		});
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();

		const momentStart = moment(start);
		const momentEnd = moment(end);
		console.log("submit");
		if (momentStart.isSameOrAfter(momentEnd)) {
			Swal.fire(
				"Error",
				"La fecha final debe ser mayor a la fecha de inicio",
				"error"
			);
			return;
		}

		if (title.trim().length < 2) {
			return setTitleValid(false);
		}

		if (activeEvent) {
			console.log("entro a eventStartUpdate");
			dispatch(eventStartUpdate(formValues));
		} else {
			dispatch(eventStartAddNew(formValues));
		}

		//TODO realizar grabacion db
		setTitleValid(true);
		closeModal();
	};

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			classNAme="modal"
			overlayClassName="modal-fondo"
		>
			{activeEvent ? <h1>Editar Evento</h1> : <h1>Nuevo Evento</h1>}
			<hr />
			<form className="container" onSubmit={handleSubmitForm}>
				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={dateStart}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>

					<DateTimePicker
						onChange={handleEndDateChange}
						minDate={dateStart}
						value={dateEnd}
						className="form-control"
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${!titleValid && "is-invalid"}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={title}
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						Una descripción corta
					</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={notes}
						onChange={handleInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
