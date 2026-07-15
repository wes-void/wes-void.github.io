import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt =
  'Product design, shipped to production. Wes Norris, Lead Product Designer.'

export default async function OpenGraphImage() {
  const font = await readFile(
    join(process.cwd(), 'assets/InstrumentSans-Medium.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          backgroundColor: '#fcfcfd',
          backgroundImage: [
            'radial-gradient(circle at 88% 0%, rgba(30, 61, 237, 0.16) 0%, rgba(30, 61, 237, 0) 45%)',
            'radial-gradient(circle at 4% 24%, rgba(80, 200, 235, 0.18) 0%, rgba(80, 200, 235, 0) 40%)',
            'radial-gradient(circle at 70% 108%, rgba(30, 61, 237, 0.1) 0%, rgba(30, 61, 237, 0) 40%)',
          ].join(', '),
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: '#5c5a66',
            marginBottom: 30,
          }}
        >
          WES NORRIS
        </div>
        <div
          style={{
            fontSize: 74,
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#101014',
            maxWidth: 980,
          }}
        >
          Product design, shipped to production.
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 27,
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#5c5a66',
            maxWidth: 940,
          }}
        >
          Lead Product Designer at Threshold. The design system, client
          platform, and marketing site, built by one pair of hands.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Sans',
          data: font,
          weight: 500,
          style: 'normal',
        },
      ],
    }
  )
}
