import React from "react"
import Profile from "./profile"
import "./login.css"

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "username": "",
            "password": "",
            isLogin: localStorage.getItem("accessToken") != null
        }
    }

    onLogoutSuccess = () =>{
        this.setState({isLogin : false})
    }

    setParams = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    login = () => {
       var newUser = {
        username : this.state.username,
        password : this.state.password
       }
        var myHeaders = new Headers()
        myHeaders.append("Content-Type","application/json")
    
        var raw = JSON.stringify(newUser)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          if (this.state.username === '' || this.state.password ===''){
            alert("Nhập đủ vào ô trống")
          }
          else{
          fetch("http://localhost:5000/login", requestOptions)
            .then(response => {
                console.log(response)
                if(response.ok){
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                localStorage.setItem("accessToken",result.accessToken)
                this.setState({isLogin: true})
             

            })

            .catch(error => {
                console.log('error', error)
                alert("Username,password không đúng")
            })
          }
    }

    render(){
      return     <div className="login-container"> 
      {this.state.isLogin ? (
        <Profile key={this.state.isLogin} onLogoutSuccess={this.onLogoutSuccess} />
      ) : (
        <form>
          <div>
            <label>Username:</label>
            <input type="text" name="username" onChange={this.setParams} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={this.setParams} />
          </div>
          <div>
            <button type="button" onClick={this.login}>Login</button>
          </div>
        </form>
      )}
    </div>
    }
}

