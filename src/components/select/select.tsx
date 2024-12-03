import { useState, useRef } from 'react'; // Хуки React
import type { MouseEventHandler } from 'react'; // Тип для обработчика кликов
import clsx from 'clsx'; // Для условных классов
import { OptionType } from 'src/constants/articleProps'; // Типы для опций
import { Text } from 'components/text'; // Компонент для текста
import arrowDown from 'src/images/arrow-down.svg'; // Иконка стрелочки
import { Option } from './Option'; // Компонент для отображения каждой опции
import { isFontFamilyClass } from './helpers/isFontFamilyClass'; // Проверка класса шрифта
import { useEnterSubmit } from './hooks/useEnterSubmit'; // Хук для работы с клавишей Enter
import { useOutsideClickClose } from './hooks/useOutsideClickClose'; // Хук для закрытия при клике вне

import styles from './Select.module.scss'; // Стили компонента

// Типы пропсов для компонента Select
type SelectProps = {
	selected: OptionType | null; // Выбранная опция
	options: OptionType[]; // Доступные опции
	placeholder?: string; // Текст, если ничего не выбрано
	onChange?: (selected: OptionType) => void; // Функция для изменения выбранной опции
	onClose?: () => void; // Функция для закрытия меню
	title?: string; // Заголовок селекта
};

export const Select = (props: SelectProps) => {
	// Деструктуризация пропсов
	const { options, placeholder, selected, onChange, onClose, title } = props;
	// Состояние для открытия/закрытия меню
	const [isMenuOpen, setIsOpen] = useState<boolean>(false);
	// Ссылки на элементы для обработки кликов вне компонента
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	// Хуки для закрытия меню при клике вне или при нажатии Enter
	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});
	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	// Обработчик клика по опции
	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false); // Закрываем меню
		onChange?.(option); // Обновляем выбранную опцию
	};

	// Обработчик клика по плейсхолдеру (для открытия/закрытия меню)
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((prevState) => !prevState); // Переключаем состояние меню
	};

	return (
		<div className={styles.container}>
			{/* Заголовок для селекта, если он есть */}
			{title && (
				<Text size={12} weight={800} uppercase>
					{title}
				</Text>
			)}
			{/* Обертка селекта */}
			<div
				className={styles.selectWrapper}
				ref={rootRef} // Ссылка на обертку для закрытия меню при клике вне
				data-is-active={isMenuOpen} // Активность меню
				data-testid='selectWrapper'>
				{/* Иконка стрелочки */}
				<img
					src={arrowDown}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isMenuOpen })} // Меняем класс для анимации
				/>
				{/* Плейсхолдер, который кликабельный */}
				<div
					className={clsx(
						styles.placeholder,
						styles[selected?.optionClassName || ''] // Динамическое добавление класса для выбранной опции
					)}
					data-status={status} // Статус (нужно уточнить, где он используется)
					data-selected={!!selected?.value} // Проверка, выбрана ли опция
					onClick={handlePlaceHolderClick} // Обработчик клика
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{/* Если есть выбранная опция, то показываем её название, иначе плейсхолдер */}
						{selected?.title || placeholder}
					</Text>
				</div>
				{/* Выпадающее меню с опциями */}
				{isMenuOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{/* Отображаем только те опции, которые не выбраны */}
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)} // Обработчик клика по опции
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
