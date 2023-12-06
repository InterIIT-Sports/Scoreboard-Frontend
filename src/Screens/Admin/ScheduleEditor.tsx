/* eslint-disable react-hooks/exhaustive-deps */
import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";
import {
	registerCellType,
	TimeCellType,
	DropdownCellType,
	DateCellType,
} from "handsontable/cellTypes";
import { registerPlugin, ExportFile } from "handsontable/plugins";
import EventCatagories from "../../types/EventCategories";
import { Team } from "../../types/Team";
import { useRef, useContext, useState, useEffect, useMemo } from "react";
import "./ScheduleEditor.css";
import { ToastContext } from "../../Utilities/ToastContext";
import API from "../../Utilities/ApiEndpoints";
import Event from "../../types/Event";
import { useAuthHeader } from "react-auth-kit";
import { socket } from "../../Utilities/Socket";
import { MatchTypes } from "../../types/TennisEvent";

registerCellType(TimeCellType);
registerCellType(DropdownCellType);
registerCellType(DateCellType);

registerPlugin(ExportFile);

const getTime = (dateString: string, time: string) => {
	var dateParts = dateString.split("/");
	var dateObject = new Date(
		dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2]
	);
	function getSeconds(time: string): number {
		let timeParts = time.split(":");
		timeParts[3] = timeParts[2].split(" ")[1];
		timeParts[2] = timeParts[2].split(" ")[0];
		let seconds =
			(Number(timeParts[0]) * 60 + Number(timeParts[1])) * 60 +
			Number(timeParts[2]);
		if (timeParts[3] === "pm" || timeParts[3] === "PM") seconds += 12 * 60 * 60;
		return seconds;
	}
	dateObject.setTime(dateObject.getTime() + getSeconds(time) * 1000);
	return dateObject.getTime();
};

const makeEventsArrayForDatabase = (data: any[]) => {
	const events = data.map((arr: any[]) => {
		return {
			event: arr[0],
			matchType: arr[1],
			title: arr[2],
			subtitle: arr[3],
			startTime: getTime(arr[4], arr[5]),
			endTime: getTime(arr[4], arr[6]),
			teams: arr.slice(7, arr.indexOf(null, 2)),
		};
	});
	return events;
};

const ScheduleEditor = ({ teams }: { teams: Team[] }) => {
	const hotRef = useRef<HotTable | null>(null);
	const setToast = useContext(ToastContext).setToastMessage;
	const getAccessToken = useAuthHeader();

	const [allEvents, setAllEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	const completedEventsIndexes = useMemo(() => {
		let indexes: any[] = [];
		allEvents.forEach((e, i) => {
			if (e.isCompleted || e.isStarted) indexes.push(i);
		});
		return indexes;
	}, [allEvents]);

	useEffect(() => {
		const hot = hotRef?.current?.hotInstance;
		hot?.updateSettings({
			cells(row, col) {
				let cellProperties: any = {};
				if (completedEventsIndexes.includes(row)) {
					cellProperties.readOnly = true;
				}

				return cellProperties;
			},
		});
	}, [completedEventsIndexes]);

	const formatForTable = (events: any[]) => {
		const fEvents = events.map((e) => {
			return {
				...e,
				date: new Date(e.startTime).toLocaleDateString("en-GB"),
				startTime: new Date(e.startTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: true,
				}),
				endTime: new Date(e.endTime).toLocaleString("en-US", {
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					hour12: true,
				}),
			};
		});
		fEvents.forEach((e) => {
			e.teams.forEach((team: any, i: number) => {
				const key: string = "team" + i;
				e[key] = team.name;
			});
		});
		return fEvents as Event[];
	};

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		setAllEvents(formatForTable(result));
		setLoading(false);
	};

	const saveTableData = async () => {
		const hot = hotRef?.current?.hotInstance;
		const allRows = hot?.getData()!;
		const notCompletedEventsRows = allRows.filter(
			(row: any[], i) => !completedEventsIndexes.includes(i)
		);
		const validRows = notCompletedEventsRows!.filter((arr) => arr[0] !== null);
		if (validRows?.length === 0) {
			//set schedule as empty
			try {
				API.PostSchedule([], getAccessToken());
				setToast("Updated Schedule Successfully!");
			} catch (error: any) {
				try {
					setToast(JSON.parse(error.request.response).message);
				} catch {
					setToast("Could not connect with the Server");
					console.log(error);
				}
			}
			return;
		}
		for (let i = 0; i < validRows!.length; i++) {
			const row: any[] = validRows![i];
			let last = row.length;
			last = row.indexOf(null, 2) !== -1 ? row.indexOf(null, 2) : last;
			last =
				row.indexOf("", 2) !== -1 && row.indexOf("", 2) < last
					? row.indexOf("", 2)
					: last;
			if (last <= 8) {
				setToast("Incomplete Details in a Row!");
				return;
			}
		}
		const data = makeEventsArrayForDatabase(validRows!);
		//data to be sent to the server
		try {
			API.PostSchedule(data, getAccessToken());
			setToast("Updated Schedule Successfully!");
		} catch (error: any) {
			try {
				setToast(JSON.parse(error.request.response).message);
			} catch {
				setToast("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const updateEventsStatus = (data: string) => {
			const eventToBeUpdated = JSON.parse(data);
			setAllEvents((prev) =>
				prev.map((event) =>
					eventToBeUpdated.eventID === event._id
						? { ...event, isStarted: eventToBeUpdated.isStarted }
						: event
				)
			);
		};
		socket.on("eventStartOrEnd", updateEventsStatus);
		fetchEvents();

		return () => {
			socket.off("eventStartOrEnd", updateEventsStatus);
		};
	}, []);

	return (
		<div className="usersContainer">
			<div className="top" style={{ fontWeight: "600" }}>
				Schedule Table
			</div>
			{loading ? (
				<>Loading All Events Data..</>
			) : (
				<>
					<button
						className="styledButton"
						style={{ marginTop: "5px" }}
						onClick={saveTableData}
					>
						Save
					</button>

					<div
						className="tableContainer"
						style={{ overflowX: "hidden", maxHeight: "80vh" }}
					>
						<HotTable
							ref={hotRef}
							data={allEvents}
							style={{ marginTop: "5px", boxSizing: "border-box" }}
							rowHeaders={true}
							columns={[
								{
									data: "event",
									type: "dropdown",
									source: Object.values(EventCatagories),
								},
								{
									data: "matchType",
									type: "dropdown",
									source: Object.values(MatchTypes),
								},
								{ data: "title", type: "text" },
								{ data: "subtitle", type: "text" },
								{ data: "date", type: "date", correctFormat: true },
								{
									data: "startTime",
									type: "time",
									timeFormat: "h:mm:ss a",
									correctFormat: true,
								},
								{
									data: "endTime",
									type: "time",
									timeFormat: "h:mm:ss a",
									correctFormat: true,
								},
								{
									data: "team0",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "team1",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
								{
									data: "team2",
									type: "dropdown",
									source: teams.map((team) => team.name),
								},
							]}
							colHeaders={[
								"Event",
								"MatchType",
								"Name",
								"Subtite",
								"Date",
								"Start Time",
								"End Time",
								"Team 1",
								"Team 2",
								"Team 3",
							]}
							minSpareRows={2}
							colWidths={[150, 100, 150, 150, 100, 100, 100, 150, 150, 150]}
							licenseKey="non-commercial-and-evaluation" // for non-commercial use only
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ScheduleEditor;
