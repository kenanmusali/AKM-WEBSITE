import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

import ArrayData1Img from '../../../assets/image/success/Group279.png';


import ArrayData1Svg from '../../../assets/svg/calendar.svg';
import ArrayData2Svg from '../../../assets/svg/landscape.crop.rectangle.svg';
// import ArrayData2Img from '../../../assets/svg/bubble.left.and.bubble.right.svg';
// import ArrayData3Img from '../../../assets/svg/creditcard.svg';
// import ArrayData4Img from '../../../assets/svg/suitcase.svg';
// import ArrayData5Img from '../../../assets/svg/lightbulb.svg';
// import ArrayData6Img from '../../../assets/svg/chart.xyaxis.line.svg';
// import ArrayData7Img from '../../../assets/svg/lasso.sparkles.svg';


const Blogs = () => {
    const ArrayData = [
        { id: 0, image: ArrayData1Img, linkImage: ArrayData2Svg, imageTotal: '3', dateImage: ArrayData1Svg, date: 'April 18, 2024', title: 'Our Global Expansion', description: 'How we successfully expanded our logistics network to 15 new countries within a single year.' },
        { id: 1, image: ArrayData1Img, linkImage: ArrayData2Svg, imageTotal: '1', dateImage: ArrayData1Svg, date: 'June 5, 2025', title: 'Eco-Friendly Fleet', description: 'The story behind transitioning 80% of our delivery fleet to electric and hybrid vehicles.' },
        { id: 2, image: ArrayData1Img, linkImage: ArrayData2Svg, imageTotal: '6', dateImage: ArrayData1Svg, date: 'September 12, 2025', title: 'Million Milestone', description: 'Celebrating our one millionth successful delivery with zero damages or delays.' },
        { id: 3, image: ArrayData1Img, linkImage: ArrayData2Svg, imageTotal: '4', dateImage: ArrayData1Svg, date: 'November 30, 2025', title: 'Disaster Response', description: 'How our rapid response team delivered critical supplies within 24 hours to disaster zones.' },
        { id: 4, image: ArrayData1Img, linkImage: ArrayData2Svg, imageTotal: '5', dateImage: ArrayData1Svg, date: 'February 8, 2025', title: 'Tech Innovation', description: 'Developing our proprietary tracking system that reduced delivery times by 35%.' },
        { id: 5, image: ArrayData1Img, linkImage: ArrayData2Svg, imageTotal: '3', dateImage: ArrayData1Svg, date: 'July 21, 2023', title: 'Client Partnership', description: 'Our 10-year collaboration with major retailers that transformed their supply chain.' },
        { id: 6, image: ArrayData1Img, linkImage: ArrayData2Svg, imageTotal: '5', dateImage: ArrayData1Svg, date: 'March 14, 2025', title: 'Award Recognition', description: 'Winning "Logistics Company of the Year" for our innovative cold chain solutions.' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [shouldHideNav, setShouldHideNav] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 576) {
                setItemsPerPage(1);
            } else if (width < 768) {
                setItemsPerPage(2);
            } else if (width < 992) {
                setItemsPerPage(3);
            } else if (width < 1200) {
                setItemsPerPage(4);
            } else {
                setItemsPerPage(5);
            }

            setShouldHideNav(ArrayData.length === 5 && width >= 1200);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [ArrayData.length]);

    useEffect(() => {
        if (!isHovered && !shouldHideNav) {
            const interval = setInterval(() => {
                goToNext();
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isHovered, itemsPerPage, shouldHideNav]);

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

    const visibleItems = ArrayData.slice(currentIndex, currentIndex + itemsPerPage);
    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex >= ArrayData.length - itemsPerPage;

    return (
        <div className="section-column" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <p className='Title-Header'>Today's blogs</p>
            {/* <p className='section-description'></p> */}

            <div className="Section-Card-Group">
                <div className={`Card-Left ${shouldHideNav ? 'hide' : ''} No-Select`}>
                    <button onClick={goToPrev} className="nav-button">
                        <img
                            src={isAtStart ? ChevronCircleLeftActiveImg : ChevronCircleLeftActiveImg}
                            alt="Previous"
                            className="success-nav-icon"
                        />
                    </button>
                </div>

                <div className="Section-Card">
                    {visibleItems.map((item) => (
                        <div className="Cards Main-Card" key={item.id}>
                            <div className="Cards-Item ">
                                <img src={item.image} className='No-Select Section-Images ' />

                            </div>
                            <div className="Cards-Item">
                                <div className="Cards-Item-Bio-Group">
                                    <div className="Cards-Item-Bio">
                                        <img src={item.dateImage} className='No-Select' />
                                        <p>{item.date}</p>
                                    </div>
                                    <div className="Cards-Item-Bio">
                                        <img src={item.linkImage} className='No-Select ' />
                                        <p>{item.imageTotal}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="Cards-Item">
                                <p>{item.title}</p>
                                <p>{item.description}</p>
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
        </div>
    )
}

export default Blogs;