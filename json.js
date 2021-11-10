// fetch external file
class JSONObject {
  constructor() {}
  async getProducts() {
    const productResponse = await fetch('folder.json');

    const productData = await productResponse.json();

    return productData;
  }
}
