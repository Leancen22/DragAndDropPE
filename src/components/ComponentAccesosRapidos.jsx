import React from 'react'

const ComponentAccesosRapidos = ({info}) => {
  return (
    <>
    {console.log(info.items[0].title)}
    <section class="component-accesos-rapidos">
        <div class="page-container">

            <div class="ar__cardlist">

                {info.items.map((item, index) => (
                    <div class="ar__item" key={index}> 
                        <a href={item.link} class="ar__item-link">
                        <h4 class="ar__item-title"> {item.title} </h4>
                        </a>
                    </div>
                ))}

            </div>

        </div>
    </section>
    </>
  )
}

export default ComponentAccesosRapidos