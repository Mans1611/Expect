import '../../pages/welcomepage/welcome.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef, useState } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
const ExplenationWel = () => {
    const cardCont = useRef(null);
    const [more,setMore] = useState(false);
    const click = ()=>{
        cardCont.current.style.height = (cardCont.current.style.height === 'fit-content' ? '250px' : 'fit-content' ) ;
        setMore(!more);
    }
    return ( 
        <div className="wrapperPoint">
        
        <h1 className='headingPoint'>1)Expect<strong> Winner </strong>Of each Match</h1>
        <div ref={cardCont} className="cardExplainContainer"> 
            <div className="imgExplainContainer">
                <img className='explainImg' src="https://scoopempire.com/wp-content/uploads/2017/10/key-solution-ghana-info-news-technology-website-development-logo-design-graphic-design-software-application-networking-hardware-the-future-of-football-is-app.jpg"/>
            </div>
            <div className="explenationCont">
                <h2 >Easist One : </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error deserunt fuga tempore magni illum! Deserunt nobis reprehenderit laudantium. Temporibus rerum nisi enim ipsum natus, necessitatibus labore eius odio cumque animi!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error deserunt fuga tempore magni illum! Deserunt nobis reprehenderit laudantium. Temporibus rerum nisi enim ipsum natus, necessitatibus labore eius odio cumque animi
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error deserunt fuga tempore magni illum! Deserunt nobis reprehenderit laudantium. Temporibus rerum nisi enim ipsum natus, necessitatibus labore eius odio cumque animi
                </p>
            </div>
            <div className="explainBottom" onClick={()=>click()}>
                <span className="showmore">Show {!more?`More `:`Less`}</span>
                {!more?<KeyboardArrowDownIcon/>:<KeyboardArrowUp/>}
            </div>
        </div>

       </div>
     );
}
 
export default ExplenationWel;