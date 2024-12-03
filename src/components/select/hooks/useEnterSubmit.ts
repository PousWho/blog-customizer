import { useEffect } from 'react'; // Импортируем useEffect для работы с жизненным циклом компонента

// Типы пропсов для хука, который обрабатывает нажатие клавиши Enter
type UseEnterSubmit = {
	onChange: React.Dispatch<React.SetStateAction<boolean>>; // Функция для изменения состояния
	placeholderRef: React.RefObject<HTMLDivElement>; // Ссылка на элемент, на котором будет происходить событие
};

// Хук для обработки нажатия клавиши Enter на элементе
export const useEnterSubmit = ({
	placeholderRef,
	onChange,
}: UseEnterSubmit) => {
	useEffect(() => {
		const placeholderEl = placeholderRef.current; // Получаем элемент, на котором будет обработка
		if (!placeholderEl) return; // Если элемента нет, выходим из хука

		// Обработчик события нажатия клавиши Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				// Если нажата клавиша Enter
				onChange((isOpen: boolean) => !isOpen); // Переключаем состояние (открыто/закрыто)
			}
		};

		// Добавляем обработчик события на клавишу
		placeholderEl.addEventListener('keydown', handleEnterKeyDown);

		// Очистка обработчика события при размонтировании компонента
		return () => {
			placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [placeholderRef, onChange]); // Зависимости для повторной инициализации хука при изменении
};
