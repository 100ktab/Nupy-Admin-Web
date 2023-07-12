import './globals.css'
import Recoil from "@/components/Recoil";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta title={'nupy'}/>
      <body className={''}>
        <Recoil>
          {children}
        </Recoil>
      </body>
    </html>
  )
}
