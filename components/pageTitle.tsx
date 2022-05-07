import Shimmer from './shimmer';

type PageTitleProps = {
  title: string | undefined;
};

export default function PageTitle({ title }: PageTitleProps) {
  return title === undefined ? (
    <Shimmer className='w-96 text-2xl' />
  ) : (
    <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
  );
}
