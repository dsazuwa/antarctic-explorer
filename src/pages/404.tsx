import Error from '@/components/Error';

export default function PageNotFound() {
  return (
    <Error
      statusCode={404}
      title='Page Not Found.'
      text="Sorry we can't find the page you're looking for."
    />
  );
}
