/* eslint-env jquery */
(function () {
  const doc = document
  const rootEl = doc.documentElement
  const body = doc.body
  const lightSwitch = doc.getElementById('lights-toggle')
  /* global ScrollReveal */
  const sr = window.sr = ScrollReveal()

  rootEl.classList.remove('no-js')
  rootEl.classList.add('js')

  window.addEventListener('load', function () {
    body.classList.add('is-loaded')
  })

  const subscribeButton = document.getElementById('SubscribeButton')
  subscribeButton.addEventListener('click', async function (event) {
    const url = document.getElementById('WebhookUrlBox').value
    const selectBox = document.getElementById('SubscriptionTypeSelect').value
    const data = JSON.stringify({ 'WebhookUrl': url, 'SubscriptionType': selectBox })
    const alertbox = $('#ConfirmationAlert')
    $(alertbox).attr('class', 'display-progress').text('Hold on, registering subscription').fadeIn()
    $('#SubscribeButton').fadeTo( 1000, 0 ); 
    $.ajax({
      type: 'POST',
      url: 'https://dailycomic.azure-api.net/dailycomic/SubscriberRegistration',
      crossDomain: true,
      data: data,
      success: function (responseData, textStatus, jqXHR) {
        $(alertbox).attr('class', 'display-success')
        $(alertbox).text('Subscription registered. First comic should be sent in a few seconds!')
        $('#SubscribeButton').fadeTo( 1000, 100 );
      },
      error: function (responseData, textStatus, errorThrown) {
        $(alertbox).attr('class', 'display-error')
        if (responseData.responseJSON){
          $(alertbox).text(responseData.responseJSON.Message)
        } else {
          $(alertbox).text("Oooops, sorry, something did not work.")
        }
        $('#SubscribeButton').fadeTo( 1000, 100 );
      }
    })
  })

  // Reveal animations
  function revealAnimations () {
    sr.reveal('.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'right',
      viewFactor: 0.2
    })
  }

  if (body.classList.contains('has-animations')) {
    window.addEventListener('load', revealAnimations)
  }

  // Light switcher
  if (lightSwitch) {
    window.addEventListener('load', checkLights)
    lightSwitch.addEventListener('change', checkLights)
  }

  function checkLights () {
    let labelText = lightSwitch.parentNode.querySelector('.label-text')
    if (lightSwitch.checked) {
      body.classList.remove('lights-off')
      if (labelText) {
        labelText.innerHTML = 'dark'
      }
    } else {
      body.classList.add('lights-off')
      if (labelText) {
        labelText.innerHTML = 'light'
      }
    }
  }
}())
