/* this function just filter the matches array to two arrays one for previous
 and other for the next matches which is not played yet, the filteration is depending 
 on fulltime status in the matches  */


 const FilterMatchesTimeLine = (matches) => {
    let pre = [],next = [];
    for(let match of matches){
        if(match.fullTime || match.matchStatue === "FT")
            pre.push(match);

        else{
            next.push(match);
        }
    }

    return [pre,next];

 }
 export default FilterMatchesTimeLine;