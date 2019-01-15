// Example for GET
export function getMetafieldsByProductId(productId){
  const namespace = 'pssizebyxmeta';
  const path = `/products/${productId}/metafields.json?namespace=${namespace}`;
  return getCall(path);
}

// Example for POST
export function postMetafield(productId,namespace,key,value,value_type){
  const path = `/products/${productId}/metafields.json`;
  const params = JSON.stringify({
    "metafield": {
      namespace,key,value,value_type
    }
  });
  return postCall(path,params)
}


function getCall(path){
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }
  return fetch(`/shopify/api${path}`, fetchOptions)
    .then(response => response.json());
}

function postCall(path,params){
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: params
  }
  return fetch(`/shopify/api${path}`, fetchOptions)
    .then(response => response.json());
}

function putCall(path,params){
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: params
  }
  return fetch(`/shopify/api${path}`, fetchOptions)
    .then(response => response.json());
}
