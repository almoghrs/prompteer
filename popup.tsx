import { createRoot } from 'react-dom/client'
import App from './src/App'
import './src/styles/globals.css'
import './src/styles/tailwind.css'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
