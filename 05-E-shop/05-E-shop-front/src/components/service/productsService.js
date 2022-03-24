import http from "./httpService";

const apiEndpoint = "products";

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getProducts() {
  return await http.get(apiEndpoint).catch(e => { console.log('e',e)});
}

export async function getProduct(product_id) {
  return await http.get(productUrl(product_id)).catch(e => { console.log('e',e)});
}

export async function deleteProduct(product_id) {
  return await http.delete(productUrl(product_id)).catch(e => { console.log('e', e)});
}

export async function saveProduct(product) {
  // create new product
  if (!product._id) {
    // productInDb._id = Date.now().toString(); // 幫我們新增沒有新product的Id，若沒有新增toString()則無法進去編輯新product
    return await http.post(apiEndpoint, product).catch(e => { console.log(e)});
  }

  // update old product
  const body = { ...product }; // 物件淺複製，新增記憶體位置
  delete body._id;
  return http.put(productUrl(product._id), body); // 後端不接受_id屬性作為request body的一部份，因為如果有人去更改product._id，但是product._id也是作為api url的參數，所以更改後哪個是正確的_id?所以後端不接受_id作為body的一部份

  //   return productInDb;
}
