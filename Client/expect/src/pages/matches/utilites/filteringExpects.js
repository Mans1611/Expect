
export default function(arr1,arr2){
    const expected = [];
    for(let i = 0 ; i < arr1.length ; i++){
        for(let j = 0 ; j < arr2.length ; j++){
            if(arr1[i].matchId === arr2[j].matchId){
                expected.push(arr1[i]);
                arr1.splice(i,1);
            }
        }
    }

    return {arr1,expected} ; 

}
