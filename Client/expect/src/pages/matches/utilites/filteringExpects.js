
export default function(arr1,arr2){
    
    for(let i = 0 ; i < arr2.length ; i++){

        const match = arr1.find((val,index)=> {
            if (val.matchId === arr2[i].matchId){
                /* so if the game matches with the expect for this user it will put a flage
                 in this match, so the user knows he has already expect this match */ 
                arr1[index].expected = true;   
                return val;
            }
        }
        ); 
    }
    return arr1;
}





