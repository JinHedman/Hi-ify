export default function HeaderView(props){
    return (
        <div className="header">
            <p className="headerTitle" onClick={()=>window.location.hash = "#start"}>Hi-ify</p>
        </div>
    );  
}