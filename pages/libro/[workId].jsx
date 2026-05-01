import BookDetail from '../../src/pages/BookDetail';
import { openLibraryService } from '../../src/services/openLibraryService';

export default function BookDetailPage({ book, error }) {
  if (error) {
    return (
      <div className="state-message state-message--error">
        Error al cargar el libro: {error}
      </div>
    );
  }

  return <BookDetail book={book} />;
}

export async function getServerSideProps({ params }) {
  try {
    const book = await openLibraryService.getBookDetails(params.workId);

    return {
      props: { book }
    };

  } catch (error) {
    console.error('Error fetching book details:', error);

    return {
      props: {
        book: null,
        error: 'No se pudo cargar el libro'
      }
    };
  }
}