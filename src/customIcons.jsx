import mainTheme from "./themes/mainTheme"

export function DownArrowBoxed({color="currentColor", height=16, width=16}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      fill={color} 
      className="bi bi-caret-down-square-fill" 
      viewBox="0 0 16 16"
    >
      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z"></path>
    </svg>
  )
}

export function ListIcon({color= "currentColor", fill="currentColor", height=16, width=16}){
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-list" 
    viewBox="0 0 16 16"
  >
 
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
  </svg>
  )

}

export function VertDotsIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
      color={color}
      xmlns="http://www.w3.org/2000/svg" 
      width={width}
      height={height} 
      fill={fill}
      className="bi bi-three-dots-vertical" 
      viewBox="0 0 16 16"
    >
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    </svg>
  )
}

export function TrashIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-trash3-fill" 
    viewBox="0 0 16 16"
    >
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
    </svg>
  )
}

export function LargeXIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-x-lg" 
    viewBox="0 0 16 16"
    >
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>    </svg>
  )
}

export function XIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    class="bi bi-x" 
    viewBox="0 0 16 16"
    >
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  )
}