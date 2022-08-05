
export default function(arr1, arr2){
    let arrWithFlag = [];
    for(let i = 0 ; i < arr2.length ; i++){
        const match = arr1.find((val,index)=> {
            /* so if the game matches with the expect for this user it will put a 
            flage in this match, so the user knows he has already expect this match */ 
            if (val.matchId === arr2[i].matchId){
                arr1[index].expected = true;
                arrWithFlag.push(arr1[index])
                return val
            }
            else{
                arrWithFlag.push(val)
                return val;
            }
        });
    }
   
    return arrWithFlag;
}





