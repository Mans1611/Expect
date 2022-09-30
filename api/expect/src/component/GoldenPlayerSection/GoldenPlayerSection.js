import React, { useEffect,useState } from 'react'
import './goldenPlayerSection.scss';
import KDB from '../../images/kdb.png';
import Mane from '../../images/mane.png';
import Cout from '../../images/Cout.png';
import goldenPlayerfont from '../../images/goldenPlayerfont.png';



const GoldenPlayerSection = () => {

    useEffect(()=>{
        let imgsContainer = document.getElementById('imgs-container');

        let observer = new IntersectionObserver((entries)=>{    
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    document.getElementsByClassName('left-img')[0].classList.add('origin');
                    document.getElementsByClassName('right-img')[0].classList.add('origin');
                    document.getElementsByClassName('middle-img')[0].classList.add('origin');
                    document.getElementsByClassName('title')[0].classList.add('origin');
                    document.getElementsByClassName('imgs-container')[0].classList.add('newBackground');

                }
            })
        },{
            threshold:0.8
        });
        if(imgsContainer)
            observer.observe(imgsContainer)
    },[])
  

    return (
    <div id = 'golden-img-container' className='GoldenPlayerSection'>
       
        <div  id='imgs-container' className={`imgs-container `}>
            <div className="players-image-container">
                <img src={KDB}  className="playerImg-golden left-img" />
                <img src={Mane}  className="playerImg-golden middle-img" />
                <img src={Cout}  className="playerImg-golden right-img" />
                <img src={goldenPlayerfont}  className=" title" />
        </div>
        </div>
            <div className="body-container">
                <h1>Pick Your Golden Player</h1>
                <p> - The competition is long and of course you need a player who can get your back. The GoldenPlayer is your Back.</p>
                <p>- Pick any Player from any country, and your picked player's points will <span>added</span> to your Total Points and multiplied by <span>X2</span> .</p>
                <p> - Even if you span did not expect your Golden Player's match, you will get his match points.</p>
                <p>- You can change your golden player just <span>
                once</span> in the competition. so be careful about your picking.</p>
            </div>
    </div>
  )
}

export default GoldenPlayerSection