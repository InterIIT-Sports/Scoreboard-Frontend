import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { HotTable } from "@handsontable/react";
import {
	registerCellType,
	TimeCellType,
	DropdownCellType,
	DateCellType,
} from "handsontable/cellTypes";
import EventCatagories from "../../types/EventCategories";
import { Team } from "../../types/Team";

registerCellType(TimeCellType);
registerCellType(DropdownCellType);
registerCellType(DateCellType);

const ScheduleEditor = ({ teams }: { teams: Team[] }) => {
	return (
		<div className="usersContainer">
			<div className="top">Schedule Table</div>
			<HotTable
				style={{ marginTop: "5px" }}
				data={[["", "", "", "", "", ""]]}
				rowHeaders={true}
				columns={[
					{ type: "dropdown", source: Object.values(EventCatagories) },
					{ type: "text" },
					{ type: "date", correctFormat: true },
					{ type: "time", timeFormat: "h:mm:ss a", correctFormat: true },
					{ type: "dropdown", source: teams.map((team) => team.name) },
					{ type: "dropdown", source: teams.map((team) => team.name) },
				]}
				colHeaders={["Event", "Name", "Date", "Start Time", "Team 1", "Team 2"]}
				minSpareRows={1}
				colWidths={[150, 200, 100, 100, 150, 150]}
				licenseKey="non-commercial-and-evaluation" // for non-commercial use only
			/>
		</div>
	);
};

export default ScheduleEditor;
