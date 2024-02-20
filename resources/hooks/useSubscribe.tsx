import { useEffect } from 'react'
import useTransmit from './useTransmit'

export default function useSubscribe<T>(
  channel: string,
  onNewData: (data: T) => void,
  initRequestUrl?: string
): void {
  const { transmit } = useTransmit()
  useEffect(() => {
    const unsubscribe = transmit.listenOn(channel, (newData: T) =>
      setTimeout(() => onNewData(newData))
    )

    if (initRequestUrl) {
      transmit.on('connected', fetchInitRequest)
    }

    return () => unsubscribe(true)
  }, [])

  const fetchInitRequest = () => fetch(initRequestUrl)
}
