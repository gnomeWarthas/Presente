import React, { useState, useEffect } from 'react'
import { animateCSS } from './Animate'
import { projects } from './projects'
import { BrowserRouter as Router, Switch, Route, NavLink, useLocation } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import marked from 'marked'

import './App.scss'

export const App = () => {

  /* HOOKS */
  const [workDetails, setWorkDetails] = useState(
    {
      files:[
        {name:'portfolio', content:'loading...'},
        {name:'todolist', content:'loading...'},
        {name:'empty', content:''}
      ]
    }
  )
  const [markdownLoaded, setMarkdownLoaded] = useState(false)

  useEffect(() => {
    // Fill the markdown array (for the project's details)
    workDetails.files.forEach((file, index) => {
      let getContent = require(`./markdown/${file.name}.md`)
      fetch(getContent)
        .then(response => {
          return response.text()
        })
        .then(text => {
          let swapObj = workDetails
          swapObj.files[index].content = (marked(text))
          setWorkDetails(swapObj)
          if (file.name === 'empty'){
            setMarkdownLoaded(true)
          }
        })
    })
  },[markdownLoaded,workDetails])

  // Détails
  const details = workDetails.files.map((file,index)=>
    <Detail key={`detail-${index}`} content={file.content} id={file.name} style={{display:'none'}}/>
  )

  return (
    <Router>
      <div id="app">
        <Logo img='./logo.svg' />
        <nav className='navigation'>
          <ul className='navigation__menu'>
            <li className='navigation__item'>
              <NavLink className="navigation__link" activeClassName='navigation__link--is-active' to="/about">ABOUT</NavLink>
            </li>
            <li className='navigation__item'>
              <NavLink className="navigation__link" activeClassName='navigation__link--is-active' to="/work">WORK</NavLink>
            </li>
            <li className='navigation__item'>
              <NavLink className="navigation__link" activeClassName='navigation__link--is-active' to="/contact">CONTACT</NavLink>
            </li>
          </ul>
        </nav>
        <AnimatedSwitch details={details}/>
      </div>
    </Router>
  )
}

// Animated switch
const AnimatedSwitch = (props) => {
  const location = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={500}
        onExit={()=>{
          document.querySelector('.fade-exit').style.display = 'none'
        }}

        
      >
        <Switch location={location}>
          <Route path='(/|/about)' children={<Section title='About me'><About /></Section>} />
          <Route path='/work' children={<Section title='Work'><Work content={projects}/>{props.details}</Section>} />
          <Route path='/contact' children={<Section title='Contact'><Contact /></Section>} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

// stateless functional components
const Logo = (props) => (
  <div className='logo'>
    <img src={props.img} className='logo__image' alt="" />  
  </div>
)

const Section = (props) => (
  <section id={props.id} className='section'>
    <h1 className='section__title'>{props.title}</h1>
    {props.children}
  </section>
)

const Work = (props) => {
  // Projects
  const projectList = props.content.map(x=>
      <Card id={x.id} key={x.id} name={x.name} image={x.image} description={x.description} linkGithub={x.linkGithub} linkLive={x.linkLive} stack={x.stack.map((a,n)=><li className="card__stack-item" key={n}>{a}</li>)} markdown={x.markdown} />
  )  
  return (
    <div className="work">
      {projectList}
    </div>
  )
}
const Card = (props) => {

  const displayDetail = (id) => {
    // Hide main section
    animateCSS('.work', 'fadeOut', ()=>{
      document.querySelector('.work').style.display = 'none'
      // Display detail section
      document.getElementById(id).style.display='block'
      animateCSS(`#${id}`, 'fadeInBottom')
    })
  }

  return(
    <div id={props.id} className='card'>
      <h2 className="card__title">{props.name}</h2>
      <div className="card__links">
        { 
          (props.linkGithub !== '')
          ?<a href={props.linkGithub} alt="Live demo" target='_blank' className="card__link" rel="noopener noreferrer"><img className="card__link-image" src='./img/icon-github.png' alt='' /></a>
          :<img className="card__link-image card__link-image--inactive" src='./img/icon-github.png' alt='' />
        }
        { 
          (props.linkLive !== '')
          ?<a href={props.linkLive} alt="Live demo" target='_blank' className="card__link" rel="noopener noreferrer"><img className="card__link-image" src='./img/icon-web.png' alt='' /></a>
          :<img className="card__link-image card__link-image--inactive" src='./img/icon-web.png' alt='' />
        }
      </div>
      <div className='card__content' onClick={(e)=>{
        e.stopPropagation()
        displayDetail(props.markdown)
      }}>
        <p className="card__description">{props.description}</p>
        <img className="card__image" src={props.image} alt={props.name} />
        <ul className="card__stack">
          {props.stack}
        </ul>
      </div>
    </div>
  )
}
const About = (props) => (
  <div className="about">
    <img src='./img/me.jpg' alt='me' className="about__image about__image--round"/>
    <div className="about__intro">
      <span className='about__quote-image'><i className="fas fa-quote-left"></i></span>
      <p className="about__intro-title">Hello, I am Thomas,</p>  
    </div>
    <div className="about__text-group">
      <p className="about__text">I worked 12 years in IT, on application support, management and parameterization, mostly around Enterprise Architecture domain.</p>
      <p className="about__text">I currently am on a sabbatical year to explore and learn about code, web and application development, design, and many things I wanted to go further with since a long time.</p>
    </div>
    <div className='about__dots-image'><i className="fas fa-ellipsis-h"></i></div>
  </div>
)

const Contact = (props) => (
  <div className="contact">
    <p className="contact__email">{'thomasdotwagneratuwathdotme'.replace(/dot/g,'.').replace(/atu/g,'@')}</p>
    <p className="contact__phone">{'06dotTTdot36dot63dot7T'.replace(/dot/g,'.').replace(/T/g,'2')}</p>
    <p className="networks">
      <a className="networks__link" href='https://twitter.com/Warthas2' target='_blank' rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
      <a className="networks__link" href='https://github.com/gnomeWarthas' target='_blank' rel="noopener noreferrer"><i className="fab fa-github"></i></a>
      <a className="networks__link" href='https://www.freecodecamp.org/fcc970cb3b2-e345-4a79-81ac-db98ffb618d1' target='_blank' rel="noopener noreferrer"><i className="fab fa-free-code-camp"></i></a>
      <a className="networks__link" href='https://codepen.io/Warthas' target='_blank' rel="noopener noreferrer"><i className="fab fa-codepen"></i></a>
      <a className="networks__link" href='https://www.linkedin.com/in/thomas-wagner-88897852/' target='_blank' rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
    </p>
  </div>
)

const Detail = (props) => {

  const hideDetail = () => {
    for (const detail of document.getElementsByClassName('detail')){
      if (detail.style.display === 'block'){
        animateCSS('#'+detail.id, 'fadeOutBottom', ()=>{
          detail.style.display = 'none'
          // Show the work section
          document.querySelector('.work').style.display = 'grid'
          animateCSS('.work', 'fadeIn')
        })
      } 
    }
  }

  document.addEventListener('click',hideDetail)

  return (
    <section id={props.id} style={props.style} className='detail'>
        <div className='detail__header'>
          <span className='detail__title'>{props.id[0].toUpperCase()+props.id.slice(1,props.id.length)}</span>
          <i className="fas fa-times-circle detail__close-btn" onClick={(e)=>{
            hideDetail()
            e.stopPropagation()
            }}></i>
        </div>
        <article className="detail__content" dangerouslySetInnerHTML={{__html: props.content}}></article>
    </section>
  )
}