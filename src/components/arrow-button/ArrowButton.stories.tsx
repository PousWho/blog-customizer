// Импортируем типы Meta и StoryObj из библиотеки Storybook для типизации истории компонента.
import type { Meta, StoryObj } from '@storybook/react';

// Импортируем компонент ArrowButton, для которого пишем историю.
import { ArrowButton } from './ArrowButton';

// Описание метаинформации для Storybook.
// Указываем, что история относится к компоненту ArrowButton.
const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton, // Привязываем метаинформацию к нашему компоненту.
};

// Экспортируем метаинформацию, чтобы Storybook мог её использовать.
export default meta;

// Определяем тип для истории компонента, используя StoryObj.
type Story = StoryObj<typeof ArrowButton>;

// Создаём конкретную историю компонента ArrowButton.
// Эта история описывает, как компонент будет рендериться в Storybook.
export const ArrowButtonStory: Story = {
	// Метод render описывает, как компонент будет выглядеть при рендере.
	render: () => (
		<ArrowButton /> // Просто рендерим компонент ArrowButton.
	),
};
