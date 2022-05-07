import { classNames } from '../components/table/table';

type ShimmerProps = {
  className?: string;
};

export default function Shimmer({ className }: ShimmerProps) {
  return (
    <span className={classNames('shimmer inline-block rounded-md', className)}>
      &#x200B;
    </span>
  );
}
