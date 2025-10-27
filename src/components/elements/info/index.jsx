import React, { useState, useEffect, useRef } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';
import Header0Img from '../../../assets/image/header/FrameHeader0.png';
import Header1Img from '../../../assets/image/header/FrameHeader1.png';
import Header2Img from '../../../assets/image/header/FrameHeader2.png';
import Header3Img from '../../../assets/image/header/FrameHeader3.png';
import Header4Img from '../../../assets/image/header/FrameHeader4.png';
import Header5Img from '../../../assets/image/header/FrameHeader5.png';
import Header6Img from '../../../assets/image/header/FrameHeader6.png';
import Header7Img from '../../../assets/image/header/FrameHeader7.png';
import Header8Img from '../../../assets/image/header/FrameHeader8.png';
import Header9Img from '../../../assets/image/header/FrameHeader9.png';
import Header0MobileImg from '../../../assets/image/header/FrameHeader0.mobile.png';
import Header1MobileImg from '../../../assets/image/header/FrameHeader1.mobile.png';
import Header2MobileImg from '../../../assets/image/header/FrameHeader2.mobile.png';
import Header3MobileImg from '../../../assets/image/header/FrameHeader3.mobile.png';
import Header4MobileImg from '../../../assets/image/header/FrameHeader4.mobile.png';
import Header5MobileImg from '../../../assets/image/header/FrameHeader5.mobile.png';
import Header6MobileImg from '../../../assets/image/header/FrameHeader6.mobile.png';
import Header7MobileImg from '../../../assets/image/header/FrameHeader7.mobile.png';
import Header8MobileImg from '../../../assets/image/header/FrameHeader8.mobile.png';
import Header9MobileImg from '../../../assets/image/header/FrameHeader9.mobile.png';


const Info = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    // Check if screen is mobile size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const ArrayData = [
        {
            id: 0,
            images: isMobile ? [
                Header0MobileImg, Header1MobileImg, Header2MobileImg, Header3MobileImg, Header4MobileImg,
                Header5MobileImg, Header6MobileImg, Header7MobileImg, Header8MobileImg, Header9MobileImg
            ] : [
                Header0Img, Header1Img, Header2Img, Header3Img, Header4Img,
                Header5Img, Header6Img, Header7Img, Header8Img, Header9Img
            ],
            description:
                'Abşeron Logistika Mərkəzinin Karyera Portalı yeni əməkdaşların Mərkəzə cəlb olunması, işə qəbul prosesinin tənzimlənməsi və əməkdaşların inkişafının təmini məqsədilə yaradılıb. Mərkəzimiz iş imkanları ilə yanaşı ödənişli təcrübə proqramları vasitəsilə gənc mütəxəssislərə real iş mühitində bilik və bacarıqlarını inkişaf etdirmək imkanı təqdim edir.\n\nMüxtəlif təhsil müəssisələri ilə qurulan əməkdaşlıqlar sayəsində tələbə və məzunlar üçün karyera və təcrübə mübadiləsi imkanları genişləndirilir. Mövcud əməkdaşların peşəkar inkişafı isə xüsusi təlimlər, mentorluq və inkişaf proqramları ilə dəstəklənir. Biz inanırıq ki, insan kapitalına qoyulan sərmayə şirkətin ən mühüm uğur faktorudur. İnsan resurları komandamız, həmçinin şəffaf seçim prosesi və ədalətli qiymətləndirmə sistemi ilə karyera yüksəlişinə zəmin yaradır.\n\nBurada hər bir əməkdaşın töhfəsi dəyərləndirilir və onların uğurları komandanın ümumi nailiyyəti kimi qəbul olunur. Karyera Portalı yeni istedadların şirkətə inteqrasiyası ilə yanaşı, mövcud əməkdaşların da uzunmüddətli inkişafına dəstək verir. İş mühitimiz əməkdaşlıq, hörmət və komanda ruhu prinsiplərinə əsaslanır.\n\nAbşeron Logistika Mərkəzində komandasında çalışmaq yalnızca iş yeri deyil, həm də öyrənmək, təcrübə qazanmaq və yeni bacarıqlar inkişaf etdirmək üçün geniş fürsətidir.'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleImageIndex, setVisibleImageIndex] = useState(0);
    const sectionRef = useRef(null);

    const startAnimation = () => {
        setVisibleImageIndex(0);
        const interval = setInterval(() => {
            setVisibleImageIndex(prev => {
                if (prev >= ArrayData[0].images.length - 1) {
                    clearInterval(interval);
                    return ArrayData[0].images.length - 1;
                }
                return prev + 1;
            });
        }, 500);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startAnimation();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const goToPrev = () => {
        setCurrentIndex(prev => (prev === 0 ? ArrayData.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev >= ArrayData.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="section-column section-column0" ref={sectionRef}>
            <p className="Title-Header">Abşeron Logİstİka Mərkəzİ Karyera Platforması</p>

            <div className="Section-Card-Group SuccessCardGroup InfoCardGroup">
                <div className="Card-Left No-Select">
                    <button onClick={goToPrev} className="nav-button">
                        <img src={ChevronCircleLeftActiveImg} alt="Previous" className="success-nav-icon" />
                    </button>
                </div>

                <div className="Section-Card Section-Card0">
                    {ArrayData.map(item => (
                        <div className="SectionSuccess" key={item.id}>
                            <div className="SuccessTextGroup">
                                <div className="SuccessText SuccessText1">
                                    <h1>{item.title}</h1>
                                    <h2 className="item-desc" style={{ whiteSpace: 'pre-line' }}>
                                        {item.description}
                                    </h2>
                                </div>
                            </div>

                            <div className="SuccessMain SuccessMain0 No-Select ">
                                <div className="image-container-grid">
                                    {item.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Header ${index + 1}`}
                                            className="header-frame"
                                            style={{
                                                opacity: index <= visibleImageIndex ? 1 : 0,
                                                transform: index <= visibleImageIndex ? 'scale(1)' : 'scale(0.9)',
                                                transition: 'opacity 0.2s ease, transform 0.6s ease',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="Card-Right No-Select">
                    <button onClick={goToNext} className="nav-button">
                        <img src={ChevronCircleRightActiveImg} alt="Next" className="success-nav-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Info;