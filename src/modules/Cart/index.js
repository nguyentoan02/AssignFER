import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Cart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const total = cart.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
        }, 0)
        setTotal(total)
    }, [cart])
    const handelRemoveItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        navigate('/cart')
    }
    const handelInc = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        navigate('/cart')
    }
    const handelDec = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                if (item.quantity === 1) {
                    return null
                }
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        }).filter(item => item !== null)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        navigate('/cart')
    }

    if (cart.length === 0) {
        return (
            <>
                <div className=' h-[55vh] flex justify-center items-center'>
                    <Link to={'/'}
                        class="rounded-full py-4 w-full max-w-[400px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                        <span class="px-2 font-semibold text-lg leading-8 text-indigo-600">Cart is empty Continue Shopping</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                </div>

            </>


        )
    }

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

                <div className="w-full max-w-7xl flex justify-between items-center">
                    <h2 className="title font-manrope font-bold text-4xl leading-10 text-black">
                        Shopping Cart
                    </h2>
                    <h2 className="title font-manrope font-bold text-4xl leading-10 text-black">
                        {cart.length} Items
                    </h2>
                </div>


                <div className="hidden lg:grid grid-cols-2 py-6">
                    <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                    <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                        <span className="w-full max-w-[200px] text-center">Price</span>
                        <span className="w-full max-w-[260px] text-center">Quantity</span>
                    </p>
                </div>

                {cart.map((product) => {
                    return (
                        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                            <div
                                className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                <div className="img-box"><img src={product.image} alt={product.description} className="xl:w-[140px]" /></div>
                                <div className="pro-data w-full max-w-sm ">
                                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{product.title}
                                    </h5>
                                    <p
                                        className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                        {product.category}</p>
                                    <button className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center" onClick={() => handelRemoveItem(product.id)}>remove item</button>
                                </div>
                            </div>
                            <div
                                className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                                <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                                    ${product.price} <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(price)</span></h6>
                                <div className="flex items-center w-full mx-auto justify-center">
                                    <button
                                        className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                        onClick={() => handelDec(product.id)}>
                                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                            fill="none">
                                            <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                            <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                stroke-linecap="round" />
                                            <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                stroke-linecap="round" />
                                        </svg>
                                    </button>
                                    <input type="text"
                                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                                        value={product.quantity}
                                        readOnly />
                                    <button
                                        onClick={() => handelInc(product.id)}
                                        className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                            fill="none">
                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                                stroke-linecap="round" />
                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                stroke-linecap="round" />
                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                                stroke-linecap="round" />
                                        </svg>
                                    </button>
                                </div>
                                <h6
                                    className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                                    ${(product.price * product.quantity).toFixed(2)}</h6>
                            </div>
                        </div>
                    )
                })}
                <div class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                    <div class="flex items-center justify-between w-full py-6">
                        <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                        <h6 class="font-manrope font-medium text-2xl leading-9 text-indigo-500">${total.toFixed(2)}</h6>
                    </div>
                </div>
                <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                    <Link to={'/'}
                        class="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                        <span class="px-2 font-semibold text-lg leading-8 text-indigo-600">Continue Shopping</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                    <button
                        class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
                        to Payment
                        <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                            fill="none">
                            <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>


    );
}

export default Cart;