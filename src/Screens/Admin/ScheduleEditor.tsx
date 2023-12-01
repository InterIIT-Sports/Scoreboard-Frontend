import "handsontable/dist/handsontable.full.min.css";
import Handsontable from "handsontable/base";
import { HotTable } from "@handsontable/react";
import { registerCellType, TimeCellType } from "handsontable/cellTypes";

registerCellType(TimeCellType);

const ScheduleEditor = () => {
	return (
		<div className="usersContainer">
			<div className="top">Schedule Table</div>
			<HotTable
				style={{ marginTop: "5px" }}
				data={[["", "", "", ""]]}
				rowHeaders={true}
				columns={[
					{ type: "text" },
					{ type: "time", timeFormat: "h:mm:ss a", correctFormat: true },
					{ type: "text" },
					{ type: "text" },
				]}
				colHeaders={["Name", "Start Time", "Team 1", "Team 2"]}
				height="auto"
				minSpareRows={1}
				colWidths={[200, 100, 150, 150]}
				licenseKey="non-commercial-and-evaluation" // for non-commercial use only
			/>
		</div>
	);
};

export default ScheduleEditor;
