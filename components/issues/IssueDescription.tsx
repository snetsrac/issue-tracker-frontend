import Shimmer from '../ui/shimmer';

type IssueDescriptionProps = {
  description: string | undefined;
};

export default function IssueDescription({
  description,
}: IssueDescriptionProps) {
  return (
    <div className='py-3 xl:pt-6 xl:pb-0'>
      {description === undefined ? (
        <Shimmer className='w-96 py-4' />
      ) : (
        <>
          <h2 className='sr-only'>Description</h2>
          <div className='prose max-w-none space-y-4'>
            {description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
