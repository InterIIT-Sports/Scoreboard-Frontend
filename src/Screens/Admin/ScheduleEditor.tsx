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
import { useEffect, useRef } from "react";
import "./ScheduleEditor.css";

registerCellType(TimeCellType);
registerCellType(DropdownCellType);
registerCellType(DateCellType);

registerPlugin(ExportFile);

const ScheduleEditor = ({ teams }: { teams: Team[] }) => {
	const hotRef = useRef<HotTable | null>(null);

	const saveTableData = async () => {
		const hot = hotRef?.current?.hotInstance;
		const data = hot?.getData();
		console.log(data); //data to be sent to the server
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
					minSpareRows={10}
					colWidths={[150, 150, 150, 100, 100, 100, 150, 150]}
					licenseKey="non-commercial-and-evaluation" // for non-commercial use only
				/>
			</div>
		</div>
	);
};

export default ScheduleEditor;
