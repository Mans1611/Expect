
export default function(arr1,arr2){
    const expected = [];

    for(let i = 0 ; i < arr2.length ; i++){
        const match = arr1.find((val,index)=> {
            if (val.matchId === arr2[i].matchId && val.fullTime=== false){
                arr1.splice(index,1);
                return val;
            }
        }
        );
        if(match)
            expected.push(match);   
        }
        console.log("done");
        return {arr1,expected} ; 

    }



