import { useRef, useState } from "react";
import TeamRow from "./components/TeamRow";

const Teams = ({
	teams,
	onTeamAdd,
	onTeamDelete,
}: {
	teams: any;
	onTeamAdd: (teamToAdd: any) => void;
	onTeamDelete: (teamToDelete: any) => void;
}) => {
	const addTeamDialog = useRef<HTMLDialogElement | null>(null);
	const [newTeamName, setNewTeamName] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const openDialog = () => {
		addTeamDialog.current?.showModal();
	};
	const closeDialog = () => {
		addTeamDialog.current?.close();
	};

	const handleAddTeam = (e: any) => {
		e.preventDefault();
		if (newTeamName === "") {
			setErrorMsg("Enter Name!");
			setTimeout(() => setErrorMsg(""), 3000);
			return;
		}
		onTeamAdd({ name: newTeamName });
		addTeamDialog.current?.close();
	};

	return (
		<div className="usersContainer">
			<div className="top">
				<button onClick={openDialog} className="styledButton">
					Add Team
				</button>
				<dialog ref={addTeamDialog}>
					<button className="styledButton" onClick={closeDialog}>
						Close
					</button>
					<h3>Add Team Details</h3>
					<form onSubmit={handleAddTeam}>
						<div>
							<label>Name</label>
							<input
								name="Name"
								onChange={(e) => setNewTeamName(e.target.value)}
								value={newTeamName}
								className="styledInput"
							/>
						</div>
						<button className="styledButton" type="submit">
							Add
						</button>
					</form>
					{errorMsg}
				</dialog>
			</div>
			<div className="main">
				<table>
					<thead>
						<tr>
							<td>Team Name</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{teams.map((team: any, i: number) => (
							<TeamRow key={i} team={team} onDelete={onTeamDelete} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Teams;
