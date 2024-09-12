import React, { useState, useEffect } from "react";
import Image from "../../../UI-items/Image";
import { IProductDetails } from "../../../Interface";

interface ProductGalleryProps {
  product: IProductDetails | undefined;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // Set the initial selected image based on product data
  useEffect(() => {
    if (product?.data) {
      setSelectedImage(product.data.imageCover);
    }
  }, [product]);

  if (!product || !product.data) {
    return <div>No images available</div>;
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Display Selected Image */}
      <div className="bg-zinc-200 border-2 w-full flex justify-center rounded-xl">
        <div className="mb-6 py-1 px-6">
          <Image
            url={selectedImage || "placeholder-image-url.jpg"} // Fallback to a placeholder if no image is selected
            alt="Selected Product"
            className="h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Display Image Thumbnails */}
      <div className="flex gap-5">
        {product.data.images.map((image, index) => (
          <Image
            key={index} // Always include a key in map iterations
            url={image}
            alt={`Product Image ${index + 1}`}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
              selectedImage === image ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(image)} // Set selected image on click
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
