import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
interface OnClick {
	onClick?: (state: boolean) => void;
	isMenuOpen?: boolean;
}

export const ArrowButton = ({ onClick, isMenuOpen }: OnClick) => {
	const onClickHandler = () => {
		onClick?.(!isMenuOpen);
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${
				isMenuOpen ? styles.container_open : ' '
			}`}
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation(); // предотвращает распространение события по DOM-дереву и блокирует его обработку
				onClickHandler();
			}}>
			<img // иконка стрелочки
				src={arrow}
				alt='иконка стрелочки открытия/закрытия меню'
				className={clsx(styles.arrow, isMenuOpen && styles.arrow_open)} // изменяется при нажатие (смотрит в разные стороны)
			/>
		</div>
	);
};
