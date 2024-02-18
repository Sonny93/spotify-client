import dayjs from 'dayjs'

export default function TrackDuration({ duration }: { duration: number }) {
  const d = dayjs.duration(duration)
  return <span css={{ letterSpacing: '1.5px' }}>{d.format('mm:ss')}</span>
}
