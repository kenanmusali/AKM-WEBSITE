import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

import ArrayData1Img from '../../../assets/image/certificate/SOO.jpg';
import ArrayData2Img from '../../../assets/image/certificate/soo14001.jpg';
import ArrayData3Img from '../../../assets/image/certificate/soo45001.jpg';
import ArrayData4Img from '../../../assets/image/certificate/fiata.png';
import ArrayData5Img from '../../../assets/image/certificate/abada.png';
import ArrayDataSvg from '../../../assets/svg/doc.text.svg';



const Sertificate = () => {
    const ArrayData = [

        { id: 0, image: ArrayData1Img, image1: ArrayDataSvg, title: 'ISO 9001', title1:"Keyfiyyət İdarəetmə Sistemi:", description: 'Müştəri məmnuniyyətinə yönəlmiş, dayanıqlı və səmərəli xidmət keyfiyyətini təmin edir.' },
        { id: 1, image: ArrayData2Img, image1: ArrayDataSvg, title: 'ISO 9001', title1:"Ətraf Mühitin İdarəetmə Sistemi:", description: 'Ətraf mühitə təsiri minimuma endirərək ekoloji məsuliyyətli fəaliyyətə zəmin yaradır.' },
        { id: 2, image: ArrayData3Img, image1: ArrayDataSvg, title: 'ISO 45001', title1:"Əməyin Sağlamlığı və Təhlükəsizliyi Sistemi:", description: 'İşçilər üçün təhlükəsiz və sağlam iş mühitinin qurulmasına zəmanət verir.' },
        { id: 3, image: ArrayData4Img, image1: ArrayDataSvg, title: 'FIATA', description: 'Abşeron Logistika Mərkəzi Beynəlxalq Yük Ekspeditorları Assosasiyaları Federasiyasının fərdi üzvüdür.' },
        { id: 4, image: ArrayData5Img, image1: ArrayDataSvg, title: 'ABADA', title1:"", description: 'Abşeron Logistika Mərkəzi Azərbaycan Beynəlxalq Avtomobil Daşıyıcıları Assosiyasiyasının üzvüdür.' },
   
];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [shouldHideNav, setShouldHideNav] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 1050) {
                setItemsPerPage(1);
            } else if (width < 1500) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3); // Max now is 3
            }


            setShouldHideNav(ArrayData.length === 3 && width >= 1200);
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

            <p className='Title-Header'>Beynəlxalq sertifikatlarımız</p>
            {/* <p className='section-description'>By instilling the following principles in all our employees, we strive to contribute positively not only to career development but also to the growth of the logistics industry and society in our country.</p> */}

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
                        <div className="Cards Cards1 Main-Card" key={item.id}>
                            <div className="Card-Item-Flex1">
                                <img src={item.image} className='No-Select Section-A4' />
                                <div className="Cards-Item">
                                      <img src={item.image1} className='No-Select Section-Icons' />
                                    <p className='First-Title'>{item.title}</p>
                                    <p>{item.title1}</p>
                                    <p className='First-description'>{item.description}</p>
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
        </div>
    )
}

export default Sertificate;