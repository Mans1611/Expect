
export const CreatePlayerObject = (playerArr,playerName)=>{
let mutatePlayer = null
    playerArr.find((player,index)=> {
        
        if(player.playerName === playerName){
            mutatePlayer = {...player,index:index};
        }
    }) 
    return mutatePlayer
}