import { PageMetadata } from '../../api';

type PaginationMetadataProps = {
  pageMetadata: PageMetadata;
};

export default function PaginationMetadata({
  pageMetadata,
}: PaginationMetadataProps) {
  // Note: server pages are 0-indexed and client pages are 1-indexed

  return (
    <div>
      <p className='text-sm text-gray-700'>
        Showing{' '}
        <span className='font-medium'>
          {pageMetadata.number * pageMetadata.size + 1}
        </span>{' '}
        to{' '}
        <span className='font-medium'>
          {Math.min(
            (pageMetadata.number + 1) * pageMetadata.size,
            pageMetadata.totalElements
          )}
        </span>{' '}
        of <span className='font-medium'>{pageMetadata.totalElements}</span>{' '}
        results
      </p>
    </div>
  );
}
