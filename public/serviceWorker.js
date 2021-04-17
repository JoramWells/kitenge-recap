
const PUBLIC_KEY = "BIVjmRqi0LMYhs3kciV76hMGHThRmeP2i6guAF37UgL3ukJI_L4OCz08McerTtMKpRWcrT4z6A5s4JB62r8neT4"

//register service worker

if('serviceWorker' in navigator){
  send().catch(err=>console.log(err))

  }

  async function send(){
    
    const register =await navigator.serviceWorker.register('/sw_cached_pages.js').then(response=>console.log(response)).catch(err=>{console.log(err)})

    console.log('Registering push..')
  const subscription = await register.pushManager.subscribe({
    userVisibility:true,
    applicationServerKey:urlBase64ToUint8Array(PUBLIC_KEY)

  }).then(response=>console.log(response)).catch(err=>console.log(err))
  console.log('push registered')
  await fetch('http://localhost:5000/products',{
    method:'POST',
    body:JSON.stringify(subscription),
    headers:{
      'content-type':'application/json'
    }
  }).then(response=>console.log(response)).catch(err=>console.log(err))
  console.log('push sent..')


  }

  function urlBase64ToUint8Array(base64String){
    const padding = '='.repeat((4-base64String.length%4)%4)
    const base64 = (base64String + padding)
    .replace(/\-/g,'+')
    .replace(/_/g,'/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for(let i=0; i<rawData.length; ++i){
      outputArray[i]=rawData.charCodeAt(i)
    }
    return outputArray
  }

  //Register push