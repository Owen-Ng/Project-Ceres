const log = console.log

export const getFamilyName = async (user) => {
    if (!user) {
        return null;
    }
    if (!user.pending) {
        return null;
    } else {
        const fid = user.pending;
        const url = `/family/${fid}`
        const request = new Request(url,{
            method:"get",
            headers:{
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
        const response = await fetch(request, {});
        const json = await response.json();
        const name = json.familyName;

        return name;

    }
}

export const createFamily = (name) =>{
    const url = "/family";
    const request = new Request(url,{
        method:"post",
        body: JSON.stringify({"familyName": name}),
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

export const createTribe = (name) =>{
    const url = "/tribe";
    const request = new Request(url,{
        method:"post",
        body: JSON.stringify({"tribeName": name}),
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

// export const createFamily = (name) =>{
//     const url = "/family";
//     fetch(url).then(res => {
//         if(res.status === 200){
//             log(res.json());

//         }else{
//             log("Could not get data");
//         }
//     }).then(json => {
//         name.setState({name: json});

//     }).catch(error => {
//         log(error)
//     })
// }