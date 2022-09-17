


export const handleHover = (index)=>{
    console.log(index);
    const flipcard = document.getElementsByClassName('card-face')[index];
    const parent = document.getElementsByClassName('card')[index];
    
    flipcard.style.transform = 'translateY(-500px)';
    flipcard.style.transition = 'transform 400ms';
    
    parent.addEventListener('mouseleave',()=>{
        flipcard.style.transform = 'translateY(0)';
        flipcard.style.transition = 'transform 400ms';
    })
  }