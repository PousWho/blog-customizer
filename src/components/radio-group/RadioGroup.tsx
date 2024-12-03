import { OptionType } from 'src/constants/articleProps'; // Типы для опций
import { Text } from 'components/text'; // Компонент для текста
import { Option } from './Option'; // Отдельная опция для RadioGroup

import styles from './RadioGroup.module.scss'; // Стили для RadioGroup

// Типы пропсов для компонента RadioGroup
type RadioGroupProps = {
	name: string; // Имя группы радиокнопок
	options: OptionType[]; // Массив опций
	selected: OptionType; // Текущая выбранная опция
	onChange?: (value: OptionType) => void; // Коллбэк для обработки выбора
	title: string; // Заголовок группы
};

// Компонент RadioGroup — группа радиокнопок
export const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, selected, onChange, title } = props;

	// Обработчик изменения выбранной опции
	const handleChange = (option: OptionType) => onChange?.(option);

	return (
		<div className={styles.container}>
			{/* Отображение заголовка, если он есть */}
			{title && (
				<Text weight={800} size={12} uppercase>
					{title}
				</Text>
			)}
			<div className={styles.group}>
				{/* Отображение всех опций из массива */}
				{options.map((option) => (
					<Option
						key={option.value} // Уникальный ключ для каждой опции
						groupName={name} // Имя группы
						value={option.value} // Значение опции
						title={option.title} // Название опции
						selected={selected} // Выбранная опция
						onChange={() => handleChange(option)} // Обработчик выбора
						option={option} // Полная информация об опции
					/>
				))}
			</div>
		</div>
	);
};
