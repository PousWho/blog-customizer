import { useEffect } from 'react'; // Импортируем useEffect для работы с жизненным циклом компонента

// Типы пропсов для хука, который отслеживает клик вне области меню
type UseOutsideClickClose = {
	isMenuOpen: boolean; // Состояние, открыто ли меню
	onChange: (newValue: boolean) => void; // Функция для изменения состояния
	onClose?: () => void; // Функция для закрытия меню, если оно открыто
	rootRef: React.RefObject<HTMLElement>; // Ссылка на корневой элемент меню
};

// Хук для обработки кликов вне области меню
export const useOutsideClickClose = ({
	isMenuOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		// Обработчик кликов
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			// Если клик был вне области меню и меню открыто
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				if (isMenuOpen) onClose?.(); // Если передана функция onClose, вызываем её
				onChange(false); // Закрываем меню
			}
		};

		// Добавляем обработчик на клик по окну
		window.addEventListener('mousedown', handleClick);

		// Очищаем обработчик при размонтировании компонента
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isMenuOpen]); // Зависимости для повторной инициализации хука
};
