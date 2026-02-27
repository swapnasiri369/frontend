
import Child1 from'./Child1'

const Parent = () => {
const names ="nammu"
const age = 20;
const salary=1000;

  return (
<div>
    <hl>{names} </hl>
    <hl>{age} </hl>
    <hl>{salary} </hl>
   <Child1 name={names} ages={age} salarys={salary}/>

</div>
  )
}

export default Parent
