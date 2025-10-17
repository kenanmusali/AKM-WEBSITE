import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

import ArrayData1Img from '../../../assets/image/partners/unec.png';
import ArrayData2Img from '../../../assets/image/partners/bdu.png';
import ArrayData3Img from '../../../assets/image/partners/aztu.png';
import ArrayData14Img from '../../../assets/image/partners/btk.png';
import ArrayData4Img from '../../../assets/image/partners/bau.png';
import ArrayData5Img from '../../../assets/image/partners/ada.png';
import ArrayData6Img from '../../../assets/image/partners/bmu.png';
import ArrayData7Img from '../../../assets/image/partners/adnsu.png';
import ArrayData8Img from '../../../assets/image/partners/bbu.png';
import ArrayData9Img from '../../../assets/image/partners/qku.png';
import ArrayData10Img from '../../../assets/image/partners/dgka.png';
import ArrayData11Img from '../../../assets/image/partners/maa.png';
import ArrayData12Img from '../../../assets/image/partners/ptm.png';
import ArrayData13Img from '../../../assets/image/partners/oyk.jpg';



const Partners = () => {
    const ArrayData = [
        { id: 0, image: ArrayData1Img, title: 'Azərbaycan Dövlət İqtisad Universiteti', description: '' },
        { id: 1, image: ArrayData2Img, title: 'Bakı Dövlət Universiteti', description: '' },
        { id: 2, image: ArrayData3Img, title: 'Azərbaycan Texniki Universiteti', description: '' },
        { id: 13, image: ArrayData14Img, title: 'Bakı Texniki Kolleci', description: '' },
        { id: 3, image: ArrayData4Img, title: 'Bakı Avrasiya Universiteti', description: '' },
        { id: 4, image: ArrayData5Img, title: 'ADA Universiteti', description: '' },
        { id: 5, image: ArrayData6Img, title: 'Bakı Mühəndislik Universiteti', description: '' },
        { id: 6, image: ArrayData11Img, title: 'Milli Aviasiya Akademiyası', description: '' },
        { id: 7, image: ArrayData7Img, title: 'Azərbaycan Dövlət Neft və Sənaye Universiteti', description: '' },
        { id: 8, image: ArrayData8Img, title: 'Bakı Biznes Universiteti', description: '' },
        { id: 9, image: ArrayData9Img, title: 'Qərbi Kaspi Universiteti', description: '' },
        { id: 10, image: ArrayData10Img, title: 'Dövlət Gömrük Komitəsi Akademiyası', description: '' },
        { id: 11, image: ArrayData12Img, title: 'Dəmir Yolu ve Metropolitenin üzrə Bakı Dövlət Peşə Təhsil Mərkəzi', description: '' },
        { id: 12, image: ArrayData13Img, title: 'Odlar Yurdu Universiteti', description: '' },
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
            } else if (width < 1040) {
                setItemsPerPage(4);
            } else if (width < 1100) {
                setItemsPerPage(5);
            } else if (width < 1200) {
                setItemsPerPage(6);
            } else {
                setItemsPerPage(7);
            }


            setShouldHideNav(ArrayData.length === 7 && width >= 1200);
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

            <p className='Title-Header'>Təhsil tərəfdaşlarımız</p>
            <p className='section-description'>Tərəfdaşlıq etdiyimiz təhsil müəssisələri ilə birgə gənclərin bilik və bacarıqlarının inkişafına dəstək oluruq. Bu əməkdaşlıqlar sayəsində tələbə və məzunlar üçün daha geniş karyera və təcrübə imkanları yaradırıq.</p>

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
                            <div className="Cards-Item">
                                <img src={item.image} className='No-Select Section-Icons Section-Icons-50px' />
                                <p className='First-Title'>{item.title}</p>
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

export default Partners;