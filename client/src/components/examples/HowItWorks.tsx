import HowItWorks from '../HowItWorks';

export default function HowItWorksExample() {
  return <HowItWorks onSubmitRequest={() => console.log('Submit request clicked')} />;
}
