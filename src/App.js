import React from 'react';
import './App.css';
import animateCSS from './Animate';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      logoUrl: "./logo.png",
      sections:[
        {
          id:'about',
          number:1,
          title:'Thomas WAGNER',
          content:"Hello, I am Thomas. I am learning web and application development."
        },
        {
          id:'work',
          number:2,
          title:'Work',
          content:''
        },
        {
          id:'contact',
          number:3,
          title:'Contact',
          content:''
        } 
      ],
      displayedSection:[1,'about']
    }
    this.handleNavClick = this.handleNavClick.bind(this)
  }
  handleNavClick(e){
    this.state.sections.forEach(x=>{
      if (parseInt(e.target.id[3])===x.number){
        if (x.number !== this.state.displayedSection[0]){
          // menu animation
          document.getElementsByClassName('currentNav').item(0).classList.remove('currentNav')
          e.target.classList.add('currentNav')
          // hide the previous displayed section
          const previousSection = this.state.displayedSection[1]
          const [outDirection, inDirection] = (this.state.displayedSection[0] < parseInt(e.target.id[3]))?['fadeOutLeft','fadeInRight']:['fadeOutRight','fadeInLeft']
          animateCSS('#'+previousSection, outDirection, ()=>this.setState({displayedSection:[x.number, x.id]}))
          // display the clicked section
          animateCSS('#'+x.id, inDirection)
        }
      }
      return x;
    })

    //
  }
  render(){
    const sections = this.state.sections.map(x=>{
      return(
        <section id={x.id} key={x.number} style={(this.state.displayedSection[1] === x.id)?{display:'block'}:{display:'none'}}>
          <h1>{x.title}</h1>
          <p>{x.content}</p>
        </section>
      )
    })
    const navs = this.state.sections.map(x=>{
      return(
        <li id={"nav" +x.number+x.id} key={x.number} onClick={this.handleNavClick} className={(x.number===1)?'currentNav':''}>
         {x.id.toUpperCase()}
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
