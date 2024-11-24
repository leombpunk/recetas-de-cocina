const formatDate = () => {
  const today = new Date()
  const date = new Intl.DateTimeFormat("zh-CN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: 'America/Argentina/Buenos_Aires'
  }).format(today)
  const hour = new Intl.DateTimeFormat("es-AR", {
    hour12: false,
    timeStyle: "medium",
    timeZone: 'America/Argentina/Buenos_Aires'
  }).format(today)
  // console.log(date.toString().replaceAll("/","-").concat("T", hour.toString()))
  // console.log(today.toISOString())
  return date.toString().replaceAll("/","-").concat("T", hour.toString())
}

export default formatDate
