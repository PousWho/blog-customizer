import { CSSProperties, useState, StrictMode } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../src/components/article-params-form';
import { Article } from '../src/components/article';
import { createRoot } from 'react-dom/client';
import styles from '../src/styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--bg-color': articleState.backgroundColor.value, // фоновый цвет
					'--font-color': articleState.fontColor.value, // цвет текста
					'--font-size': articleState.fontSizeOption.value, // размер текста
					'--font-family': articleState.fontFamilyOption.value, // шрифт текста
					'--container-width': articleState.contentWidth.value, // размер контейнера, увелечение при изменение 'широкий, узкий'
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
