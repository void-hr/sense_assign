import Navbar from "@/components/navbar/Navbar"

const ProductLayout = ({ children }) => {
    return (

        <div className="h-screen">
        <Navbar />
        {children}
        </div>
    )
}
export default ProductLayout