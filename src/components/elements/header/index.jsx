import React, { useState, useEffect, useRef } from 'react';
// Images
import Header1Img from '../../../assets/image/header/IMG_5499.jpg';
import Header2Img from '../../../assets/video/videoplayback.mp4';
import Header3Img from '../../../assets/image/header/IMG_5545.jpg';
import Header4Img from '../../../assets/image/header/IMG_5563.jpg';
import Header5Img from '../../../assets/image/header/IMG_5603-2.jpg';
import Header6Img from '../../../assets/image/header/IMG_5716.jpg';

import ChevronCircleLeftUnactiveImg from '../../../assets/svg/chevron.circle.left.unactive.svg';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightUnactiveImg from '../../../assets/svg/chevron.circle.right.unactive.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

const Header = () => {
    const mediaItems = [
        { type: 'image', src: Header1Img },
        { type: 'image', src: Header3Img },
        { type: 'image', src: Header4Img },
        { type: 'image', src: Header5Img },
        { type: 'image', src: Header6Img },
        // { type: 'video', src: Header2Img },

    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);
    const intervalRef = useRef(null);

    // Clear any existing interval
    const clearAutoAdvance = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Set up auto-advance for images
    const setupAutoAdvance = () => {
        clearAutoAdvance();
        
        if (!isHovered && mediaItems[currentIndex].type === 'image') {
            intervalRef.current = setInterval(() => {
                goToNext();
            }, 6000);
        }
    };

    useEffect(() => {
        setupAutoAdvance();
        
        return () => {
            clearAutoAdvance();
        };
    }, [currentIndex, isHovered]);

    useEffect(() => {
        // Handle video playback when switching slides
        if (mediaItems[currentIndex].type === 'video' && videoRef.current) {
            // Clear the auto-advance interval for videos
            clearAutoAdvance();
            
            // Play the video
            videoRef.current.play().catch(error => {
                console.log("Video autoplay prevented:", error);
            });
        } else {
            // Set up auto-advance for images
            setupAutoAdvance();
        }
    }, [currentIndex]);

    const goToPrev = () => {
        // Pause video if currently playing
        if (mediaItems[currentIndex].type === 'video' && videoRef.current) {
            videoRef.current.pause();
        }
        
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        // Pause video if currently playing
        if (mediaItems[currentIndex].type === 'video' && videoRef.current) {
            videoRef.current.pause();
        }
        
        setCurrentIndex(prevIndex =>
            prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToMedia = (index) => {
        // Pause video if currently playing
        if (mediaItems[currentIndex].type === 'video' && videoRef.current) {
            videoRef.current.pause();
        }
        
        setCurrentIndex(index);
    };

    const handleVideoEnd = () => {
        // When video ends, go to next slide
        goToNext();
    };

    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex === mediaItems.length - 1;

    return (
        <div className="Header-Group">
            <div
                className="Header-Section"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="header-carousel">
                    {mediaItems[currentIndex].type === 'image' ? (
                        <img
                            src={mediaItems[currentIndex].src}
                            alt={`Header ${currentIndex + 1}`}
                            className="header-image"
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            src={mediaItems[currentIndex].src}
                            className="header-video"
                            muted
                            loop={false}
                            playsInline
                            onEnded={handleVideoEnd}
                        />
                    )}
                    
                    <div className="Main-Outline"></div>

                    <div className="nav-left">
                        {isAtStart ? (
                            <img
                                src={ChevronCircleLeftUnactiveImg}
                                alt="Previous (disabled)"
                                className="nav-icon"
                            />
                        ) : (
                            <button onClick={goToPrev} className="nav-button">
                                <img
                                    src={ChevronCircleLeftActiveImg}
                                    alt="Previous"
                                    className="nav-icon"
                                />
                            </button>
                        )}
                    </div>

                    <div className="nav-right">
                        {isAtEnd ? (
                            <img
                                src={ChevronCircleRightUnactiveImg}
                                alt="Next (disabled)"
                                className="nav-icon"
                            />
                        ) : (
                            <button onClick={goToNext} className="nav-button">
                                <img
                                    src={ChevronCircleRightActiveImg}
                                    alt="Next"
                                    className="nav-icon"
                                />
                            </button>
                        )}
                    </div>

                    <div className="dots-container">
                        {mediaItems.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToMedia(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;