import { User } from "../../types/User";

const Users = ({ users }: { users: User[] }) => {
	return (
		<>
			{users.map((user, i) => (
				<div key={i}>{user.name}</div>
			))}
		</>
	);
};

export default Users;
