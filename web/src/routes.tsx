import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'

const Routes = () =>{
  return (
    <BrowserRouter>
      {/* exact rota tem que ser exatamente ao path obs: o route verifica se começa com caractere */}
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  )
}

export default Routes