import type { Meta, StoryObj } from '@storybook/react'; // Импорт типов из Storybook
import { RadioGroup } from './RadioGroup'; // Компонент RadioGroup
import { useState } from 'react'; // Хук состояния

// Конфигурация Storybook для компонента RadioGroup
const meta: Meta<typeof RadioGroup> = {
	component: RadioGroup, // Связываем RadioGroup с этой историей
};

export default meta;
type Story = StoryObj<typeof RadioGroup>; // Тип истории для RadioGroup

// Компонент RadioGroup с локальным состоянием
const RadioGroupWithState = () => {
	// Список опций для радиогруппы
	const options = [
		{ title: '1 опция', value: '1 опция', className: '' },
		{ title: '2 опция', value: '2 опция', className: '' },
		{ title: '3 опция', value: '3 опция', className: '' },
		{ title: '4 опция', value: '4 опция', className: '' },
	];

	// Локальное состояние для выбранной опции
	const [selected, setSelected] = useState(options[0]); // По умолчанию выбрана первая опция

	return (
		<>
			{/* Компонент RadioGroup */}
			<RadioGroup
				selected={selected} // Текущая выбранная опция
				name='radio' // Имя группы радиокнопок
				onChange={setSelected} // Обработчик изменения
				options={options} // Список опций
				title='Название радиогруппы' // Заголовок радиогруппы
			/>
		</>
	);
};

// История для RadioGroup в Storybook
export const RadioGroupStory: Story = {
	render: () => <RadioGroupWithState />, // Рендерим компонент с состоянием
};
