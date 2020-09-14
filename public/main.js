window.addEventListener( 'load' , () => {
  const garageElement = document.querySelector( '#garage' )
  const sendElement = document.querySelector( '#send' )
  const nameElement = document.querySelector( '#name' )
  const licenceElement = document.querySelector( '#licence' )

  function convertPeriod ( mil ) {
    let min = Math.floor( mil / 60000 )
    let sec = Math.floor( ( mil % 60000 ) / 1000 )
    return `${min}m e ${sec}s`
  }

  function renderGarage () {
    const garage = getGarage()
    garageElement.innerHTML = ''
    garage.forEach( c => addCarToGarage( c ) )
  }

  function addCarToGarage ( car ) {
    const row = document.createElement( 'tr' )
    row.innerHTML = `
    <td>${car.name}</td>
    <td>${car.licence}</td>
    <td data-time='${car.time}'>
    ${new Date( car.time )
      .toLocaleString( 'pt-BR' , { 
        hour: 'numeric', minute: 'numeric' 
      } ) }
      </td>
      <td>
      <button class="delete">Encerrar</button>
      </td>`

      garageElement.appendChild( row )
    }

  function checkOut ( info ) {
    let period = new Date() - new Date( info[2].dataset.time )
    period = convertPeriod( period )

    const licence = info[1].textContent
    const msg = `O veículo ${info[0].textContent} de placa ${licence} permaneceu ${period} estacionado. \n\n Deseja encerrar?`

    if( !confirm( msg ) ) return

      const garage = getGarage().filter( c => c.licence !== licence )
    localStorage.garage = JSON.stringify( garage )

    renderGarage()
  }

  const getGarage = () => localStorage.garage ? JSON.parse( localStorage.garage ) : []

  renderGarage()
  sendElement.addEventListener( 'click' , e => {
    const name = nameElement.value
    const licence = licenceElement.value

    if ( !name || !licence ) {
      alert( 'Os campos são obrigatórios.' )
      return
    }   

    const card = { name, licence, time: new Date() }

    const garage = getGarage()
    garage.push( card )

    localStorage.garage = JSON.stringify( garage )

    addCarToGarage( card )
    nameElement.value = ''
    licenceElement.value = ''
  } )

  garageElement.addEventListener( 'click' , (e) => {
    if ( e.target.className === 'delete' ) {
      checkOut( e.target.parentElement.parentElement.cells )
    }
  } )
} )