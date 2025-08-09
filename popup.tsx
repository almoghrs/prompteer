import { createRoot } from 'react-dom/client'
import App from './src/App'
import './src/styles/tailwind.css'
import './src/styles/globals.css'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
