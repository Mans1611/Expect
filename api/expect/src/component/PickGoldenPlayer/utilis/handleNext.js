
export const handleNext = (previous,next)=>{
    const previousElement = document.getElementById(previous);
    const nextElement = document.getElementById(next);
   if(previousElement)
        previousElement.style.transform = `translateX(-100%)` ;
    if(nextElement)   {
        nextElement.style.display = 'block';
        nextElement.style.transform = 'translateX(0%)';
    } 

    
    setTimeout(() => {
        previousElement.style.display = 'none';
        if(nextElement)
            nextElement.style.opacity = 1;
    }, 200);
}

export const handleBack = (previous,next) =>{
    const previousElement = document.getElementById(previous);
    const nextElement = document.getElementById(next);
    if(previousElement){
        previousElement.style.transform = `translateX(0)` ;
        previousElement.style.display = 'block';

    }
    if(nextElement){
        nextElement.style.transform = 'translateX(100%)';
    }    

    setTimeout(() => {
        nextElement.style.display = 'none';
        previousElement.style.opacity = 1;
    }, 200);

}