import React, { useEffect } from 'react'
import JOTA from '../../images/JOTA.png';
import Silva from '../../images/Bernardo.png';
import In from '../../images/arrownIn.png';
import out from '../../images/arowout.png';

const SubstittePlayerSection = () => {


    useEffect(()=>{
        let imgsContainer = document.getElementById('substitue-img-container');

        let observer = new IntersectionObserver((entries)=>{    
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    document.getElementsByClassName('left-img')[1].classList.add('outPlayer'); // since we have two items with the same class.
                    document.getElementsByClassName('right-img')[1].classList.add('playerin');
                    document.getElementsByClassName('arrow')[0].classList.add('out');
                    document.getElementsByClassName('arrow')[1].classList.add('in');
                    document.getElementsByClassName('imgs-container')[1].classList.add('subtituteBackground');

                }
            })
        },{
            threshold:0.3
        });
        if(imgsContainer)
            observer.observe(imgsContainer)
    },[])



  return (
    <div id = 'substitue-img-container' className='GoldenPlayerSection '>
       
        <div  id='substitute-Container' className={`imgs-container`}>
            <div className="players-image-container">
                <img src={JOTA}  className="playerImg-golden left-img" />
                <img src={In}  className="arrow" />
                <img src={Silva}  className="playerImg-golden right-img" />
                <img src={out}  className="arrow" />
            </div>
            

        </div>
            <div className="body-container subs">
                <h1 className='subs-title'>Substitution in the Half-Time</h1>
                <p> - Furstraution is Part of our Life, but here you try to give tou chance to avoid it.</p>
                <p> - At the <span> Only the  Half Time</span> you can substitute just <span> one </span> Player of your 4 picked Player</p>
                <p> - Your Sub out Player's points will be <span> removed </span> from your Total Points </p>
                <p>- You will just take your sub-In player's points in the Second Half. In other words the First-Half Points <span> will not be added </span> to your points   </p>
            </div>
    </div>
  )
}

export default SubstittePlayerSection