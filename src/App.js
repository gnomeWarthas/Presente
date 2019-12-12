import React from 'react';
import './App.css';
import animateCSS from './Animate';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      logoUrl: "./logo192.png",
      sections:[
        {
          id:'about',
          title:'About'
        },
        {
          id:'work',
          title:'Work'
        },
        {
          id:'contact',
          title:'Contact'
        } 
      ],
      displayedSection:'about'
    }
    this.handleNavClick = this.handleNavClick.bind(this)
  }
  handleNavClick(e){
    const arr = this.state.sections.map(x=>{
      if (e.target.id.replace('nav','')===x['id']){
        if (x['id'] !== this.state.displayedSection){
          this.setState({displayedSection:x['id']})
          animateCSS('#'+x['id'], 'fadeInLeft')
        }
      }
      return x;
    })

    //
  }
  render(){
    const sections = this.state.sections.map(x=>{
      return(
        <section id={x['id']} style={(this.state.displayedSection === x['id'])?{display:'block'}:{display:'none'}}>
          <h1>{x['title']}</h1>
        </section>
      )
    })
    const navs = this.state.sections.map(x=>{
      return(
        <li id={"nav" + x['id']} onClick={this.handleNavClick}>
         {x['title']}
        </li>
      )
    })
    return (
      <div id="app">
        <nav>
        <Logo img={this.state.logoUrl} />
          <ul>
            {navs}
          </ul>
        </nav>
        {sections}
      </div>
    );
  }
}

// stateless functional components
const Logo = (props) => {
  return (
    <div id="logo">
      <img src={props.img} id="logo" alt="" />
    </div>
  )
}

export default App;
