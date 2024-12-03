import { useRef } from 'react'; // Импортируем useRef для создания ссылки на элемент
import type { MouseEventHandler } from 'react'; // Тип для обработчика события клика
import clsx from 'clsx'; // Библиотека для условных классов
import { OptionType } from 'src/constants/articleProps'; // Тип для опций селектора
import { Text } from 'components/text'; // Компонент для текста
import { isFontFamilyClass } from './helpers/isFontFamilyClass'; // Хелпер для проверки шрифта
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit'; // Хук для обработки нажатия клавиши Enter

import styles from './Select.module.scss'; // Стили

// Тип для пропсов компонента Option
type OptionProps = {
	option: OptionType; // Опция для селектора
	onClick: (value: OptionType['value']) => void; // Функция, вызываемая при клике на опцию
};

// Компонент для рендеринга одной опции селектора
export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className }, // Деструктурируем пропсы
		onClick, // Функция для обработки клика
	} = props;

	const optionRef = useRef<HTMLLIElement>(null); // Ссылка на элемент опции

	// Функция для обработки клика на опцию
	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue); // Вызываем onClick с переданным значением
		};

	// Хук для обработки клавиши Enter
	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''])} // Применяем условные классы
			value={value} // Присваиваем значение опции
			onClick={handleClick(value)} // Обработчик клика
			tabIndex={0} // Делаем элемент доступным для фокуса
			data-testid={`select-option-${value}`} // Для тестирования
			ref={optionRef} // Привязываем ссылку к элементу
		>
			{/* Отображаем текст, если класс шрифта валидный, применяем его */}
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title} {/* Текст опции */}
			</Text>
		</li>
	);
};
