const date = `${(new Date().getMonth() + 1)<10 ? `0${(new Date().getMonth() + 1)}`:`${(new Date().getMonth() + 1)}`},${(new Date().getDate()<10) ? `0${new Date().getDate()}`: `${new Date().getDate()}`},${new Date().getFullYear()}`

export const FilterState = {
    date,
    round : null,
    title : "Today Matches"


}
export function ReduceFn (state,action){
    switch(action.type){
        case 'DateChange' :
            if(date === action.payload)
                return {title : `Today Matches`};
            else{
                const dateArr = action.payload.split(',')
                return {title : `Day ${dateArr[1]} - ${dateArr[0]}  Matches`};
            }
        case 'changeRound' : 
            if(action.payload === 'Final' || action.payload === '3rd Place Winner')
                return {title : `${action.payload} Match` };
            return {title : `${action.payload} Matches` };
        case 'expand':
            if(action.payload === 'See All Matches')
                return {title :'All Matches'};
            else {
                return {title :'Today Matches'};
            } 

        default : 
            return FilterState;    
        
    }
}