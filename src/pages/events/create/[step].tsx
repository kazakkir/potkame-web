import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import EventCreateHeader from '../../../components/EventCreate/EventCreateHeader';
import StepLocation from '../../../components/EventCreate/MultiStepForm/panels/PanelLocation';
import StepDate from '../../../components/EventCreate/MultiStepForm/panels/StepDate';
import StepGeneral from '../../../components/EventCreate/MultiStepForm/panels/StepGeneral';
import StepImage from '../../../components/EventCreate/MultiStepForm/panels/StepImage';
import StepPreview from '../../../components/EventCreate/MultiStepForm/panels/StepPreview';
import StepNavigation from '../../../components/EventCreate/MultiStepForm/StepNavigation';

type Props = {};

export default function EventCreateStep(props: Props) {
  const router = useRouter();
  const step = router.query.step;

  const renderStep = () => {
    switch (step) {
      case 'general':
        return <StepGeneral />;
      case 'date':
        return <StepDate />;
      case 'location':
        return <StepLocation />;
      case 'image':
        return <StepImage />;
      case 'preview':
        return <StepPreview />;
      default:
        <div>404</div>;
    }
  };

  return (
    <>
      <EventCreateHeader />
      <VStack pt={10} alignItems={'stretch'} gap={10}>
        <StepNavigation />
        {renderStep()}
      </VStack>
    </>
  );
}
