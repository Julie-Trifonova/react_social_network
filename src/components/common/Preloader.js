import preloader from "../../assets/images/gif-loading.gif";
import React from "react";

const Preloader = (props) => {
    return (
        <div>
            <img src={preloader} alt=''/>
        </div>
    )
}

export default Preloader