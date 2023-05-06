import preloader from "../../../assets/images/gif-loading.gif";
import React from "react";

const Preloader: React.FC = () => {
    return (
        <div>
            <img src={preloader} alt=''/>
        </div>
    )
}

export default Preloader