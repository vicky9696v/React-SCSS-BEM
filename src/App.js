import {Component} from "react"
import './App.scss';
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Register from './components/registerPage.js'
import Graph from './components/graph.js'


class App extends Component {
  state = {
    RenderComponentGraph:false
}

  onFormSubmit = () =>{
    this.setState({RenderComponentGraph:!this.state.RenderComponentGraph})
  }

  render() {
     return (
       <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Register  onFormSubmit={this.onFormSubmit} state={this.state} />} />
         <Route exact path="/graph" element={<Graph  RenderComponentGraph={this.state.RenderComponentGraph}/>} />
        </Routes>
       </BrowserRouter>
     )
}}
export default App;
