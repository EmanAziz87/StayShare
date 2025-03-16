import '../styles/tenantBox.css';
const TenantBox = ({residence}) => {
    return (
        <div className="tenant-box-container">
            {residence.users?.length ? residence.users.map((user) => (
                    <div key={user.id}>
                        <div>{user.userName}</div>
                        <br />
                    </div>
                )) : 'No users in this residence'}
        </div>
    )
}

export default TenantBox;