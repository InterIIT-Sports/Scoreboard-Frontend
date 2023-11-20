const TeamRow = ({
	team,
	onDelete,
}: {
	team: { name: string };
	onDelete: (teamToDelete: any) => void;
}) => {
	return (
		<tr>
			<td>{team.name}</td>
			<td>
				<button onClick={() => onDelete(team)} className="styledButton">
					Delete
				</button>
			</td>
		</tr>
	);
};

export default TeamRow;
