import RequestForm from '../RequestForm';

export default function RequestFormExample() {
  return (
    <RequestForm 
      onBack={() => console.log('Back clicked')}
      onSubmit={(data) => console.log('Form submitted:', data)}
    />
  );
}
