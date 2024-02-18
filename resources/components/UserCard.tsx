import useUser from '@/hooks/useUser'

export default function UserCard() {
  const { user } = useUser()
  return (
    <div
      css={{
        zIndex: 1,
        position: 'absolute',
        top: '1em',
        right: '1em',
        color: '#fff',

        display: 'flex',
        gap: '.5em',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={user.avatarUrl} height={32} width={32} css={{ borderRadius: '50%' }} />
      <span css={{ mixBlendMode: 'color-dodge' }}>{user.nickName}</span>
    </div>
  )
}
