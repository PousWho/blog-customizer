import type { Meta, StoryObj } from '@storybook/react'; // Импорт типов для Storybook
import { Select } from './select'; // Компонент Select
import { useState } from 'react'; // Хук useState для работы с состоянием

const meta: Meta<typeof Select> = {
	component: Select, // Указываем компонент Select для Storybook
};

export default meta; // Экспортируем мета-информацию для Storybook

type Story = StoryObj<typeof Select>; // Тип для истории компонента Select

// Компонент с состоянием для работы с Select
const SelectWithState = () => {
	// Опции для Select
	const options = [
		{ title: '1 опция', value: '1 опция', className: '' },
		{ title: '2 опция', value: '2 опция', className: '' },
		{ title: '3 опция', value: '3 опция', className: '' },
		{ title: '4 опция', value: '4 опция', className: '' },
	];

	// Состояние для выбранной опции
	const [selected, setSelected] = useState(options[0]);

	return (
		<>
			{/* Компонент Select с переданными параметрами */}
			<Select
				selected={selected} // Текущая выбранная опция
				onChange={setSelected} // Функция для изменения выбранной опции
				options={options} // Доступные опции
				title='Название радиогруппы' // Заголовок для компонента
			/>
		</>
	);
};

// История компонента для Storybook
export const SelectStory: Story = {
	render: () => <SelectWithState />, // Рендерим компонент с состоянием
};
