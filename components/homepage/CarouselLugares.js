import React from 'react';
import {
    Autoplay,
    EffectCards
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/swiper-react';
import 'swiper/swiper-bundle.css';
import './CarouselLugares.css';

const images = [
    '/carousel_images/lugares/Anatomy_Park.webp',
    '/carousel_images/lugares/Dimension.webp',
    '/carousel_images/lugares/Meta_reality.webp',
    '/carousel_images/lugares/PrimeDimension.webp',
    '/carousel_images/lugares/TheCitadel.webp',
    '/carousel_images/lugares/Capsula.webp',
    '/carousel_images/lugares/TamorusLite.webp',
    '/carousel_images/lugares/Dimensione_35-C.webp',
    '/carousel_images/lugares/Multiverse.webp',
    '/carousel_images/lugares/licencia.jpg',
    // …
];

export default function CarouselPersonajes() {
    return (
        <div className="carousel-lugares">
            <Swiper
                className="swiper-lugares"
                modules={[EffectCards, Autoplay]}
                effect="cards"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                    delay: 7000,
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
