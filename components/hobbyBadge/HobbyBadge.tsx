import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

type BadgeWithImageProps = {
  name: string;
  imageUrl: string;
  isActive: boolean;
};

const BadgeWithImage = ({ name, imageUrl, isActive }: BadgeWithImageProps) => {
  return (
    <Badge className="rounded-full px-3 py-2" variant={isActive ? 'default' : 'outline'}>
      <Image src={imageUrl} className="mr-2 size-5 rounded-full" alt="" height={20} width={20} />
      <span className="text-base">{name}</span>
    </Badge>
  );
};

export default BadgeWithImage;
