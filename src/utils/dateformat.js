
function dataFormat(timestamp) {
  
  let stamp = parseInt(timestamp)
  let d = new Date(stamp)
  
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let date = d.getDate()

  return year + "-" + addZero(month) + "-" + addZero(date)
}

function addZero(num) {
  return ( num < 10) ? '0' + num : num 
}

export default dataFormat
