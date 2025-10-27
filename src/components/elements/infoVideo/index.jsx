import React, { useState, useEffect, useRef } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';
import ArrayData1Img from '../../../assets/video/videoplayback.mp4';

const PlayCursor = '../../../../public/play.bubble.svg';
const PauseCursor = '../../../../public/pause.bubble.svg';

const Info = () => {
    const ArrayData = [
        { 
            id: 0, 
            image: ArrayData1Img, 
            title:'Abşeron Logistika Mərkəzi Karyera Platforması', 
            description: 'Abşeron Logistika Mərkəzinin Karyera Portalı yeni əməkdaşların Mərkəzə cəlb olunması, işə qəbul prosesinin tənzimlənməsi və əməkdaşların inkişafının təmini məqsədilə yaradılıb. Mərkəzimiz iş imkanları ilə yanaşı ödənişli təcrübə proqramları vasitəsilə gənc mütəxəssislərə real iş mühitində bilik və bacarıqlarını inkişaf etdirmək imkanı təqdim edir.\n\nMüxtəlif təhsil müəssisələri ilə qurulan əməkdaşlıqlar sayəsində tələbə və məzunlar üçün karyera və təcrübə mübadiləsi imkanları genişləndirilir. Mövcud əməkdaşların peşəkar inkişafı isə xüsusi təlimlər, mentorluq və inkişaf proqramları ilə dəstəklənir. Biz inanırıq ki, insan kapitalına qoyulan sərmayə şirkətin ən mühüm uğur faktorudur. İnsan resurları komandamız, həmçinin şəffaf seçim prosesi və ədalətli qiymətləndirmə sistemi ilə karyera yüksəlişinə zəmin yaradır.\n\nBurada hər bir əməkdaşın töhfəsi dəyərləndirilir və onların uğurları komandanın ümumi nailiyyəti kimi qəbul olunur. Karyera Portalı yeni istedadların şirkətə inteqrasiyası ilə yanaşı, mövcud əməkdaşların da uzunmüddətli inkişafına dəstək verir. İş mühitimiz əməkdaşlıq, hörmət və komanda ruhu prinsiplərinə əsaslanır.\n\nAbşeron Logistika Mərkəzində komandasında çalışmaq yalnızca iş yeri deyil, həm də öyrənmək, təcrübə qazanmaq və yeni bacarıqlar inkişaf etdirmək üçün geniş fürsətidir.' 
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [shouldHideNav, setShouldHideNav] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const [isClickAnimating, setIsClickAnimating] = useState(false);
    const videoRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 576) {
                setItemsPerPage(1);
            } else if (width < 768) {
                setItemsPerPage(1);
            } else if (width < 992) {
                setItemsPerPage(1);
            } else if (width < 1200) {
                setItemsPerPage(1);
            } else {
                setItemsPerPage(1);
            }

            setShouldHideNav(ArrayData.length === 1 && width >= 1200);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e) => {
            if (cursorRef.current && isVideoHovered) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [ArrayData.length, isVideoHovered]);

    useEffect(() => {
        if (!isHovered && !shouldHideNav) {
            const interval = setInterval(() => {
                goToNext();
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isHovered, itemsPerPage, shouldHideNav]);

    useEffect(() => {
        if (isClickAnimating && cursorRef.current) {
            cursorRef.current.classList.add('animate');
            
            const timeout = setTimeout(() => {
                if (cursorRef.current) {
                    cursorRef.current.classList.remove('animate');
                }
                setIsClickAnimating(false);
            }, 300);
            
            return () => clearTimeout(timeout);
        }
    }, [isClickAnimating]);

    const goToPrev = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? ArrayData.length - itemsPerPage : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex(prevIndex =>
            prevIndex >= ArrayData.length - itemsPerPage ? 0 : prevIndex + 1
        );
    };

    const toggleVideoPlayback = () => {
        if (videoRef.current) {
            setIsClickAnimating(true);
            
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsVideoPlaying(true);
            } else {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            }
        }
    };

    const handleVideoHover = (hoverState) => {
        setIsVideoHovered(hoverState);
        if (cursorRef.current) {
            cursorRef.current.style.display = hoverState ? 'block' : 'none';
        }
    };

    const handleVideoPlay = () => {
        setIsVideoPlaying(true);
    };

    const handleVideoPause = () => {
        setIsVideoPlaying(false);
    };

    const visibleItems = ArrayData.slice(currentIndex, currentIndex + itemsPerPage);
    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex >= ArrayData.length - itemsPerPage;

    return (
        <div className="section-column" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <div 
                ref={cursorRef}
                className="custom-cursor"
                style={{
                    backgroundImage: `url(${isVideoPlaying ? PauseCursor : PlayCursor})`
                }}
            />

            <div className="Section-Card-Group SuccessCardGroup InfoCardGroup">
                <div className={`Card-Left ${shouldHideNav ? 'hide' : ''} No-Select`}>
                    <button onClick={goToPrev} className="nav-button">
                        <img
                            src={ChevronCircleLeftActiveImg}
                            alt="Previous"
                            className="success-nav-icon"
                        />
                    </button>
                </div>

                <div className="Section-Card">
                    {visibleItems.map((item) => (
                        <div className="SectionSuccess" key={item.id}>
                            <div className="SuccessTextGroup">
                                <div className="SuccessText SuccessText1">
                                    <h1>{item.title}</h1>
                                    <h2 className='item-desc' style={{ whiteSpace: 'pre-line' }}>{item.description}</h2>
                                </div>
                            </div>
                            <div className="SuccessMain">
                                <div 
                                    className="video-container"
                                    onMouseEnter={() => handleVideoHover(true)}
                                    onMouseLeave={() => handleVideoHover(false)}
                                    onClick={toggleVideoPlayback}
                                    style={{ cursor: 'none' }}
                                >
                                    <video 
                                        ref={videoRef}
                                        className='No-Select' 
                                        autoPlay 
                                        muted 
                                        loop
                                        onPlay={handleVideoPlay}
                                        onPause={handleVideoPause}
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        <source src={item.image} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`Card-Right ${shouldHideNav ? 'hide' : ''} No-Select`}>
                    <button onClick={goToNext} className="nav-button">
                        <img
                            src={isAtEnd ? ChevronCircleRightActiveImg : ChevronCircleRightActiveImg}
                            alt="Next"
                            className="success-nav-icon"
                        />
                    </button>
                </div>
            </div>
            
            <style jsx>{`
                .custom-cursor {
                    position: fixed;
                    width: 64px;
                    height: 64px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    display: none;
                }
                
                .custom-cursor.animate {
                    animation: clickAnimation 0.3s ease;
                }
                
                @keyframes clickAnimation {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    33% { transform: translate(-50%, -50%) scale(0.9); }
                    66% { transform: translate(-50%, -50%) scale(1.1); }
                    100% { transform: translate(-50%, -50%) scale(1); }
                }
                
                .video-container {
                    position: relative;
                }
            `}</style>
        </div>
    )
}

export default Info;