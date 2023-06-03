import React from "react"
import "./login.css"

export default class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "user": "",
        }
    }


    componentDidMount() {
        this.loadDataProfile()
    }

loadDataProfile = () =>{
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:4000/posts", requestOptions)
  .then(response =>  response.json()
  
  )
  .then(result => {
    console.log(result);
    if (Array.isArray(result) && result.length > 0) {
      const firstUser = result[0]
      this.setState({ user: firstUser })
    }
})
  .catch(error => {
    console.log('error', error)
    this.logout()
});
}

logout = ()=> {
//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

// var requestOptions = {
//   method: 'DELETE',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("http://localhost:5000/logout", requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     console.log(result)
//     localStorage.removeItem("accessToken")
//     this.props.onLogoutSuccess()
//   })
//   .catch(error => console.log('error', error));
    localStorage.removeItem("accessToken")
     this.props.onLogoutSuccess()
}

render(){
    return  <div className="profile-container"> 
    <div className="profile-info">
      <div className="profile-name">Name: {this.state.user.name}</div>
      <div className="profile-phone">Phone: {this.state.user.phone}</div>
    </div>
    <button type="button" onClick={this.logout}>Logout</button>
  </div>
}


}