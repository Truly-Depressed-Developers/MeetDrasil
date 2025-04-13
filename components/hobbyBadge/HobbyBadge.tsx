import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type HobbyBadgeProps = {
  className?: string;
  name: string;
  iconSize?: number;
  imageUrl: string;
  isActive: boolean;
};

const HobbyBadge = ({ className, name, iconSize, imageUrl, isActive }: HobbyBadgeProps) => {
  return (
    <Badge
      className={cn('rounded-full px-3 py-2 text-sm', className)}
      variant={isActive ? 'default' : 'outline'}
    >
      <Image
        src={imageUrl}
        className="mr-2 rounded-full"
        alt="icon"
        height={iconSize || 20}
        width={iconSize || 20}
      />
      {name}
    </Badge>
  );
};

export default HobbyBadge;
