type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

interface FetchWithCredentialsProps extends RequestInit {
  method?: RequestMethod;
  headers?: Headers;
}

export async function fetchWithCredentials(url: string, props?: FetchWithCredentialsProps) {
  if (!props) {
    props = {
      method: 'GET',
      headers: new Headers(),
      credentials: 'include',
    }
  } else {
    props.method ||= 'GET'
    props.headers ||= new Headers()
    props.credentials ||= 'include'
  }

  if (props.method !== 'GET' && props.headers) {
    if (!props.headers.get('Content-Type')) {
      props.headers.set('Content-Type', 'application/json');
    }
    
    if (!props.headers.get('Access-Control-Allow-Origin')) {
      props.headers.set('Access-Control-Allow-Origin', '*')
    }
  }

  const response = await fetch(url, props)
  
  if (!response.ok) {
    const json = await response.json()

    const {title, detail, errors} = json

    let message: string = '';
    if (errors) {
      Object.keys(errors).map(key => message += `${errors[key].toString()}\n`)
    } else {
      message = `${title}: ${detail}\n${errors}` || response.statusText;
    }

    throw new Error(message);
  }
  
  return response;
}