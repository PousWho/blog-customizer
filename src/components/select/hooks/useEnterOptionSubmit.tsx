import { useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps'; // Типы для опций

// Типы пропсов для хука, который обрабатывает нажатие Enter для выбора опции
type UseEnterOptionSubmit = {
	onClick: (value: OptionType['value']) => void; // Функция, вызываемая при клике
	value: OptionType['value']; // Значение опции
	optionRef: React.RefObject<HTMLLIElement>; // Ссылка на элемент опции
};

// Хук для обработки нажатия клавиши Enter на элементе списка
export const useEnterOptionSubmit = ({
	onClick,
	value,
	optionRef,
}: UseEnterOptionSubmit) => {
	useEffect(() => {
		const option = optionRef.current; // Получаем текущий элемент опции
		if (!option) return; // Если элемента нет, выходим из хука

		// Обработчик события нажатия клавиши Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			// Если активный элемент - это текущая опция и нажата клавиша Enter
			if (document.activeElement === option && event.key === 'Enter') {
				onClick(value); // Вызываем onClick с переданным значением
			}
		};

		// Добавляем обработчик события на клавишу
		option.addEventListener('keydown', handleEnterKeyDown);

		// Очистка при размонтировании компонента
		return () => {
			option.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [value, onClick, optionRef]); // Зависимости, чтобы хук перезапускался при изменении значений
};
