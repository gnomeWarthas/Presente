import React from 'react';
import './App.css';
import animateCSS from './Animate';
import projects from './projects';

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
          content:<Work content={projects} />
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
    // Sections
    const sections = this.state.sections.map(x=>{
      return(
        <Section id={x.id} key={x.number} style={(this.state.displayedSection[1] === x.id)?{display:'block'}:{display:'none'}} title={x.title} content={x.content} />
      )
    })
    // Nav menu
    const navs = this.state.sections.map(x=>{
      return(
        <NavItem id={x.id} number={x.number} key={x.number} handleNavClick={this.handleNavClick} class={(x.number===1)?'currentNav':''} />
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
const NavItem = (props) => {
  return(
    <li id={"nav"+props.number+props.id} onClick={props.handleNavClick} className={props.class}>
        {props.id.toUpperCase()}
    </li>
  )
}
const Section = (props) => {
  return(
    <section id={props.id} style={props.style}>
      <h1>{props.title}</h1>
      {props.content}
    </section>
  )
}
const Work = (props) => {
  // Projects
  const projectList = props.content.map(x=>{
    return(
      <Card id={x.id} key={x.id} name={x.name} image={x.image} description={x.description} stack={x.stack.map((a,n)=><li key={n}>{a}</li>)} />
    )
  })  
  return (
    <div id="work">
      {projectList}
    </div>
  )
}
const Card = (props) => {
  return(
    <div id={props.id} className='card'>
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} />
      <p>{props.description}</p>
      <ul>
        {props.stack}
      </ul>
    </div>
  )
}

export default App;
