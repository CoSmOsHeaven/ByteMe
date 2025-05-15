import React from 'react';
import {
    Autoplay,
    EffectCards
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/swiper-react';
import 'swiper/swiper-bundle.css';
import './CarouselPersonajes.css';

const images = [
    '/carousel_images/personajes/AbradolphLincler.webp',
    '/carousel_images/personajes/Hamurai.webp',
    '/carousel_images/personajes/MrMeeseeks.webp',
    '/carousel_images/personajes/ScaryTerry.webp',
    '/carousel_images/personajes/ThePresident.webp',
    '/carousel_images/personajes/Lawnmower_dog.webp',
    '/carousel_images/personajes/Rick.webp',
    '/carousel_images/personajes/TheDevil.webp',
    '/carousel_images/personajes/Tinkles.webp',
    '/carousel_images/personajes/Unidad.webp',
    '/carousel_images/personajes/Max.webp',
    // …
];

export default function CarouselPersonajes() {
    return (
        <div className="carousel-personajes">
            <Swiper
                className="swiper-personajes"
                modules={[EffectCards, Autoplay]}
                effect="cards"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                    delay: 8500,
                    disableOnInteraction: false,
                }}
                loop={true}
                style={{ padding: '2rem 0' }}
            >
                {images.map((src, idx) => (
                    <SwiperSlide key={idx} style={{ width: '100%', height: 'auto' }}>
                        <img
                            src={src}
                            loading="lazy"
                            alt={`Slide ${idx + 1}`}
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
