export default function TrackProgressBar({
  duration,
  progress,
}: {
  duration: number
  progress: number
}) {
  const percent = (progress / duration) * 100
  return (
    <div
      css={{
        'position': 'relative',
        'height': '.6em',
        'width': '100%',
        'backgroundColor': '#aaa',
        'borderRadius': '.5em',
        'overflow': 'hidden',
        '&:hover div:last-child': {
          opacity: 1,
        },
      }}
    >
      <div
        css={{
          height: '100%',
          width: `${percent}%`,
          backgroundColor: '#fff',
          transition: 'linear .75s',
        }}
      />
      <div
        css={{
          position: 'absolute',
          mixBlendMode: 'exclusion',
          fontSize: '.5em',
          opacity: 0,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          transition: '.15s',
        }}
      >
        {percent.toFixed(0)}%
      </div>
    </div>
  )
}
