import { faArrowDownAZ, faArrowDownZA, faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactBar({find, sort}) {

    const [btnShow, setBtnShow] = useState(false)
    const btnClick = (type) => {
        sort(type)
        setBtnShow(!btnShow)
    }

    return (
        <div className="contact-bar">
            {!btnShow && <button onClick={() => btnClick('desc')}><FontAwesomeIcon icon={faArrowDownZA}/></button>}
           {btnShow && <button onClick={() => btnClick('asc')}><FontAwesomeIcon icon={faArrowDownAZ}/></button>}
            <div className="search">
                <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input type="text" name="keyword" id="keyword" onKeyUp={(e) => find(e.target.value)}/>
            </div>
            <Link to="/add"><FontAwesomeIcon icon={faUserPlus}/></Link>
        </div>
    )
}