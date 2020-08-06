const log = console.log
export const getMap = (groceries) =>{
    const url = "/MapList";
    fetch(url).then(res => {
        if(res.status ===200){
            log(res.json()) ;

        }else{
            log("Could not get data");
        }
    }).then(json => {
        groceries.setState({groceries: json});

    }).catch(error => {
        log(error)
    })
}
export const addtime = (time, id) =>{
    const url = "/MapList" + id;
    const request = new Request(url,{
        method:"post",
        body: JSON.stringify({"timesubmitted": time}),
        headers:{
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request).then(function(res){
        if(res.status===200){
            log("Success");
        }else{
            log("failed")
        }
    }) .catch(error => {
        console.log(error);
    });
}