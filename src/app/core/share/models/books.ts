interface Books {
  id: number;
  title: string;
  subtitle: string;
  firstPublishDate: Date;
  description: string;
  authors: Authors[];
  coverFile: number;
}
