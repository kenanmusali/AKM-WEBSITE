import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';
import Header1Img from '../../../assets/image/header/FrameHeader.png';

const Info = () => {
    const ArrayData = [
        { 
            id: 0, 
            image: Header1Img, 
            // title:'Abşeron Logistika Mərkəzi Karyera Plaforması', 
            description: 'Abşeron Logistika Mərkəzinin Karyera Portalı yeni əməkdaşların Mərkəzə cəlb olunması, işə qəbul prosesinin tənzimlənməsi və əməkdaşların inkişafının təmini məqsədilə yaradılıb. Mərkəzimiz iş imkanları ilə yanaşı ödənişli təcrübə proqramları vasitəsilə gənc mütəxəssislərə real iş mühitində bilik və bacarıqlarını inkişaf etdirmək imkanı təqdim edir.\n\nMüxtəlif təhsil müəssisələri ilə qurulan əməkdaşlıqlar sayəsində tələbə və məzunlar üçün karyera və təcrübə mübadiləsi imkanları genişləndirilir. Mövcud əməkdaşların peşəkar inkişafı isə xüsusi təlimlər, mentorluq və inkişaf proqramları ilə dəstəklənir. Biz inanırıq ki, insan kapitalına qoyulan sərmayə şirkətin ən mühüm uğur faktorudur. İnsan resurları komandamız, həmçinin şəffaf seçim prosesi və ədalətli qiymətləndirmə sistemi ilə karyera yüksəlişinə zəmin yaradır.\n\nBurada hər bir əməkdaşın töhfəsi dəyərləndirilir və onların uğurları komandanın ümumi nailiyyəti kimi qəbul olunur. Karyera Portalı yeni istedadların şirkətə inteqrasiyası ilə yanaşı, mövcud əməkdaşların da uzunmüddətli inkişafına dəstək verir. İş mühitimiz əməkdaşlıq, hörmət və komanda ruhu prinsiplərinə əsaslanır.\n\nAbşeron Logistika Mərkəzində komandasında çalışmaq yalnızca iş yeri deyil, həm də öyrənmək, təcrübə qazanmaq və yeni bacarıqlar inkişaf etdirmək üçün geniş fürsətidir.' 
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [shouldHideNav, setShouldHideNav] = useState(false);

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

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
    const isAtEnd = currentIndex >= ArrayData.length - itemsPerPage;

    return (
        <div className="section-column" onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
     <p className='Title-Header'>Abşeron Logistika Mərkəzi Karyera Plaforması</p>
            {/* <p className='section-description'>Tərəfdaşlıq etdiyimiz təhsil müəssisələri ilə birgə gənclərin bilik və bacarıqlarının inkişafına dəstək oluruq. Bu əməkdaşlıqlar sayəsində tələbə və məzunlar üçün daha geniş karyera və təcrübə imkanları yaradırıq.</p> */}
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
                            <div className="SuccessMain SuccessMain0">
                                <div className="image-container">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className='No-Select' 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`Card-Right ${shouldHideNav ? 'hide' : ''} No-Select`}>
                    <button onClick={goToNext} className="nav-button">
                        <img
                            src={ChevronCircleRightActiveImg}
                            alt="Next"
                            className="success-nav-icon"
                        />
                    </button>
                </div>
            </div>
            
            <style jsx>{`
                .image-container {
                    position: relative;
                }
            `}</style>
        </div>
    )
}

export default Info;