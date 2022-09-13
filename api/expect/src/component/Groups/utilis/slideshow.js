export default function Slideshow(factor){
    const items = document.getElementsByClassName('content-container');
    let move = - factor * 1
    items[0].style.transform = `translateX(${move}00%)`;

    

    
    
}