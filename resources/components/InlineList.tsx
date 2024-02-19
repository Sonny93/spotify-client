import type { Theme } from '@emotion/react'
import type { Interpolation } from '@emotion/serialize'
import { Children, type ReactNode } from 'react'

export default function InlineList({
  children,
  customCss = {},
}: {
  children: ReactNode | ReactNode[]
  customCss?: Interpolation<Theme>
}) {
  const totalChilds = Children.count(children)
  return (
    <ul
      css={[
        {
          display: 'flex',
          gap: '0.75em',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        },
        customCss,
      ]}
    >
      {Children.map(
        children,
        (child, index) =>
          child && (
            <>
              <li key={child.toString()}>{child}</li>
              {index !== totalChilds - 1 && <li css={{ color: '#aaa', fontSize: '.8em' }}>•</li>}
            </>
          )
      )}
    </ul>
  )
}
