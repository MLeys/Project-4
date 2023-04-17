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
    className="bi bi-x" 
    viewBox="0 0 16 16"
    >
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  )
}

export function PlusFilledCircleIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-plus-circle-fill" 
    viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>  
    </svg>
  )
}

export function PlusLargeIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-plus-lg" 
    viewBox="0 0 16 16"
    >
    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>    </svg>
  )
}

export function DashFilledCircleIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-dash-circle-fill" 
    viewBox="0 0 16 16"
    >
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>    
    </svg>
  )
}

export function DashLargeIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-dash-lg" 
    viewBox="0 0 16 16"
    >
      <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
    </svg>
  )
}

export function SettingsFilledcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-gear-fill" 
    viewBox="0 0 16 16"
    >
        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
    </svg>
  )
}

export function CaretRightFilledIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-caret-right-fill" 
    viewBox="0 0 16 16"
    >
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>    </svg>
  )
}

export function BoxArrowRightIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-box-arrow-in-right" 
    viewBox="0 0 16 16"
    >
    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
  </svg>
  )
}

export function CheckSquareIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-check-square" 
    viewBox="0 0 16 16"
    >
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>

  </svg>
  )
}

export function CheckSquareFillIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-check-square-fill" 
    viewBox="0 0 16 16"
    >
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
  </svg>
  )
}

export function CheckIcon({color= "currentColor", fill="currentColor", height=16, width=16}) {
  return (
    <svg 
    color={color}
    xmlns="http://www.w3.org/2000/svg" 
    width={width}
    height={height} 
    fill={fill}
    className="bi bi-check2" 
    viewBox="0 0 16 16"
    >
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>  
    </svg>
  )
}