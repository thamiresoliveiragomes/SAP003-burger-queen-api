import productService from '../services/productService'
import Util from '../utils/utils'

const util = new Util()

class productController {
  static async getAllProducts(req, res) {
    try {
      const allProducts = await productService.getAllProducts()
      if (allProducts.length > 0) {
        util.setSuccess(200, 'Products retrieved', allProducts)
      } else {
        util.setSuccess(200, 'No product found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addProduct(req, res) {
    if (!req.body.name || !req.body.price || !req.body.category) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newProduct = req.body
    try {
      const createdProduct = await productService.addProduct(newProduct)
      util.setSuccess(201, 'Product Added!', createdProduct)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }}

  static async updatedProduct(req, res) {
    const alteredProduct = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateProduct = await productService.updateProduct(id, alteredProduct)
      if (!updateProduct) {
        util.setError(404, `Cannot find product with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Product updated', updateProduct)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theProduct = await productService.getProduct(id)

      if (!theProduct) {
        util.setError(404, `Cannot find product with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found product', theProduct)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const productToDelete = await productService.deleteProduct(id)

      if (productToDelete) {
        util.setSuccess(200, 'Product deleted')
      } else {
        util.setError(404, `Product with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default productController