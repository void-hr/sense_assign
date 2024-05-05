import CartItems from '@/components/cart/CartItems'
import Navbar from '@/components/navbar/Navbar'

const Cart = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Navbar />
      <div className='container'>
      <CartItems />
      </div>
    </div>
  )
}

export default Cart