import {
	FontFamiliesClasses,
	fontFamilyClasses,
} from 'src/constants/articleProps'; // Импорт классов шрифтов и их типов

export function isFontFamilyClass(
	family?: string | FontFamiliesClasses // Может быть строкой или классом семейства шрифтов
): family is FontFamiliesClasses {
	// Уточнение типа возвращаемого значения
	return fontFamilyClasses.includes(family as FontFamiliesClasses); // Проверка наличия в массиве допустимых классов
}
