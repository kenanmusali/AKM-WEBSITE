import React, { useState } from 'react';
import chevronIcon from "../../../assets/svg/chevron.down.svg";

const Faq = () => {
    // Set the first item (id: 0) as open by default
    const [openItemId, setOpenItemId] = useState(0);

    const ArrayData = [
        {
            id: 0,
            question: 'Mərkəzinizdə mövcud vakansiyalara necə müraciət edə bilərəm?',
            answer: "Portalda qeyd olunan vakansiyalardan sizə uyğun hesab etdiyinizi seçir və CV-nizi sistemə yükləməklə müraciət edə bilərsiniz."
        },
        {
            id: 1,
            question: 'Müraciətimin qəbul olunduğunu necə bilərəm?',
            answer: "Müraciətiniz uğurla qeydə alındıqda elektron poçt ünvanınıza təsdiq bildirişi göndərilir."
        },
        {
            id: 2,
            question: 'Vakansiya seçimində hansı kriteriyalar nəzərə alınır?',
            answer: "Hər bir vakansiya üzrə tələb olunan təhsil, bacarıq və təcrübə göstəriciləri əsas götürülür."
        },
        {
            id: 3,
            question: 'Portal üzərindən vakansiyaya müraciət etdim, amma cavab gəlmədi. Bu hala nə səbəb ola bilər?',
            answer: "Vakansiya müddəti bitdikdən sonra yalnız uyğun namizədlərlə əlaqə saxlanılır. Müraciət etdiyiniz vakansiyaya uyğun olmadığınız halda müraciətiniz məlumat bazasında saxlanılır."
        },
        {
            id: 4,
            question: 'Mərkəzinizdə təşkil edilən təcrübə proqramlarına kimlər müraciət edə bilər?',
            answer: "Təhsil pilləsi üzrə sonuncu kurs tələbələri və ya yeni məzunlar təcrübə proqramlarımız vasitəsilə real iş mühitində təcrübə qazana bilərlər."
        },
    ];

    const toggleItem = (id) => {
        setOpenItemId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="section-column">
            <p className="Title-Header">Tez-tez verİlən suallar</p>
            <div className="faq-list">
                {ArrayData.map(item => {
                    const animationClass = `animated-${(item.id % 6) + 1}`;

                    return (
                        <div key={item.id} className={`faq-card ${animationClass}`}>
                            <div
                                className="faq-header No-Select"
                                onClick={() => toggleItem(item.id)}
                            >
                                <p className="p-title">{item.question}</p>
                                <img
                                    src={chevronIcon}
                                    alt="chevron"
                                    className={`faq-icon ${openItemId === item.id ? 'faq-icon-rotated' : ''}`}
                                />
                            </div>

                            {openItemId === item.id && (
                                <div className="faq-answer">
                                    <p className="faq-answer-text">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Faq;