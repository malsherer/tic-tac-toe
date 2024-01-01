import React from 'react'

interface Squareprops {
  value: string | null
  index: number
  gamePlay: (index: number) => void
}

export default function Square<SquareProps>(props: any) {
  const handleClick = () => {
    props.gamePlay(props.index)
  }
  return (
    <div className='square' onClick={handleClick}>
      {props.value}
    </div>
  )
}