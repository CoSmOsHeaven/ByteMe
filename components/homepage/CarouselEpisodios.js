import React from 'react';
import {
    Autoplay,
    EffectCoverflow
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/swiper-react';
import 'swiper/swiper-bundle.css';
import './CarouselEpisodios.css';


const images = [
    '/carousel_images/episodios/1.jpg',
    '/carousel_images/episodios/3.jpg',
    '/carousel_images/episodios/4.jpg',
    '/carousel_images/episodios/5.jpg',
    '/carousel_images/episodios/6.jpeg',
    '/carousel_images/episodios/7.jpg',
    '/carousel_images/episodios/9.jpg',
    '/carousel_images/episodios/11.jpg',
    '/carousel_images/episodios/12.jpg',
    '/carousel_images/episodios/1.webp',
    '/carousel_images/episodios/2.webp',
    '/carousel_images/episodios/4.webp',
    '/carousel_images/episodios/5.webp',
    '/carousel_images/episodios/6.webp',
    // …
];

export default function CarouselEpisodios() {
    return (
        <Swiper
            className="swiper-episodios"
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            }}
            autoplay={{
                delay: 6000,
                disableOnInteraction: false,
            }}
            loop={true}
            style={{ padding: '2rem 0' }}
        >
            {images.map((src, idx) => (
                <SwiperSlide key={idx} style={{ width: '100%', height: 'auto' }}>
                    <img src={src} loading="lazy" alt={`Slide ${idx+1}`} style={{ width: '100%', borderRadius: '10px' }} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
