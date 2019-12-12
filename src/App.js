import React from 'react';
import './App.css';
import animateCSS from './Animate';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      sections:[
        {
          id:'about',
          number:1,
          title:'About me',
          content:"Hello, I am Thomas. I am learning web and application development."
        },
        {
          id:'work',
          number:2,
          title:'Work',
          content:<Work text="coucouille"/>
        },
        {
          id:'contact',
          number:3,
          title:'Contact',
          content:''
        } 
      ],
      logoUrl: "./logo.png",
      displayedSection:[1,'about']
    }
    this.handleNavClick = this.handleNavClick.bind(this)
  }
  handleNavClick(e){
    this.state.sections.forEach(x=>{
      if (parseInt(e.target.id[3])===x.number){
        if (x.number !== this.state.displayedSection[0]){
          // menu animation
          const previousNavSelected = document.getElementsByClassName('currentNav').item(0)
          animateCSS('.currentNav', 'navFadeOut', ()=>previousNavSelected.classList.remove('currentNav'))
          animateCSS('#'+e.target.id, 'navFadeIn')
          e.target.classList.add('currentNav')
          // hide the previous displayed section
          const [outDirection, inDirection] = (this.state.displayedSection[0] < parseInt(e.target.id[3]))?['fadeOutLeft','fadeInRight']:['fadeOutRight','fadeInLeft']
          animateCSS('#'+this.state.displayedSection[1], outDirection, ()=>this.setState({displayedSection:[x.number, x.id]}))
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
const Work = (props) => {
  return (
    <div id="work">
      {props.text}
    </div>
  )
}

export default App;
