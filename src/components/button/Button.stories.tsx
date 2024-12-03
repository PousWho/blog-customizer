import type { Meta, StoryObj } from '@storybook/react'; // Импорт типов для Storybook
import { Button } from './Button'; // Импорт компонента Button

// Метаданные для компонента Button
const meta: Meta<typeof Button> = {
	component: Button, // Определяем, что будем работать с компонентом Button
};

export default meta; // Экспортируем метаданные по умолчанию
type Story = StoryObj<typeof Button>; // Тип для истории Storybook

// История для компонента Button
export const ButtonStory: Story = {
	render: () => {
		return (
			<>
				{/* Кнопка "Сбросить" с обработчиком клика */}
				<Button
					title='Сбросить' // Текст на кнопке
					type='reset' // Тип кнопки HTML
					onClick={() => alert('Клик на кнопку сбросить')} // Действие при клике
				/>
				{/* Кнопка "Применить" с обработчиком клика */}
				<Button
					title='Применить' // Текст на кнопке
					type='submit' // Тип кнопки HTML
					onClick={() => alert('Клик на кнопку применить')} // Действие при клике
				/>
			</>
		);
	},
};
