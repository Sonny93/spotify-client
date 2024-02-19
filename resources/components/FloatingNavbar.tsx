import useUser from '@/hooks/useUser'
import styled from '@emotion/styled'
import { MdFullscreen } from 'react-icons/md'
import InlineList from './InlineList'

const Nav = styled.nav({
  zIndex: 1,
  position: 'absolute',
  top: '1em',
  right: '1em',
  color: '#fff',
})

const UserCard = styled.div({
  display: 'flex',
  gap: '.5em',
  alignItems: 'center',
  justifyContent: 'center',
})

export default function FloatingNavbar() {
  const { user } = useUser()
  const toggleFullscreen = () =>
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen()
  return (
    <Nav>
      <InlineList>
        <MdFullscreen size={32} css={{ cursor: 'pointer' }} onClick={toggleFullscreen} />
        <UserCard>
          <img src={user.avatarUrl} height={32} width={32} css={{ borderRadius: '50%' }} />{' '}
          {user.nickName}
        </UserCard>
      </InlineList>
    </Nav>
  )
}
