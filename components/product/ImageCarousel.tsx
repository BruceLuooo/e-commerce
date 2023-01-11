import React from 'react';
import styles from '../../styles/product/Product.module.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';

type Props = {
	image: string[];
};

function ImageCarousel({ image }: Props) {
	return (
		<Swiper
			pagination={{
				type: 'fraction',
			}}
			navigation={true}
			loop={true}
			modules={[Pagination, Navigation]}
			className={styles.swiperContainer}
		>
			<SwiperSlide className={styles.productImage}>
				<Image
					src={image[0]}
					alt='product Image'
					className={styles.image}
					width={550}
					height={650}
				/>
			</SwiperSlide>
			<SwiperSlide className={styles.productImage}>
				<Image
					src={image[1]}
					alt='product Image'
					className={styles.image}
					width={550}
					height={650}
				/>
			</SwiperSlide>
		</Swiper>
	);
}

export default ImageCarousel;
