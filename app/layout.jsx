import "@styles/globals.css"
import Nav from "@components/Nav"
import Provider from "@components/Provider"

export const metadata = {
  title: 'IdeaBook',
  description: 'Share your idea and let the world inspired by you',
}

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
        </div>
        <main className='app'>
          <Nav/>
          {children}
        </main>
      </Provider>
    </body>
  </html>
)

export default RootLayout