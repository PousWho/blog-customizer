import { useRef } from 'react'; // Для управления ссылкой на DOM-элемент
import { OptionType } from 'src/constants/articleProps'; // Тип опции
import { Text } from 'components/text'; // Текстовый компонент
import { useEnterSubmit } from './hooks/useEnterSubmit'; // Хук для обработки Enter
import styles from './RadioGroup.module.scss'; // Стили для RadioGroup

// Типы пропсов для компонента Option
type OptionProps = {
	value: OptionType['value']; // Значение опции
	title: OptionType['title']; // Текст опции
	selected: OptionType; // Выбранная опция
	groupName: string; // Имя группы радио-кнопок
	onChange?: (option: OptionType) => void; // Коллбэк для обработки изменений
	option: OptionType; // Текущая опция
};

// Компонент Option — отдельная опция в радио-группе
export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

	const optionRef = useRef<HTMLDivElement>(null); // Ссылка на контейнер опции

	// Функция обработки изменения
	const handleChange = () => onChange?.(option);

	// Используем хук для обработки нажатия Enter
	useEnterSubmit({ onChange, option });

	// Уникальный идентификатор для input и label
	const inputId = `${groupName}_radio_item_with_value__${value}`;
	const isChecked = value === selected.title; // Проверяем, выбрана ли текущая опция

	return (
		<div
			className={styles.item} // Стили для опции
			key={value} // Ключ для списка
			data-checked={isChecked} // Атрибут для состояния выбранной опции
			data-testid={inputId} // Атрибут для тестирования
			tabIndex={0} // Опция доступна для навигации с клавиатуры
			ref={optionRef} // Привязываем ссылку на элемент
		>
			{/* Радио-инпут */}
			<input
				className={styles.input} // Стили для инпута
				type='radio' // Тип input
				name={groupName} // Группа радио-кнопок
				id={inputId} // Уникальный ID
				value={value} // Значение
				onChange={handleChange} // Обработчик изменений
				tabIndex={-1} // Инпут недоступен для фокуса (управляем через контейнер)
			/>
			{/* Лейбл для инпута */}
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};
