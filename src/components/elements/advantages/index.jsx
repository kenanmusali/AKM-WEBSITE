import React, { useState, useEffect } from 'react';
import ChevronCircleLeftActiveImg from '../../../assets/svg/chevron.circle.left.active.svg';
import ChevronCircleRightActiveImg from '../../../assets/svg/chevron.circle.right.active.svg';

import ArrayData1Img from '../../../assets/svg/person.2.svg';
import ArrayData2Img from '../../../assets/svg/bubble.left.and.bubble.right.svg';
import ArrayData3Img from '../../../assets/svg/personalhotspot.svg';
import ArrayData4Img from '../../../assets/svg/suitcaseX.svg';
import ArrayData5Img from '../../../assets/svg/lightbulb.svg';
import ArrayData6Img from '../../../assets/svg/chart.xyaxis.line.svg';
import ArrayData7Img from '../../../assets/svg/lasso.sparkles.svg';


const Advantages = () => {
  const ArrayData = [
    { id: 0, image: ArrayData2Img, title: 'Peşəkar inkişaf imkanları ', description: 'Təlimlər, mentorluq və davamlı öyrənmə dəstəyi' },
    { id: 1, image: ArrayData6Img, title: 'Karyera yüksəlişi ', description: 'Ədalətli qiymətləndirmə və vəzifə artımı üçün şəffaf sistem' },
    { id: 2, image: ArrayData1Img, title: 'Komanda ruhu və əməkdaşlıq ', description: 'Hörmət və dəstək üzərində qurulmuş iş mühiti' },
    { id: 3, image: ArrayData4Img, title: 'İş-həyat balansı ', description: 'Çevik yanaşma və sağlam mühitdə fəaliyyət imkanı' },
    { id: 4, image: ArrayData5Img, title: 'Müxtəliflik və bərabər imkanlar ', description: 'Hər bir əməkdaşın səsinin dəyərləndirilməsi' },
    // { id: 5, image: ArrayData2Img, title: 'Rahat iş mühiti ', description: 'Müasir infrastruktur və əməkdaşların ehtiyaclarına uyğun şərait.' },
    { id: 5, image: ArrayData3Img, title: 'Şirkət dəyərlərinə bağlılıq ', description: 'Şəffaflıq, məsuliyyət və peşəkarlıq üzərində qurulan korporativ mədəniyyət' },
    { id: 6, image: ArrayData7Img, title: 'İnnovativ mühit', description: 'Yeniliklərə açıq, dinamik və rəqəmsallaşmış iş sistemi' },


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

      <p className='Title-Header'>Üstünlüklərimiz</p>
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
              <div className="Cards-Item">
                <img src={item.image} className='No-Select Section-Icons' />
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

export default Advantages;