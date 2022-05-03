import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
    if (!users) return null

    return(
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td> </td>
                        <td style={{ fontWeight: 'bold' }}>blogs created</td>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{(!user.name) ? 'Nameless user' : user.name}</Link>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default UserList