"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const { productId } = useParams();

    const [productDetails, setProductDetails] = useState()

    useEffect(() => {

        const fetchProductDetails = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${productId}`);
                const { data } = await res.json();
                setProductDetails(data);
            } catch (error) {
                console.error("Something went wrong")
            }
        }
        fetchProductDetails();
    }, [productId])

   
    if (!productDetails) {
        return (
            <section className="h-screen flex justify-center items-center">Loading...</section>
        )
    }

    const { title, credits, image, description} = productDetails

    return (
        <section className="pt-32 pb-12 lg:py-32 flex-1 flex items-center">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* image */}
                    <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                        <Image width="0" height="0" className="max-2-[200px] lg:max-w-sm" src={image} alt="" />
                    </div>
                    {/* text */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
                        <div className="text-xl text-red-500 font-medium mb-6"> {credits}</div>
                        <p className="mb-8">{description}</p>
                        <button onClick={() => addToCart(product, product.id)} className="bg-primary py-4 px-8 text-white">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;