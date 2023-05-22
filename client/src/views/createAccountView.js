function CreateAccountView(props){
    return (
        <div className="startWindow">
            <div className="flexCenter">
                <p className="loginText">Username</p>
                <input placeholder="username"></input>
                <p className="loginText">Password</p>
                <input placeholder="Password"></input>
            </div>
        </div>
    );  
}
export default CreateAccountView;