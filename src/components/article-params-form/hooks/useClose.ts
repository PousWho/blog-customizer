import { useEffect } from 'react';

// Тип для пропсов хука
type TUseClose = {
	isMenuOpen: boolean; // Флаг, открыто ли меню.
	onClose: () => void; // Функция для закрытия меню.
	rootRef: React.RefObject<HTMLFormElement>; // Референс на корневой элемент меню.
};

/**
 * Кастомный хук для закрытия меню при:
 * 1. Нажатии на клавишу Escape.
 * 2. Клике вне области меню.
 */
export function useClose({ isMenuOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		// Если меню закрыто, выходим из эффекта.
		if (!isMenuOpen) return;

		// Обработчик кликов вне меню.
		function handleClickOutside(event: MouseEvent) {
			// Проверяем, что событие произошло за пределами меню.
			if (
				event.target instanceof Node && // Убедимся, что target — DOM-узел.
				rootRef.current && // Убедимся, что есть ссылка на корневой элемент.
				!rootRef.current.contains(event.target) // Проверяем, что клик вне меню.
			) {
				onClose(); // Закрываем меню.
			}
		}

		// Обработчик нажатия клавиши Escape.
		function handleEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose(); // Закрываем меню.
			}
		}

		// Навешиваем слушатели событий.
		document.addEventListener('mousedown', handleClickOutside); // Обрабатываем клики.
		document.addEventListener('keydown', handleEscape); // Обрабатываем клавишу Escape.

		// Очищаем слушатели при размонтировании или изменении зависимостей.
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isMenuOpen, onClose, rootRef]); // Зависимости хука: следим за состоянием меню, функцией onClose и ref.
}
