import React, { useState, useEffect, useRef } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

import ArrayData1Img from '../../../assets/svg/megaphone.svg';
import ArrayData2Img from '../../../assets/svg/person.2.svg';
import ArrayData3Img from '../../../assets/svg/doc.on.doc.svg';
import ArrayData4Img from '../../../assets/svg/doc.text.magnifyingglass.svg';
import ArrayData5Img from '../../../assets/svg/book.svg';
import ArrayData6Img from '../../../assets/svg/pencil.and.outline.svg';
import ArrayData7Img from '../../../assets/svg/signature.svg';
import ArrayData8Img from '../../../assets/svg/calendar.badge.clock.svg';
import PolygonImg from '../../../assets/svg/Polygon.svg';

const Admission = () => {
  const ArrayData = [
    { id: 0, image: ArrayData1Img, title: 'İş elanının yayımlanması', description: 'Services are delivered with exceptional standards and meticulous attention to detail.', order: 1 },
    { id: 1, image: ArrayData2Img, title: 'Namizədlərin müraciəti', description: 'New ideas and advanced technologies are embraced to ensure forward-thinking solutions.', order: 2 },
    { id: 2, image: ArrayData3Img, title: 'CV dəyərləndirmə mərhələsi', description: 'Every interaction is built on transparency, truthfulness, and ethical behavior.', order: 3 },
    { id: 3, image: ArrayData4Img, title: 'İlkin seçim və müsahibə mərhələsi', description: 'Work is conducted with respect, efficiency, and unwavering dedication to standards.', order: 4 },
    { id: 4, image: ArrayData5Img, title: 'Test və ya tapşırıq mərhələsi', description: 'Client data and processes are protected through strict and reliable safeguards.', order: 5 },
    { id: 5, image: ArrayData6Img, title: 'İş təklifinin verilməsi', description: 'Operations are designed to minimize environmental impact and promote sustainability.', order: 6 },
    { id: 6, image: ArrayData7Img, title: 'İşə qəbul prosesinin rəsmiləşdirilməsi', description: 'Commitments are honored with full responsibility for outcomes and actions.', order: 7 },
    { id: 7, image: ArrayData8Img, title: 'Uyğunlaşma və adaptasiya prosesi', description: 'Commitments are honored with full responsibility for outcomes and actions.', order: 8 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [shouldHideNav, setShouldHideNav] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Add intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
      } else if (width < 1500) {
        setItemsPerPage(6);
      } else if (width < 1625) {
        setItemsPerPage(7);
      } else {
        setItemsPerPage(8);
      }

      setShouldHideNav(ArrayData.length === 8 && width >= 1625);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ArrayData.length]);

  useEffect(() => {
    if (!isHovered && !shouldHideNav) {
      const interval = setInterval(() => {
        goToNext();
      }, 12000);
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
    <div 
      className="section-column" 
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className='Title-Header'>Mərkəzİmİzdə İşə qəbul prosesİ</p>
      <p className='section-description'>Mərkəzimizdə işə qəbul prosesi aşağıdakı mərhələ ardıcıllığına uyğun olaraq həyata keçirilir:</p>
      
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
          {visibleItems.map((item, index) => (
            <div 
              className={`Cards Admission-Card Main-Card ${isInView ? 'scale-animate' : ''}`} 
              key={item.id}
            >
              <div className="Cards-Item SectionNumCard">
                <img src={item.image} className='No-Select Section-Icons' />
                <p>{item.title}</p>
                <p></p>
              </div>
              <p className='SectionNumOrder No-Select'>{item.order}</p>
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

export default Admission;