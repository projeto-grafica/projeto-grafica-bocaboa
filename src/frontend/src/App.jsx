import './App.css'
import AppRoutes from './routes'

function App() {
  return(
    <div className="App">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/carrinho">Carrinho</a></li>
          <li><a href="/pesquisa">Pesquisa</a></li>
        </ul>
      </nav>
      <AppRoutes />
    </div>
  )
}

export default App
