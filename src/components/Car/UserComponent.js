import React from 'react';
import userService from '../services/UserService';
import '../../styles/service.css'



class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    deleteUser = (userId) => {
        userService.deleteUser(userId).then((response) => {
          this.setState({ users: this.state.users.filter((user) => user.id !== userId) });
        });
      }

    componentDidMount(){
        userService.getUser().then((response) => {
            this.setState({ users: response.data})
        });
    }

    render (){
        return (
            <div className='user-table'>
                <h1 className = "text-center"> User List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> User Id</td>
                            <td> FirstName</td>
                            <td> LastName</td>
                            <td> DOB</td>
                            <td> Gender</td>
                            <td> Email</td>
                            <td> Mobile</td>
                            <td>Password</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                (user) => 
                                <tr key = {user.id}>
                                     <td> {user.id}</td>   
                                     <td> {user.firstname}</td>   
                                     <td> {user.lastname}</td>   
                                     <td> {user.dateOfBirth}</td> 
                                     <td> {user.gender}</td> 
                                     <td> {user.email}</td> 
                                     <td> {user.phone}</td> 
                                     <td> {user.password}</td> 
                                     <td>
                                        <button className="btn btn-danger" onClick={() => this.deleteUser(user.id)}>Delete</button>
                                     </td>
                                </tr>  
                            )
                        }
                        <tr>
                            <td><button style={{padding: "5px", borderRadius:"5px", background: "blue"}}><a style={{color: "white", textDecoration:"none"}} href="/admin">Go Back</a></button></td>
                        </tr>

                    </tbody>
                </table>

            </div>

        )
    }
}

export default UserComponent;