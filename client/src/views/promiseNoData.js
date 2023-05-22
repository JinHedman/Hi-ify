function promiseNoData(promise, data, error){
    if(promise === null){
        return <span>no data</span>;
    }else if(data === undefined && error === null){
        return <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif"/>;
    }else if(data === null && error != null){
        return <span>!!!Error!!!</span>;
    }else{
        return <div>Hello world</div>;
    }

}