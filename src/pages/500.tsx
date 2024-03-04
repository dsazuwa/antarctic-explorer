import Error from '@/components/Error';

export default function InternalServerPage() {
  return (
    <Error
      statusCode={500}
      title='Internal Server Error.'
      text="Oops! Something went wrong. Sorry for the inconvenience, we're working on it."
    />
  );
}
