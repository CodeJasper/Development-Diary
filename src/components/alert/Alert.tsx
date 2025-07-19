export type AlertProps = {
  text: string;
  type: 'SUCCESS' | 'ERROR' | 'INFORMATION';
  isDismissible?: boolean;
  id: string;
  className?: string;
}

export default function Alert(props: AlertProps) {
  const { text, type, isDismissible, id, className = ''} = props;

  const getTypeClasses = () => {
    if(type === 'ERROR') {
      return 'bg-red-100/60 border-red-300 text-red-800'
    }

    if(type === 'SUCCESS') {
      return 'bg-green-100/60 border-green-300 text-green-800'
    }

    return 'bg-blue-100/60 border-blue-300 text-blue-800'
  }

  return (
    <div id={id} className={`p-4 rounded border-1 flex justify-between items-center ${getTypeClasses()} ${className}`}>
      <p className="p-0">{text}</p>
      {isDismissible && (
        <button onClick={() => document.getElementById(id)?.remove()} aria-label="Close" className="flex hover:cursor-pointer">
          <i className='bx bx-x'></i>
        </button>
      )}
    </div>
  )
}