import React from "react";
import ReactPlayer from "react-player/youtube";

import "./videoPopUp.scss";

const VideoPopUp = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                {videoId ? (
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls
                        width="100%"
                        height="100%"
                        playing={true}
                    />
                ) : (
                    <span className="noTrailer" >No Trailer Found</span>
                )},
            </div>
        </div>
    );
};

export default VideoPopUp;