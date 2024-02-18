import dayjs from 'dayjs'

export default function TrackDuration({ duration }: { duration: number }) {
  const d = dayjs.duration(duration)
  return `${d.format('m')}m ${d.format('s')}s`
}
