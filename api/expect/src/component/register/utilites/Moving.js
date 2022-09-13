const moveToFirst = (e)=>{
    if(e)
        e.preventDefault();
    document.getElementById('formSlider').style.transform = "translateX(0px)"
}

const moveToSecond = (e)=>{
    if(e)
        e.preventDefault();
    const width = getComputedStyle(document.getElementsByClassName("divForm")[0]).width; // incase responsive pages so the width will be variable not static 
    document.getElementById('formSlider').style.transform = `translateX(-${width})`;
}

export  {moveToFirst,moveToSecond};