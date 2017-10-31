import React from 'react'

const About = (props) => {
  return (
    <div className="row">
    <div className="col-sm-4">
      <img src="/piggie.png" className="img-fluid" />
    </div>
    <div className="col-sm-8">
        <h1 className="mb-2">notimal, a tool for herbivores</h1>
        <hr />
      <p>notional is simple tool to help herbivores on the go decide if they’re able to consume an new food or meal, especially when it’s not explicitly labeled Vegan or Vegetarian friendly.</p>
      <p>This project was built by Mike Kerslake on the NERDS stack over a weekend while consuming way too much coffee. Special thanks to Edaman for sourcing nutrias data as well as PETA.org for scoping ingredients that are not free from animal harm. </p>
      <p>Questions, comments or general advice about the big rock we live on, please throw me an email at</p>
    </div>
    </div>
  )
}

export default About
