import { Text } from 'components/text'; // Импорт компонента Text
import styles from './Button.module.scss'; // Импорт стилей для кнопки

// Компонент Button
export const Button = ({
	title, // Текст кнопки
	onClick, // Обработчик клика (опционально)
	type, // Тип кнопки (submit, reset, button)
}: {
	title: string; // Обязательный текст кнопки
	onClick?: () => void; // Опциональный обработчик события клика
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']; // Тип кнопки HTML
}) => {
	return (
		<button
			className={styles.button} // Стили кнопки
			type={type} // Переданный тип кнопки
			onClick={onClick} // Переданный обработчик клика
		>
			{/* Текст кнопки с жирным шрифтом и заглавными буквами */}
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
