import Link from "next/link";
import Image from "next/image";
import { Eye, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Product = ({ product }) => {

    const { setTotalItems } = useCart();

    const addToCart = async(e, id) => {
      e.stopPropagation();
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({productId: id}),
        });
        setTotalItems(prev => prev + 1);
      } catch (error) {
          console.log(error.message);
      }
    };
  return (
    <div className="py-5 ">
      <div className="border border-[#e4e4e4] h-[350px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center ">
          {/* image */}
          <div className="w-[250px] h-auto mx-auto flex justify-center items-center">
            <Image
              src={product.image}
              alt={product.title}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-full object-contain p-5 group-hover:scale-110 transition duration-300"
            />

          </div>
        </div>
        {/* button */}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify0center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={(e) => addToCart(e,product._id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-primary">
              <Plus />
            </div>
          </button>
          <Link href={`/product/${product._id}`} className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl">

            <Eye />

          </Link>
        </div>
      </div>
      {/* category, title and price */}
      <div className="text-sm capitalize text-gray-500 mb-1">{product.brand}</div>
      <Link href={`/product/${product._id}`}>

        <h2 className="font-semibold mb-1">{product.title}</h2>

      </Link>
      <div className="font-semibold"> {product.credits}</div>
    </div>
  );
};

export default Product;
