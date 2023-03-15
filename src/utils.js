export function dataHandle(data){
    if(!Array.isArray(data)){
        console.error("data not Array") ;
        return false;
    }
    let arr = data;
    for(let i = 0; i < arr.length; i++){
        arr[i].uid = i + 1; 
    }
    return arr;
}
