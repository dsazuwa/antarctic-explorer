import { TCruiseLinesAndExpeditions } from '@/type';
import Expedition from './Expedition';

function Expeditions({ expeditions, cruiseLines }: TCruiseLinesAndExpeditions) {
  return (
    <div
      id='expeditions-list'
      className='flex flex-col items-center space-y-6 overflow-y-auto'
    >
      {expeditions.map((expedition, index) => (
        <Expedition
          key={'expedition' + index}
          expedition={expedition}
          cruiseLine={cruiseLines[expedition.cruiseLine]}
        />
      ))}
    </div>
  );
}

export default Expeditions;
