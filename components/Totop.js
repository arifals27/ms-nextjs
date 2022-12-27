import React, {useEffect, useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';

const Totop = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    });

    return (
        <div
            className={`${visible ? 'fixed' : 'hidden'} bottom-10 right-7 h-9 w-9 bg-white rounded-full animate-bounce cursor-pointer justify-center items-center flex hover:opacity-100 opacity-50`}>
            <FaArrowCircleUp onClick={scrollToTop}
                             className={`fill-violet-900 mx-auto my-auto hover:fill-violet-500 h-9 w-9`}
            />
        </div>
    );
}

export default Totop;
