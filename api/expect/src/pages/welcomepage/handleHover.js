


export const handleHover = (index)=>{
    const flipcard = document.getElementsByClassName('card-face')[index];
    flipcard.style.transform = 'translateY(-500px)';
    flipcard.style.transition = 'transform 400ms';
    
    flipcard.addEventListener('mouseleave',()=>{
        flipcard.style.transform = 'translateY(0)';
        flipcard.style.transition = 'transform 400ms';
    })
  }