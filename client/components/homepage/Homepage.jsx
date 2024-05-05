"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "../ui/input"
import Image from "next/image"
import Product from "../product/Products"
import { useEffect, useState } from "react"


const Homepage = () => {
  const [ productData, setProductData ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState("");
  useEffect(() => {

    const fetchProductData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/allproducts?search=${searchQuery}`);
        const { products } = await res.json();
        setProductData(products);
      } catch (error) {
        console.error("Something went wrong")
      }
    }

    fetchProductData();
  }, [searchQuery])

  const handleSearchQuery = (e) => {
    setTimeout(() => {
        setSearchQuery(e.target.value)
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center container">
      <Carousel
        options={{
          loop: true,
          autoplay: true,
          interval: 1000, // Adjust autoplay interval as needed
        }}
        className="hidden lg:flex"
      >
        <CarouselContent>
          <CarouselItem>
            <Image
              src={"https://images.unsplash.com/photo-1624720114708-0cbd6ee41f4e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Image"
              className="w-full h-[25vw] object-cover object-bottom  filter brightness-75"
              width={1300}
              height={1300}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={"https://images.unsplash.com/photo-1572775146189-b792cd0b76ba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Image"
              className="w-full h-[25vw] object-cover object-bottom  filter brightness-75"
              width={1300}
              height={1300}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={"https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Image"
              className="w-full h-[25vw] object-cover object-center  filter brightness-75"
              width={1300}
              height={1300}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={"https://images.unsplash.com/photo-1606041974734-0341c2d2d988?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Image"
              className="w-full  h-[25vw] object-cover object-center filter brightness-75"
              width={1300}
              height={1300}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>



      {/* search functionality for products */}

      <div className="w-full mt-5">

        <Input placeholder="Search" onChange={handleSearchQuery}/>

      </div>

      {/* custom products grid  */}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-[30px]">
        {productData.length > 0 ?
          productData.map((product, idx) => <Product key={product._id} product={product} />) : null}
      </div>

    </div>


  )
}

export default Homepage