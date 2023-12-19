import { CssBaseline, ThemeProvider } from "@mui/material";
import Subscribe from './Subscribe'
function App() {
  const theme = {
    "version": 2,
    "settings": {
      "color": {
        "palette": [
          {
            "name": "Black",
            "slug": "black",
            "color": "#000000"
          },
          {
            "name": "White",
            "slug": "white",
            "color": "#ffffff"
          }
        ]
      }
    }
  }
  return (
    <>

      <CssBaseline />
      <Subscribe />


    </>
  )
}

export default App
