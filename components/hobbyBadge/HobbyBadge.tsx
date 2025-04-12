import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

type BadgeWithImageProps = {
  name: string;
  imageUrl: string;
  isActive: boolean;
  onClick: () => void;
};

const BadgeWithImage = ({ name, imageUrl, isActive, onClick }: BadgeWithImageProps) => {
  return (
    <li
      className="flex cursor-pointer flex-wrap items-center gap-3 rounded-full px-3 py-2"
      onClick={onClick}
    >
      <Badge className="rounded-full px-3 py-2" variant={isActive ? 'default' : 'outline'}>
        <Image src={imageUrl} className="mr-2 h-5 w-5 rounded-full" alt="" height={20} width={20} />
        <span className="text-base">{name}</span>
      </Badge>
    </li>
  );
};

export default BadgeWithImage;
