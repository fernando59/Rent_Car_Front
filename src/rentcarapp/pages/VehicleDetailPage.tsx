import { Galleria } from 'primereact/galleria';
import { Image } from 'primereact/image';
import { useRef } from 'react';
import { Navbar } from "../components/Navbar";


export const VehicleDetailPage = () => {
  const images = [
    { "itemImageSrc": "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "thumbnailImageSrc": "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "alt": "Description for Image 1", "title": "Title 1" },
    { "itemImageSrc": "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "thumbnailImageSrc": "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "alt": "Description for Image 2", "title": "Title 2" },
    { "itemImageSrc": "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "thumbnailImageSrc": "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "alt": "Description for Image 3", "title": "Title 3" },
    { "itemImageSrc": "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "thumbnailImageSrc": "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "alt": "Description for Image 4", "title": "Title 4" },


  ]

  const galleria1 = useRef<any>(null);
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  const itemTemplate = (item: any) => {
    return <Image src={item.itemImageSrc} preview alt="Image Text" style={{ width: '100%', height: 450, objectFit: 'cover' }} />
  }

  const thumbnailTemplate = (item: any) => {
    return <img src={`${item.thumbnailImageSrc}`} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} />
    // return <Image src={item.thumbnailImageSrc} preview alt="Image Text" style={{ width: '100%',height:400,objectFit:'cover' }} />
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto container">
        <div className='rounded-md'>

        <Galleria  ref={galleria1} value={images} responsiveOptions={responsiveOptions} numVisible={3} style={{ maxWidth: '640px' }}
          item={itemTemplate} thumbnail={thumbnailTemplate} />
          </div>
      </div>
    </>
  )
}
