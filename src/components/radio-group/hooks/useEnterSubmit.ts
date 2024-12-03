import { useEffect, useRef } from 'react';
import { OptionType } from 'src/constants/articleProps'; // Тип для опции

// Типы пропсов для хука
type UseEnterSubmit = {
	onChange?: (option: OptionType) => void; // Коллбэк для обработки изменения
	option: OptionType; // Текущая опция
};

// Хук для обработки нажатия клавиши Enter
export const useEnterSubmit = ({ onChange, option }: UseEnterSubmit) => {
	const optionRef = useRef<HTMLDivElement>(null); // Ссылка на HTML-элемент

	useEffect(() => {
		const optionHtml = optionRef.current; // Получаем текущий элемент
		if (!optionHtml) return; // Если элемента нет, выходим из функции

		// Обработчик нажатия клавиши Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement === optionHtml && event.key === 'Enter') {
				onChange?.(option); // Вызываем переданный коллбэк с текущей опцией
			}
		};

		// Добавляем обработчик события keydown
		optionHtml.addEventListener('keydown', handleEnterKeyDown);

		// Удаляем обработчик при размонтировании компонента
		return () => {
			optionHtml.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onChange, option]); // Следим за изменениями onChange и option
};
