type Product = 
{
  id: number,
  productType: string,  
  product_date: Date,
  productPrice: ProductPrice,
  tags: object
}

type ProductPrice = {
  regularPrice: number
  markedPrice: number
}