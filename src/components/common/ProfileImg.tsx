import { Avatar } from '@nextui-org/avatar';

type AvatarProps = {
  src?: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

function ProfileImg({ src, username, size = 'md', className }: AvatarProps) {
  if (!src || !username) {
    return (
        <Avatar
          showFallback
          size={size}
          src="https://api.dicebear.com/9.x/glass/svg"
          className={className}
        />
    );
  }
  return (
      <Avatar showFallback size={size} name={username} src={src} className={className}/>
  );
}
export default ProfileImg;
