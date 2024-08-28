import { Link } from "react-router-dom"
import React, { useState } from "react";

import Multiselect from 'multiselect-react-dropdown';
import { CompactPicker } from 'react-color';
import Modal from "../../../UI-items/Modal";
import Image from "../../../UI-items/Image";
import Button from "../../../UI-items/Button";

type Option = {
    label: string;
    value: string;
};

const options: Option[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
];

function AdminProductCard() {
    const [handleEditModal, setHandleEditModal] = useState(false);
    const [handleRemoveModal, setHandleRemoveModal] = useState(false);

    const [images, setImages] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState<string[]>([]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setImages(prevImages => prevImages.concat(fileArray));
        }
    };

    const removeImage = (url: string) => {
        setImages(prevImages => prevImages.filter(image => image !== url));
        URL.revokeObjectURL(url);
    };

    const handleSelect = (selectedList: Option[], selectedItem: Option) => {
        setSelectedOptions([...selectedOptions, selectedItem]);
    };

    const handleRemove = (selectedList: Option[], removedItem: Option) => {
        setSelectedOptions(selectedOptions.filter(option => option.value !== removedItem.value));
    };

    const onChangeColor = () => {
        setShowColor(!showColor);
    };

    const handelChangeComplete = (color: unknown) => {
        setColors([...colors, (color as { hex: string }).hex]);
        setShowColor(false);
    };

    const removeColor = (color: string) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    return (
        <>
            {/* modal of remove the product */}
            <Modal
                isOpen={handleRemoveModal}
                closeModal={() => setHandleRemoveModal(false)}
                title="Confirm deletion"
                add="remove product"
                btnClass="error"
            >
                <p>Are you sure about the product deletion process ?</p>
            </Modal>

            {/* modal of edit the product*/}
            <Modal
                isOpen={handleEditModal}
                closeModal={() => setHandleEditModal(false)}
                title="Add Product"
                add="Add Product"
            >
                <div className="flex gap-5 items-center justify-start border-2 rounded-lg py-2 scroll">
                    <div>
                        <label htmlFor="file">
                            <div className="py-3 px-3 border-r-2 cursor-pointer text-center">
                                <span className="text-xl"><i className="fa-regular fa-images"></i></span>
                                <div className="capitalize text-blue-700 mt-3">Click to Upload</div>
                            </div>
                        </label>
                        <input type="file" id="file" multiple onChange={handleImageUpload} className="hidden" />
                    </div>
                    <div className="flex space-x-2 items-center">
                        {images.map((photo, index) => (
                            <Image url={photo} key={index} onClick={() => removeImage(photo)} alt="" className="h-24 rounded-md cursor-pointer" />
                        ))}
                    </div>
                </div>

                <div className="">
                    <label className="input input-bordered input-info flex items-center mb-5 gap-2">
                        Title:
                        <input type="text" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Type here" />
                    </label>

                    <label htmlFor="textarea" className="capitalize">
                        Description:
                    </label>
                    <textarea id="textarea" className="textarea textarea-info text-lg mt-2 w-full placeholder:text-zinc-500 text-gray-700 capitalize" placeholder="Type description"></textarea>

                    <div className="flex flex-col md:flex-row items-center gap-5 md:gap-2 mt-5 mb-5">
                        <label className="input input-bordered input-info flex items-center w-full gap-2">
                            Price:
                            <input type="number" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Price before discount" />
                        </label>
                        <label className="input input-bordered input-info flex items-center w-full gap-2">
                            Discount:
                            <input type="number" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Price after discount" />
                        </label>
                    </div>

                    <label className="input input-bordered input-info flex items-center w-full gap-2">
                        Quantity:
                        <input type="number" className="grow capitalize placeholder:text-zinc-500 text-gray-700" placeholder="Quantity" />
                    </label>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
                    <select className="select select-info w-full text-lg capitalize text-zinc-600">
                        <option disabled selected>Main Category</option>
                        <option>English</option>
                        <option>Japanese</option>
                        <option>Italian</option>
                    </select>
                    <select className="select select-info w-full text-lg capitalize text-zinc-600">
                        <option disabled selected>Choose a Brand</option>
                        <option>English</option>
                        <option>Japanese</option>
                        <option>Italian</option>
                    </select>
                </div>

                <Multiselect
                    className="capitalize rounded-lg mt-5 border border-info"
                    placeholder="Sub Category"
                    options={options}
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                    displayValue="label"
                />

                <div className="text-lg font-semibold text-gray-600 mb-3">Available Colors</div>
                <div className="flex flex-wrap items-center gap-3">
                    {colors.length > 0 && colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => removeColor(color)}
                            className="cursor-pointer w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <div
                        onClick={onChangeColor}
                        className="w-8 h-8 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    {showColor && (
                        <div className="absolute bottom-[-5px] left-0 p-3 rounded-lg shadow-lg z-10">
                            <CompactPicker onChangeComplete={handelChangeComplete} />
                        </div>
                    )}
                </div>

            </Modal>

            <div className='border-2 p-2 rounded-badge'>
                <div className="relative">
                    <div className=" border bg-zinc-100  rounded-badge py-1 px-6">
                        <Link to="/product-details/4">
                            <Image
                                alt="image name"
                                url="/src/assets/assets/Headphone2.png"
                                className="w-full"
                            />
                        </Link>
                    </div>
                    <Button onClick={() => setHandleEditModal(true)} className="absolute top-3 left-2 cursor-pointer border-2 border-zinc-400 py-1 px-2 rounded-xl hover:bg-slate-200">
                        <i className="fa-regular fa-pen-to-square text-xl text-blue-800"></i>
                    </Button>
                    <Button onClick={() => setHandleRemoveModal(true)} className="absolute top-3 right-2 cursor-pointer border-2 border-zinc-400 py-1 px-2 rounded-xl hover:bg-slate-200">
                        <i className="fa-regular fa-trash-can text-xl text-blue-800"></i>
                    </Button>


                    <div className="absolute bottom-3 left-3">
                        <div className="flex items-start bg-white px-4 py-1 rounded-full ">
                            <span className="mr-1">5.0</span>
                            <i className="fa-solid fa-star text-blue-700 text-sm"></i>
                            <span className="text-zinc-500 text-sm ml-2"> ( 14.5 )</span>
                        </div>
                    </div>
                </div>
                <div className="mt-2 ml-2">
                    <h6>title of the product</h6>
                    <div className="mt-1 flex justify-between items-center">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-lg">$ 5000 </span>
                            <span className="text-sm text-zinc-500" style={{ textDecorationLine: 'line-through' }}>$ 3000</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminProductCard
