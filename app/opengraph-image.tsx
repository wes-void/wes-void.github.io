import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt =
  'Wes Norris is a product designer who ships his own work to production.'

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
            fontSize: 64,
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: '#101014',
            maxWidth: 980,
          }}
        >
          Wes Norris is a product designer who ships his own work to
          production.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            fontFamily: 'Instrument Sans',
            fontWeight: 500,
            color: '#5c5a66',
          }}
        >
          Product design, design systems, and the code that delivers them.
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
