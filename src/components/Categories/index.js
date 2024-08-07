import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import FeatureCard from "../../components/FeatureCard";
const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://fakestoreapi.com/products/categories')
            const data = await response.json()
            console.log(data)
            setCategories(data)
        }
        fetchCategories()

    }, [])

    if (categories.length === 0) return <div>Loading...</div>

    return (
        <div>
            <FeatureCard cards={categories} />
            <ProductCard />
        </div>
    )
}

export default Categories