export enum TopLevelCategory {
	SchoolBooks,
	Musics,
	Books,
	MusicBooks
}

export class BookPageModel {
	_id: string;
	firsCategory: TopLevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	information: {
		author: string;
		year: string;
	};
}
