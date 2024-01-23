import React, { useState } from "react";

import "./videosSection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopUp from "../../../components/videoPopUp/VideoPopUp";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../playIcon";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <article className="videosSection">
            <ContentWrapper>
                <section className="sectionHeading">Official Videos</section>
                {!loading ? (
                    <section className="videos">
                        {data?.results?.map((video) => (
                            <div
                                className="videoItem"
                                key={video.id}
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </section>
                ) : (
                    <section className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </section>
                )}
            </ContentWrapper>
            <VideoPopUp
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </article>
    );
};

export default VideosSection;