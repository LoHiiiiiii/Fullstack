import { Link } from 'react-router-dom'

const Menu = ({ links, name, handleLogout }) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            {links.map(
                (link) => (<Link key={link.name} style={padding} to={link.address}>{link.name}</Link>)
            )}
            {name} logged in
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Menu