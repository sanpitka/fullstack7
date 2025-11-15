import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({notification}) => notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if ( !notification || !notification.message) return null

  return (
    <div style={style} className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification
