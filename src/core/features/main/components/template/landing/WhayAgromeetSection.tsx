import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';

function WhayAgromeetCard({
  cardData,
}: {
  cardData: {
    cardName: string;
    iconSrc: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 w-full">
      {cardData?.map((card, index) => (
        <div
          key={index}
          className="py-10 lg:py-2 h-16 px-5 flex-grow flex items-center justify-between gap-4 text-white bg-primary rounded-lg w-full max-w-lg lg:max-w-xs shadow-lg mx-auto"
        >
          <ImgNormalCustom src={card?.iconSrc} alt={'آیکون'} width={50} height={50} className="pb-1" />
          <p className="w-full">{card?.cardName}</p>
        </div>
      ))}
    </div>
  );
}

export default WhayAgromeetCard;
