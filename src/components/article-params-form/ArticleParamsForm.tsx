import { Button } from 'components/button';
import { ArrowButton } from 'components/arrow-button';
import { Text } from '../text';
import { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import { useClose } from './hooks/useClose';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для отображения меню
	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption, // Текущий шрифт
		fontSize: articleState.fontSizeOption, // Текущий размер шрифта
		fontColor: articleState.fontColor, // Текущий цвет текста
		backgroundColor: articleState.backgroundColor, // Текущий цвет фона
		contentWidth: articleState.contentWidth, // Текущая ширина контента
	});

	const rootRef = useRef<HTMLElement | null>(null); // Ссылка на корневой элемент меню
	const formRef = useRef<HTMLFormElement>(null); // Ссылка на форму

	// Закрытие меню при клике вне его области
	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false), // Закрытие меню
		onChange: setIsMenuOpen, // Изменение состояния меню
	});

	// Закрытие меню с помощью кастомного хука
	useClose({
		isMenuOpen,
		onClose: () => setIsMenuOpen(false), // Закрытие меню
		rootRef: formRef, // Привязка к форме
	});

	// Обработчик отправки формы (сохранение параметров)
	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		// Обновление состояния статьи с текущими параметрами формы
		setArticleState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});

		setIsMenuOpen(false); // Закрытие меню после сохранения
	};

	// Обработчик сброса формы (восстановление стандартных параметров)
	const formResetHandler = () => {
		setFormState({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});

		setArticleState(defaultArticleState); // Сброс состояния статьи к значениям по умолчанию
	};

	return (
		<>
			{/* Кнопка для открытия/закрытия меню */}
			<ArrowButton
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				isMenuOpen={isMenuOpen}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={rootRef}>
				{/* Форма изменения параметров статьи */}
				<form
					className={styles.form}
					onSubmit={formSubmitHandler} // Сохранение изменений
					onReset={formResetHandler} // Сброс параметров
					ref={formRef}>
					{/* Заголовок формы */}
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/* Выпадающий список выбора шрифта */}
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamily: selectedOption, // Обновление шрифта
							}))
						}
					/>
					{/* Радио-группа выбора размера шрифта */}
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSize}
						title='Размер шрифта'
						name='fontSize'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontSize: selectedOption, // Обновление размера шрифта
							}))
						}
					/>
					{/* Выпадающий список выбора цвета шрифта */}
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectedOption, // Обновление цвета текста
							}))
						}
					/>
					<Separator />
					{/* Выпадающий список выбора цвета фона */}
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption, // Обновление цвета фона
							}))
						}
					/>
					{/* Выпадающий список выбора ширины контента */}
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectedOption, // Обновление ширины контента
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						{/* Кнопка сброса параметров */}
						<Button title='Сбросить' type='reset' />
						{/* Кнопка сохранения изменений */}
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
