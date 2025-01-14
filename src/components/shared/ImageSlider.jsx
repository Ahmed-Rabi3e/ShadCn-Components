import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const ImageSlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const isImagesEmpty = images.length === 0;

    return (
        <div className="relative mx-auto">
            <div className="shadow-sm rounded-lg p-6">
                {/* Custom Navigation Buttons */}
                <button
                    className={`custom-prev absolute top-1/3 left-4 -translate-y-1/2 bg-white drop-shadow-md shadow-md text-main p-2 rounded-full hover:bg-gray-300 z-10 ${isImagesEmpty ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={isImagesEmpty}
                >
                    <FaArrowLeftLong />
                </button>
                <button
                    className={`custom-next absolute top-1/3 right-4 -translate-y-1/2 bg-white drop-shadow-md shadow-md text-main p-2 rounded-full hover:bg-gray-300 z-10 ${isImagesEmpty ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={isImagesEmpty}
                >
                    <FaArrowRightLong />
                </button>

                {/* Main Slider */}
                {images.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Thumbs, Pagination]}
                        spaceBetween={10}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        pagination={{
                            clickable: true,
                            el: ".custom-pagination",
                        }}
                        className="main-slider"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    loading="lazy"
                                    alt={`Slide ${index + 1}`}
                                    className="rounded-lg w-96 h-fit mx-auto"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center text-gray-500 mt-4">No images available.</p>
                )}
            </div>

            {/* Pagination Dots */}
            <div className="custom-pagination flex justify-center mt-4"></div>

            {/* Thumbnail Slider */}
            <div className="shadow-none">
                {images.length > 0 && (
                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={Math.min(images.length, 8)}
                        watchSlidesProgress={true}
                        className="thumb-slider mt-4 flex justify-center"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    loading="lazy"
                                    alt={`Thumbnail ${index + 1}`}
                                    className="cursor-pointer rounded-lg border-2 p-4 lg:p-8 border-transparent hover:border-main"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default ImageSlider;
