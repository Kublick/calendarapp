import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
const localizer = momentLocalizer(moment);

moment.locale("es");

export const CalendarScreen = () => {
	const { events, activeEvent } = useSelector((state) => state.calendar);

	console.log(activeEvent);
	const dispatch = useDispatch();

	const [lastView, setLastView] = useState(
		localStorage.getItem("lastView") || "month"
	);

	const onDoubleClick = (e) => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem("lastView", e);
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: "#367CF7",
			borderRadius: "0px",
			opacity: 0.8,
			display: "block",
			color: "white",
		};

		return {
			style,
		};
	};

	// const onSelectedSlot = (e) => {
	// 	dispatch(eventClearActiveEvent());
	// };

	return (
		<div className="calendar-screen">
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				view={lastView}
			/>

			<AddNewFab />
			{activeEvent && <DeleteEventFab />}
			<CalendarModal />
		</div>
	);
};
