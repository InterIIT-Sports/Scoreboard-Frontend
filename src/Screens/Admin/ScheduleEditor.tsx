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
import { useRef, useContext } from "react";
import "./ScheduleEditor.css";
import { ToastContext } from "../../Utilities/ToastContext";

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
		if (timeParts[3] === "pm") seconds += 12 * 60 * 60;
		return seconds;
	}
	dateObject.setTime(dateObject.getTime() + getSeconds(time) * 1000);
	return dateObject.getTime();
};

const makeEventsArray = (data: any[]) => {
	const events = data.map((arr) => {
		return {
			event: arr[0],
			title: arr[1],
			subtitle: arr[2],
			startTime: getTime(arr[3], arr[4]),
			endTime: getTime(arr[3], arr[5]),
			teams: arr.slice(6),
			isStarted: false,
		};
	});
	return events;
};

const ScheduleEditor = ({ teams }: { teams: Team[] }) => {
	const hotRef = useRef<HotTable | null>(null);
	const setToast = useContext(ToastContext).setToastMessage;

	const saveTableData = async () => {
		const hot = hotRef?.current?.hotInstance;
		const validRows = hot?.getData()!.filter((arr) => arr[0] !== null);
		if (validRows?.length === 0) return;
		for (let i = 0; i < validRows!.length; i++) {
			const row: any[] = validRows![i];
			const last =
				row.indexOf(null) === -1 && row.indexOf("") === -1
					? row.length
					: Math.min(row.indexOf(null), row.indexOf(""));
			if (last <= 7) {
				setToast("Incomplete Details in a Row!");
				return;
			}
		}
		const data = makeEventsArray(validRows!);
		//data to be sent to the server
		console.log(data);
	};

	return (
		<div className="usersContainer">
			<div className="top" style={{ fontWeight: "600" }}>
				Schedule Table
			</div>
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
					style={{ marginTop: "5px", boxSizing: "border-box" }}
					rowHeaders={true}
					columns={[
						{ type: "dropdown", source: Object.values(EventCatagories) },
						{ type: "text" },
						{ type: "text" },
						{ type: "date", correctFormat: true },
						{ type: "time", timeFormat: "h:mm:ss a", correctFormat: true },
						{ type: "time", timeFormat: "h:mm:ss a", correctFormat: true },
						{ type: "dropdown", source: teams.map((team) => team.name) },
						{ type: "dropdown", source: teams.map((team) => team.name) },
					]}
					colHeaders={[
						"Event",
						"Name",
						"Subtite",
						"Date",
						"Start Time",
						"End Time",
						"Team 1",
						"Team 2",
					]}
					minSpareRows={5}
					colWidths={[150, 150, 150, 100, 100, 100, 150, 150]}
					licenseKey="non-commercial-and-evaluation" // for non-commercial use only
				/>
			</div>
		</div>
	);
};

export default ScheduleEditor;
