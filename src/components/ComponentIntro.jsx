import React from 'react'

const ComponentIntro = ({title, text, img}) => {
  return (
    <section class="component-intro">  
        <div class="page-container"> 

            <div class="intro__content">
            <div class="intro__text"> 
                <h2 class="section__title"> {title} </h2> 
                <p class="intro__text"> {text} </p>
            </div>
            <img src={img} alt="Image text" class="img-fluid img-intro"/>
            </div>

        </div>
    </section>
  )
}

export default ComponentIntro