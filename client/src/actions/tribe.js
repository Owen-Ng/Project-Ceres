const log = console.log

export const inviteFamily = (user) => {
    const url = `/family/invite/${user}`;
    const request = new Request(url,{
        method:"PATCH",
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

export const inviteTribe = (user, tribe) => {
    
    const url = `/family/invite/${user}`;
    const request = new Request(url,{
        method:"PATCH",
        body: JSON.stringify({"tribeName": tribe}),
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
