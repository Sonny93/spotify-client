import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from '@inertiajs/react'

const animation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  75% {
    transform: translateY(0.75em);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
`

const ScrollContainer = styled.div({
  fontSize: '16px',
  position: 'absolute',
  bottom: '1em',
  left: '50%',
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
})

const ScrollButton = styled(Link)({
  'cursor': 'pointer',
  'position': 'relative',
  'display': 'inline-block',
  'height': '4em',
  'width': '2em',
  'backgroundColor': 'transparent',
  'border': '3px solid #fff',
  'borderRadius': '1em',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  'transition': '.15s',
})

const ScrollDot = styled.div({
  display: 'block',
  position: 'absolute',
  left: '50%',
  background: '#fff',
  height: '0.5em',
  width: '0.5em',
  top: '0.6em',
  marginLeft: '-0.25em',
  borderRadius: '50%',
  transformOrigin: 'top center',
  backfaceVisibility: 'hidden',
  animation: `${animation} 2s ease-out infinite`,
})

const ScrollMouse = (): JSX.Element => (
  <ScrollContainer>
    <ScrollButton className="reset" href="/#recently-played">
      <ScrollDot />
    </ScrollButton>
    <p css={{ fontSize: '.85em' }}>Défilez pour voir l'historique de lecture</p>
  </ScrollContainer>
)

export default ScrollMouse
